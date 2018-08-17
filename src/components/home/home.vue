<template>
    <div class="home main">
      <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis text-execeeded" v-text='projectName'></span>
        </p>
      </vm-header>
      <div class="main-44 _effect _cover-content" :class="{'_effect--30':decline}">
        <scroll ref="scroll" class="vm-scroll" :data="filterAI">
          <div class="home-box">
            <div class="home-menu">
              <swiper :options="swiperOption">
                <swiper-slide v-for="(page,index) in pages" :key="index">
                  <div class="menu-item fl" v-for="item of page" :key="item.id">
                    <router-link  tag="div" class="tab-item menu-item-box" :to="{name: item.url,query:{name: item.title}}">
                      <img :src="item.img">
                    </router-link>
                    <span>{{item.title}}</span>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="home-AI">
              <div class="AI-head frame-1px">
                <h3>AI秘书</h3>
                <div class="AI-more" @click="vmMore(projectDetails)">
                  <span>查看秘书</span>
                  <span class="icon-return-gray vm-more-icon"></span>
                </div>
              </div>
              <div class="AI">
                <AI-list :AI="filterAI"></AI-list>
              </div>
            </div>
            <div class="home-my">
              <div class="AI-head frame-1px">
                <h3>我的问题</h3>
              </div>
              <div class="myProject-main">
                <div v-for="(item,index) in MyMenu" class="myProject-item" :class="[{'myProject-item-bot': index === 3}]">
                  <div class="menu-item-box" :class="item.class">
                    <img :src="item.img">
                  </div>
                  <span>{{item.title}}</span>
                </div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
      <transition :name="cover">
        <router-view class="cover-transition" :AI="AIlist"></router-view>
      </transition>
    </div>
</template>

<script>

import VmHeader from 'base/header/header'
import AIList from 'base/AI-list/AI-list'
import Scroll from 'base/scroll/scroll'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'
import {MyMenu,projectMenu} from 'assets/js/project-menu'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Bus from 'common/js/bus'

export default {
  data () {
    return {
       AIlist: [],
       MyMenu,
       projectMenu,
       projectName: '',
       name,
       decline: false,
       cover: "cover-right",
       swiperOption: {
          autoplay: false,
          pagination: {
            el: '.swiper-pagination'
          },
       }
    }
  },
  components: {
    VmHeader,
    Scroll,
    swiper,
    swiperSlide,
    AIList
  },
  methods: {
    async getData() {
        api.getAI({uid: this.uid,unit_id: this.unitId,utype: this.utype,token: this.token,type_id : "1"}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.AIlist = resp.response.list
          }
        });
    },
    vmMore () {
      this.$router.push({
        path: '/index/${projectDetails.project_id}/AI'
      })
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'unitId',
        'utype',
        'projectDetails'
    ]),
    filterAI: function () {
     return this.AIlist.slice(0,2)
    },
    pages: function () {
        const pages = []
        this.projectMenu.forEach((item, index) => {
          const page = Math.floor(index / 8)
          if (!pages[page]) {
            pages[page] = []
          }
          pages[page].push(item)
        })
        return pages
    },
    
  },
  created(){
    this.getData();
    this.projectName =  this.projectDetails.project_name
    Bus.$on('getName', (name) => {
      this.projectName = name
    })
  },
  watch: {
    '$route': 'getData',
    $route(to, from, next) {
        //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.name == 'scenePicture') {
           to.query.name = '照片'
        }
        if(to.name == 'visaManagement') {
           to.query.name = '签证管理'
        }
        if(to.name == 'pendApproval') {
           to.query.name = '待我审批'
        }
        if(to.meta.index > 1){
            if( to.meta.index < from.meta.index){
                this.decline = false
            }else{
                this.decline = true
            }
            if(to.meta.index == 3 && from.meta.index == 4){
                this.decline = true
            }
        }

    }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.home-box {
  .home-menu {
    padding: 0 .15rem;
    overflow: hidden;
    border-bottom: .1rem solid $color-e;
    .swiper-container {
      padding: .15rem 0;
    }
    .menu-item {
       display: flex;
       flex-direction: column;
       align-items: center;
       width: 14.25%;
       margin-right: 14.2%;
       margin-bottom: .1rem;
       font-size: $font-size-small;
       .menu-item-box {
          display: flex;
          color: $color-white;
          align-items: center;
          justify-content: center;
          width: .5rem;
          height: .5rem;
          background: $color-dark-blue;
          border-radius: .08rem;
          margin-bottom: .05rem;
          img {
           width: .24rem;
           height: .24rem;
          }
       }
    }
    .menu-item:nth-child(4n) {
        margin-right: 0;
    }
  }
  .home-AI,.home-my {
    position: relative;
    background: $color-white;
    border-bottom: .1rem solid $color-e;
    .AI-head {
      display: flex;
      height: .4rem;
      line-height: .4rem;
      padding: 0 .15rem;
      position: relative;
      justify-content: space-between;
      h3 {
        color: #000;
      }
      .AI-more {
        display: flex;
        color: #666;
        align-items: center;
      }
    }
  }
  .home-my {
    border-bottom: 0;
    .myProject {
      background: $color-white;
      .myProject-head {
        margin-top: .1rem;
        padding: 0 .15rem;
        height: .4rem;
        line-height: .4rem;
        position: relative;
      }
    }
  }
}

.myProject-main {
  position: relative;
  display: flex;
  padding: .12rem .15rem .02rem;
  .myProject-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 14.25%;
    margin-right: 14.2%;
    margin-bottom: .1rem;
    font-size: 0.12rem;
    .menu-item-box {
      display: flex;
      color: #fff;
      align-items: center;
      justify-content: center;
      width: .5rem;
      height: .5rem;
      border-radius: .08rem;
      margin-bottom: .05rem;
      img {
            width: .24rem;
            height: .24rem;
      }
    }
  }
  .myProject-item-bot {
    margin-right: 0;
  }
}

</style>