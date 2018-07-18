<template>
<div>
    <div class="AI-list">
      <div v-for="(item,key) in AI"  :key="key" class="Ai-item frame-1px" @click="AiDetails(item)">
        <div class="Ai-item-left">
          <div class="Ai-item-title text-execeeded-2">
            <span>{{item.title}}</span>
          </div>
          <div class="Ai-item-details">
            <span>{{item.add_time | formatDate}}</span>
            <span>浏览: {{item.brow_count}}</span>
          </div>
        </div>
        <div v-if="item.pic_url != 0" class="Ai-item-right">
          <img v-lazy="item.pic_url">
        </div>
      </div>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import {formatDate} from 'common/js/timestamps';
/*:class="[{'frame-1px': index != 1 },{'Ai-item-bot': index === 1}]"*/

export default {
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
  computed: {
    ...mapGetters([
        'projectDetails'
    ])
  },
  methods: {
    AiDetails (item) {
      this.$router.push({
        //path: '/index/${projectDetails.project_id}/AI/AiDetails'
        path: '/index/${projectDetails.project_id}/${item.news_id}'
      })
      this.setAiDetails(item)
    },
    ...mapMutations({
        setAiDetails: 'GET_AI_DETAILS'
    })
  }
}  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~common/css/variable";

.AI-list {
  padding: 0 0.1rem .15rem;
  position: relative;
  .Ai-item {
    display: flex;
    position: relative;
    padding: .14rem 0;
    .Ai-item-left {
      display: flex;
      min-height: .62rem;
      padding: .05rem .15rem .05rem 0;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .Ai-item-title {
        line-height: .18rem;
        font-size: $font-size-medium-x;
      }
      .Ai-item-details {
        display: flex;
        justify-content: space-between;
        font-size: $font-size-small;
        color: $color-9;
      }
    }
    .Ai-item-right {
      flex: 0 0 1rem;
      width: 1rem;
      img {
        width: 100%;
        height: .7rem;
      }
    }
  }
  .Ai-item-bot {
    padding: .14rem 0 0 0;
  }
}

</style>