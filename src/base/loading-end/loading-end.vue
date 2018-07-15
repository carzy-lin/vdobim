<template>
	  <div  class="vm-end">
      <span v-show="loadingEndData" id="loadingName">没有更多了</span>
      <img  v-show="loadingImg" width="20" height="20" src="../../assets/image/loading.gif">
    </div>
</template>

<script>
 export default {
  props: {
    loadingEndData: {
      type: Boolean
    },
    loadingImg: {
      type: Boolean
    }
  },
 	data () {
    return {

 	  }
  }
 }
</script>

<style lang="scss" scoped>
@import "~common/css/variable";
 .vm-end {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    font-size: $font-size-small;
    z-index: 99;
    img,span{
      vertical-align: middle;
    }
 }
</style>