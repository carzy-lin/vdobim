<template>
  <div class="modify-userinfo main-fill">
     <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
        <span slot='right' @click="saveData" v-text="save"></span>
      </vm-header>
      <div class="vm-put">
        <span>名称</span>
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

export default {
  data () {
    return {
      title: '名称',
      save: '保存',
      prompt: '设置后，其他人将看到你的名称',
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
    VmHeader
  },
  methods: {
    saveData () {
      //this.$emit("senData",this.val)
        this.$router.back()
        api.sendUserMessage({real_name: '林金盛',nickname: this.val,uid: this.uid,token: this.token,unit_id: this.unitId}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            sessionStorage.setItem('modifyNickname',this.val)
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
.modify-userinfo {
  background: #f5f5f5;
  .remarks {
    padding: .1rem .15rem 0;
    color: $color-9;
  }
  .vm-put {
    display: flex;
    background: #fff;
    margin-top: .1rem;
    padding: .05rem .15rem;
    align-items: center;
    border-top: 1px solid $color-e;
    border-bottom: 1px solid $color-e;
    span {
      flex: 0 0 .3rem;
      padding-right: .15rem;
    }
    input {
      flex: 1;
      height: .3rem;
      color: #000;
    }
  }
}

</style>