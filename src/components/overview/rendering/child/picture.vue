<template>
    <div class="picture">
      <div class="swiper">
        <swiper :options="swiperOption"  ref="mySwiper">
          <swiper-slide v-for="(item,index) in effectList" :key="index" class="swiper-item">
            <img  v-lazy="item.pic_url"  class="swiper-lazy">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '../../../../api/api'
import {SUCCESS_OK} from '../../../../api/config'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  data() {
    return {
      effectList: [],
      pullup: true,
      loadingEndData: false,
      loadingImg: false,
      page: 1,
      swiperOption: {
        notNextTick: true,
          autoplay: {
          delay: 30000
        },
        speed: 1000,
        loop: true,
        pagination: {
        el: '.swiper-pagination'
        },
        effect: 'fade',
        fade: {
         crossFade: false
        },
        scrollbarHide: true,
        paginationClickable: true,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        lazyLoadingOnTransitionStart: false,
        lazyLoadingInPrevNextAmount: 1,
        calculateHeight: true
      }
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'projectDetails',
        'loadingEnd',
        'unitId',
        'actionPage'
    ])
  },
  methods: {
      async  getData() {
        await api.getProjectEffectList({project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,pic_type: '0',size: '20',page: this.page}).then(resp => {
            var resp = eval(resp)
            if (resp.resp_code === SUCCESS_OK) {
              this.effectList = resp.response.list
              console.log(1,this.effectList)
            }
        });
      }
  },
  components: {
    swiper,
    swiperSlide
 },
  created(){
    this.getData();
  },
  watch: {
    '$route': 'getData'
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";
  .picture {
    height: 2.8rem;
    overview: hidden;
    position: relative;
    .swiper-item {
      width: 100%;
      height: 2.8rem;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }
</style>