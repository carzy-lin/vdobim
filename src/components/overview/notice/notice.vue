<template>
  <div class="project-notification">
    <scroll  ref="scroll" :pullup="pullup"  @scrollToEnd="loadMore" :data="projectNotification"  class="vm-scroll">
      <div>
        <div class="notification-box">
          <div class="notification-list frame-1px" v-for="item in projectNotification">
            <div class="notification-title text-execeeded">
              <h3>{{item.title}}</h3>
            </div>
            <div class="notification-author">
              <div class="notification-avatar">
                <img v-lazy="item.portrait">
                <span>{{item.from_user_name}}</span>
              </div>
              <span>{{item.add_time | formatDate}}</span>
            </div>
            <div class="notification-contents">
              <p class="text-execeeded">{{item.content}}</p>
            </div>
          </div>
          <loading-end :loadingEndData="loadingEndData" :loadingImg="loadingImg"></loading-end>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import api from '../../../api/api'
import {mapGetters,mapMutations} from 'vuex'
import {formatDate} from 'common/js/timestamps';
import {SUCCESS_OK} from '../../../api/config'
import Scroll from 'base/scroll/scroll'
import loadingEnd from 'base/loading-end/loading-end'
import Bus from 'common/js/bus.js'

  export default {
    data () {
      return {
        pullup: true,
        projectNotification: [],
        loadingEndData: false,
        loadingImg: false,
        page: 1,
      }
    },
    methods: {
      async getData () {
          if (this.loadingEndData) {
            return 
          }
          api.getProjectNotice({u_id: this.uid,project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,size: '8',page: this.page}).then(resp => {
            var resp = eval(resp)
            if (resp.resp_code === SUCCESS_OK) {
              this.projectNotification = this.projectNotification.concat(resp.response.list)
            }
          });
      },
      async loadMore() {
          if (this.loadingEndData) {
            return 
          }
          this.loadingImg = true
          this.page += 1;
          let projectNoticList = await api.getProjectNotice({u_id: this.uid,project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,size: '8',page: this.page}).then(resp => {
                var resp = eval(resp)
                if (resp.resp_code === SUCCESS_OK) {
                  return  resp.response.list
                }else {
                  return false
                }
          });
          this.projectNotification  = [...this.projectNotification, ...projectNoticList];
          if(projectNoticList.length < 9) {
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
    components: {
      Scroll,
      loadingEnd
    },
    computed: {
      ...mapGetters([
          'token',
          'unitId',
          'uid',
          'projectDetails',
          'loadingEnd',
          'actionPage'
      ])
    },
    created () {
      this.getData();
    },
    watch: {
      '$router': 'getData'
    }
  }
</script>
<style lang="scss" scoped>
 @import "~common/css/variable";
.project-notification {
   height: 100%;
   position: relative;
   .notification-box {
     height: 100%;
     padding-bottom: .3rem;
     .notification-list {
       display: flex;
       position: relative;
       justify-content: space-between;
       flex-direction: column;
       padding: .16rem .15rem;
       .notification-title {
          padding-bottom: .09rem;
          h3 {
             color: #000;
             font-weight: 600;
          }
       }
       .notification-author {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: .09rem;
         .notification-avatar {
           img {
             width: .22rem;
             height: .22rem;
             border-radius: .22rem;
             vertical-align: middle;
           }
           span {
             vertical-align: middle;
           }
         }
       }
       .notification-contents {
         p {
           width: 100%;
         }
       }
     }
   }
}
</style>
