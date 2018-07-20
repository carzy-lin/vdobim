<template>
  <div class="base-information">
    <Scroll ref="scroll" class="vm-scroll">
      <div>
        <div class="project-img">
          <img @load="loadImage" :src="projectDetails.pic_url">
        </div>
        <div class="project-info-list">
          <div class="project-info-item frame-1px">
            <label>项目名称 :</label><span>{{projectDetails.project_name}}</span>
          </div>
          <div class="project-info-item frame-1px">
            <label>建设单位 :</label><span>{{projectDetails.build_unit}}</span>
          </div>
          <div class="project-info-item frame-1px">
            <label>设计单位 :</label><span>{{projectDetails.design_unit}}</span>
          </div>
          <div class="project-info-item frame-1px">
            <label>施工单位 :</label><span>{{projectDetails.constrution}}</span>
          </div>
          <div class="project-info-item frame-1px">
            <label>监理单位 :</label><span>{{projectDetails.supervision}}</span>
          </div>
          <div class="project-info-item frame-1px">
            <label>BIM单位 :</label><span>{{projectDetails.bim_unit}}</span>
          </div>
          <div class="project-info-item frame-1px">
            <label>项目地址 :</label><span>{{projectDetails.address}}</span>
          </div>
          <div class="project-info-item frame-1px">
            <label>项目简介 :</label><span>{{projectDetails.content}}</span>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'

export default {
 methods: {
   loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
    }
 },
 computed: {
    ...mapGetters([
        'projectDetails'
    ])
 },
 components: {
    Scroll
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.base-information {
  height: 100%;
  .project-img {
    position: relative;
    height: 1.8rem;
    overflow: hidden;
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: 100%;
        height: auto;
        transform: translate3d(-50%, -50%, 0);
    }
  }
  .project-info-list {
    overflow: hidden;
    .project-info-item {
      display: flex;
      flex: 1;
      position: relative;
      padding: .08rem .15rem;
      align-items: center;
      label {
        display: flex;
        font-weight: 400;
        color: #000;
        padding-right: .05rem;
      }
      span {
        display: flex;
        flex: 1;
        padding-left: .05rem;
        line-height: .2rem;
        word-wrap:break-word;
        color: #666;
      }
    }
  }
}
</style>