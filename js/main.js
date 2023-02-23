/* @author web@2dsd.ru | webtitov.ru */
'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const WebT = {};

  WebT.settings = {
    modal_active_class: '--modal-show'
  };

  WebT.elements = {
    main_container: document.getElementById('main_content'),
    modal_toggle: document.querySelectorAll('[data-modal-toggle]'),
    modal_box: document.querySelectorAll('[data-modal]'),
    overlay: document.querySelector('.theme-overlay'),
    close_modal: document.querySelectorAll('[data-modal-close]'),
    offer_nav: document.getElementById('offer_nav'),
    to_top_button: document.getElementById('to_top')
  };


  /* Close all modals */
  const closeModals = () => {
    // close all modals
    for (let i=0; i < WebT.elements.modal_box.length; i++) {
      WebT.elements.modal_box[i].classList.remove(WebT.settings.modal_active_class);
    }
    // remove active classes from modal toggle buttons
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
    }
    document.body.classList.remove(WebT.settings.modal_active_class);
  }

  /* Stick offer nav on scroll */

  if (WebT.elements.offer_nav) {
    let offer_nav_pos = WebT.elements.offer_nav.getBoundingClientRect().top + window.scrollY,
      offer_nav_height = WebT.elements.offer_nav.offsetHeight;
    const fixOfferNav = () => {
      let scrollPosY = window.pageYOffset | document.body.scrollTop;

      if(scrollPosY > offer_nav_pos) {
        document.body.classList.add('sticky-offer-nav');
        WebT.elements.main_container.style.marginTop = `${offer_nav_height}px`;
      } else if(scrollPosY <= offer_nav_pos) {
        document.body.classList.remove('sticky-offer-nav');
        WebT.elements.main_container.style.marginTop = '0px';
      }
    };

    window.addEventListener('load', fixOfferNav);
    window.addEventListener('scroll', fixOfferNav);
  }

  /* To top button show */
  const toTopButton = () => {
    let scrollPosY = window.pageYOffset | document.body.scrollTop;

    if(scrollPosY > 500) {
      WebT.elements.to_top_button.classList.add('--show-button');
    } else if(scrollPosY <= 500) {
      WebT.elements.to_top_button.classList.remove('--show-button');
    }
  };

  /* Modals */
  (() => {
    // Add click event to close modals
    for (let i=0; i < WebT.elements.close_modal.length; i++) {
      WebT.elements.close_modal[i].addEventListener('click', () => {
        closeModals();
      });
    }
    // Add click event to open target modal
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].addEventListener('click', (e) => {
        e.preventDefault();
        let this_toggle = WebT.elements.modal_toggle[i],
            target_modal = this_toggle.getAttribute('data-modal-toggle');
        // if nav modal opened
        if (this_toggle.classList.contains(WebT.settings.modal_active_class)) {
          closeModals();
          WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
        } else {
          closeModals();
          document.querySelector(`[data-modal='${target_modal}']`).classList.add(WebT.settings.modal_active_class);
          document.body.classList.add(WebT.settings.modal_active_class);
          WebT.elements.modal_toggle[i].classList.add(WebT.settings.modal_active_class);
        }
      });
    }
  })();

  /* Scroll to top */
  (() => {
    WebT.elements.to_top_button.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  })();

  /* Cart button */
  (() => {
    if (document.getElementById('cart_button')) {
      document.getElementById('cart_button').addEventListener('click', () => {
        document.body.classList[document.body.classList.contains('--cart-opened') ? 'remove' : 'add']('--cart-opened');
      });
    }
  })();

  /* cartJS init */
  (() => {
    let items = cartLS.list();

    function renderCart(items) {
      const $cart = document.querySelector(".cart")
      const $total = document.querySelectorAll(".js-cart-total")
      const $total_product_price = document.querySelector(".js-cart-total-clear")
      const $count = document.querySelectorAll(".js-cart-amount")
      const $block_cart = document.querySelector(".header-cart__list")
      const $send_order = document.querySelector(".send_order")
      const $checkout_cart = document.querySelector(".js-checkout-block")

      if ($block_cart) {
        $block_cart.innerHTML = items.map((item) => `
        <div class="header-cart__item">
          <img src="${item.img}" class="header-cart__image"/>
          <div class="header-cart__description">
            <span class="header-cart__name">${item.name}</span>
            <span class="header-cart__amount">ποσότητα: <span>${item.quantity}</span></span>
          </div>
          <button class="cart-item__delete" onClick="cartLS.remove(${item.id})">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="20" height="20" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M436 60h-89.185l-9.75-29.238A44.945 44.945 0 0 0 294.379 0h-76.758a44.975 44.975 0 0 0-42.7 30.762L165.182 60H76c-24.814 0-45 20.186-45 45v30c0 16.708 15.041 15 31.183 15H466c8.291 0 15-6.709 15-15v-30c0-24.814-20.186-45-45-45zm-239.187 0 6.57-19.746A14.996 14.996 0 0 1 217.621 30h76.758c6.46 0 12.188 4.116 14.224 10.254L315.18 60H196.813zM64.666 182l23.917 289.072C90.707 494.407 109.97 512 133.393 512h245.215c23.423 0 42.686-17.593 44.824-41.06L447.336 182H64.666zM181 437c0 19.773-30 19.854-30 0V227c0-19.773 30-19.854 30 0v210zm90 0c0 19.773-30 19.854-30 0V227c0-19.773 30-19.854 30 0v210zm90 0c0 19.773-30 19.854-30 0V227c0-8.291 6.709-15 15-15s15 6.709 15 15v210z" fill="#707070" data-original="#000000" class=""></path></g></svg>
          </button>
        </div>
      `).join("");
      }


      if ($checkout_cart) {
        $checkout_cart.innerHTML = items.map((item) => `
        <div class="checkout-info__item">
                <span class="checkout-item__title">${item.name}</span>
                <span class="checkout-item__amount">${item.quantity} x</span>
                <span class="checkout-item__value">${item.price} €</span>
              </div>
      `).join("");
      }


      let tot = items.reduce((sum, item) => sum + item.quantity, 0);

      if (cartLS.total() === 0){
        if ($total_product_price){
          $total_product_price.innerHTML = '0';
        }

        for (let j=0; j < $total.length; j++) {
          $total[j].innerHTML = '0';
        }

        //$send_order.innerHTML = '';
        for (let i=0; i < $count.length; i++) {
          $count[i].innerHTML = '0';
        }
      }else{
        if ($total_product_price){
          $total_product_price.innerHTML = cartLS.total();
        }

        for (let j=0; j < $total.length; j++) {
          let total_and_delivery = cartLS.total() + 10;
          $total[j].innerHTML = total_and_delivery + " €" ;
        }
        //$send_order.innerHTML = '<button type="button" class="btn btn-success">Оформить заказ</button>';
        for (let i=0; i < $count.length; i++) {
          // $count[i].innerHTML = cartLS.list().length;
          $count[i].innerHTML = items.reduce((sum, item) => sum + item.quantity, 0);
        }
      }

    }

    renderCart(cartLS.list())
    cartLS.onChange(renderCart)
  })();

  
  /* Functions init */

  window.addEventListener('scroll', toTopButton);
});