<template>
  <div>
    <Home @isLogin='isLogin' v-if="loggedIn"></Home>
    <login-register></login-register>
  </div>
</template>

<script>
import Home from './Views/Home'
import LoginRegister from './Views/LoginRegister'
export default {
  name: 'App',
  data () {
    return {
      loggedIn: true
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
  }
}
</script>

<style>

</style>