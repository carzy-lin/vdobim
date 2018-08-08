<template>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
       <Scroll ref="scroll" class="vm-scroll" :data="deviceList" :pullup="pullup"  @scrollToEnd="loadMore">
         <div class="device">
           <div class="item-list frame-1px" v-for="(item,index) in deviceList" :key="index">
             <h3 class="text-execeeded">{{item.control_name}}</h3>
             <div class="device-bottom">
                <span>创建时间：{{item.add_time | formatDate}}</span>
                <div class="more more-position fr">
                  <span class="icon more-icon icon-dot" @click.stop="more(index)">...</span>
                  <div id="toggle" class="operating" v-show="activeIndex===index">
                    <ul>
                      <li class="click_openModel">查看</li>
                      <li class="click_collect">收藏</li>
                      <li class="click_share">分享</li>
                      <li class="click_edit">编辑</li>
                      <li class="click_delete">删除</li>
                    </ul>
                  </div>
                </div>
             </div>
           </div>
         </div>
       </Scroll>
       <div v-show="!deviceList.length" class="loading-container">
          <loading></loading>
       </div>
    </div>
</template>

<script>
import Loading from 'base/loading/loading'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import VmHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import {formatDate} from 'common/js/timestamps';
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'

export default {
  data () {
    return {
      decline: false,
      pullup: true,
      loadingEndData: false,
      loadingImg: false,
      activeIndex: -1,
      deviceList: [],
      page: 1
    }
  },
  filters: {
    formatDate(time) {
        var date = new  Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd');
    }
  },
  components: {
    VmHeader,
    Scroll,
    Loading
  },
  methods: {
    async getData() {
        api.getDeviceList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.deviceList = resp.response.list
            console.log(this.deviceList)
          }
        });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let modreData = await api.getDeviceList({unit_id: this.unitId,project_id: this.projectDetails.project_id,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
              }else {
                return false
              }
        });
        this.deviceList  = [...this.deviceList, ...modreData];
        if(modreData.length < 9) {
           return false
        }
        this.loadingImg = false
        this.loadingEndData = true
    },
    more (index) {
      this.activeIndex != index ? this.activeIndex = index : this.activeIndex = -1
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
    let body = document.querySelector('body')
        body.addEventListener('click',(e)=>{        
          if(this.activeIndex != -1){
            this.activeIndex = -1
          }
    })
  },
  watch: {
    '$route': 'getData'
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.device {
  .item-list {
    position: relative;
    padding: .15rem;
    display: flex;
    flex-direction: column;
    h3 {
      padding-bottom: .1rem;
    }
  }
}

</style>