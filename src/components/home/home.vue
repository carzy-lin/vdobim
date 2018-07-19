<template>
    <div class="home main">
      <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='projectDetails.project_name'></span>
        </p>
      </vm-header>
      <div class="main-44 _effect _cover-content" :class="{'_effect--30':decline}">
        <scroll ref="scroll" class="vm-scroll" :data="filterAI">
          <div class="home-box">
            <div class="home-menu">
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{name:'information',query:{title: '概况'}}">
                  <img src="./vm-home-1.png">
                </router-link>
                <span>概况</span>
              </div>
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{name:'model-list',query:{title: '模型'}}">
                  <img src="./vm-home-2.png">
                </router-link>
                <span>模型</span>
              </div>
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{path:'/index/${projectDetails.project_id}/information'}">
                  <img src="./vm-home-3.png"> </router-link>
                <span>计划</span>
              </div>
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{path:'/index/${projectDetails.project_id}/information'}">
                  <img src="./vm-home-4.png">
                </router-link>
                <span>问题</span>
              </div>
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{path:'/index/${projectDetails.project_id}/information'}">
                  <img src="./vm-home-5.png">
                </router-link>
                <span>图纸</span>
              </div>
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{path:'/index/${projectDetails.project_id}/information'}">
                  <img src="./vm-home-6.png">
                </router-link>
                <span>文档</span>
              </div>
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{path:'/index/${projectDetails.project_id}/information'}">
                  <img src="./vm-home-7.png">
                </router-link>
                <span>现场</span>
              </div>
              <div class="menu-item fl">
                <router-link  tag="div" class="tab-item menu-item-box" :to="{path:'/index/${projectDetails.project_id}/information'}">
                  <img src="./vm-home-11.png">
                </router-link>
                <span>更多</span>
              </div>
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
import {MyMenu} from 'assets/js/project-menu'

export default {
  data () {
    return {
       AIlist: [],
       MyMenu,
       name,
       decline: false,
       cover: "cover-right"
    }
  },
  components: {
    VmHeader,
    Scroll,
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
    }
  },
  created(){
    this.getData();
  },
  watch: {
    '$route': 'getData',
    $route(to, from, next) {
        //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > 1){
            if( to.meta.index < from.meta.index){
                this.transitionName = 'cover-right';
                this.decline = false
            }else{
                this.transitionName = 'cover-left';
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
    padding: .15rem;
    overflow: hidden;
    border-bottom: .1rem solid $color-e;
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