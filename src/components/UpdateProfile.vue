<template>
  <div>
      <div class="card shadow p-3 mb-5">
        <form @submit.prevent='updateProfile'>
            <h2>Update Profile</h2>
            <div class="custom-file">
                <input @change="previewImage" id="input-file" class="custom-file-input" type="file" />
                <label class="custom-file-label" for="validatedCustomFile"></label>
            </div>
            <div class="d-flex justify-content-center mt-2">
                <div class="image-preview" v-if="imageData.length > 0">
                    <img class="preview rounded-circle" :src="imageData" width="100%">
                </div>
            </div>
            <div class="row m-2">
                <label>Old Password</label>
                <input type="password" class="form-control" v-model="oldPassword">
            </div>
            <div class="row m-2">
                <label>New Password</label>
                <input type="password" class="form-control" v-model="newPassword">
            </div>
            <br>
            <div class="row m-2">
                <input type="submit" value="Update" class="btn btn-isi">
            </div>
        </form>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MiddleColumn',
    data () {
        return {
            imageData: '',
            captions: '',
            formUploadImage: {
                image: ''
            },
            url: '',
            oldPassword: '',
            newPassword: ''
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
        updateProfile() {
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
                bodyFormData.append('oldPassword', this.oldPassword)
                bodyFormData.append('newPassword', this.newPassword)
                axios({
                    url: 'http://localhost:3000/upload',
                    method: 'post',
                    data: bodyFormData
                })
                .then (({ data }) => {
                    swal.close()
                    swal.fire({
                        title: 'Success Updating profile',
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    this.imageData = ''
                    this.formUploadImage.image = ''
                    this.oldPassword = ''
                    this.newPassword = ''
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