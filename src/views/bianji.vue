<template>
  <div class="bianji">
    <myhaeder title="编辑个人信息">
      <samp class="iconfont iconjiantou2" slot="left" @click="$router.back()"></samp>
    </myhaeder>
    <div class="head">
      <img alt :src="current.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell title="昵称" :desc="current.nickname" @click="nicshow = !nicshow" ref="nickname"></mycell>
    <!-- 添加dialog -->
    <van-dialog v-model="nicshow" title="标题" show-cancel-button @confirm="updateNickname">
      <van-field :value="current.nickname" label="昵称" placeholder="请输入昵称" ref="name" />
    </van-dialog>
    <mycell title="密码" desc="*******" @click="mimashow = !mimashow"></mycell>
    <van-dialog
      v-model="mimashow"
      title="修改密码"
      show-cancel-button
      @confirm="updateNicpass"
      :before-close="beforeClose"
    >
      <van-field required label="原密码" placeholder="请输入原密码" ref="lodpass" />
      <van-field required label="新密码" placeholder="请输入新密码" ref="jiupass" />
    </van-dialog>

    <mycell title="性别" :desc="current.gender === 1 ? '男' : '女'" @click="xinshow = !xinshow"></mycell>
    <van-dialog v-model="xinshow" title="性别" show-cancel-button @confirm="updateNixin">
      <van-picker :columns="['女','男']" :default-index="2" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
// 引入封装haeder模块
import myhaeder from '@/components/myheader'
import mycell from '@/components/mycell'
import { wenjian } from '@/api/wenjian'
import { getUserInfo, editUser } from '@/api/suers'
export default {
  // 注册
  components: {
    myhaeder,
    mycell
  },
  data () {
    return {
      id: '',
      current: {},
      nicshow: false,
      mimashow: false,
      xinshow: false,
      genderIndex: ''
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      if (this.current.head_img) {
        this.current.head_img =
          localStorage.getItem('heima_40') + this.current.head_img
      } else {
        this.current.head_img =
          localStorage.getItem('heima_40') + 'uploads/image/dafault.png'
      }
    } else {
      this.$toast.fail('获取失败')
    }
  },

  methods: {
    afterRead (file) {
      console.log(file)
      // 实现文件上传功能
      // 1.file.file就是我们需要的文件资源数据
      // 2.包装为formdata
      let formdata = new FormData()
      formdata.append('file', file.file)
      // 3.发起异步请求实现文件上传
      wenjian(formdata)
        .then(async res => {
          console.log(res)
          if (res.data.message === '文件上传成功') {
            // 实现用户头像数据的更新
            let res1 = await editUser(this.id, { head_img: res.data.data.url })
            console.log(res1)

            if (res1.data.message === '修改成功') {
              this.$toast.success('修改用户头像成功')
              // 为了即时刷新头像的显示
              this.current.head_img =
                localStorage.getItem('heima_40') + res.data.data.url
            } else {
              this.$toast.fail('修改用户头像失败')
            }
          } else {
            this.$toast.fail('文件上传失败，请重试')
          }
        })
        .catch(err => {
          console.log(err)
        })
      // 此时可以自行将文件上传至服务器
      // console.log(file)
    },
    // 修改昵称
    async updateNickname () {
      // 获取数据
      let name = this.$refs.name.$refs.input.value
      // console.log(name);
      let res = await editUser(this.id, { nickname: name })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        // 一定要记得修改:value所绑定的数据，不然页面不会进行刷新
        this.current.nickname = name
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    // 修改密码
    async updateNicpass () {
      // 获取输入框输入的原密码
      let password = this.$refs.lodpass.$refs.input.value
      // 2.判断输入的原密码是否和真正的原始密码一致
      if (this.current.password === password) {
        let mypassword = this.$refs.jiupass.$refs.input.value
        if (!/\w{3,16}/.test(mypassword)) {
          this.$toast.fail('请输入3~16位的新密码')
          return
        }
        // 3.调用api方法进行密码的更新
        let res = await editUser(this.id, { password: mypassword })
        if (res.data.message === '修改成功') {
          console.log(res)

          this.$toast.success('修改成功')
          localStorage.removeItem('heima_40')
          localStorage.removeItem('heima-token')
          this.$router.push({ name: 'Login' })
        }
        console.log(res)
      } else {
        this.$toast.fail('原始密码输入不正确')
      }
    },
    // 修改密码模态框消失前的属性监听
    // action是当前操作的类型：confirm   cancel
    // done():可以关闭当前模态框
    // done(false):不关闭当前模态框
    beforeClose (action, done) {
      // console.log(action);
      // 获取输入框输入的原密码
      let password = this.$refs.lodpass.$refs.input.value
      let mypassword = this.$refs.jiupass.$refs.input.value
      if (action === 'confirm' && this.current.password !== password) {
        this.$toast.fail('原始密码输入不正确')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(mypassword)) {
        this.$toast.fail('请输入3~16位的新密码')
        done(false)
      } else {
        done()
      }
    },
    // 修改性别
    async updateNixin () {
      let res1 = await editUser(this.id, { gender: this.genderIndex })
      // console.log(res1)
      if (res1.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        this.current.gender = this.genderIndex
      } else {
        this.$toast.fail('修改性别失败')
      }
    },
    // picker切换时触发的事件
    onChange (picker, value, index) {
      this.genderIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  /deep/.van-uploader__upload {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
  }
  // 设置元素的对齐方式
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
