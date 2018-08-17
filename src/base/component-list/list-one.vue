<template>
  <div class="component-list">
      <div  class="item frame-1px" v-for="(item,index) in listData" :key="index">
        <slot  name="modelImge" :item="item">
        </slot>
        <div class="item-right">
          <div class="item-name text-execeeded" v-if="item.mould_name">
            <span class="text-execeeded">{{item.mould_name}}</span>
          </div>
          <div class="item-name text-execeeded" v-if="item.drawing_name">
            <span class="text-execeeded">{{item.drawing_name}}</span>
          </div>
          <div class="item-name text-execeeded" v-if="item.document_name">
            <span class="text-execeeded">{{item.document_name}}</span>
          </div>
          <div class="item-name text-execeeded" v-if="item.title">
            <span class="text-execeeded">{{item.title}}</span>
          </div>
          <div class="item-author">
            <span class="size">大小：{{item.real_size}}</span>
            <span>发布：{{item.nickname}}</span>
          </div>
          <div class="item-time">
            <span>修改时间：{{item.update_time | formatDate}}</span>
          </div>
        </div>
        <div class="more more-position">
          <span class="icon more-icon icon-dot" @click.stop="more(index)">...</span>
          <div id="toggle" class="operating" v-show="activeIndex===index">
            <ul>
              <li class="click_openModel">查看</li>
              <li @click="collect(item)" class="click_collect">收藏</li>
              <li @click="shareLog = true" class="click_share">分享</li>
              <li @click="edit(item,index)" class="click_edit">编辑</li>
              <li class="click_delete">删除</li>
            </ul>
          </div>
        </div>
      </div>
      <el-dialog
        title="分享"
        :visible.sync="shareLog"
        width="80%"
        append-to-body
        center>
        <div class="share-box">
          <a>微信</a>
          <a>qq</a>
        </div>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    <loading-end :loadingEndData="loadeData" :loadingImg="loadeImg"></loading-end>
  </div>

</template>

<script>
import loadingEnd from 'base/loading-end/loading-end'
import Scroll from 'base/scroll/scroll'
import {formatDate} from 'common/js/timestamps';
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'
import Bus from 'common/js/bus'

export default {
  props: {
    listData: {

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
      shareLog: false,
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
    },
    collect (item) {
      this.$emit('collect',item)
    },
    edit (item,index) {
      //console.log(99,this.listData)
      //console.log(33,item)
      this.$emit('edit',item,index)
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

.share-box {
  display: flex;
  justify-content: center;
  a {
    display: inline-block;
    padding: 0 .1rem;
  }
}

</style>