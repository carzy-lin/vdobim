<template>
    <div class="dynamic">
      <scroll ref="scroll" :pullup="pullup"  @scrollToEnd="loadMore" :data="projectAction"  class="vm-scroll">
        <div>
          <div class="dynamic-box">
            <div class="dynamic-list frame-1px" v-for="(item,key) in projectAction" :key="key">
              <div class="dynamic-name text-execeeded"><span>{{item.action_intro}}</span></div>
              <div class="dynamic-details">
                <span>{{item.nickname}}</span>
                <span>{{item.add_time | formatDate}}</span>
              </div>
            </div>
            <loading-end :loadingEndData="loadingEndData" :loadingImg="loadingImg"></loading-end>
          </div>
        </div>
      </scroll>
    </div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import loadingEnd from 'base/loading-end/loading-end'
import Scroll from 'base/scroll/scroll'
import {formatDate} from 'common/js/timestamps';
import api from '../../../api/api'
import {SUCCESS_OK} from '../../../api/config'

export default {
  data () {
    return {
      projectAction: [],
      pullup: true,
      loadingEndData: false,
      loadingImg: false,
      page: 1,
    }
  },
  methods: {
      async getData() {
        if (this.loadingEndData) {
          return
        }
        api.getAction({project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,size: '8',page: this.page}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.projectAction = resp.response.list
          }
        });
      },
      async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let projectDynamicList = await api.getAction({project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
              }else {
                return false
              }
        });
        this.projectAction  = [...this.projectAction, ...projectDynamicList];
        if(projectDynamicList.length < 9) {
           return
        }
        this.loadingImg = false
        this.loadingEndData = true
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
        'unitId',
        'projectDetails',
        'loadingEnd',
        'actionPage'
    ])
  },
  components: {
    Scroll,
    loadingEnd
  },
  created(){
    this.getData();
  },
  watch: {
    '$route': 'getData',
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";
  .dynamic {
     position: absolute;
     z-index: 11;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background: $color-white;
     .dynamic-box {
        padding-bottom: .3rem;
        .dynamic-list {
          display: flex;
          position: relative;
          padding: .16rem .15rem;
          flex-direction: column;
          justify-content: space-between;
          .dynamic-name {
            padding-bottom: .12rem;
            font-size: $font-size-medium-x;
            span {
              color: #000;
              font-weight: 600;
            }
          }
          .dynamic-details {
            display: flex;
            justify-content: space-between;
          }
        }
     }
  }
</style>