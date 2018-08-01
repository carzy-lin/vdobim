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
        <input autofocus  type="text"  v-model="val" ref="searchInput">
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
      title: '姓名',
      save: '保存',
      prompt: '设置后，其他人将看到你的姓名',
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
        const getUser = JSON.parse(sessionStorage.getItem('getUser'));
        const setMessage = JSON.parse(sessionStorage.getItem('setMessage'));
        api.sendUserMessage({real_name: this.val,email: setMessage.email,qq: setMessage.qq,weixin: setMessage.weixin,nickname: getUser.nickname,uid: this.uid,token: this.token,unit_id: this.unitId}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.$router.back()
            getUser.real_name = this.val
            sessionStorage.setItem("getUser",JSON.stringify(getUser))
            Bus.$emit('msg')
          }else{
            console.log(2)
          }
        });
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