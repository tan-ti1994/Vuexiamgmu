<template>
  <div class="search">
    <div class="header">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
      <van-search
        v-model="userkey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <span @click="search(userkey)">搜索</span>
    </div>
    <div class="searchList">
      <h2>历史记录</h2>
      <p v-for="(item, index) in shuzhu" :key="index" @click="search(item)">
        {{ item }}
      </p>
    </div>
    <div class="searchResult">
      <h2>搜索结果</h2>
      <p v-for="item in searchLis" :key="item.id">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
import { searchArticle } from '@/api/xinewen'
export default {
  data () {
    return {
      userkey: '',
      searchLis: [],
      shuzhu: []
    }
  },
  mounted () {
    // 1.获取当前的可能拥有的本地存储数据
    let arrStr = localStorage.getItem('toutiao_40_history') || '[]'
    // 2.将字符串转换为数组
    let arr = JSON.parse(arrStr)
    this.shuzhu = arr
  },
  methods: {
    async search (item) {
      if (item.trim() === '') {
        this.$toast('请输入关键字')
        return
      }

      let res = await searchArticle({ keyword: item || this.userkey })
      console.log(res)
      if (res.status === 200) {
        this.searchLis = res.data.data
        // 1.获取当前可能拥有的本地存储
        let arrStr = localStorage.getItem('toutiao_40_history') || '[]'
        // 2.将字符窜转数组
        let arr = JSON.parse(arrStr)
        // 3.将当前搜素的关键字添加到数组中
        // 3.1判断当前关键字是否已存在如果存在 ，则先删除，再添加
        let index = arr.indexOf(item.userkey)
        if (index !== -1) {
          // 说明这个关键字已经存在
          arr.splice(index, 1)
          //   3.2 如果超出了指定的记录数量，那么应该删除最先存储的记录，再添加
          if (arr.length > 5) {
            arr.splice(arr.length - 1, 1)
          }
        }
        arr.unshift(this.userkey)
        // 4. 5. 将搜索关键字存储到本地存储:转换 + 存储
        localStorage.setItem('toutiao_40_history', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 54 * 100vw/360;
  display: flex;
  align-items: center;
  background-color: #eee;
  border-bottom: 1px solid #bbb;
  .van-search {
    flex: 1;
    height: 54 * 100vw/360;
    background-color: #eee !important;
  }
  > span {
    padding: 0 10px;
  }
}
.searchList,
.searchResult {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  p {
    line-height: 30px;
    text-decoration: underline;
  }
}
</style>
