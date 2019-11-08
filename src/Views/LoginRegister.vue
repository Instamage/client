<template>
    <div>
        <form-login v-on:change-page='changePage' v-if="page === 'login'" @isLogin='isLogin'></form-login>
        <form-register v-on:change-page='changePage' v-else-if="page == 'register'"></form-register>
    </div>
</template>

<script>
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'
export default {
    name: 'LoginRegister',
    components: {
        FormLogin,
        FormRegister
    },
    data: function() {
        return {
            page: 'login'
        }
    },
    methods: {
        changePage(name) {
            console.log(name)
            this.page = name
        },
        isLogin (input) {
            this.$emit('isLogin', input)
        }
    }
}
</script>

<style>

</style>