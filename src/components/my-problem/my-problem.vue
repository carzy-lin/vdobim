<template>
  <div class="model main">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='$route.query.name'></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content main-44" :class="{'_effect--30':decline}">
      {{myProblem}}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VmHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'

export default {
  data () {
    return {
      decline: false,
      myProblem: [],
      page: 1
    }
  },
  components: {
    VmHeader,
    Scroll
  },
  methods: {
    async getData() {
        api.getMyProblem({uid: this.uid,unit_id: this.unitId,token: this.token,page: this.page}).then(resp => {
          var resp = eval(resp)
          console.log(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.myProblem = resp.response.list
            console.log(487,this.myProblem)
          }
        });
    },
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
    this.getData()
  },
  watch: {
    $route(to, from) {

    }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable"

</style>