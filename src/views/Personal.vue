<template>
  <div class="personal">
    <router-link :to="`/edit_profile/` + currentUser.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{ currentUser.nickname }}
          </div>
          <div class="time">2019-12-14</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title="我的关注" desc="关注的用户"></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频"></mycell>
    <mycell title="设置" desc></mycell>
    <div class="ict">
      <mybutton text="退出"></mybutton>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/suers.js'
import mycell from '@/components/mycell'
import mybutton from '@/components/mybutton'

export default {
  data () {
    return {
      currentUser: {}
    }
  },
  components: {
    mycell,
    mybutton
  },
  mounted () {
    let id = this.$route.params.id
    getUserInfo(id)
      .then(res => {
        // console.log(res)
        if (res.data.message === '获取成功') {
          this.currentUser = res.data.data
          // 返回的数据可能没有图片数据，那么我们应该进行判断，
          // 如果有图片数据，则设置为当前图片，如果没有图片数据则需要设置为默认图片
          if (this.currentUser.head_img) {
            this.currentUser.head_img =
              localStorage.getItem('heima_40') + this.currentUser.head_img
          } else {
            // 没有数据的话返回给默认图片
            this.currentUser.head_img =
              localStorage.getItem('heima_40') + '/uploads/image/default.png'
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.$toast.fail('获取数据失败')
      })
  }
}
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }

  .ict {
  align-items: center;
}
}

</style>
