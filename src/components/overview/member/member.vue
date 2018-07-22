<template>
    <div  class="project-member">
      <scroll  ref="scroll" :pullup="pullup"  @scrollToEnd="loadMore" :data="projectMember"   class="vm-scroll">
        <div>
           <member  :member="projectMember"></member>
          
        <!--   <img v-show="loadingImg"  width="20" height="20" src="../../assets/image/loading.gif">
           <div   v-show="loadingEndData" class="vm-end">
             <span id="loadingName">没有更多了</span>
           </div> -->
           <loading-end :loadingEndData="loadingEndData" :loadingImg="loadingImg"></loading-end>
        </div>
      </scroll>
      <div v-show="!projectMember.length" class="loading-container">
          <loading></loading>
      </div>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import member from 'base/public-member/public-member'
import loadingEnd from 'base/loading-end/loading-end'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import api from '../../../api/api'
import {SUCCESS_OK} from '../../../api/config'
import Bus from 'common/js/bus.js'

export default {
  data() {
    return {
      projectMember: [],
      pullup: true,
      page: 1,
      loadingEndData: false,
      loadingImg: false,
      addMoreText: ''
    }
  },
  methods: {
      async getData() {
          if (this.loadingEndData) {
            return 
          }
          api.getProjectMember({project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,size: '8',page: this.page}).then(resp => {
            var resp = eval(resp)
            if (resp.resp_code === SUCCESS_OK) {
              this.projectMember = resp.response.list
            }
          });
      },
     async loadMore() {
          if (this.loadingEndData) {
            return 
          }
          this.loadingImg = true
          
          this.page += 1;
          
          let projectMemberList = await api.getProjectMember({project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,size: '8',page: this.page}).then(resp => {
                var resp = eval(resp)
                if (resp.resp_code === SUCCESS_OK) {
                  return  resp.response.list
                }else {
                  return false
                }
          });
          
          
          this.projectMember  = [...this.projectMember, ...projectMemberList];
     
          if(projectMemberList.length < 9) {
             return
          }
          console.log(this.loadingImg)
          this.loadingImg = false
          this.loadingEndData = true

    }
  },
  computed: {
    ...mapGetters([
        'token',
        'unitId',
        'projectDetails',
        'loadingEnd',
        'actionPage',
        'groupMember'
    ])
  },
  components: {
    member,
    Scroll,
    loadingEnd,
    Loading
  },
  created(){
    this.getData();
    Bus.$on("addMoreText",(addMoreText) => {
      this.addMoreText = addMoreText;
    });
  },
  watch: {
    '$route': 'getData',
  }

}  
</script>

<style lang="scss" scoped>
@import "~common/css/variable";
  .project-member {
     height: 100%;
  }
</style>