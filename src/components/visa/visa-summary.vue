<template>
  <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
     <Scroll ref="scroll" class="vm-scroll" :data="visaSummaryList" :pullup="pullup"  @scrollToEnd="loadMore">
       <div>
          <list-two :listData="visaSummaryList" :loadeData="loadingEndData" :loadeImg="loadingImg"></list-two>
       </div>
     </Scroll>
     <div v-show="!visaSummaryList.length" class="loading-container">
        <loading></loading>
     </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import VmHeader from 'base/header/header'
import listTwo from 'base/component-list/list-two'
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'

export default {
  data () {
    return {
      decline: false,
      pullup: true,
      cover: "cover-right",
      loadingEndData: false,
      loadingImg: false,
      visaSummaryList: [],
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll,
    Loading,
    listTwo
  },
  methods: {
    async getData() {
        api.getVisaSummaryList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.visaSummaryList = resp.response.list
            console.log(this.visaSummaryList)
          }
        });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let modreData = await api.getVisaSummaryList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
              }else {
                return false
              }
        });
        this.visaSummaryList  = [...this.visaSummaryList, ...modreData];
        if(modreData.length < 9) {
           return false
        }
        this.loadingImg = false
        this.loadingEndData = true
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