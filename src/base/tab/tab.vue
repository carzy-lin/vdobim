<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/index">
      <span class="icon-project"></span>
      <span class="tab-link">项目</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/problem">
      <span class="icon-problem"></span>
      <span class="tab-link">问题</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/news">
      <span class="icon-news"></span>
      <span class="tab-link">消息</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/mine">
      <span class="icon-my"></span>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>
<script>
export default { 
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";
.tab {
    display: flex;
    width: 100%;
    position: fixed;
    height: .44rem;
    font-size: $font-size-small;
    bottom: 0;
    box-shadow: -1px 1px 3px #ccc;
    background: $color-white;
    z-index: 999;
    .tab-item {
      flex: 1;
      padding: .05rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      color: $color-9;
      span:first-child:before {
         font-size: $font-size-large;
      }
    }
    .router-link-active {
        color: #0190FF;
        span:first-child:before {
          color: #0190FF;
        }
    }
    
  }
</style>