<template>
  <transition name="slide">
  <div class="userinfo">
	   <el-row class="vm-userinfo-head frame-1px _cover-top">
	      <el-col  class="vm-userinfo"  :span="24">
	        <div class="vm-return-top" @click="back">
	          <span class="vm-return icon-return"></span>
	          <span>我的</span>
	        </div>
	        <div class="_effect user-title top-title" :class="{'_effect--50':decline}">
             <h3 class="top-title__text _ellipsis">个人信息</h3>
          </div>
	      </el-col>
	   </el-row>
	   <el-row class="vm-userinfo-main  _effect _cover-content" :class="{'_effect--30':decline}">
	     <el-col class="vm-userinfo-info" :span="24">
	       <div class="vm-userinfo-bg">
	            <div class="vm-userinfo-list vm-specific frame-1px">
	              <label>头像</label>
	              <img :src="getUserMessage.portrait">
	            </div>
	            <div class="vm-userinfo-list frame-1px" @click="username">
	              <label>用户名</label>
	              <span>{{getUserMessage.nickname}}</span>
	            </div>
	            <div class="vm-userinfo-list frame-1px">
	              <label>真实姓名</label>
	              <span>{{getUserMessage.real_name}}</span>
	            </div>
	            <div class="vm-userinfo-list frame-1px">
	              <label>性别</label>
	              <span>{{getUserMessage.sex}}</span>
	            </div>
	            <div class="vm-userinfo-list frame-1px">
	              <label>公司名称</label>
	              <span></span>
	            </div>
	            <div class="vm-userinfo-list frame-1px">
	              <label>邮箱地址</label>
	              <span>{{getUserMessage.email}}</span>
	            </div>
	            <div class="vm-userinfo-list frame-1px">
	              <label>手机号码</label>
	              <span>{{getUserMessage.mobile}}</span>
	            </div>
	            <div class="vm-userinfo-list frame-1px">
	              <label>QQ</label>
	              <span>{{getUserMessage.qq}}</span>
	            </div>
	            <div class="vm-userinfo-list frame-1px">
	              <label>微信</label>
	              <span>{{getUserMessage.weixin}}</span>
	            </div>
	       </div>
	     </el-col>
	   </el-row>
     <transition :name="cover">
      <router-view></router-view>
     </transition>
	</div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      decline: false,
      cover: "cover-right",
    }
  },
  props: {
    getUserMessage: {
      default: ''
    }
  },
  methods: {
    username () {
      var _this = this;
      _this.$router.push({path: '/mine/user-info/modify-name'})
    },
  	back () {
      this.$router.back()
  	}
  },
  watch: {
    $route(to, from) {
        if(to.meta.index > 0){
            if( to.meta.index < from.meta.index || to.meta.index == from.meta.index){
                this.decline = false
            }else{
                this.decline = true
            }
        }

    }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";
  .userinfo {
  	position: fixed;
  	z-index: 92;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom: .44rem;
  	background-color: #f5f5f5;
  	overflow: hidden;
  	h3 {
  		font-weight: 700;
  		font-size: $font-size-large;
  	}
    .user-title {
      display: flex;
      justify-content: center;
      flex: 0 0 2rem;
    }
  }
  .vm-userinfo-head {
  	 display: flex;
  	 position: absolute;
  	 top: 0;
  	 left: 0;
     right: 0;
     height:.44rem;
     text-align: center;
     align-items: center;
     background: $color-white;
     z-index: 2;
  }
  .vm-return-top {
  	position: absolute;
  	display: flex;
  	height: 100%;
  	align-items: center;
  	left: .15rem;
  	top: 0;
  	span {
      color: $color-light-blue;
      font-size: $font-size-medium-x;
  	}
  	.vm-return:before {
  	  color: $color-light-blue;
  	}
  }
  .vm-userinfo-bg {
    margin-top: .15rem;
  	background: $color-white;
  	padding: $pd-lf;
  }
  .vm-userinfo-main {
    .vm-userinfo-info {
      padding-top: .44rem;
      .vm-userinfo-list {
      	position: relative;
      	height: .45rem;
      	display: flex;
      	align-items: center;
      	justify-content: space-between;
      	font-size: $font-size-medium-x;
      }
      .vm-specific {
        height: .64rem;
        img {
        	width: 0.45rem;
	       	height: 0.45rem;
	       	border-radius: 50%;
	       	overflow: hidden;
        }
      }
    }
  }

</style>