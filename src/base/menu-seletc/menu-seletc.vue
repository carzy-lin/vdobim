<template>
  <el-dropdown trigger="click">
    <p class="el-dropdown-link" v-text='$route.query.name'>
    </p>
    <i class="el-icon-arrow-down el-icon--right"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item,index) in menuData" :key="index">
        <router-link tag="div" :to="{name: item.url, query:{name: item.title}}" v-text="item.title"></router-link>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>


export default {
  data () {
    return {
      
    }
  },
  props: {
    menuData: {
      type: Array
    }
  },
  components: {

  },
  methods: {
 
  },
  created(){
    
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.el-dropdown {
  display: flex;
}
.el-dropdown-menu {
  width: calc(100% - 10px);
  right: 5px;
}
.el-dropdown-menu__item {
  text-align: center;
}
.router-link-exact-active,.router-link-active{
 color: $color-orange;
}

</style>