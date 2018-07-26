<template>
  <div class="modify-userinfo main-fill">
     <vm-header>
        <p class="_effect" slot='center' :class="{'_effect--50':decline}">
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
        <span slot='right' v-text="save"></span>
      </vm-header>
      <div class="vm-put">
        <span>名称</span>
        <input type="text" v-focus @focus="focus" v-model="val" ref="ipt">
      </div>
      <div class="remarks">
        设置后，其他人将看到你的名称
      </div>
  </div>
</template>

<script>
import VmHeader from 'base/header/header'
export default {
  data () {
    return {
      title: '名称',
      save: '保存',
      decline: false,
      val: ''
    }
  },
  components: {
    VmHeader
  },
  methods: {
    focus: function(e) {
      
    }
  },
  directives: {
      focus: {
        inserted: function (e) {
          e.focus()
        }
      }
  },
  computed: {
    
  },
  created(){
    this.focus()
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