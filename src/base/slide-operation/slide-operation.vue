<template>
    <div class="slide-operation" data-type="0">
      <div class="move"
        @touchstart.capture="_touchStart"
        @touchend.capture="_touchEnd"
        :style="txtStyle">
        <slot></slot>
      </div>
      <div class="operating">
        <!--<div class="show-model"  @click.prevent="showModel(index)"><span>显示模型</span></div>-->
        <div class="collection"  @click.prevent="collectionItem(cancelId,index)"><span>取消收藏</span></div>
        <!--<div class="share"  @click.prevent="shareItem(index)"><span>分享</span></div>-->
        <!--<div class="edit"  @click.prevent="editItem(index)"><span>编辑</span></div>
        <div class="delete"  @click.prevent="deleteItem(index)"><span>删除</span></div>-->
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '../../api/api'
import {SUCCESS_OK} from '../../api/config'

export default {
  props: {
    index: {
      type: Number
    },
    cancelId: {
      type: Object
    }
  },
  data() {
    return {
      startX: 0,  
      endX : 0 ,
      moveX: 0, //滑动时的位置
      disX: 0,
      txtStyle: '',
      delWidth: 60,
      top: '',
    }
  },
  methods: {
      _touchStart: function(e) {
          this.startX = e.touches[0].clientX;
      },
      _touchEnd: function(e) {
        let parentElement = e.currentTarget.parentElement;
        this.endX = e.changedTouches[0].clientX;
        if( parentElement.dataset.type == 0 && this.startX - this.endX > 30  ){
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
          this.restSlide();
          parentElement.dataset.type = 0;
          
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide(){
        let listItems = document.querySelectorAll('.slide-operation');
        for( let i = 0 ; i < listItems.length ; i++){
          if( listItems[i].dataset.type == 1 ) {
            return true;
          }
        }
        return false;
      },
      restSlide(){
        let listItems = document.querySelectorAll('.slide-operation');
        for( let i = 0 ; i < listItems.length ; i++){
          listItems[i].dataset.type = 0;
        }
      },
      deleteItem: function(index) {
              this.$emit('deleteItem', index);
      },
      collectionItem (cancelId,index) {
        console.log(22,cancelId)
        api.getCancelCollect({project_id: this.projectDetails.project_id,token: this.token,uid: this.uid,unit_id: this.unitId,collect_id: cancelId.collect_id}).then(resp => {
          var resp = eval(resp)
          if (resp.resp_code === SUCCESS_OK) {
            this.$message({
                message: '取消成功',
                type: 'success'
            });
            this.$emit('canceCollect',index)
            this.restSlide();
          }
        });
      }
  },
  components: {

  },
  computed: {
    ...mapGetters([
        'token',
        'uid',
        'unitId',
        'utype',
        'projectDetails'
    ]),
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
    .slide-operation{
        width:100%;
        height:100%;
        position:relative;
        padding: .12rem 0;
        z-index:2;
        .operating {
          display: flex;
          justify-content:center;
          align-items: center;
          width: .8rem;
          height: 100%;
          //background: #ff4949;
          color: #fff;
          text-align: center;
          position: absolute;
          top:0;
          right: -1rem;
          > div {
            flex: 1;
            justify-content:center;
            align-items: center;
            display: flex;
            height: 100%;
          }
          > .show-model {
            flex: 0 0 .7rem;
            background: #FF7F27;
          }
          > .collection {
            background: $color-9;
          }
          > .share {
            background: #28BE0F;
          }
          > .edit {
            background: $color-blue;
          }
          > .delete {
            background: $color-red;
          }
        }
    }
    .slide-operation{
        position: relative;
        transition: all .4s ease;
    }
    .slide-operation[data-type="0"]{
      transform: translate3d(0,0,0);
    }
    .slide-operation[data-type="1"]{
      transform: translate3d(-.8rem,0,0);
    }
</style>