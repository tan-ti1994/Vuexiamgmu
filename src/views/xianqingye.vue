<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="followThisUser" :class="{ active: article.has_follow }">{{
        article.has_follow ? "已关注" : "关注"
      }}</span>
    </div>
    <div class="detail">
      <div class="title">{{ article.title }}</div>
      <div class="desc">
        <span>{{ article.user && article.user.nickname }}</span> &nbsp;&nbsp;
        <span>2019-12-9</span>
      </div>
      <div
        class="content"
        v-html="article.content"
        v-if="article.type === 1"
      ></div>
      <video
        v-if="article.type === 2"
        :src="article.content"
        controls
        poster=""
      ></video>
      <div class="opt">
        <span
          class="like"
          :class="{ active: article.has_like }"
          @click="likeThisArticle"
        >
          <van-icon name="good-job-o" />{{ article.like_length }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="head">
          <img src="item.user.head_img" alt />
          <div>
            <p>{{ item.user.nickname }}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{ item.content }}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 评论区 调用组件 -->
    <mycomment :article="article"></mycomment>
  </div>
</template>

<script>
import {
  getArticleDetail,
  likeArticleById,
  getCommentsById
} from '@/api/xinewen'
import { followUser, unFollowUser } from '@/api/suers'
import mycomment from '@/components/mycommentArea'
export default {
  components: {
    mycomment
  },
  data () {
    return {
      article: {},
      commentList: []
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getArticleDetail(this.$route.params.id)
    console.log(res)
    if (res.status === 200) {
      this.article = res.data.data

      // 再次发送请求获取文章的评论数据
      let res1 = await getCommentsById(this.article.id)
      // console.log(res1)
      if (res1.status === 200) {
        this.commentList = res1.data.data.map(value => {
          value.user.hea_img =
            localStorage.getItem('heima_40') + value.user.hea_img
          return value
        })
      }
    }
  },

  // 点击关注或不关注
  methods: {
    async followThisUser () {
      let res
      // 判断当前的关注状态,如果是未关注,则调用关注方法,如果是已关注则调用取消关注方法
      if (this.article.has_follow === true) {
        // 已关注
        res = await unFollowUser(this.article.user.id)
        // 修改元素所绑定的数据,实现页面元素效果的刷新
        this.$toast.success(res.data.message)

        this.article.has_follow = false
      } else {
        // 未关注
        res = await followUser(this.article.user.id)
        // 修改元素所绑定的数据,实现页面元素效果的刷新
        this.$toast.success(res.data.message)
        // 提示
        this.article.has_follow = true
      }
      // 提示
      // this.$toast.success(res.data.message)
      // 修改元素所绑定的数据,实现页面元素效果的刷新
      // this.article.has_follow = false
      // this.article.has_follow = true
    },
    // 点赞和取消点赞
    async likeThisArticle () {
      let res = await likeArticleById(this.article.id)
      // console.log(res)
      if (res.data.message === '点赞成功') {
        // 重置点赞数量
        this.article.like_length++
        // this.article.has_like = true
      } else if (res.data.message === '取消成功') {
        // 重置点赞数量
        this.article.like_length--
      }
      this.article.has_like = !this.article.has_like
      // 提示
      this.$toast.success(res.data.message)
    }
  },

  getCommentsById
}
</script>

<style lang="less" scoped>
.articaldetail {
  padding-bottom: 50px;
}

.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border: 1px solid #ccc;
    color: #aaa;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      background-color: red;
      color: #fff;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  .active {
    color: red;
  }
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
/deep/.photo {
  img {
    width: 100% !important;
    display: block;
  }
}
video {
  width: 100%;
  margin-bottom: 10px;
}
</style>
