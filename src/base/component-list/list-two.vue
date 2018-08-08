<template>
  <div class="component-list-two">
    <div class="item frame-1px" v-for="(item,index) in listData">
      <div class="item-name">
        <span class="icon"></span>
        <span v-if="item.title" class="name text-execeeded">{{item.title}}</span>
        <span v-if="item.agreement_name && !item.visa_name" class="name text-execeeded 11">{{item.agreement_name}}</span>
        <span v-if="item.visa_name" class="name text-execeeded">{{item.visa_name}}</span>
        <span v-if="item.approval_name" class="name text-execeeded">{{item.approval_name}}</span>
        <span v-if="item.payplan_name" class="name text-execeeded">{{item.payplan_name}}</span>
        <span v-if="item.summary_name" class="name text-execeeded">{{item.summary_name}}</span>
      </div>
      <div class="item-bottom">
        <div class="item-author">
          <span class="item-author">发布：{{item.nickname}}</span>
          <span>修改时间：{{item.update_time | formatDate}}</span>
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
      this.activeIndex != index ? this.activeIndex = index : this.activeIndex = -1
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

.component-list-two {
  position: relative;
  padding-bottom: .3rem;
  .item {
     position: relative;
     padding: .15rem;
     .item-right {
       .item-author {
         padding-bottom: .1rem;
         .size {
           padding-right: .15rem;
         }
       }
     }
     .item-name {
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
       padding-bottom: .13rem;
       .icon {
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
         -webkit-box-pack: center;
         -webkit-justify-content: center;
            -moz-box-pack: center;
             -ms-flex-pack: center;
                 justify-content: center;
       }
       .name {
         display: inline-block;
         color: #000;
         font-size: $font-size-medium-x;
         padding-right: .15rem;
         -webkit-box-flex: 1;
         -webkit-flex: 1;
            -moz-box-flex: 1;
             -ms-flex: 1;
                 flex: 1;
       }
     }
     .item-bottom {
        display:-webkit-box;
        display:-webkit-flex;
        display:-moz-box;
        display:-ms-flexbox;
        display:flex;
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
        color: #666;
        .item-info {
          .item-author {
            padding-right: .15rem;
          }
        }
        .item-author {
          .item-author {
            padding-right: .15rem;
          }
        }
     }
  }
}

</style>