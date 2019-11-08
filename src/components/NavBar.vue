<template>
  <div>
        <!-- Navbar -->
    <div class="fixed-top">
        <div class="navbar navbar-expand-lg" style="background-color: #4d636f;">
            <div class="container d-flex justify-content-between">
            <div>
                <a href="#" class="navbar-item btn item-list" title="Instamage" ><i class="fa fa-camera w3-margin-right" ></i>Instamage</a>
            </div>
            <div>
                <a href="#" class="navbar-item btn item-list" title="Public" @click="showListForm"><i class="fa fa-globe"></i></a>
                <a href="#" class="navbar-item btn item-list" title="Account Settings" @click="showUpdateForm"><i class="fa fa-user"></i></a>
                <a href="#" class="navbar-item btn item-list" title="signout" @click="signOut"><i class="fa fa-sign-out"></i></a>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NavBar',
    data () {
        return {
            arrData: []
        }
    },
    methods: {
        showUpdateForm () {
            this.$emit('showUpdateForm', true)
            this.$emit('showListForm', {status: false})
        },
        showListForm () {
            this.fetchData()
            this.$emit('showListForm', {arrData: this.arrData, status:true })
            this.$emit('showUpdateForm', false)
        },
        signOut () {
            localStorage.clear()
            this.$emit('isLogin', false)
        },
        fetchData () {
            axios({
                url: 'http://localhost:3000/posts/all',
                method: 'get'
            })
            .then (({ data }) => {
                this.arrData = data.reverse()
                console.log(data)
            })
            .catch (err => {
                console.log(err)
            })
        }
    },
    created () {
        this.showListForm()
    }
}
</script>

<style>
.item-list:hover {
    cursor: pointer;
    color: antiquewhite;
}
</style>