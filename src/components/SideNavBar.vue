<template>
    <div class="col-3">
        <div class="card shadow p-3 mb-5 bg-white rounded">
            <div class="m-2">
            <h4 class="w3-center">My Profile</h4>
            <img src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg" class="rounded-circle" width="100%" alt="Avatar">
            <hr>
            <p><i class="fa fa-address-card-o fa-fw "></i> {{username}}</p>
            <!-- <p><i class="fa fa-home fa-fw "></i> London, UK</p>
            <p><i class="fa fa-birthday-cake fa-fw "></i> April 1, 1988</p> -->
            </div>
        </div>
        <br>    
        <div class="card shadow p-3 mb-5 bg-white rounded">
                <button @click="showPublicFeed" class="btn sidenavbar-item"><i class="fa fa-globe"></i> Public</button>
                <br>
                <button @click="showFavoriteFeed" class="btn sidenavbar-item"><i class="fa fa-users"></i> Your feed</button>     
        </div>
    <br>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SideNavBar',
    data() {
        return {
            profilePicture: '',
            arrData: [],
            username: localStorage.getItem('username')
        }
    },
    methods: {
        showPublicFeed () {
            axios({
                url: 'http://localhost:3000/posts/all',
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                this.arrData = data.reverse()
                this.$emit('showListForm', {arrData: this.arrData, status:true })
                this.$emit('showUpdateForm', false)
                console.log(data)
            })
            .catch (err => {
                console.log(err)
            })
            
        },
        showFavoriteFeed () {
            axios({
                url: 'http://localhost:3000/posts',
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                console.log(data)
                this.arrData = data.reverse()
                this.$emit('showListForm', {arrData: this.arrData, status:true })
                this.$emit('showUpdateForm', false)
            })
            .catch (err => {
                console.log(err)
            })
        },
    }
}
</script>

<style>
/* .sidenavbar-item:hover{
    background-color: #4d636f;
} */
.sidenavbar-item {
    background-color: teal;
    color: antiquewhite;
}
.sidenavbar-item:hover {
    background-color: rgba(107, 133, 133, 0.856);
}
</style>