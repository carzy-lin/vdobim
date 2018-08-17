<template>
  <div class="model main-fill">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='$route.query.name'></span>
        </p>
        <span slot="right" @click="submitData" class="right icon" v-text="submit"></span>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
      <scroll ref="scroll" class="vm-scroll">
        <div class="seting-box">
           <div class="show-img">
             <img :src="pic_url">
           </div>
           <div class="overview-item-box">
             <div class="item frame-1px">
               <label>项目名称</label>
               <input ref="query" type="text" v-model="project_name">
               <span @click="clear"  v-show="project_name"  class="clear">x</span>
             </div>
             <div class="item frame-1px">
               <label>建设单位</label>
               <input type="text" v-model="build_unit">
               <span @click="clear1" v-show="build_unit"  class="clear">x</span>
             </div>
             <div class="item frame-1px">
               <label>设计单位</label>
               <input type="text" v-model="design_unit">
               <span @click="clear2" v-show="design_unit"  class="clear">x</span>
             </div>
             <div class="item frame-1px">
               <label>施工单位</label>
               <input type="text" v-model="constrution">
               <span @click="clear3" v-show="constrution"  class="clear">x</span>
             </div>
             <div class="item frame-1px">
               <label>监理单位</label>
               <input type="text" v-model="supervision">
               <span @click="clear4" v-show="supervision"  class="clear">x</span>
             </div>
             <div class="item frame-1px">
               <label>BIM单位</label>
               <input type="text" v-model="bim_unit">
               <span @click="clear5" v-show="bim_unit"  class="clear">x</span>
             </div>
             <div class="item frame-1px">
               <label>项目地址</label>
               <input type="text" v-model="address">
               <span @click="clear6" v-show="address"  class="clear">x</span>
             </div>
             <div class="item align">
               <label>项目简介</label>
               <textarea v-model="intro"></textarea>
               <span @click="clear7" v-show="intro"  class="clear">x</span>
             </div>
           </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VmHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'
import Bus from 'common/js/bus'

export default {
  data () {
    return {
      decline: false,
      submit: '提交',
      projectMessage:[],
      project_name: '',
      build_unit: '',
      design_unit: '',
      constrution: '',
      supervision: '',
      bim_unit: '',
      address: '',
      pic_url: '',
      intro: ''
    }
  },
  components: {
    VmHeader,
    Scroll
  },
  methods: {
    async getData() {
        api.getProjectMessage({project_id: this.projectDetails.project_id,token: this.token}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.projectMessage = resp.response
            this.project_name = this.projectMessage.project_name
            this.build_unit = this.projectMessage.build_unit
            this.design_unit = this.projectMessage.design_unit
            this.constrution = this.projectMessage.constrution
            this.supervision = this.projectMessage.supervision
            this.bim_unit = this.projectMessage.bim_unit
            this.address = this.projectMessage.address
            this.intro = this.projectMessage.intro
            this.pic_url = this.projectMessage.pic_url
          }
        });
    },
    submitData () {
      const  get_project_name = ''
      api.sendProjectMessage({
         uid: this.uid,
         unit_id: this.unitId,
         project_id: this.projectDetails.project_id,
         token: this.token,
         projectName: this.project_name,
         build_unit: this.build_unit,
         design_unit: this.design_unit,
         constrution: this.constrution,
         supervision: this.supervision,
         bim_unit: this.bim_unit,
         address: this.address,
         description: this.intro,
         pic_url: this.pic_url
      }).then(resp => {
        var resp = eval(resp)
        if (resp.resp_code === SUCCESS_OK) {
           this.projectMessage = resp.response
           Bus.$emit('getName',this.project_name)
        }
      });
    },
    clear () {
      this.project_name = ''
    },
    clear1 () {
      this.build_unit = ''
    },
    clear2 () {
      this.design_unit = ''
    },
    clear3 () {
      this.constrution = ''
    },
    clear4 () {
      this.supervision = ''
    },
    clear5 () {
      this.bim_unit = ''
    },
    clear6 () {
      this.address = ''
    },
    clear7 () {
      this.intro = ''
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'unitId',
        'utype',
        'projectDetails'
    ])
  },
  created(){
    this.getData();
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

.seting-box {
  overflow: hidden;
  .show-img {
    position: relative;
    width: 100%;
    height: 1.8rem;
    overflow: hidden;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .overview-item-box {
    .item {
      position: relative;
      display: flex;
      align-items: center;
      padding: .05rem .15rem;
      label {
        flex: 0 0 .6rem;
        padding-right: .1rem;
      }
      input {
        flex: 1;
        height: .3rem;
        line-height: .3rem;
        padding-right: .2rem;
      }
      textarea {
        flex: 1;
        border: 0;
        height: 3rem;
        margin-right: .2rem;
        line-height: .2rem;
        padding: 0;
        font-size: $font-size-medium;
        outline:none;
        letter-spacing: .02rem;
      }
      .clear {
        position: absolute;
        right: .18rem;
        top: .11rem;
        font-size: $font-size-large;
      }
    }
    .align {
      align-items: end;
    }
  }
}  
</style>