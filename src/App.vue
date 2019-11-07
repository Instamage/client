<template>
  <div>
    <Home @isLogin='isLogin' v-if="loggedIn"></Home>
  </div>
</template>

<script>
import Home from './Views/Home'
export default {
  name: 'App',
  data () {
    return {
      loggedIn: true
    }
  },
  components: {
    Home
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