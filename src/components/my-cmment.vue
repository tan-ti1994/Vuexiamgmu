<template>
  <div class="commentitem">
    <!-- 当前组件的调用.....递归 -->

    <mycomment
      v-if="comment.parent"
      :comment="comment.parent"
      @replayComment="sendComment"
    ></mycomment>

    <div class="head">
      <div>
        <span class="cname">{{ comment.user.nickname }}</span>
        <span>2小时前</span>
      </div>
      <span @click="sendComment(comment)">回复</span>
    </div>
    <div class="text">{{ comment.content }}</div>
  </div>
</template>

<script>
// import mycommentArea from '../components/mycommentArea'
export default {
  components: {
    // mycommentArea
  },
  name: 'mycomment',
  props: ['comment'],
  methods: {
    sendComment (comment) {
      this.$emit('replayComment', comment)
    }
  }
}
</script>

<style lang="less" scoped>
.commentitem {
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      display: flex;
      > span {
        font-size: 12px;
        color: #999;
      }
      .cname {
        margin-right: 10px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 13px;
    color: #333;
    padding: 10px 0;
  }
}
</style>
