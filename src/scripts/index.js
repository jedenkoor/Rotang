import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import IMask from 'imask'

class Init {
  constructor() {
    this.init()
  }

  init() {
    this.events()

    this.actions().initPhoneMask()

    setTimeout(() => {
      this.actions().showBody()
    }, 300)

    if (document.querySelectorAll('.banner__slider').length) {
      const bannerSliders = document.querySelectorAll('.banner__slider')
      bannerSliders.forEach((item) => {
        this.actions().initBannerSlider(item)
      })
    }

    if (document.querySelectorAll('.furniture__slider').length) {
      const furnitureSliders = document.querySelectorAll('.furniture__slider')
      furnitureSliders.forEach((item) => {
        this.actions().initFurnitureSlider(item)
      })
    }

    if (document.querySelectorAll('.reviews-slider__wrap').length) {
      const reviewSliders = document.querySelectorAll('.reviews-slider__wrap')
      reviewSliders.forEach((item) => {
        this.actions().initReviewsSlider(item)
      })
    }

    if (document.querySelectorAll('.catalog-item-slider__wrap').length) {
      const catalogSliders = document.querySelectorAll('.catalog-item-slider__wrap')
      catalogSliders.forEach((item) => {
        this.actions().initCatalogSlider(item)
      })
    }

    if (document.querySelectorAll('.good__slider').length) {
      const goodSliders = document.querySelectorAll('.good__slider')
      goodSliders.forEach((item) => {
        this.actions().initGoodSlider(item)
      })
    }
  }

  events() {
    const _this = this

    window.ap(document).on('input', '[data-type="textarea"]', function (e) {
      _this.actions().autoGrowTextarea(this)
    })

    window.ap(document).on('click', '.popup-btn', function (e) {
      e.preventDefault()
      _this.actions().showPopup(this)
    })

    window.ap(document).on('click', '.overlay, .popup__close', function (e) {
      e.preventDefault()
      _this.actions().hidePopup(this)
    })

    window.ap(document).on('click', '.header__burger', function (e) {
      e.preventDefault()
      _this.actions().toggleMenu(this)
    })

    window.ap(document).on('click', '.select-open', function (e) {
      e.preventDefault()
      _this.actions().toggleSelect(this)
    })

    document.addEventListener('click', (e) => {
      const selectBtn = document.querySelectorAll('.select-open')
      const container = document.querySelector('.select-block')
      if (selectBtn.length) {
        selectBtn.forEach((item) => {
          if (
            e.target !== container &&
            e.target.closest('.select-block') === null &&
            e.target !== item &&
            e.target.closest('.select-open') === null
          ) {
            item.classList.remove('active')
            item.closest('.select').querySelector('.select-block').classList.remove('active')
          }
        })
      }
    })
  }

  actions() {
    return {
      getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth
      },
      initPhoneMask() {
        document.querySelectorAll('[data-type="tel"]').forEach((item) => {
          const telMask = IMask(item, {
            mask: '+{7} 000 000 00 00'
          })
          let flagInput = true
          item.addEventListener('input', (e) => {
            if ((e.target.value === '+7 8' || e.target.value === '+7') && flagInput === true) {
              e.target.value = '+7'
              telMask.masked.reset()
              telMask.value = '+7'
              flagInput = false
            } else if (e.target.value === '') {
              flagInput = true
            }
          })
          telMask.on('accept', function () {
            item.classList.remove('input-border')
          })
          telMask.on('complete', function () {
            item.classList.add('input-border')
          })
        })
      },
      showBody() {
        document.querySelector('body').style.opacity = 1
      },
      initBannerSlider(el) {
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        const pagination = el.querySelector('.swiper-pagination')
        ;(() =>
          new Swiper(el, {
            effect: 'fade',
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            },
            pagination: {
              el: pagination,
              clickable: true
            }
          }))()
      },
      initFurnitureSlider(el) {
        const swiper = new Swiper(el, {
          spaceBetween: 16,
          freeMode: true,
          slidesPerView: 'auto',
          breakpoints: {
            1024: {
              spaceBetween: 28
            }
          }
        })
        setTimeout(function () {
          swiper.update()
        }, 300)
      },
      initReviewsSlider(el) {
        const slider = el.querySelector('.swiper-container')
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        const pagination = el.querySelector('.swiper-pagination')
        ;(() =>
          new Swiper(slider, {
            spaceBetween: 16,
            slidesPerView: 'auto',
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            },
            pagination: {
              el: pagination,
              clickable: true
            },
            breakpoints: {
              1024: {
                slidesPerView: 3
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 28
              }
            }
          }))()
      },
      autoGrowTextarea(el) {
        el.style.height = '2px'
        el.style.height = el.scrollHeight + 'px'
      },
      showPopup(el) {
        const overlay = document.querySelector('.overlay')
        const popupSelector = el.getAttribute('data-popup')
        const popup = document.querySelector(`.popup[data-popup="${popupSelector}"]`)
        const popupClose = popup.querySelector('.popup__close')

        el.classList.add('popup-trigger')
        popup.classList.add('popup--active')
        overlay.classList.add('overlay--active')
        if (this.getScrollbarWidth()) {
          document.querySelector('html').classList.add('compensate-for-scrollbar')
        }
        document.querySelector('html').classList.add('fixed')
        if (document.documentElement.clientWidth > 1024) {
          popupClose.focus()
        }
      },
      hidePopup(el) {
        if (el.classList.contains('overlay--menu')) {
          el.classList.remove('overlay--menu')
          document.querySelector('.header__nav').classList.remove('header__nav--active')
          document.querySelector('.header__burger').classList.remove('header__burger--active')
        } else {
          document.querySelector('html').classList.remove('compensate-for-scrollbar')
          document.querySelector('html').classList.remove('fixed')
          const overlay = document.querySelector('.overlay')
          const popup = document.querySelector('.popup--active')
          const popupTrigger = document.querySelector('.popup-trigger')
          popup.classList.remove('popup--active')
          overlay.classList.remove('overlay--active')
          popupTrigger.focus()
          popupTrigger.classList.remove('popup-trigger')
        }
      },
      initCatalogSlider(el) {
        const slider = el.querySelector('.swiper-container')
        const pagination = el.querySelector('.swiper-pagination')
        ;(() =>
          new Swiper(slider, {
            spaceBetween: 8,
            pagination: {
              el: pagination,
              clickable: true
            }
          }))()
      },
      initGoodSlider(el) {
        const pagination = el.querySelector('.swiper-pagination')
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        const thumbsSlider = el.nextSibling.querySelector('.swiper-container')
        const thumbsPrevArr = el.nextSibling.querySelector('.swiper-button-prev')
        const thumbsNextArr = el.nextSibling.querySelector('.swiper-button-next')

        const thumbs = new Swiper(thumbsSlider, {
          spaceBetween: 16,
          slidesPerView: 'auto',
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: true,
          navigation: {
            prevEl: thumbsPrevArr,
            nextEl: thumbsNextArr
          }
        })

        ;(() =>
          new Swiper(el, {
            effect: 'fade',
            spaceBetween: 8,
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            },
            pagination: {
              el: pagination,
              clickable: true
            },
            thumbs: {
              swiper: thumbs,
              autoScrollOffset: 1
            }
          }))()
      },
      toggleMenu(el) {
        const menu = document.querySelector('.header__nav')
        const overlay = document.querySelector('.overlay')

        el.classList.toggle('header__burger--active')
        overlay.classList.toggle('overlay--menu')
        menu.classList.toggle('header__nav--active')
        document.querySelector('html').classList.toggle('fixed')
      },
      toggleSelect(el) {
        el.classList.toggle('active')
        el.closest('.select').querySelector('.select-block').classList.toggle('active')
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
