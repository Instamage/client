<template>
  <div>
    <Home></Home>
    <login-register></login-register>
  </div>
</template>

<script>
import Home from './Views/Home'
import LoginRegister from './Views/LoginRegister'
export default {
    name : 'App',
    components : {
      Home,
      LoginRegister
    }
}
</script>

<style>

</style>