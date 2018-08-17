<template>
  <div class="model main-fill">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='$route.query.name'></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
       <Scroll ref="scroll" class="vm-scroll" :data="modelList" :pullup="pullup"  @scrollToEnd="loadMore">
         <div>
            <list-one 
              v-on:collect ="listenCollect"
              v-on:edit = "listenEdit"
              :listData="modelList"
              :loadeData="loadingEndData"
              :loadeImg="loadingImg">
              <template slot="modelImge" slot-scope="variable">
                <div class="item-left">
                  <img v-lazy="variable.item.pic_url">
                </div>
              </template>
            </list-one>
         </div>
       </Scroll>
       <div v-show="!modelList.length" class="loading-container">
          <loading></loading>
       </div>
    </div>
    <edit-list :editData="editData" v-if="editToggle" v-on:shutDown="listenShutDown" v-on:getEditData="listenGetEditData"></edit-list>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import VmHeader from 'base/header/header'
import editList from 'base/edit-list/edit-list'
import listOne from 'base/component-list/list-one'
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'
import weixin from "assets/js/wechat"
import Bus from 'common/js/bus'



export default {
  data () {
    return {
      decline: false,
      pullup: true,
      loadingEndData: false,
      loadingImg: false,
      modelList: [],
      config:[],
      editToggle: false,
      editData: [],
      key: '',
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll,
    Loading,
    listOne,
    editList
  },
  methods: {
    async getData() {
        api.getModelList({project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.modelList = resp.response.list
            console.log(this.modelList)
          }
        });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let modreData = await api.getModelList({project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
                console.log(resp.response.list)
              }else {
                return false
              }
        });
        this.modelList  = [...this.modelList, ...modreData];
        if(modreData.length < 9) {
           return false
        }
        this.loadingImg = false
        this.loadingEndData = true
    },
    listenCollect (data) {
      api.getCollectModule({project_id: this.projectDetails.project_id,token: this.token,uid: this.uid,unit_id: this.unitId,mould_id: data.mould_id}).then(resp => {
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
      //console.log(3,data)
      //console.log(4,index)
      this.editData = data
      this.editToggle = true
      this.key = index
    },
    getNowFormatDate () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    },
    listenGetEditData (editAll) {
      console.log(789,editAll.name)
      api.getUpdateMould({intro: editAll.intro,mould_name: editAll.name,project_id: this.projectDetails.project_id,token: this.token,uid: this.uid,mould_id: this.editData.mould_id}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
             this.$message({
                message: '编辑成功',
                type: 'success'
             });
            this.editData.mould_name = editAll.name
            this.editToggle = false
          }else{
             this.$message.error('编辑失败');
          }
      });

    },
    listenShutDown () {
      this.editToggle = false
    },
    initWxChat: function() {
      let url = window.localStorage.getItem("LocalUrl")||window.location.href;
      let param = {
        title: "邀请有礼",
        desc: "欢迎您参加邀请有礼",
        link: window.location.href,
        imgUrl: this.headPortrait,
        localUrl: url
      };
      weixin.wxChat(this, param);
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
@import "~common/css/variable"
  

</style>