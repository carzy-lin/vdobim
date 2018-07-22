<template>
    <div class="panorama">
     
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '../../../../api/api'
import {SUCCESS_OK} from '../../../../api/config'
export default {
  data() {
    return {
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
        await api.getProjectEffectList({project_id: this.projectDetails.project_id,unit_id: this.unitId,token: this.token,pic_type: '0',size: '20',page: this.page}).then(resp => {
            var resp = eval(resp)
            if (resp.resp_code === SUCCESS_OK) {
              this.effectList = resp.response.list
              console.log(2,this.effectList)
            }
        });
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
  
  }
</style>