<template>
  <div>
      <nav-bar @showListForm='showFormList' @showUpdateForm='showFormUpdate' @isLogin='isLogin'></nav-bar>
      <div class="container " style="margin-top:80px">    
        <div class="main-body"> 
            <side-nav-bar @showListForm='showFormList' @showUpdateForm='showFormUpdate'></side-nav-bar>         
            <middle-column :showList='showList' :updateForm='updateForm' class="col"></middle-column>
        </div>
    </div>
    <footer class="footer-home">
    <h5>Footer</h5>
    </footer>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import SideNavBar from '../components/SideNavBar'
import MiddleColumn from '../components/MiddleColumn'
// import RightColumn from '../components/RightColumn'
export default {
    name: 'Home',
    components: {
        NavBar,
        SideNavBar,
        MiddleColumn
    },
    data () {
        return {
            updateForm: false,
            showList: true,
            loggedIn: {
                status:true
            }
        }
    },
    methods: {
        showFormList (input) {
            this.showList = input
        },
        showFormUpdate (input) {
            this.updateForm = input
        },
        isLogin (input) {
            this.loggedIn = input
            this.$emit('isLogin', this.loggedIn)
        }
    }
}
</script>

<style>
.main-body {
    display: flex;
    flex-direction: row;
}
.footer-home {
    background-color: #4d636f;
    height: 100px;
}
</style>