<template>
  <div class="modify-userinfo main-fill">
     <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
        <span slot='right' @click="saveData" v-text="save"></span>
      </vm-header>
      <div class="vm-put">
        <span>{{title}}</span>
        <input autofocus  type="text"  v-model="val" value="val" ref="searchInput">
      </div>
      <div class="remarks">
        {{prompt}}
      </div>
  </div>
</template>

<script>
import VmHeader from 'base/header/header'
import {mapGetters} from 'vuex'
import api from '../../../api/api'
import {SUCCESS_OK} from '../../../api/config'
import Bus from 'common/js/bus'

export default {
  data () {
    return {
      title: 'QQ',
      save: '保存',
      prompt: '设置后，其他人将看到你的QQ',
      decline: false,
      val: ''
    }
  },
  mounted(){
   this.$nextTick(() => {
     this.$refs.searchInput.focus()
   })
  },
  components: {
    VmHeader,
    Bus
  },
  methods: {
    saveData () {
        
        let reg = /^[1-9][0-9]{4,11}$/;
        if (this.val == '') {
          alert("请输入您的QQ")
        }else if(!reg.test(this.val)){
          alert("QQ格式不正确")
        }else{
          //const getUser = JSON.parse(sessionStorage.getItem('getUser'));
          const setMessage = JSON.parse(sessionStorage.getItem('setMessage'));
          api.sendUserMessage({qq: this.val,weixin: setMessage.weixin,email: setMessage.email,real_name: setMessage.real_name,nickname: setMessage.nickname,uid: this.uid,token: this.token,unit_id: this.unitId}).then(resp => {   
            var resp = eval(resp)
            if (resp.resp_code === SUCCESS_OK) {
              Bus.$emit('setQQ',this.val)
              this.$router.back()
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
        'unitId',
    ])
  },
  created(){
   
  },
  watch: {

  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";


</style>