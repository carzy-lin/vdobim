<template>
  <div class="model main">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='this.title'></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
      <div class="my-problem">
        <scroll ref="scroll" class="vm-scroll" :pullup="pullup"  @scrollToEnd="loadMore" :data="myProblem">
          <div class="item-box">
              <div class="item-list frame-1px" v-for="item in myProblem">
                <div class="item-name">
                  <div class="item-time">
                    <img :src="item.portrait">
                    <span class="item-username">{{item.nickname}}</span>
                    <span>{{item.add_time | formatDate}}</span>
                  </div>
                  <div class="item-state">
                    <span v-if="item.status == 0">正在处理</span>
                    <span v-if="item.status == 1" class="red">处理完成</span>
                    <span v-if="item.status == 2" class="blue">问题关闭</span>
                  </div>
                </div>
                <div class="item-title">
                  <h3 class="text-execeeded">{{item.question_name}}</h3>
                </div>
                <div class="item-content">
                  <p class="text-execeeded-2">{{item.content}}</p>
                </div>
                <div v-if="item.pic_url" class="item-img">
                  <img :src="item.pic_url">
                </div>
                <div class="item-operation">
                  <div class="item-details">
                    <span>浏览：{{item.brow_count}}</span>
                    <span>收藏：{{item.collect_count}}</span>
                    <span>回复：{{item.answer_count}}</span>
                  </div>
                </div>
              </div>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {formatDate} from 'common/js/timestamps';
import VmHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'

export default {
  data () {
    return {
      title: '我的问题',
      decline: false,
      myProblem: [],
      pullup: true,
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll
  },
  methods: {
    async getData() {
        api.getMyProblem({uid: this.uid,unit_id: this.unitId,token: this.token,page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.myProblem = resp.response.list
          }
        });
    },
    async loadMore() {

    }
  },
  filters: {
    formatDate(time) {
        var date = new  Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd');
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'unitId',
        'utype'
    ])
  },
  created(){
    this.getData()
  },
  watch: {
    $route(to, from) {

    }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";



</style>