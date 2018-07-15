<template>
    <div class="home main">
      <vm-header></vm-header>
    </div>
</template>

<script>

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

  },
  created(){
      
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

</style>