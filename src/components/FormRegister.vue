<template>
  <div>
        <div class="registerForm">
        <header class="header-login">
            <div class="border"></div>
        </header>
        
        <section class="section-login">
           <div class="form">
               
               <!-- Sign up / Registration Form -->
               
                <div class="register">
                    <h1 class="h1-login">Join for free!</h1>
                    <p class="accounta">Already have an account? <a href="#" v-on:click.prevent="showLoginForm()">Sign in</a></p>
                    <form>
                        <div class="form-item">
                            <label for="input">username</label>
                            <input v-model="username" type="text" class="field" name="email" placeholder="username" value required>
                        </div>
                        <div class="form-item">
                            <label for="input">email address</label>
                            <input v-model="emailRegister" type="email" class="field" name="email" placeholder="someone@example.com" value required>
                        </div>
                        <div class="form-item">
                            <label for="input">password</label>
                            <input v-model="passwordRegister" type="password" id="password" class="field" name="password" placeholder="password" value required>
                        </div>
                        <div class="form-item">
                            <button v-on:click.prevent="signUp()" type="button" class="reg-btn">Sign up</button>
                        </div>

                    </form>
                </div>
            </section>    
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
    name: 'FormRegister',
    data: function() {
        return {
            username: '',
            emailRegister : '',
            passwordRegister : ''
        }
    },
    methods: {
        showLoginForm() {
            console.log('akan ke login')
            this.$emit('change-page','login')
        },
        signUp() {
            swal.fire({
                title: 'creating a new user',
                allowOutsideClick: () => this.swal.isLoading(),
                showConfirmButton: false
            })
            axios({
                method: 'post',
                url: 'https://instamage-server.sigitariprasetyo.xyz/users/signup',
                data: {
                    username: this.username,
                    email: this.emailRegister,
                    password: this.passwordRegister
                }
            })
            .then(({data}) => {
                this.$emit('change-page','login')
                console.log(data)
                swal.close()
                swal.fire({
                    title: `Success creating new user`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            })
            .catch(err => {
                swal.close()
                swal.fire({
                    title: 'Failed creating new user',
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