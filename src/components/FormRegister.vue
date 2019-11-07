<template>
  <div>
        <div class="registerForm">
        <header class="header-register">
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
                            <label for="input">email address</label>
                            <input v-model="emailRegister" type="email" class="field" name="email" placeholder="someone@example.com" value required>
                        </div>
                        <div class="form-item">
                            <label for="input">password</label>
                            <input v-model="passwordRegister" type="password" id="password" class="field" name="password" placeholder="password" value required>
                        </div>
                        <div class="form-item">
                            <button type="submit" class="reg-btn">Sign up</button>
                        </div>

                    </form>
                </div>
            </section>    
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'FormRegister',
    data: function() {
        return {
            emailRegister : '',
            passwordRegister : ''
        }
    },
    methods: {
        showLoginForm() {
            console.log('akan ke login')
            this.$emit('change-page','login')
        }
    }
}
</script>

<style>

</style>