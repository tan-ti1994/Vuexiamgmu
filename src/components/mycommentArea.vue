<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span
        class="comment"
        @click="$router.push({ path: `/comments/${article.id}` })"
      >
        <i class="iconfont iconpinglun-"></i>
        <em>{{}}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ active: article.has_star }"
        @click="collectThisArticle"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" :placeholder="placeholder"></textarea>
      <div>
        <p @click="send">发送</p>
        <span @click="cancelReplay">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { collectArticleById, sendComment } from '@/api/xinewen'

export default {
  props: ['article', 'replayObj'],
  data () {
    return {
      isFocus: false,
      placeholder: ''
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
    // 点击收藏和取消收藏
    async collectThisArticle () {
      let res = await collectArticleById(this.article.id)
      //   console.log(res)
      //   提示
      this.$toast.success(res.data.message)
      //   取反
      this.article.has_star = !this.article.has_star
    },
    // 取消评论
    cancelReplay () {
      this.isFocus = false
      // 告诉父组件数据要重置
      this.$emit('resetValue')
    },
    // 发布评论
    async send () {
      let data = {
        content: this.$refs.commtext.value
      }
      let res = await sendComment(this.article.id, data)
      // console.log(res);
      if (res.data.message === '评论发布成功') {
        this.$toast.success(res.data.message)
        this.$refs.commtext.value = ''
        // 通知父组件进行刷新
        this.$emit('refresh')
      }
    }
  },
  watch: {
    // 监听replayObj的变化
    replayObj () {
      if (this.replayObj) {
        this.isFocus = true
        this.placeholder = '@' + this.replayObj.user.nickname
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  position: fixed;
  bottom: 0;
  left: 0;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  p {
    background: greenyellow;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 6px;
    color: #fff;
    font-size: 13px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 20px;
  }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 6px;
      top: -6px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 1px 0px;
    }
  }
  > i {
    flex: 1;
  }
}
.active {
  color: red;
}
</style>
