<template>
  <div class="main-fill">
    <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='text'></span>
        </p>
        <p slot='right'>
          <span class="right icon" @click="save()" v-text="saveNmae"></span>
        </p>
    </vm-header>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VmHeader from 'base/header/header'

export default {
  data () {
    return {
      decline: false,
      text: '新建问题',
      saveNmae: '保存'
    }
  },
  props: {

  },
  components: {
    VmHeader
  },
  methods: {
    save () {
      this.$emit('closeAdd')
    }
  },
  computed: {
    ...mapGetters([
        'projectDetails'
    ])
  },
  created(){
      
  },
  watch: {

  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";


</style>