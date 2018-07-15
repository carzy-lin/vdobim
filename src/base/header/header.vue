<template>
  <div class="header item-header  _cover-top">
    <div class="top-back">
      <span class="left icon return" @click="back()">返回</span>
    </div>
    <div class="title top-title _effect" :class="{'_effect--30':decline}">
      <slot name="title">
        <span v-text="title"></span>
      </slot>
    </div>
    <div class="top-right">
      <span class="right icon search">搜索</span>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      decline: false
    }
  },
  props: {
    title: {
      type: String,
      default: 'vdobim'
    }
  },
  components: {
    
  },
  methods: {
    back () {
     this.$router.back()
    }
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
.item-header {
  display: flex;
  position: relative;
  height: .44rem;
  justify-content: center;
  align-items: center;
  padding: $pd-lf;
  box-shadow: 0px 0px 1px $color-c;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    font-size: $font-size-large;
  }
  .top-back {
    position: absolute;
    left: .15rem;
  }
  .top-right {
    position: absolute;
    right: .15rem;
  }
}
</style>