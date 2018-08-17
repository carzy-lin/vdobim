<template>
  <div class="main main-fill">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
       <Scroll ref="scroll" class="vm-scroll" :data="collectionList" :pullup="pullup"  @scrollToEnd="loadMore">
         <div class="collection">
             <div class="item frame-1px" v-for="(item,index) in collectionList" :key="index">
               <slide-operation v-on:canceCollect="deleteCollect" :index="index" :cancelId="item">
                 <div class="title">
                   <h3 class="text-execeeded">{{item.relevant_name}}</h3>
                 </div>
                 <div class="item-content">
                   <div class="item-left">
                     <label>类型：</label>
                     <span>{{item.collect_typename}}</span>
                   </div>
                   <div class="item-right">
                    <label>修改时间：</label>
                    <span>{{item.collect_time | formatDate}}</span>
                   </div>
                 </div>
               </slide-operation>
             </div>
             <loading-end :loadingEndData="loadingEndData" :loadingImg="loadingImg"></loading-end>
         </div>
       </Scroll>
       <div v-show="!collectionList.length" class="loading-container">
          <loading></loading>
       </div>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import VmHeader from 'base/header/header'
import loadingEnd from 'base/loading-end/loading-end'
import {formatDate} from 'common/js/timestamps';
import slideOperation from "base/slide-operation/slide-operation"
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'

export default {
  data () {
    return {
      decline: false,
      pullup: true,
      loadingEndData: false,
      loadingImg: false,
      collectionList: [],
      title: '我的收藏',
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll,
    Loading,
    loadingEnd,
    slideOperation
  },
  filters: {
    formatDate(time) {
        var date = new  Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods: {
    async getData() {
        api.getCollection({uid: this.uid,unit_id: this.unitId,token: this.token,size: '10',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.collectionList = resp.response.list
            console.log(11,this.collectionList)
          }
        });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return false
        }
        if (this.collectionList.length >= 9 ) {
          this.loadingImg = true
          this.page += 1;
          let modreData = await api.getCollection({uid: this.uid,unit_id: this.unitId,size: '8',token: this.token,page: this.page}).then(resp => {
                var resp = eval(resp)
                if (resp.resp_code === SUCCESS_OK) {
                  return  resp.response.list
                }else {
                  return false
                }
          });
        
          this.collectionList  = [...this.collectionList, ...modreData];
          if(modreData.length < 9) {
             return false
          }
          this.loadingImg = false
          this.loadingEndData = true
        }
        
    },
    deleteCollect (index) {
      console.log(6666666,index)
      this.collectionList.splice(index,1);
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
@import "~common/css/variable";
  
.collection {
  padding-bottom: .3rem;
  .item {
    position: relative;
    padding:  0 .15rem;
    .title {
      display: flex;
      padding-bottom: .1rem;
      font-size: $font-size-medium-x;
    }
    .item-content {
      display: flex;
      color: $color-6;
      justify-content: space-between;
    }
  }
}

</style>