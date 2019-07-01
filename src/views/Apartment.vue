<template>
  <main class="main">
    <article class="common-page flat-page">
      <header class="flat-page__header common-page__header container">
        <h1 class="common-page__title common-title">{{ apartment.title | renamePentahauseToStudia }}</h1>
      </header>

      <PageActionPanel :extraRightClass="'page-action-panel__nav-wrapper'">
        <template v-slot:left>
          <div class="breadcrumbs">
            <ul class="breadcrumbs__list">
              <li class="breadcrumbs__item">
                <a class="breadcrumbs__link" href="/">
                  <icon-base class="breadcrumbs__link-icon" viewBoxSize="307">
                    <icon-home/>
                  </icon-base>
                  <span class="breadcrumbs__link-text visually-hidden">Главная</span>
                </a>
              </li>
              <li class="breadcrumbs__item">
                <router-link class="breadcrumbs__link" :to="{name: 'filter'}">
                  <icon-base class="breadcrumbs__link-icon" viewBoxSize="492">
                    <icon-back/>
                  </icon-base>
                  <span class="breadcrumbs__link-text">Назад</span>
                </router-link>
              </li>
            </ul>
          </div>
        </template>
        <template v-slot:right>
          <div class="flat-page__nav flat-page-navigation">
            <ul class="flat-page-navigation__list" role="tablist">
              <li
                class="flat-page-navigation__item"
                :class="[activeTab === 'flat-plan' ? 'flat-page-navigation__item--active' : '']"
              >
                <a
                  href="#flat-plan"
                  class="flat-page-navigation__link"
                  role="tab"
                  data-action="toggle-flat-page-content"
                  @click.prevent="handlerFlatPageNavClick('flat-plan')"
                >Планировка</a>
              </li>
              <li
                class="flat-page-navigation__item"
                :class="[activeTab === 'flat-floor' ? 'flat-page-navigation__item--active' : '']"
              >
                <a
                  href="#flat-floor"
                  class="flat-page-navigation__link"
                  role="tab"
                  data-action="toggle-flat-page-content"
                  @click.prevent="handlerFlatPageNavClick('flat-floor')"
                >На плане этажа</a>
              </li>
            </ul>
          </div>
        </template>
      </PageActionPanel>

      <div class="common-page__body flat container">
        <div class="flat__grid">
          <div class="flat__main-column">
            <section
              class="flat-plan-section flat-page-nav-content"
              id="flat-plan"
              data-target="flat-page-nav-content"
              v-show="activeTab === 'flat-plan'"
            >
              <h2 class="visually-hidden">Планировка</h2>
              <section>
                <h3 class="visually-hidden">План квартиры</h3>
                <div class="common-flat-picture">
                  <a
                    class="common-flat-picture__wraplink"
                    :href="`${mainLayout}`"
                    target="_blank"
                    @click.prevent="showPhotoSwipe"
                  >
                    <img
                      class="common-flat-picture__image"
                      :src="`${mainLayout}`"
                      alt="План квартиры"
                    >
                  </a>
                </div>
              </section>
            </section>

            <section
              class="flat-territory-section flat-page-nav-content"
              id="flat-floor"
              data-target="flat-page-nav-content"
              v-show="activeTab === 'flat-floor'"
            >
              <h2 class="visually-hidden">На плане этажа</h2>
              <div class="common-flat-picture">
                <a
                  class="common-flat-picture__wraplink"
                  :href="`${apartment.placingApartmentOnFloorPlan}`"
                  target="_blank"
                  @click.prevent="showPhotoSwipe"
                >
                  <img
                    class="common-flat-picture__image"
                    :src="`${apartment.placingApartmentOnFloorPlan}`"
                    alt="Квартира на плане этажа"
                  >
                </a>
              </div>
            </section>
          </div>

          <div class="flat__aside-column">
            <div class="flat-plan-section__detail flat-detail">
              <div class="flat-detail__info flat-info">
                <div class="flat-info__row" v-if="apartment.status == 3">
                  <div class="flat-info__column">
                    <div class="flat-info__item">
                      <span class="flat__reserved">
                        <icon-base class="flat__reserved-icon" viewBoxSize="402">
                          <icon-padlock/>
                        </icon-base>Квартира забронирована
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flat-info__row" v-if="apartment.status != 3">
                  <div class="flat-info__column">
                    <div class="flat-info__item">
                      <span class="flat-info__caption">Стоимость</span>
                      <button
                        class="flat-detail__button"
                        @click="showModal('popup-request-cost')"
                      >Запросить стоимость</button>
                    </div>
                  </div>
                </div>
                <div class="flat-info__row" v-if="apartment.status != 3">
                  <div class="flat-info__column">
                    <a class="flat-detail__button" href="/ipoteka">Эта квартира в ипотеку</a>
                  </div>
                </div>
                <div class="flat-info__row">
                  <div class="flat-info__column">
                    <div class="flat-info__item">
                      <span class="flat-info__caption">Площадь</span>
                      <b class="flat-info__value">{{ apartment.area }} м²</b>
                    </div>
                  </div>
                  <div class="flat-info__column">
                    <div class="flat-info__item">
                      <span class="flat-info__caption">Кол-во комнат</span>
                      <b class="flat-info__value">{{ room }}</b>
                    </div>
                  </div>
                </div>
                <div class="flat-info__row">
                  <div class="flat-info__column">
                    <div class="flat-info__item">
                      <span class="flat-info__caption">Этаж</span>
                      <b class="flat-info__value">{{ apartment.floor }}</b>
                    </div>
                  </div>
                  <div class="flat-info__column">
                    <div class="flat-info__item">
                      <span class="flat-info__caption">Тип дома</span>
                      <b class="flat-info__value">{{ typeHouse }}</b>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flat-detail__disclamer">
                <p>
                  <small>Указанный размер площади может незначительно отличаться.</small>
                </p>
              </div>
              <div class="flat-detail__actions no-print">
                <a
                  class="flat-detail__button"
                  :href="`${apartment.pathToPdf}`"
                  target="_blank"
                >Распечать планировку</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <modal
      name="popup-request-cost"
      width="92%"
      :maxWidth="420"
      height="auto"
      :clickToClose="false"
      adaptive
    >
      <button
        class="modal-close"
        title="Закрыть"
        aria-label="Закрыть"
        @click="$modal.hide('popup-request-cost')"
      >✖</button>
      <div class="modal-content">
        <h2 class="modal-content__title">Запросить стоимость</h2>
        <RequestForm :apartment="apartment" @send-mortgage-form="hideModal"></RequestForm>
      </div>
    </modal>

    <div class="pswp" ref="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>

      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Закрыть (Esc)">✖</button>

            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';
import PageActionPanel from '@/components/PageActionPanel.vue';
import IconBase from '@/components/IconBase.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconBack from '@/components/icons/IconBack.vue';
import IconPadlock from '@/components/icons/IconPadlock.vue';

import Axios from 'axios';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import { typeHouseDictionary, roomDictionary } from '@/assets/js/dictionary.js';

export default {
  name: 'ApartmentPage',
  data() {
    return {
      mainLayout: '',
      apartment: {},
      activeTab: 'flat-plan'
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    room() {
      return roomDictionary[this.apartment.selectedRoom];
    },
    typeHouse() {
      return typeHouseDictionary[this.apartment.selectedHouseId];
    }
  },
  methods: {
    showModal(name) {
      this.$modal.show(name, {});
    },
    goBack() {
      this.$router.push({ name: 'filter' });
    },
    getMainLayout() {
      if (process.env.NODE_ENV === 'development') {
        Axios.get(process.env.VUE_APP_GET_APARTMENT_LAYOUT_API).then(
          response => {
            this.mainLayout = response.data[0].path_to_file;
          }
        );
      } else {
        Axios.get(
          `${process.env.VUE_APP_GET_APARTMENT_LAYOUT_API}${this.id}/`
        ).then(response => {
          this.mainLayout = response.data[0].path_to_file;
        });
      }
    },
    handlerFlatPageNavClick(targetId) {
      this.activeTab = targetId;
    },
    hideModal() {
      this.$modal.hide('popup-request-cost');
    },
    showPhotoSwipe(event) {
      const image = event.target.closest('img');

      if (!image) {
        return;
      }

      const item = {
        src: image.src,
        w: image.naturalWidth,
        h: image.naturalHeight
      };

      const items = [item];

      const options = {
        closeOnScroll: false,
        showHideOpacity: false,
        hideAnimationDuration: 0,
        showAnimationDuration: 0,
        bgOpacity: 0.8,
        history: false
      };

      var gallery = new PhotoSwipe(
        this.$refs.pswp,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      Axios.get(`/static/apartmentId.json`).then(response => {
        this.apartment = response.data;
      });
    } else {
      Axios.get(`//reflats.ru/api/apartment/${this.id}/`).then(response => {
        this.apartment = response.data;
      });
    }

    this.getMainLayout();
  },
  components: {
    PageActionPanel,
    RequestForm,
    IconBase,
    IconHome,
    IconBack,
    IconPadlock
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #f7f7f7;
}

.flat-page {
}

.flat-page__header {
  margin-bottom: 40px;
}

.flat-page__nav-wrapper {
}

.flat-page__nav {
  display: flex;
  height: 100%;
  margin-left: auto;
  flex-grow: 1;

  @media (min-width: 768px) {
    flex-grow: 0;
  }
}
</style>
