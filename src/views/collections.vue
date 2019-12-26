<template>
  <div class="clooww">
    <myheader title="我的收藏">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </myheader>
    <div class="list">
      <myarticleBlock
        v-for="item in collectList"
        :key="item.id"
        :post="item"
      ></myarticleBlock>
    </div>
  </div>
</template>

<script>
import myheader from '../components/myheader'
import myarticleBlock from '../components/myarticleBlock'
import { getMyCollections } from '../api/suers'
export default {
  data () {
    return {
      collectList: []
    }
  },
  components: {
    myheader,
    myarticleBlock
  },
  async mounted () {
    let res = await getMyCollections()
    console.log(res)
    if (res.status === 200) {
      this.collectList = res.data.data
    }
  }
}
</script>

<style></style>
