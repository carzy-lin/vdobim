<template>
  <div class="model main-fill">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text=''></span>
        </p>
    </vm-header>
    <div class="_effect _cover-content" :class="{'_effect--30':decline}">
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VmHeader from 'base/header/header'

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
        'projectDetails'
    ])
  },
  created(){
      
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