<template>
  <div>
        <!-- Navbar -->
    <div class="fixed-top">
        <div class="navbar navbar-expand-lg" style="background-color: #4d636f;">
            <div class="container d-flex justify-content-between">
            <div>
                <a href="#" class="navbar-item btn item-list" title="Instamage"><i class="fa fa-camera w3-margin-right" ></i>Instamage</a>
            </div>
            <div>
                <a href="#" class="navbar-item btn item-list" title="Public"><i class="fa fa-globe" @click="showListForm"></i></a>
                <a href="#" class="navbar-item btn item-list" title="Account Settings" @click="showUpdateForm"><i class="fa fa-user"></i></a>
                <a href="#" class="navbar-item btn item-list" title="signout" @click="signOut"><i class="fa fa-sign-out"></i></a>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    data () {
        return {
            
        }
    },
    methods: {
        showUpdateForm () {
            this.$emit('showUpdateForm', true)
            this.$emit('showListForm', false)
        },
        showListForm () {
            this.$emit('showListForm', true)
            this.$emit('showUpdateForm', false)
        },
        signOut () {
            localStorage.clear()
            this.$emit('isLogin', false)
        }
    }
}
</script>

<style>
.item-list:hover {
    cursor: pointer;
    color: antiquewhite;
}
</style>