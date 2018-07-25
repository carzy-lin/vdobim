<template>
  <div class="model main">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
      <div class="my-news">
        <scroll ref="scroll" class="vm-scroll" :pullup="pullup"  @scrollToEnd="loadMore" :data="myMessage">
          <div>
            <div class="item-list frame-1px frame-top-1px" v-for="item in myMessage">
              <div class="item-name">
                <div class="item-time">
                  <img :src="item.portrait">
                  <span class="item-username">{{item.from_user_name}}</span>
                  <span>{{item.last_time | formatDate}}</span>
                </div>
                <div class="item-state">
                  <span v-if="item.isnew == 0"  class="blue">已读</span>
                  <span else class="color-9">未读</span>
                </div>
              </div>
              <div class="item-title">
                <h3 class="text-execeeded">{{item.title}}</h3>
              </div>
              <div class="item-content">
                <p class="text-execeeded-5">{{item.content}}</p>
              </div>
              <div class="item-operation">
                <div class="item-more">
                  <span class="color-blue vm-have-read-a">标记已读</span>
                  <span class="delete vm-cancel-delete">删除</span>
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
import {mapGetters,mapMutations} from 'vuex'
import {formatDate} from 'common/js/timestamps';
import VmHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'

export default {
  data () {
    return {
      title: '我的消息',
      decline: false,
      myMessage: [],
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
        api.getMyMessage({uid: this.uid,unit_id: this.unitId,token: this.token,page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.myMessage = resp.response.list
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
@import "~common/css/variable"

</style>