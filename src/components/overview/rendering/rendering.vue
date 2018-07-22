<template>
    <div class="effect-diagram">
      <div class="switching-btn">
        <router-link    :to="{name:'picture'}">
          <div class="switching-one">
            <div class="tab-box">
              <img src="./eff-2.png">
            </div>
            <span class="tab-item">效果图</span>
          </div>
        </router-link>
        <router-link   :to="{name:'panorama'}">
          <div class="switching-two">
            <div class="tab-box">
              <img src="./eff-1.png">
            </div>
            <span class="tab-item">全景图</span>
          </div>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '../../../api/api'
import {SUCCESS_OK} from '../../../api/config'
export default {
  data() {
    return {
      effectMessage: [],
      effectList: [],
      pullup: true,
      loadingEndData: false,
      loadingImg: false,
      page: 1
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'projectDetails',
        'loadingEnd',
        'unitId',
        'actionPage'
    ])
  },
  methods: {
      async  getData() {
        /*
        await api.getProjectEffectList({project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,pic_type: '1',size: '8',page: this.page}).then(resp => {
            var resp = eval(resp)
            if (resp.resp_code === SUCCESS_OK) {
              this.effectList = resp.response.list
              console.log(1,this.effectList)
            }
        });*/
      }
  },
  components: {

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
  .effect-diagram {
    .switching-btn {
      display: flex;
      padding: .15rem 0;
      justify-content: center;
      .switching-one,.switching-two{
        display: inline-block;
        text-align: center;
        .tab-item {
          font-size: $font-size-medium;
          font-weight: 600;
        }
      }
      .switching-one {
        .tab-box {
           background: #2FD278;
        }
      }
      .switching-two {
        .tab-box {
           background: #ff9627;
        }
      }
      .tab-box {
        display: flex;
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        margin: 0  .3rem .1rem;
        img {
          width: .25rem;
          height: .25rem;
        }
      }
    }
  }
</style>