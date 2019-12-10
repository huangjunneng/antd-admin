<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/static/img/vue-antd-logo.png" />
          <span class="title">{{systemName}}</span>
        </div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :form="form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
              <a-form-item  >
                <a-input size="large" placeholder="admin" v-decorator="[ 'username', { rules: [{ required: true, message: 'Please input your username!' }] }]">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item >
                <a-input size="large" placeholder="888888" type="password" v-decorator="[ 'password', { rules: [{ required: true, message: 'Please input your password!' }] }]">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane tab="手机号登录" key="2">
              <a-form-item>
                <a-input size="large" placeholder="mobile number" >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <div>
            <a-checkbox :checked="true" >自动登录</a-checkbox>
            <a style="float: right">忘记密码</a>
          </div>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
          <div>
            其他登录方式
            <a-icon class="icon" type="alipay-circle" />
            <a-icon class="icon" type="taobao-circle" />
            <a-icon class="icon" type="weibo-circle" />
            <router-link style="float: right" to="/dashboard/workplace" >注册账户</router-link>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      logging: false,
      form: this.$form.createForm(this, { name: 'normal_login' }),
      error: ''
    }
  },
  computed: {
    systemName () {
      return 'Vue Antd Admin'
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          this.$store.dispatch('user/login', values).then((result) => {
            this.$router.push({ path: this.redirect || '/' })
            // this.$store.dispatch('menulist/getMenuList')
            this.logging = false
          }).catch((error) => {
            this.logging = false
            this.error = error.message
          })
        //   this.$axios.post('/login', {
        //     name: this.form.getFieldValue('name'),
        //     password: this.form.getFieldValue('password')
        //   }).then((res) => {
        //     this.logging = false
        //     const result = res.data
        //     if (result.code >= 0) {
        //       const user = result.data.user
        //       this.$router.push('/dashboard/workplace')
        //       this.$store.commit('account/setuser', user)
        //       this.$message.success(result.message, 3)
        //     } else {
        //       this.error = result.message
        //     }
        //   })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #2d3a4b ;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 50px auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
