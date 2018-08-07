<template>
  <div class="model main-fill">
    <vm-header>
      <div slot="left">
        <span class="left icon return" @click="back()" v-text="returnName"></span>
      </div>
      <div slot='center' class="_effect" :class="{'_effect--50':decline}">
          <el-dropdown trigger="click">
            <p class="el-dropdown-link" v-text='$route.query.name'>
            </p>
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link tag="div" :to="{name: 'scenePicture',query:{name: '图片'}}">图片</router-link></el-dropdown-item>
              <el-dropdown-item><router-link tag="div" :to="{name: 'video',query:{name: '视频'}}">视频</router-link></el-dropdown-item>
              <el-dropdown-item><router-link tag="div" :to="{name: 'device',query:{name: '监控'}}">监控</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <el-dialog :append-to-body='true'></el-dialog>
      </div>
    </vm-header>
    <transition :name="cover">
        <router-view class="cover-transition"></router-view>
    </transition>
  </div>
</template>

<script>
import VmHeader from 'base/header/header'

export default {
  data () {
    return {
      cover: "cover-right",
      returnName: '返回',
      decline: false,
    }
  },
  components: {
    VmHeader
  },
  methods: {
    back () {
      this.$router.push({
          path: '/index/${projectDetails.project_id}'
      })
    }
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
.router-link-exact-active {
 color: $color-orange;
}

</style>