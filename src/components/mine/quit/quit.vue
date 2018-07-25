<template>
  <div>
      <a  @click="logout()">退出登录</a>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	data() {
      return {
        user:{
          name:''
        }
      }
    },
	methods: {
		...mapActions(['userLoginOut']),
		logout () {
			this.userLoginOut();
			//this.user.name = null;
			//sessionStorage.removeItem('user')
			this.$router.push('/login')
			/*
	        this.$confirm('退出后将返回登录界面, 是否退出登录?', '真的要退出吗？', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          sessionStorage.removeItem('user')
	          // 在这里挂上，官方说的分发，登出的action
	          // 应该这样就行了把
	          this.$store.dispatch('logout')
	          this.$router.push('/login')
	          this.$message({
	            type: 'danger',
	            message: '真他妈的终于退出成功!'
	          })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消退出'
	          })
	        })*/
	    }
	}
}
</script>

<style>
	
</style>