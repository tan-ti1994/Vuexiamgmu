<template>
  <div id="register">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <myinptu
          placeholder="请输入用户名/手机号"
          v-model="users.username"
          :rules="/^1\d{10}$/"
          msg_err="手机号输入不合法，请输入11位手机号"
        ></myinptu>
        <myinptu
          type="password"
          v-model="users.password"
          placeholder="请输入密码"

        ></myinptu>
        <myinptu v-model="users.nickname" placeholder="请输入昵称"></myinptu>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/Login" class>去登陆</a>
      </p>
      <mybutton text="注册" @click="register"></mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton'
import myinptu from '@/components/myinptu'
import { userRegister } from '../api/suers'
export default {
  data () {
    return {
      users: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    mybutton,
    myinptu
  },
  methods: {
    async register () {
      if (
        this.users.nickname !== '' &&
        /^\w{3,16}$/.test(this.users.password) &&
        /^1\d{10}$/.test(this.users.username)
      ) {
        let res = await userRegister(this.users)

        if (res.data.message === '注册成功') {
          this.$toast.success('注册成功')
          this.$router.push({ path: '/login' })
        } else {
          this.$toast.fail('注册失败')
        }
      } else {
        this.$toast.fail('请输入密码和昵称')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(224, 224, 224);
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
