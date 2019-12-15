<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- <myinptu placeholder="请输入用户名/手机号"
        :value='users.usersname'
        @input="handlerinput"
        ></myinptu> -->
        <myinptu placeholder="请输入用户名/手机号"
       v-model="users.username"
        :rules='/^1\d{10}$/'
         msg_err='手机号输入不合法，请输入11位手机号'
        ></myinptu>
        <myinptu type="password" v-model="users.password"></myinptu>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <mybutton text="登录" @click="login"></mybutton>
    </div>
  </div>
</template>

<script>
// 引入button
import mybutton from '@/components/mybutton'
import myinptu from '@/components/myinptu'
// 引入登录api方法
import { userLogin } from '@/api/suers.js'

export default {
  components: {
    mybutton,
    myinptu
  },
  data () {
    return {
      users: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login (event) {
      userLogin(this.users)
        .then(res => {
          // console.log(res)
          if (res.data.message === '登录成功') {
            localStorage.setItem('heima-token', res.data.data.token)
            // 页面跳转
            this.$router.push({ path: `/personal/${res.data.data.user.id}` })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登录失败,请重试')
        })
    },

    handlerinput (data) {
      this.users.usersname = data
    }

  }
}
</script>

<style lang="less">
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
