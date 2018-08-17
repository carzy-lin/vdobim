<template>
<div>
  <div class="project">
    <div class="project-header frame-1px header _effect" :class="{'_effect--50':decline}">
      <div class="logo"><span class="v">V</span><span>DOBIM</span></div>
      <span class="icon icon-search"></span>
    </div>
    <div class="project-main _effect" :class="{'_effect--30':decline}">
      <scroll ref="scroll" class="project-main-box" :pullup="pullup"  @scrollToEnd="loadMore" :data="projectList">
        <div>
         <div class="project-list">
           <div v-for="(item,index) in projectList" :key="index" class="project-item frame-1px" @click="listItem(item)">
             <div class="project-item-left text-execeeded">
               <h3>{{item.project_name}}</h3>
               <div class="project-time">
                 <span v-if="item.status == 0">正常</span>
                 <span v-if="item.status == 1">归档</span>
                 <span v-if="item.status == 2">停用</span>
                 <span>{{item.add_time | formatDate}}</span>
               </div>
             </div>
             <div class="project-item-right">
               <img  v-lazy="item.pic_url">
             </div>
           </div>
           <loading-end :loadingEndData="loadingEndData" :loadingImg="loadingImg"></loading-end>
         </div>
        </div>
      </scroll>
      <div v-show="!projectList.length" class="loading-container">
          <loading></loading>
      </div>
    </div>
  </div>
  <transition :name="cover">
    <router-view class="cover-transition"></router-view>
  </transition>
</div>
</template>

<script>
import Loading from 'base/loading/loading'
import loadingEnd from 'base/loading-end/loading-end'
import {formatDate} from 'common/js/timestamps';
import Scroll from 'base/scroll/scroll'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import tab from 'base/tab/tab'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'
import Bus from 'common/js/bus'

export default {
  data () {
    return {
      pullup: true,
      projectList: [],
      loadingEndData: false,
      loadingImg: false,
      decline: false,
      cover: "cover-right",
      page: 1
    }
  },
  components: {
    Loading,
    loadingEnd,
    Scroll
  },
  filters: {
    formatDate(time) {
        var date = new  Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods: {
    listItem (item) {
       this.$router.push({
          path: `/index/${item.project_id}`
       })
       this.setProjectDetails(item)
       this.page = 1;
    },
    ...mapMutations({
        setProjectDetails: 'GET_PROJECT_DETAILS'
    }),
    async getData() {
          if (this.loadingEndData) {
            return 
          }
          api.getProject({uid: this.uid,unit_id: this.unitId,utype: this.utype,token: this.token,size: '8',page: this.page}).then(resp => {
            var resp = eval(resp)
            if (resp.resp_code === SUCCESS_OK) {
              this.projectList = resp.response.list
            }
          });
    },
    async loadMore() {
        if (this.loadingEndData) {
          return 
        }
        this.loadingImg = true
        this.page += 1;
        let getProjectList = await api.getProject({uid: this.uid,unit_id: this.unitId,utype: this.utype,token: this.token,size: '8',page: this.page}).then(resp => {
              var resp = eval(resp)
              if (resp.resp_code === SUCCESS_OK) {
                return  resp.response.list
              }else {
                return false
              }
        });
        this.projectList  = [...this.projectList, ...getProjectList];
        if(getProjectList.length < 9) {
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
        'utype'
    ])
  },
  created(){
    this.getData();
    Bus.$on('getName', (name) => {
      this.getData();
    })
  },
  watch: {
    $route(to, from) {
        //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(from.meta.index < 2){
          this.decline = false
        }
        if(to.meta.index > 0){
            if( to.meta.index < from.meta.index || to.meta.index == from.meta.index){
                this.decline = false
                console.log(1)
            }else{
                this.decline = true
                console.log(2)
            }
            if(from.meta.index == 4 || from.meta.index == 3){
               this.decline = true
            }
        }else if(to.meta.index == 0 && from.meta.index > 0){
            this.decline = true
            console.log(3)
        }
    }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";
.project-header {
  display: flex;
  position: relative;
  height: .44rem;
  justify-content: space-between;
  align-items: center;
  padding: $pd-lf;
  font-size: $font-size-large;
  box-shadow: 0px 0px 1px $color-c;
  .logo {
    span {
      color: $color-dark-blue;
      font-weight: 600;
    }
    .v {
      color: $color-orange;
    }
  }
}
.project-main {
  position: absolute;
  background: $color-white;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: .44rem;
  overflow: hidden;
  opacity: 1;
  .project-main-box {
    height: 100%;
    overflow: hidden;
  }
.project-list {
  padding: 0rem .15rem .3rem;
  position: relative;
  .project-item {
    display: flex;
    padding: .1rem 0;
    position: relative;
    .project-item-right {
      display: flex;
      flex: 0 0 1rem;
      width: 1rem;
      height: .6rem;
      img {
        width: 1rem;
        height: .6rem;
        border: 0;
        overflow: hidden;
        border-radius: .04rem;
      }
    }
    .project-item-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: .15rem;
          .project-time {
             display: flex;
             justify-content: space-between;
          }
    }
  }
}
.loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
}
</style>