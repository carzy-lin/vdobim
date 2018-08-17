<template>
  <div class="mine main">
    <div class="_effect" :class="{'_effect--30':decline}">
      <el-row class="vm-mine-head">
        <el-col  class="vm-head-box"  :span="24">
          <h3 v-text="title"></h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="vm-top" :span="24">
          <el-col @click.native="path()" class="vm-mine-username"  :span="24">
            <div class="vm-mine-specific">
              <img :src="portrait">
              <span>{{nickname}}</span>
            </div>
            <span class="icon-return-white vm-rotate"></span>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="vm-mine-item">
          <router-link class="vm-item-list frame-1px" v-for="(item,index) in menu" :key="index" :to="item.url">
              <div class="vm-item-name">
                <span class="vm-item-icon" :class="item.icon"></span>
                <span>{{item.title}}</span>
            </div>
            <span class="icon-return-white vm-rotate"></span>
          </router-link>
        </el-col>
        <el-col :span="24">
          <router-link class="vm-quit" to="/quit">退出当前账号</router-link>
        </el-col>
      </el-row>
    </div>
    <transition :name="cover">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import {mineMenu} from 'assets/js/menu'
import VmHeader from 'base/header/header'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'
import Bus from 'common/js/bus'

export default {
  data () {
    return {
      title: '我的',
      decline: false,
      menu: mineMenu,
      getUser: {},
      cover: "cover-right",
      nickname: '',
      portrait: ''
    }
  },
  components: {
    VmHeader,
    Bus
  },
  methods: {
    path() {
      var _this = this;
      _this.$router.push({path: '/mine/user-info'})
    },
    getData() {
         this.getUser = JSON.parse(sessionStorage.getItem('getUser'));
         this.nickname = this.getUser.nickname
         this.portrait= this.getUser.portrait
    },
    ...mapMutations({
        setMessage: 'GET_USER_MESSAGE'
    })
  },
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'unitId',
    ])
  },
  
  mounted(){
    this.getData()
    Bus.$on('msg', () => {
　　　 this.getUser = JSON.parse(sessionStorage.getItem('getUser'));
       this.nickname = this.getUser.nickname
       this.portrait= this.getUser.portrait
    })
  },
  watch: {
    $route(to, from) {
        //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > 0){
            if( to.meta.index < from.meta.index || to.meta.index == from.meta.index){
                this.decline = false
            }else{
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
.vm-mine-head {
    height: $height-44;
    position: fixed;
    display: flex;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    color: $color-white;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
    }
    .vm-head-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: $pd-lf;
      flex-direction: row;
      justify-content: center;
      .vm-return {
        position: absolute;
        left: .15rem;
        top: .12rem;
        font-size: $font-size-large-x;
      }
      h3 {
        font-weight: 700;
        font-size: $font-size-large;
      }
    }
  }
  .vm-top {
    padding-top: $height-44;
    background: #5e5d5e;
  }
  .vm-mine-username {
     display: flex;
     height: 1.24rem;
     padding: $pd-lf;
     justify-content: space-between;
     align-items:center;
     color: $color-white;
     .vm-mine-specific {
       img,span{
         vertical-align: middle;
       }
       img {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .10rem;
       }
     }
     .vm-return:before {
        font-size: $font-size-large;
     }
     .vm-rotate {
        transform: rotate(180deg);
     }
  }
  .vm-mine-item {
    background: $color-white;
  }
  .vm-item-list {
    display: flex;
    position: relative;
    height: .45rem;
    justify-content: space-between;
    align-items: center;
    padding: $pd-lf;
    .icon-return-white:before {
      color: $color-light-blue;
    }
    .vm-rotate {
        transform: rotate(180deg);
    }
    .vm-item-name {
      display: flex;
      position: relative;
      flex: 1;
      height: 100%;
      align-items: center;
      color: $color-black;
      font-size: $font-size-medium-x;
      .vm-item-icon {
        margin-right: .1rem;
      }
      .vm-item-icon:before {
        font-size: $font-size-large-x;
        @extend  .icon-return-white:before;
      }
    }
  }
  .vm-quit {
    @extend .vm-item-list,.vm-mine-item;
    margin-top: .15rem;
    font-size: $font-size-medium-x;
    justify-content: center;
    color: $color-red;
  }
</style>