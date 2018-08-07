<template>

    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
       <Scroll ref="scroll" class="vm-scroll" :data="pictureList" :pullup="pullup"  @scrollToEnd="loadMore">
         <div>
            <list-one  :listData="pictureList" :loadeData="loadingEndData" :loadeImg="loadingImg">
              <template slot="modelImge" slot-scope="variable">
                <div class="item-left">
                  <img v-lazy="variable.item.pic_url">
                </div>
              </template>
            </list-one>
         </div>
       </Scroll>
       <div v-show="!pictureList.length" class="loading-container">
          <loading></loading>
       </div>
    </div>
    
</template>

<script>
import Loading from 'base/loading/loading'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import VmHeader from 'base/header/header'
import listOne from 'base/component-list/list-one'
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
      pictureList: [],
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll,
    Loading,
    listOne
  },
  methods: {
    async getData() {
        api.getPictureList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.pictureList = resp.response.list
            console.log(this.pictureList)
          }
        });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let modreData = await api.getPictureList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
              }else {
                return false
              }
        });
        this.pictureList  = [...this.pictureList, ...modreData];
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


</style>