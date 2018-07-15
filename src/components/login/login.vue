<template>
  <div class="vm-login vm-pd-15">
    <el-row>
      <el-col class="vm-login-head" :span="24">
        <h3 class="title">系统登录</h3>
        <div class="vm-avatar">
         
        </div>
      </el-col>
      <el-col :span="24">
        <el-form  ref="AccountFrom" :model="account" :rules="rules" label-position="left"  
                 class="demo-ruleForm login-container">  
          <el-form-item prop="userName">  
            <el-input class="vm-user-put" type="text"  v-model="account.userName" auto-complete="off" placeholder="账号"></el-input>  
          </el-form-item>  
          <el-form-item  prop="userPwd">  
            <el-input class="vm-user-put" type="password"  v-model="account.userPwd" auto-complete="off" placeholder="密码"></el-input>  
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked" checked  class="remember">记住密码</el-checkbox>
            <router-link class="fr" to="/register">
             忘记密码？
            </router-link>
          </el-form-item>
          <el-form-item style="width:100%;">  
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining" >登录</el-button>  
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>  

<script>  
  import api from '../../api/api'
  //import api from '../../http/API'
  import {hex_sha1} from  '../../assets/js/sha1'
  import {mapActions,mapMutations} from 'vuex' 
  //import NProgress from 'nprogress'  
  export default {

    data() {  
      return {  
        logining: false,
        checked: true,
        account: {  
          userName: '',  
          userPwd: ''  
        },  
        rules: {  
          userName: [  
            {required: true, message: '请输入账号', trigger: 'blur'},  
            //{ validator: validaePass }  
          ],  
          userPwd: [  
            {required: true, message: '请输入密码', trigger: 'blur'},  
            //{ validator: validaePass2 }  
          ]  
        }
      };  
    },
    //页面加载调用获取cookie值
    mounted(){
        this.getCookie()
    },

    methods: {
      ...mapActions(['userLogin','userToken']),
      ...mapMutations({
        token: 'TOKEN',
        uid: 'UID',
        unitId: 'UNIT_ID',
        utype: 'UTYPE',
        getUserList: 'GET_USER_LIST'
      }),
      handleLogin() {  
        this.$refs.AccountFrom.validate((valid) => {  
          if (valid) {  
  
            //this.logining = true;  
            //NProgress.start();  
            var userPwd  =  hex_sha1(this.account.userPwd)
            var loginParams = { userName: this.account.userName, userPwd};  
            api.requestLogin(loginParams).then(data => {
            //api.getLogin(loginParams).then(data => {
             //debugger;  
              //this.logining = false;  
              //let { msg, code, token} = data;
              data = eval(data)
              if(this.checked){
                //传入账号名，密码，和保存天数3个参数
              this.setCookie(loginParams,7);
              }else {
                  console.log("清空Cookie");
                  //清空Cookie
                  this.clearCookie();
              }
              if(data.resp_code == '0000'){  
                //登录成功，把用户信息保存在sessionStorage中  
                //sessionStorage.setItem('access-token', token);
                
                var getUser = data.response.user
                var token = data.response.token
                var uid = data.response.user.uid
                var unitId = data.response.user.unit_id
                var utype = data.response.user.utype
                
                sessionStorage.setItem('user',data)
                sessionStorage.setItem('token',data.response.token)
                sessionStorage.setItem('uid',data.response.user.uid)
                sessionStorage.setItem('unit_id',data.response.user.unit_id)
                sessionStorage.setItem('utype',data.response.user.utype)

                this.getUserList(getUser)
                this.token(token)
                this.uid(uid)
                this.unitId(unitId)
                this.utype(utype)
            
                this.userLogin(loginParams);
                this.userToken(token)
                //跳转到后台主界面  
                this.$router.push('/'); 
              }else{  
                this.$message({  
                  message: msg,  
                  type: 'error'
                });
              }  
                
            });  
  
          } else {  
            console.log('error submit!!');  
            return false;  
          }  
        });  
      },
      //设置cookie
      setCookie(user,exdays) {
        var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie="userName"+ "=" +user.userName+";path=/;expires="+exdate.toGMTString();
        window.document.cookie="userPwd"+"="+user.Pwd+";path=/;expires="+exdate.toGMTString();
      },
      //读取cookie
      getCookie:function () {
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='userName'){
              this.account.userName=arr2[1];//保存到保存数据的地方
            }else if(arr2[0]=='userPwd'){
              this.account.userPwd=arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie:function () {
        this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
      }
    }  
  }  
  
</script>  
  
  
<style  scoped>


</style>  