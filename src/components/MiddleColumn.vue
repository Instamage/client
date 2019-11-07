<template>
  <div>
      <div class="col-12">
        <update-profile v-if="updateForm"></update-profile>
        <div class="row" v-if="showList">
            <div class="col">
                <div class="card shadow p-3 mb-5 ">
                    <form @submit.prevent="createPhoto()" enctype="multipart/form-data">
                        <div class="container p-1">
                            <h6 class="">What's your mood today ?</h6>
                            <div class="custom-file">
                                <input @change="previewImage" id="input-file" class="custom-file-input" type="file" />
                                <label class="custom-file-label" for="validatedCustomFile"></label>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                                <div class="image-preview" v-if="imageData.length > 0">
                                    <img class="preview" :src="imageData" width="100%">
                                </div>
                            </div>
                            <h6>Captions</h6>
                            <input type="text" class="form-control" v-model="captions">
                            <br>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-isi" type="submit" >Create Post</button>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
        <div class="container card shadow p-3 mb-5 bg-white rounded">
            <div class="row">
                <h6 class="m-3">Username</h6>
            </div>
            <div class="col">
                 <div class="row">
                <!-- <img :src="url" alt="Avatar" class="left circle margin-right" width="100%"> -->
                <img src="https://media.suara.com/pictures/480x260/2014/04/21/shutterstock_123414550.jpg" alt="Avatar" width="100%" class="img-thumbnail">
            </div>
            <div class="row">
                <!-- <p>{{captions}}</p> -->
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div class="row justify-content-between">
                <button class="btn btn-isi" @click="like(_id)"><i class="fa fa-thumbs-up"></i>  Like</button>
                <p>Total Like: </p>
            </div>
            <br>
            <div class="row">
                <button class="btn btn-isi" @click="comment(_id)"><i class="fa fa-comment"></i>  Comment</button>
            </div>
            
            </div>
        </div>  

        <div class="container card shadow p-3 mb-5 bg-white rounded">
            <div class="row">
                <h6 class="m-3">Username</h6>
            </div>
            <div class="col">
                 <div class="row">
                <!-- <img :src="url" alt="Avatar" class="left circle margin-right" width="100%"> -->
                <img src="https://media.suara.com/pictures/480x260/2014/04/21/shutterstock_123414550.jpg" alt="Avatar" width="100%">
            </div>
            <div class="row">
                <!-- <p>{{captions}}</p> -->
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            
            <button class="btn btn-isi"><i class="fa fa-thumbs-up"></i>  Like</button> 
            <button class="btn btn-isi"><i class="fa fa-comment"></i>  Comment</button>
            </div>
        </div>  

        <!-- End Middle Column -->
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'
import UpdateProfile from './UpdateProfile';
export default {
    name: 'MiddleColumn',
    props: ['updateForm', 'showList'],
    components: {
        UpdateProfile
    },
    data () {
        return {
            imageData: '',
            captions: '',
            formUploadImage: {
                image: ''
            },
            url: ''
        }
    },
    methods: {
         previewImage (event) {
            var input = event.target
            if (input.files && input.files[0]) {
                var reader = new FileReader()
                reader.onload = (e) => {
                    this.imageData = e.target.result
                }
            reader.readAsDataURL(input.files[0])
            }
            this.formUploadImage.image = event.target.files[0]
        },
        createPhoto() {
            if (!this.formUploadImage.image) {
                swal.fire({
                type: 'error',
                title: 'failed to upload file ',
                text: 'Cannot be empty',
                showConfirmButton: false,
                timer: 2000
                })
            } else {
                swal.fire({
                    title: 'wait a minute to upload data',
                    allowOutsideClick: () => this.swal.isLoading(),
                    showConfirmButton: false
                })
                let { image } = this.formUploadImage
                var bodyFormData = new FormData()
                bodyFormData.append('images', image)
                bodyFormData.append('captions', this.captions)
                axios({
                    url: 'http://localhost:3000/upload',
                    method: 'post',
                    data: bodyFormData
                })
                .then (({ data }) => {
                    console.log(data)
                    swal.close()
                    swal.fire({
                        title: 'Success Creating a new Post',
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    this.imageData = ''
                    this.formUploadImage.image = ''
                    this.captions = ''
                    this.url = ''
                })
                .catch (err => {
                    swal.close()
                    swal.fire({
                        title: 'Failed creating new post',
                        type: 'error',
                        showConfirmButton: false,
                        text: err.response.data,
                        timer: 2000
                    })
                })
            }
        }
    }
}
</script>

<style>
.btn-isi {
    background-color: teal;
    color: antiquewhite;
}
.btn-isi:hover {
    background-color: rgba(107, 133, 133, 0.856);
}
</style>