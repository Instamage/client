<template>
  <div>
    <Home @isLogin='isLogin' v-if="loggedIn"></Home>
    <login-register @isLogin='isLogin' v-if="!loggedIn"></login-register>
  </div>
</template>

<script>
import Home from './Views/Home'
import LoginRegister from './Views/LoginRegister'
export default {
  name: 'App',
  data () {
    return {
      loggedIn: false
    }
  },
  components : {
      Home,
      LoginRegister
  },
  methods: {
    isLogin(input) {
      this.loggedIn = input
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.loggedIn = true
    } else {
      this.loggedIn = false
    }
  }
}
</script>

<style>

</style>