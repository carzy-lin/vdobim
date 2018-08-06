<template>
  <div class="component-list-three">
    <div class="item-list frame-1px frame-top-1px" v-for="(item,index) in listData">
      <div class="click_details">
        <div class="item-name">
          <div class="item-time">
            <img src="http://192.168.0.193/Uploads/1/portrait/2018-08-02/1533176771.png">
            <span class="item-username">OO</span>
            <span>2018-08-02 10:58</span>
          </div>
          <div class="item-state">
            <span>正在处理</span>
          </div>
        </div>
        <div class="item-title">
          <h3 class="text-execeeded">ts</h3>
        </div>
        <div class="item-content">
          <p class="text-dh"></p>
        </div>
        <div class="item-img">
          <img src="http://192.168.0.193/Uploads/1/Picture/2018-06-06/B1528274448.jpg">
        </div>
      </div>
      <div class="item-operation">
        <div class="item-details">
          <span>浏览：31</span>
          <span>收藏：1</span>
          <span>回复：1</span>
        </div>
        <div class="more more-position">
          <span class="icon more-icon icon-dot" @click.stop="more(index)">...</span>
          <div id="toggle" class="operating none-img" v-show="activeIndex===index">
            <ul>
              <li class="click_openModel">查看</li>
              <li class="click_collect">收藏</li>
              <li class="click_share">分享</li>
              <li class="click_edit">编辑</li>
              <li class="click_delete">删除</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <loading-end :loadingEndData="loadeData" :loadingImg="loadeImg"></loading-end>
  </div>
</template>

<script>
import loadingEnd from 'base/loading-end/loading-end'
import Scroll from 'base/scroll/scroll'
import {formatDate} from 'common/js/timestamps';

export default {
  props: {
    listData: {
      type: Array,
    },
    loadeData: {
      type: Boolean
    },
    loadeImg: {
      type: Boolean
    }
  },
  components: {
    Scroll,
    loadingEnd
  },
  data () {
    return {
      decline: false,
      activeIndex: -1,
      loadingEndData: false,
      loadingImg: false,
    }
  },
  filters: {
    formatDate(time) {
        var date = new  Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods: {
    more (index) {
      this.activeIndex = index;
    }
  },
  created(){
    let body = document.querySelector('body')
        body.addEventListener('click',(e)=>{        
          if(this.activeIndex != -1){
            this.activeIndex = -1
          }
        })
  },
  watch: {
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.component-list-three {
  position: relative;
  padding-bottom: .3rem;
  .item-list {
    position: relative;
    background: #fff;
    padding: .15rem;
    border-bottom: .1rem solid #eee;
    .item-name {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
         -moz-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-align: center;
      -webkit-align-items: center;
         -moz-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      margin-bottom: .15rem;
      .item-state {
        span {
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          width: .6rem;
          padding: .06rem 0;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
             -moz-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
          -webkit-align-items: center;
             -moz-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          border: 1px solid $color-green;
          font-size: $font-size-small-s;
          -moz-border-radius: .05rem;
               border-radius: .05rem;
          color: $color-green;
        }
        .color-9 {
          border: 1px solid $color-9;
          color: $color-9;
        }
        .color-orange {
          border: 1px solid #FF9000;
          color: #FF9000;
        }
        .blue {
          border: 1px solid $color-dark-blue;
          color: $color-dark-blue;
        }
        .red {
          border: 1px solid $color-light-red;
          color: $color-light-red;
        }
      }
      .item-time {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
           -moz-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        img {
          width: .3rem;
          height: .3rem;
          -moz-border-radius: 50%;
               border-radius: 50%;

        }
        span {
          color: $color-9;
          font-size: $font-size-small;
        }
        .item-username {
          padding: 0 .1rem;
        }
      }
    }
    .item-title {
      padding-bottom: .15rem;
      h3 {
        font-size: $font-size-medium-x;
        font-weight: 600;
        line-height: .2rem;
        color: #000;
      }
    }
    .item-content {
      padding-bottom: .15rem;
      overflow: hidden;
      p {
        line-height: .2rem;
        color: $color-6;
      }
    }
    .item-img {
       position: relative;
       width: 100%;
       height: 2rem;
       margin-bottom: .15rem;
       overflow: hidden;
       img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate3d(-50%, -50%, 0);
          -moz-transform: translate3d(-50%, -50%, 0);
          -ms-transform: translate3d(-50%, -50%, 0);
          transform: translate3d(-50%, -50%, 0);
       }
    }
    .item-operation {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
         -moz-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      font-size: $font-size-small;
      .item-more {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
           -moz-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        text-align: right;
      }
      .more {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
           -moz-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
           -moz-box-pack: end;
            -ms-flex-pack: end;
                justify-content: flex-end;
        -webkit-box-align: center;
        -webkit-align-items: center;
           -moz-box-align: center;
            -ms-flex-align: center;
                align-items: center;
      }
      .more,.item-more {
        color: $color-9;
        span {
          padding: 0 .05rem;
        }
        .delete {
          color: $color-light-red;
        }
        .blue {
          color: $color-dark-blue;
        }
      }
      .item-details {
        span {
          color: $color-9;
        }
        span:nth-child(2) {
          padding: 0 .1rem;
        }
      }
    }
  }
  .item-list:last-child {
    margin-bottom: 0;
  }
  .frame-top-1px:first-child::before {
     border-top: 0px solid $color-c;
  }
} 

</style>