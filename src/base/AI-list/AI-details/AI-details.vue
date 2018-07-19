<template>
    <div class="AI-details main-fixed">
      <div class="return"><span @click="back()">返回</span></div>
      <div class="AI-details-main _effect _cover-content" :class="{'_effect--30':decline}">
        <Scroll ref="scroll" class="vm-scroll">
          <div class="AI-details-main-pd">
            <div class="AI-details-top">
              <div class="AI-details-name">
                <h3>{{AiDetails.title}}</h3>
              </div>
              <div class="AI-details-time">
                <span>{{AiDetails.keyword}}</span>
                <span>{{AiDetails.add_time}}</span>
                <span>浏览：{{AiDetails.brow_count}}</span>
              </div>
              <div class="AI-details-img">
                <img @load="loadImage" :src="AiDetails.pic_url">
              </div>
            </div>
            <div class="AI-content">
              <div v-html="AiDetails.content"></div>
            </div>
          </div>
        </Scroll>
      </div>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
import VmHeader from 'base/header/header'
/*:class="[{'frame-1px': index != 1 },{'Ai-item-bot': index === 1}]"*/
export default {
  data () {
    return {
      decline: false
    }
  },
  components: {
    VmHeader,
    Scroll
  },
  methods: {
    loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
        console.log(this.AiDetails)
    },
    back () {
     this.$router.back()
    }
  },
  computed: {
    ...mapGetters([
        'AiDetails'
    ])
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.AI-details {
  z-index: 9;
  .return {
    height: .44rem;
    line-height: .44rem;
    padding: 0 .15rem;
  }
  .AI-details-main {
    position: absolute;
    left: 0;
    top: .44rem;
    bottom: 0;
    right: 0;
    .AI-details-main-pd {
      padding: .15rem;
      .AI-details-name {
        text-align:center;
        margin-bottom: .25rem;
        h3 {
          font-size: .2rem;
          line-height: .25rem;
        }
      }
      .AI-details-time {
        text-align: center;
        font-size: $font-size-small;
        margin-bottom: .25rem;
        span {
          display: inline-blockl;
          margin: 0 5px;
          color: $color-9;
        }
      }
      .AI-details-img {
         img {
           width: 100%;
           height: auto;
         }
      }
      .AI-content {
        padding-top: .15rem;
        font-size: $font-size-large;
        line-height: .28rem;
        color: #444;
        text-indent: .37rem;
      }
    }
  }
}

</style>