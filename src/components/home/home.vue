<template>
    <div class="home main">
      <vm-header :title="projectDetails.project_name"></vm-header>
      <div class="main-44">
        sdfasdf 
      </div>
    </div>
</template>

<script>

import VmHeader from 'base/header/header'
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  data () {
    return {
       decline: false
    }
  },
  components: {
    VmHeader
  },
  methods: {

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
      
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

</style>