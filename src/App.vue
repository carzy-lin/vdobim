<template>
  <div id="app">
    <tab @loader="hide()" v-show="toggleHide"></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Tab from 'base/tab/tab'

export default {
  data () {
    return {
      toggleHide: true
    }
  },
  name: 'App',
  methods: {
    hide() {
     if(this.$route.name === 'login' || this.$route.name === 'reginster') {
        this.toggleHide = false
     }else {
        this.toggleHide = true
     }
    }
  },
  components: {
  	'tab': Tab,
  },
  created(){
    this.hide();
  },
  watch: {
      '$route': 'hide'
  }
}
</script>

<style lang="scss" scoped>

</style>
