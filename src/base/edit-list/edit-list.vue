<template>
  <div class="edit-list main main-fill">
    <vm-header>
        <span slot="left" class="left icon return" @click="shutDown()" v-text="returnName"></span>
        <p class="_effect" slot='center'>
          <span class="top-title__text _ellipsis" v-text='title'></span>
        </p>
        <span class="right icon" slot='right' @click="saveData" v-text="saveText"></span>
    </vm-header>
    <div class="main-44">
      
        <div class="edit-item frame-1px">
          <label>名称：</label>
          <input type="text" v-model="editList.name">
        </div>
        <div v-if="selectToggle" class="edit-item frame-1px">
          <label>类别：</label>
          <el-select  v-model="value" placeholder="请选择">
            <el-option
              v-for="item in planType"
              :key="item.value"
              :label="item.type_name"
              :value="item.type_id">
              <span style="float: left">{{ item.type_name}}</span>
            </el-option>
          </el-select>
        </div>
        <div class="edit-item">
          <label>说明：</label>
          <textarea v-model="editList.intro"></textarea>
        </div>
    </div>
  </div>

</template>

<script>
import VmHeader from 'base/header/header'
export default {
  props: {
    editData: {
      type: Object,
    },
    planType: {
      type: Array
    }
  },
  components: {
    VmHeader
  },
  data () {
    return {
      decline: false,
      title: '编辑',
      returnName: '返回',
      saveText: '保存',
      selectToggle: false,
      editToggle: true,
      editList: {
        name: '',
        intro: '',
        type: ''
      },
      value: ''
    }
  },
  methods: {
    getData () {
      if(this.editData.mould_name) {
        this.editList.name = this.editData.mould_name
      }
      if(this.editData.title) {
        this.selectToggle = true
        this.editList.name = this.editData.title
      }
      this.editList.intro = this.editData.intro
    },
    back () {
      this.editToggle = false
    },
    shutDown () {
      this.$emit('shutDown')
    },
    saveData () {
      this.editList.name = this.editList.name
      this.editList.intro = this.editList.intro
      this.editList.type = this.value
      this.$emit('getEditData',this.editList)
    }
  },
  created(){
   this.getData()
  },
  watch: {
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.edit-item {
  position: relative;
  display: flex;
  align-items: baseline;
  padding: .1rem .15rem;
  label {
    padding-right: .1rem;
  }
  input {
    height: .25rem;
    flex: 1;
  }
  textarea {
    flex: 1;
    line-height: .2rem;
    padding: 0;
    height: 1.5rem;
    border: 0;
  }
}



</style>