<template>
  <div  ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import loadingEnd from 'base/loading-end/loading-end'
  import Bus from 'common/js/bus.js'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        threshold: -20
      },
      click: {
        type: Boolean,
        default: true
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      listenScroll: {  //是否派发滚动事件
        type: Boolean,
        default: false
      },
      startX: {
        type: Number,
        default: 0
      },
      data: {  //列表的数据
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      beforeScroll: { //是否派发列表滚动开始的事件
        type: Boolean,
        default: false
      },
      refreshDelay: {  //当数据更新后，刷新scroll的延时。
        type: Number,
        default: 20
      }
    },
    data() {
      return {
        addMoreText: ''
      }
    },
    components: {
      loadingEnd
    },
    mounted() { // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            //console.log(this.scroll.y)
            //console.log(this.scroll.maxScrollY)
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
              setTimeout(() => {
              this.addMoreText = '别扯了，已经到底了'
              Bus.$emit("addMoreText",this.addMoreText);
              },300)
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
