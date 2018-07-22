<template>
    <div class="member">
      <div class="member-list frame-1px" v-for="item in member">
        <div class="member-avatar">
          <img v-lazy="item.portrait">
        </div>
        <div class="member-details">
          <div class="member-details-top">
            <span class="member-name">{{item.real_name}}</span>
            <span>{{item.mobile}}</span>
          </div>
          <div class="member-email">
            <span>{{item.email}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    member: {
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {

  },
  components: {
  },
  created(){
  },
}  
</script>

<style lang="scss" scoped>
@import "~common/css/variable";
  .member {
   padding-bottom: .3rem;
  }
  .member-list {
     position: relative;
     display: flex;
     justify-content: space-between;
     padding: .15rem .15rem;
     .member-avatar {
        flex: 0 0 .5rem;
        width: .5rem;
        img {
           width: .5rem;
           height: .5rem;
           border-radius: 50%;
        }
     }
     .member-details {
       display: flex;
       flex: 1;
       padding-left: .1rem;
       justify-content: space-between;
       flex-direction: column;
       .member-details-top {
         display: flex;
         justify-content: space-between;
         padding-bottom: .09rem;
         .member-name {
           margin-right: .1rem;
         }
       }
     }
  }
</style>