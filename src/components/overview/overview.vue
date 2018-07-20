<template>
  <div class="overview main-fill">
     <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content" :class="{'_effect--30':decline}">
      <div class="overview-menu vm-pd-15" ref="tab">
          <ul class="tab-content" ref="tabWrapper">
            <li class="itemList tab-item" v-for="item in overviewMenu" ref="tabitem">
              <router-link tag="div"  :to="{name: item.url}">
                <span>{{item.title}}</span>
              </router-link>
            </li>
          </ul>
      </div>
      <div class="overview-info">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import VmHeader from 'base/header/header'
import {overviewMenu} from 'assets/js/project-menu'

export default {
  data () {
    return {
      title: "概况",
      decline: false,
      overviewMenu
    }
  },
  props: {
  
  },
  components: {
    VmHeader,
    BScroll
  },
  created(){
    this.$nextTick(() => {
      this.InitTabScroll();
    });
  },
  methods: {
    InitTabScroll() {
      let width = 0
      for (let i = 0; i < this.overviewMenu.length; i++) {
        width+=this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
      }
      this.$refs.tabWrapper.style.width=width+'px'
      this.$nextTick(()=>{
         if (!this.scroll) {
          this.scroll=new BScroll(this.$refs.tab, {
           startX:0,
           click:true,
           scrollX:true,
           eventPassthrough:'vertical'
          });
         }else{
          this.scroll.refresh()
         }
      });
    }
  },
  computed: {
    
  },
  
  watch: {

  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.overview-menu {
  display: inline-block;
  width: 100%;
  height: .4rem;
  overflow: hidden;
  box-shadow: 0px -1px 1px #ccc inset;
  .tab-content {
    height: .4rem;
    line-height: .4rem;
    position: relative;
    display: flex;
    .tab-item {
      flex: 0 0 .9rem;
      width: .9rem;
    }
  }
  .vm-scroll-x::-webkit-scrollbar {
     display: none;
  }
}
.overview-menu::after {
  content: '';
  display: inline-block;
  height: .37rem;
  width: .25rem;
  background-image: linear-gradient(left,rgba(255,255,255,0.1)1%,rgba(255,255,255,1)100%);
  position: absolute;
  right: -1px;
  top: .45rem;
}
.overview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: .44rem;
  background: $color-white;
  overflow: hidden;
  z-index: 10;
  .overview-info {
    position: absolute;
    top: .84rem;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .router-link-active {
    border-bottom: 2px solid #ff9627;
    span {
      color: #000;
      font-size: $font-size-medium-x;
      font-weight: 700;
    }
  }
}

</style>