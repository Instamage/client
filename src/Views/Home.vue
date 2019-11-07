<template>
  <div>
      <nav-bar @showListForm='showFormList' @showUpdateForm='showFormUpdate' @isLogin='isLogin'></nav-bar>
      <div class="container " style="max-width:1400px;margin-top:80px">    
        <!-- The Grid -->
        <div class="test"> 
            <side-nav-bar></side-nav-bar>
            <!-- Middle Column -->          
            <middle-column :showList='showList' :updateForm='updateForm'></middle-column>
            
            <!-- Right Column -->
            <!-- <right-column></right-column> -->
            
        <!-- End Grid -->
        </div>
        
    <!-- End Page Container -->
    </div>
    <br>

    <!-- Footer -->
    <footer class="container w3-theme-d3 w3-padding-16">
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
            loggedIn: true
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
        }
    },
    watch: {
        loggedIn: fun
    }
}
</script>

<style>
.test {
    display: flex;
    flex-direction: row;
}
</style>