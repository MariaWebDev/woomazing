
// Слайдер внизу главной страницы
new Swiper ('.image-slider', {
    navigation: {
    nextEl: '.btn-next',
    prevEl: '.btn-prev'
  },
    pagination: {
    el: '.swiper-pagination',
    clickable: true
  },    
  grabCursor: true,
  loop: true,
   slidesPerView: 1,
});

// Меню бургер
const iconMenu = document.querySelector('.menu__burger');
const logo = document.querySelector('.nav__logo');
if(iconMenu) {
  const menuList = document.querySelector('.menu__list');
  iconMenu.addEventListener("click", function(e){
    document.body.classList.toggle('body-lock');
    iconMenu.classList.toggle('menu__burger_active');
    menuList.classList.toggle('menu__list_active');
    logo.classList.toggle('nav__logo_fixed');
  });
}


// Фиксация шапки
const header = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY;
  if (scrollTop > 300) {
    header.classList.add('fixed')
  } else {
    header.classList.remove('fixed')
  }
});

// Двой слайдер на главной странице
$(document).ready(function(){
  $('.intro__content_slider').slick({
    arrows: false,
    dots: true,
    speed: 1000,
    easing: 'ease',
    autoplay: true,
    autoplaySpeed:1500,
    asNavFor:".intro__image_slider"
  });
  $('.intro__image_slider').slick({
    arrows: false,
    dots: false,
    fade: true,
    asNavFor:".intro__content_slider",
    easing: 'ease',
    speed: 1000
  });
});

// Popup

const popup = document.querySelector('.popup');
const popupSuccess = document.querySelector('.popup-success');
const popupLink = document.querySelector('.popup__link');
const body = document.querySelector('body');
const popupClose = document.querySelectorAll('.close-popup');

  popupLink.addEventListener("click", function(e){
    popup.classList.add('popup__active');
    body.classList.add('body-lock');
    e.preventDefault();
  });


if (popupClose.length > 0) {
  for (let index = 0; index < popupClose.length; index++) {
    const el = popupClose[index];
    el.addEventListener('click', function(e){
      popup.classList.remove('popup__active');
      popupSuccess.classList.remove('popup__active');
      body.classList.remove('body-lock');
      e.preventDefault();
    })
  }
}
popup.addEventListener('click', function(e) {
  if (!e.target.closest('.popup__content')) {
    popup.classList.remove('popup__active');
      popupSuccess.classList.remove('popup__active');
      body.classList.remove('body-lock');
  }
})




// Плавная прокрутка к разделам страницы

const links = document.querySelectorAll('.link-goto[data-goto]');

if (links.length > 0) {
  links.forEach(link =>  {
    link.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick (e) {
    const link = e.target;
    if(link.dataset.goto && document.querySelector(link.dataset.goto)) {
      const goToBlock = document.querySelector(link.dataset.goto);
      const goToBlockValue  = goToBlock.getBoundingClientRect().top + scrollY - document.querySelector('.nav').offsetHeight - 50;  
        window.scrollTo({
          top: goToBlockValue,
          behavior: 'smooth'
        });
    }
  }
}


// Tabs


// TABS

const tabs = document.getElementById ("tabs__header");
const content = document.getElementById ("tabs__contents");
const tabsElements = Array.from(document.querySelectorAll(".tabs__btn"));


const changeClass = el => {
    for (let i = 0; i < tabs.children.length; i++) {
        tabs.children[i].classList.remove('active');
    }
    el.classList.add('active');
};

for(let index = 0; index < tabsElements.length; index++) {
    tabsElements[index].addEventListener('click', (e) => {
        let currTab = e.target.dataset.btn;
        changeClass(e.target);
        for (let i = 0; i < content.children.length; i++) {
            content.children[i].classList.remove('active');
            if (content.children[i].dataset.content == currTab) {
                content.children[i].classList.add('active');
            }
        };
    });
}


// Яндекс карта

$(document).ready(function(){
    ymaps.ready(init);
    function init(){
        // Создание карты.
        const myMap = new ymaps.Map("map", {
            center: [50.494287,30.350301],
            zoom: 11,
            controls: ['zoomControl'],
            scroll:false
        });
    }
});

// Отправка формы в модальном окне


$('document').ready(function(){
      $('[data-submit]').on('click', function (e){
        e.preventDefault(); 
        $(this).parent('form').submit();
      })
    })

    $.validator.addMethod(
      'regex', 
      function(value, element, regexp){
          let regExp = new RegExp(regexp);
          return this.optional(element) || regExp.test(value);
      }, 
      'Данные введены неверно'
    );

    function valEl(el) {
      el.validate ({
        rules: {
          name: {
            required: true,
            regex : "[A-Za-z]{1,32}"
          },
          email: {
            required: true,
            regex : ".+\@.+\..+"
          },
          tel: {
            required: true,
            digits: true,
            minlength : 10,
            maxlength : 11
          }
        },
        messages : {
          name : {
            required : 'Имя введено неверно'
          },
          email : {
            required : 'Неверный e-mail'
          },
          tel : {
            required : 'Телефон введен неверно'
          }
        },
        submitHandler: function(form) {
          // $('#preloader-active').fadeIn();
          const $form = $(form); 
          const $formId = $(form).attr('id');
          switch($formId) {
            // Форма с id = form-book
            case 'popup-form':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function(){
              console.log('Success');
            })
            .fail(function(){
              console.log('Fail');
              $('.popup').removeClass('popup__active');
              $('.popup-success').addClass('popup__active');
            })
            .always(function() {
                console.log('Always');
                setTimeout( function () {
                  $form.trigger('reset');
                  // Строки для отслеживания в Я.Метрике и гугл аналитикс
                }, 1100);
            });
            break;
            case 'contacts-form':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function(){
              console.log('Success');
              $('.form__message-success').addClass('open');
            })
            .fail(function(){
              console.log('Fail');
              $('.form__message-fail').addClass('open');
            })
            .always(function() {
                console.log('Always');
                setTimeout( function () {
                  $form.trigger('reset');
                  // Строки для отслеживания в Я.Метрике и гугл аналитикс
                }, 1100);
                $('.form__message').on('click', function() {
                  $('.form__message-success').removeClass('open');
                  $('.form__message-fail').removeClass('open');
                });
            });
            break;
          }
          return false;
        }
      });
    }
  $('.js-form').each(function() {
    valEl($(this));
});

