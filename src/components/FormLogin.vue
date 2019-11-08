<template>
  <div>
    <div class="registerForm">
        <header class="header-login">
            <div class="border"></div>
        </header>
        <section class="section-login">

                <div class="signin">
                    <h1 class="h1-login">Sign in</h1>
                    <p class="accountb">Don't have an account? <a href="#" v-on:click="showRegisterForm()">Sign up</a></p>
                        <div class="form-item">
                            <label for="input">email address / username</label>
                            <input v-model="emailSignIn" type="email" class="field" name="email" placeholder="someone@example.com" value required>
                        </div>
                        <div class="form-item">
                            <label for="input">password</label>
                            <input v-model="passwordSignIn" type="password" class="field" name="password" placeholder="password" value required>
                        </div>
                        <div class="form-item">
                            <input type="checkbox" id="cbox1" value="first_checkbox" checked>
                            <label for="cbox1">Remember Me</label>
                        </div>
                        <div class="form-item">
                            <button v-on:click.prevent="login()" type="button" class="signin-btn">Sign in</button>
                        </div>
                        <a href="#" class="forgot">Forgot Password?</a>
                </div>
        </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
    name: 'FormLogin',
    data: function() {
        return {
            emailSignIn: '',
            passwordSignIn: ''
        }
    },
    methods: {
        showRegisterForm() {
            console.log('akan ke register')
            this.$emit('change-page','register')
        },
        login() {
            console.log(this.passwordSignIn)
            console.log(this.emailSignIn)
            swal.fire({
                title: 'logging user',
                allowOutsideClick: () => this.swal.isLoading(),
                showConfirmButton: false
            })
            axios({
                method: 'post',
                url: 'https://instamage-server.sigitariprasetyo.xyz/users/signin',
                data: {
                    identity : this.emailSignIn,
                    password: this.passwordSignIn
                }
            })
            .then(({data}) => {
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('image_url', data.image_url)
                this.$emit('isLogin', true)
                swal.close()
                swal.fire({
                    title: `Welcome to Instamage ${data.username}`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            })
            .catch (err => {
                // console.log(err.response.data.msg)
                swal.close()
                swal.fire({
                    title: 'Failed Logging',
                    icon: 'error',
                    showConfirmButton: false,
                    text: err.response.data.msg,
                    timer: 2000
                })
            })
        }
    }
}
</script>

<style>

</style>