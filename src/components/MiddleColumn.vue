<template>
  <div>
      <div class="col-12">
        <update-profile v-if="updateForm" @image_url='imageUrl'></update-profile>
        <div v-if="showList.status">
            <div class="row" >
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
                                <!-- <h6>Captions</h6> -->
                                <input type="text" placeholder="caption" class="form-control" v-model="captions">
                                <br>
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn-isi" type="submit" >Create Post</button>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
            <div v-for="(data, index) in showList.arrData" :key="index">
            <div class="container card shadow p-3 mb-5 bg-white rounded">
                <div class="row align-items-center">
                    <img v-bind:src="data.userId.profile_img" style="width: 10%; padding-left: 15px"/> 
                    <h6 class="m-3"><b>{{data.userId.username}}</b></h6>
                </div>
                <div class="col">
                    <div class="row">
                    <img :src="data.image_url" alt="Avatar" class="img-thumbnai" width="100%">
                    <!-- <img src="https://media.suara.com/pictures/480x260/2014/04/21/shutterstock_123414550.jpg" alt="Avatar" width="100%" class="img-thumbnail"> -->
                </div>
                <div class="row">
                    <!-- <p>{{captions}}</p> -->
                    <p><b>{{data.userId.username}}</b> {{data.caption}}</p>
                </div>
                <div class="row justify-content-start" style="display: flex; justify-content: flex-start;">
                    <button class="btn btn-isi" @click="like(data._id)"><i class="fa fa-thumbs-up"></i> {{data.Likes.length}} </button>
                    <button class="btn btn-isi ml-1" @click="comment(data)" data-target="#commentForm" data-toggle="modal"><i class="fa fa-comment"> {{data.comments.length}} </i></button>
                </div>
                <br>
            </div>
        </div>
    </div>
    <div class="modal fade" id="commentForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Comments</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group" v-for="(comment, index) in data.comments" :key="index">
                                <p><b>{{comment.username}}</b> {{comment.comment}}</p>
                            </div>
                            <form >
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="comment ..." v-model="userComment">
                            </div>
                            </form>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-isi" data-dismiss="modal" @click="createComment">Comment</button>
                            </div>
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn bg-warning" data-dismiss="modal" >Sign In</button>
                        </div> -->
                        </div>
                    </div>
                    </div>
                </div>
            </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'
import UpdateProfile from './UpdateProfile'
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
            url: '',
            userComment: '',
            data: {

            }
        }
    },
    methods: {
        imageUrl (input) {
            this.url = input
            this.$emit('url', this.url)
        },
        createComment () {
            console.log('masuk')
            axios({
                url: `http://localhost:3000/posts/comment/${this.data._id}`,
                method: 'post',
                data: {
                    comment: this.userComment
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                this.fetchingData()
                console.log(data)
                this.id = ''
                this.userComment = ''
            })
            .catch (err => {
                console.log(err)
            })
        },
        comment (id) {
            this.data = id
            console.log(this.data)
        },
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
                icon: 'error',
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
                bodyFormData.append('image', image)
                bodyFormData.append('caption', this.captions)
                axios({
                    url: 'http://localhost:3000/posts',
                    method: 'post',
                    data: bodyFormData,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then (({ data }) => {
                    console.log(data)
                    swal.close()
                    swal.fire({
                        title: 'Success Creating a new Post',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    this.imageData = ''
                    this.formUploadImage.image = ''
                    this.captions = ''
                    this.url = ''
                    this.fetchingData()
                })
                .catch (err => {
                    swal.close()
                    swal.fire({
                        title: 'Failed creating new post',
                        icon: 'error',
                        showConfirmButton: false,
                        text: err.response.data,
                        timer: 2000
                    })
                })
            }
        },
        like (id) {
            axios({
                url: `http://localhost:3000/posts/like/${id}`,
                method: 'patch',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                console.log(data)
                this.fetchingData()
            })
            .catch (err => {
                console.log(err)
            })
        },
        fetchingData () {
            axios({
                url: `http://localhost:3000/posts/all`,
                method: 'get'
            })
            .then (({ data }) => {
                this.showList.arrData = data.reverse()
                console.log(data)
            })
            .catch (err => {
                console.log(err)
            })
        }
    },
    created () {
        this.fetchingData()
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