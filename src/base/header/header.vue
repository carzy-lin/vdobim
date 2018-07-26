<template>
  <div class="header item-header _cover-top">
    <div class="top-back">
      <span class="left icon return" @click="back()" v-text="returnName"></span>
    </div>
    <div class="top-right">
      <slot name="right">
        <span class="right icon search" v-text="searchName"></span>
      </slot>
    </div>
    <div class="title top-title _effect" :class="{'_effect--50':decline}">
      <slot name="center">
        <p>
          <span v-text="title"></span>
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      decline: false,
      searchName: '搜索',
      returnName: '返回'
    }
  },
  props: {
    title: {
      type: String,
      default: 'vdobim'
    }
  },
  components: {
    
  },
  methods: {
    back () {
     let router = this.$route.name
     console.log(router)
     if(router == 'basic-information' || router == 'dynamic' || router == 'member' || router == 'rendering' || router == 'notice') {
        this.$router.push({
          path: '/index/${projectDetails.project_id}'
        })
     }else if(router == ':id'){
        this.$router.push({
          path: '/index'
        })
     }else{
       this.$router.back() 
     }
    }
  },
  computed: {
    ...mapGetters([
        'projectDetails'
    ])
  },
  created(){
      
  },
  watch: {
    $route(to, from) {
      /* if(from.meta.index == 3 || from.meta.index==4 && to.path== 'overview') {
         this.$router.push({
            path: '/index/${projectDetails.project_id}/AI'
         })
       }*/
    }
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";
.item-header {
  display: flex;
  position: relative;
  height: .44rem;
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: $pd-lf;
  //background: linear-gradient(180deg,#303036,#3c3b40);
  box-shadow: 0px 0px 1px $color-c;
  //transform: translateZ(0);
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    font-size: $font-size-large;
  }
  .top-back {
    position: absolute;
    left: .15rem;
  }
  .top-right {
    position: absolute;
    right: .15rem;
  }
}
</style>