<template>
  <div class="model main-fill">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='$route.query.name'></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
       <Scroll ref="scroll" class="vm-scroll" :data="planList" :pullup="pullup"  @scrollToEnd="loadMore">
         <div>
            <list-two 
              :listData="planList"
              v-on:collect ="listenCollect"
              v-on:edit = "listenEdit"
              v-on:deleteData = "listenDeleteData"
              :loadeData="loadingEndData"
              :loadeImg="loadingImg">
            </list-two>
         </div>
       </Scroll>
       <div v-show="!planList.length" class="loading-container">
          <loading></loading>
       </div>
    </div>
    <edit-list :editData="editData"
               :planType="planType"
               v-if="editToggle" 
               v-on:shutDown="listenShutDown"
               v-on:getEditData="listenGetEditData">
    </edit-list>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import editList from 'base/edit-list/edit-list'
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
      loadingEndData: false,
      loadingImg: false,
      editToggle: false,
      planList: [],
      planType: [],
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll,
    Loading,
    editList,
    listTwo
  },
  methods: {
    async getData() {
        api.getPlanList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.planList = resp.response.list
            console.log(this.planList)
          }
        });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let modreData = await api.getPlanList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
              }else {
                return false
              }
        });
        this.planList  = [...this.planList, ...modreData];
        if(modreData.length < 9) {
           return false
        }
        this.loadingImg = false
        this.loadingEndData = true
    },
    listenCollect (data) {
      api.getCollectPlan({project_id: this.projectDetails.project_id,token: this.token,unit_id: this.unitId,uid: this.uid,plan_id: data.plan_id}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
             this.$message({
                message: '收藏成功',
                type: 'success'
             });
          }else{
             this.$message.error('收藏失败');
          }
      });
    },
    listenEdit (data,index) {
      console.log(6666)
      this.editData = data
      this.editToggle = true
      this.key = index
      api.getPlanTypeList({project_id: this.projectDetails.project_id,token: this.token,unit_id: this.unitId}).then(resp => {
          var resp = eval(resp)
          console.log(resp)
           if (resp.resp_code === SUCCESS_OK) {
                this.planType = resp.response
  
              }else {
                return false
            }
      });
    },
    listenGetEditData (editAll) {
      api.getUpdatePlan({type_id: editAll.type,recommend: this.editData.recommend,nickname: this.editData.nickname,intro: editAll.intro,title: editAll.name,project_id: this.projectDetails.project_id,token: this.token,uid: this.uid,plan_id: this.editData.plan_id}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
             this.$message({
                message: '编辑成功',
                type: 'success'
             });
            let timestamp = Math.round(new Date().getTime()/1000).toString();
            this.editData.title = editAll.name
            this.editData.update_time = timestamp
            this.editToggle = false
          }else{
             this.$message.error('编辑失败');
          }
      });

    },
    listenShutDown () {
      this.editToggle = false
    },
    listenDeleteData (item,index) {
      api.getDeletePlan({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,uid: this.uid,plan_id: item.plan_id}).then(resp => {
          var resp = eval(resp)
          console.log(resp)
          if (resp.resp_code === SUCCESS_OK) {
             this.$message({
                message: '删除成功',
                type: 'success'
             });
             this.planList.splice(index,1);
          }else{
             this.$message.error('删除失败');
          }    
      })
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'unitId',
        'uid',
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