<template>
    <div class="AI-box main-fill">
      <vm-header :title="title"></vm-header>
      <div class="main-44 ">
        <scroll ref="scroll" class="vm-scroll" :data="AI">
          <div>
            <AI-list :AI="AI"></AI-list>
          </div>
        </scroll>
      </div>
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
      title: "AI秘书"
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
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";


</style>