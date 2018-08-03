<template>
  <div class="main-fill main-bg">
      <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
        <span slot='right'  v-text="save"></span>
      </vm-header>
      <div class="modify-avatar">
        <scroll ref="scroll" class="vm-scroll">
          <div>
            <div class="avatar-show">
              <img :src="picture">
            </div>
            <div class="avatar-btn">
              <input  class="upload" type="file" @change="fileImage">
              <button>从相册选一张</button>
            </div>
            <div class="avatar-btn">
              <button>拍一张照片</button>
            </div>
          </div>
        </scroll>
      </div>
  </div>
</template>

<script>
import VmHeader from 'base/header/header'
import {mapGetters} from 'vuex'
import api from '../../../api/api'
import {SUCCESS_OK} from '../../../api/config'
import Bus from 'common/js/bus'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      title: '设置个人头像',
      save: '保存',
      decline: false,
      //getUser: {},
      picture: '',
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      }

    }
  },
  components: {
    VmHeader,
    Bus,
    Scroll
  },
  methods: {
    getData () {
        const getUser = JSON.parse(sessionStorage.getItem('getUser'));
        this.picture = getUser.portrait 
    },
    fileImage (e) {
        
        let formData = new FormData();
        let reader =new FileReader();
        let fileVal = e.target.files[0];
        let imgSize=fileVal.size/1024;
        let type=fileVal.type;
        
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
            
        };
        if(this.imgData.accept.indexOf(type) == -1){  
            alert('请选择我们支持的图片格式！');  
            return false;  
        }  
        if(imgSize>3145728){  
            alert('请选择3M以内的图片！');  
            return false;  
        }else{
           
           const getUser = JSON.parse(sessionStorage.getItem('getUser'));
           const setMessage = JSON.parse(sessionStorage.getItem('setMessage'));
      
           
           console.log(fileVal)
              
           formData.append("file",fileVal);
           formData.append("real_name",getUser.real_name);
           formData.append("email",setMessage.email);
           formData.append("qq",setMessage.qq);
           formData.append("weixin",setMessage.weixin);
           formData.append("nickname",getUser.nickname);
           formData.append("uid",this.uid);
           formData.append("token",this.token);
           formData.append("unit_id",this.unitId);
           formData.append("utype",this.utype)


           console.log(formData)

           api.sendUserMessage(formData,config).then(resp => {
            
              var resp = eval(resp)
              console.log(resp)
              if (resp.resp_code === SUCCESS_OK) {
                //this.$router.back()
                   this.picture = resp.response.portrait
                   console.log(resp.response)
                //sessionStorage.setItem("getUser",JSON.stringify(getUser))
                //Bus.$emit('msg')
              }else{
                console.log(2)
              }
            });
          
        }
    }
  },
   
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'utype',
        'unitId',
    ])
  },
  created(){
     this.getData();
  },
  watch: {

  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";
.main-bg {
  background: rgba(245,244,249,1);
}
.modify-avatar {
    position: absolute;
    z-index: 9;
    top: .44rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    -webkit-transition: .3s all ease-in-out;
    transition: .3s all ease-in-out;
  .avatar-show {
     display: flex;
     height: 4rem;
     img {
       width: 100%;
       height: auto;
     }
  }
  .avatar-btn:nth-child(2n) {
    margin-top: .35rem;
  }
  .avatar-btn {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: .15rem;
    .upload {
      position: absolute;
      width: 80%;
      padding: .1rem 0;
      z-index: 9;
      opacity: 0;
    }
    button {
       display: inline-block;
       width: 80%;
       padding: .1rem 0;
       text-align: center;
       border-radius: .02rem;
       font-size: $font-size-medium-x;
       background: #fff;
       color: #000;
       border: 1px solid rgba(204,204,204,0.5);

    }
  }
}

</style>