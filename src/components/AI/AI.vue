<template>
    <div class="AI-box main-fill">
      <vm-header :title="title"></vm-header>
      <div class="main-44 _effect _cover-content" :class="{'_effect--30':decline}">
        <scroll ref="scroll" class="vm-scroll" :data="AI">
          <div>
            <AI-list :AI="AI"></AI-list>
          </div>
        </scroll>
      </div>
      <transition :name="cover">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import VmHeader from 'base/header/header'
import AIList from 'base/AI-list/AI-list'
import Scroll from 'base/scroll/scroll'
import {formatDate} from 'common/js/timestamps';
/*:class="[{'frame-1px': index != 1 },{'Ai-item-bot': index === 1}]"*/
export default {
  data () {
    return {
      title: "AI秘书",
      decline: false,
      cover: "cover-right"
    }
  },
  components: {
    VmHeader,
    Scroll,
    AIList
  },
  props: {
    AI: {
       type: Array
    }
  },
  filters: {
      formatDate(time) {
          var date1 = new  Date(time * 1000);
          return formatDate(date1, 'yyyy-MM-dd');
      }
  },
  methods: {
  },
  watch: {
    $route(to, from, next) {
        //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > 2){
          if( to.meta.index < from.meta.index){
                this.decline = false
                console.log(777)
            }else{
                this.decline = true
                 console.log(787)
          }
        }
    }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";


</style>