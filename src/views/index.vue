<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" @click="june"/>
    </div>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <!-- vant中的组件：list列表  上拉加载-->
        <!-- immediate-check 关闭加载第一屏的数据-->
        <van-list
          :immediate-check="false"
          offset:10
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 下拉刷新 -->
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <!-- 动态渲染新闻数据 -->
            <articleBlockfrom
              v-for="post in cate.postList"
              :key="post.id"
              :post="post"
            ></articleBlockfrom>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { lanMu } from '@/api/cate'
import { getArticleList } from '@/api/xinewen'
import articleBlockfrom from '@/components/myarticleBlock'

export default {
  components: {
    articleBlockfrom
  },
  data () {
    return {
      active: localStorage.getItem('heima-token') ? 1 : 0,
      cateList: []
    }
  },
  watch: {
    active () {
      // 获取当前栏目的新闻数据
      // 如果当前栏目的新闻列表数据长度为0,说明还没有获取过这个栏目的新闻数据，那么就需要发起请求获取数据
      // 如果已经有数据，则无需再次发起请求
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  // 获取所有栏目数据
  async mounted () {
    let res = await lanMu()
    // console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      // 对数据进行改造，添加能够满足业务需求的成员
      this.cateList = this.cateList.map(value => {
        return {
          ...value, // 保留之前栏目的属性
          postList: [], // 当前栏目的新闻列表数据
          pageIndex: 1, // 当前栏目的页码
          pageSize: 6, // 当前栏目每页所显示的新闻数量
          loading: false, // 当前栏目的加载状态默认为不在加载数据
          finished: false, // 数据是否已经完毕加载完毕，默认为没有完毕
          isLoading: false
        }
      })
      this.getPostList()
    }
  },
  methods: {
    // 跳转到个人中心页
    june () {
      this.$router.push({ path: `Personal/${window.localStorage.getItem('heima_id')}` })
    },
    // 获取栏目的新闻数据
    async getPostList () {
      // 获取默认栏目的新闻数据
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex, // 默认栏目页码数
        pageSize: this.cateList[this.active].pageSize, // 默认栏目每页的记录数
        category: this.cateList[this.active].id // 默认栏目id
      })
      console.log(res)
      // 新闻数据存储在当前栏目的postList中，每个栏目都有一个单独的文章列表数组
      // this.cateList[this.active].postList = res.data.data
      this.cateList[this.active].postList.push(...res.data.data)
      // 获取数据后将loading重置为false
      this.cateList[this.active].loading = false
      // 下拉刷新
      // 重置isLoading,让下拉刷新的提示消失
      this.cateList[this.active].isLoading = false

      // 判断数据是否加载完毕
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    // 下拉加载更多数据
    onLoad () {
      // 加载下一页
      // 页码数 + 1
      this.cateList[this.active].pageIndex++
      // 2.根据新的页码数获取数据
      this.getPostList()
    },
    // 下拉刷新
    onRefresh () {
      // 1.重新加载当前列表第一页的数据
      this.cateList[this.active].pageIndex = 1
      // 重置为false的作用就是让这个栏目可以重新的上拉加载更多数据
      this.cateList[this.active].finished = false
      // 清除数组的所有数据，可以避免反复的创建新的数组
      this.cateList[this.active].postList.length = 0
      // 获取数据
      this.getPostList()
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: red;
    align-items: center;
  }
  .icon {
    font-size: 25px;
    color: #fff;
    padding: 0 10px;
  }
  .iconnew {
    font-size: 60px;
  }
  .center {
    height: 40px;
    flex: 1;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
