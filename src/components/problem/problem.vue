<template>
  <div class="model main-fill">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='$route.query.name'></span>
        </p>
        <p slot='right'>
          <span class="right icon add" @click="add()" v-text="addName"></span>
          <span class="right icon search" v-text="searchName"></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
       <Scroll ref="scroll" class="vm-scroll" :data="problemList" :pullup="pullup"  @scrollToEnd="loadMore">
         <div>
            <list-three :listData="problemList" :loadeData="loadingEndData" :loadeImg="loadingImg"></list-three>
         </div>
       </Scroll>
       <div v-show="!problemList.length" class="loading-container">
          <loading></loading>
       </div>
    </div>
    <add-problem v-show="toggle" v-on:closeAdd = "listenClose"></add-problem>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import VmHeader from 'base/header/header'
import listThree from 'base/component-list/list-three'
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import addProblem from './addProblem'
import {SUCCESS_OK} from '../../api/config'

export default {
  data () {
    return {
      decline: false,
      pullup: true,
      loadingEndData: false,
      loadingImg: false,
      toggle: false,
      problemList: [],
      searchName: '搜索',
      addName: '添加',
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll,
    Loading,
    addProblem,
    listThree
  },
  methods: {
    async getData() {
        api.getProblemList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.problemList = resp.response.list
            console.log(this.problemList)
          }
        });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let modreData = await api.getProblemList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
              }else {
                return false
              }
        });
        this.problemList  = [...this.problemList, ...modreData];
        if(modreData.length < 9) {
           return false
        }
        this.loadingImg = false
        this.loadingEndData = true
    },
    add () {
      this.toggle = true
    },
    listenClose () {
      this.toggle = false
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'unitId',
        'projectDetails'
    ]),
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
@import "~common/css/variable"



</style>