<template>
  <div class="model main-fill">
    <vm-header>
      <div slot="left">
        <span class="left icon return" @click="back()" v-text="returnName"></span>
      </div>
      <div slot='center' class="_effect" :class="{'_effect--50':decline}">
        <menu-seletc :menuData="contract"></menu-seletc>
      </div>
    </vm-header>
    <transition :name="cover">
        <router-view class="cover-transition"></router-view>
    </transition>
  </div>
</template>

<script>
import VmHeader from 'base/header/header'
import menuSeletc from 'base/menu-seletc/menu-seletc'
import {contract} from 'assets/js/project-menu'

export default {
  data () {
    return {
      cover: "cover-right",
      returnName: '返回',
      decline: false,
      contract
    }
  },
  components: {
    VmHeader,
    menuSeletc
  },
  methods: {
    back () {
      this.$router.push({
          path: '/index/${projectDetails.project_id}'
      })
    }
    
  },
  created(){
    
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";


</style>