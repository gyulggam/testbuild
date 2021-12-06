<template>
    <div>
        <div class="profile-title">
            <p>User</p>
        </div>
        <!-- <div class="avata" @click="changeAvatar()"> 이미지 부분 제거
            <img :src="profile.avatar" alt="" />
            <input id="avatar" type="file" accept="image/*" />
        </div> -->
        <div class="form">
            <div class="form-profile">
                <div class="group border-bottom">
                    <div class="row-box">
                        <i class="far fa-id-card profile-icon"></i>
                        <label>ID</label>
                        <input type="text" class="field-input" v-model="this.cUserId" readonly>
                    </div>
                    <!-- <div class="field">
                        <label for="name">Name</label>
                        <input
                            id="name"
                            v-model="profile.name"
                            class="field-input"
                            type="text"
                            name="name"
                        />
                    </div> -->
                </div>
                <div class="group border-bottom">
                    <!-- <div class="field">
                        <label for="id">PW</label>
                        <button
                            class="btn btn-pw"
                            type="button"
                            @click="isShowModalChangePassword()"
                        >
                            Change
                        </button>
                    </div> -->
                    <div class="row-box">
                        <i class="far fa-envelope profile-icon"></i>
                        <label>Email</label>
                        <input type="text" class="field-input" v-model="this.cUserEmail" readonly>
                    </div>
                </div>
                <div class="x-key">
                    <div class="row-box">
                        <i class="fas fa-key profile-icon"></i>
                        <label>X Api Key</label>
                        <input :type="sIsShowXAccessKey ? 'text' : 'password'" id="use_x_key" class="field-input" v-model="this.sApiKey" readonly>
                        <button type="button" class="mBtn mBtn--icon" @click="toggleShow">
                            <i class="fal" :class="{'fa-eye-slash': sIsShowXAccessKey, 'fa-eye': !sIsshowXAccessKey}"></i>
                        </button>
                        <button type="button" class="mBtn mBtn--icon" @click="copyTestingCode">
                            <i class="fal fa-copy"></i>
                        </button>
                        <button type="button" class="mBtn mBtn--icon" @click="handleGetApiKey">
                            <i>New</i>
                        </button>
                    </div>
                </div>
                <!-- <div class="from-actions">
                    <button
                        type="button"
                        class="mBtn mBtn-save"
                        @click="onSaveProfile()"
                    >
                        Save
                    </button>
                </div> -->
            </div>
        </div>
        <!-- <ChangePasswordModal ref="change-password" /> -->
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import ChangePasswordModal from '~/components/page/profiles/ChangePassword.vue'
export default {
    components: {
        ChangePasswordModal,
    },
    mounted() {
        this.handleGetApiKey();
        // const input = document.getElementById('avatar')
        // input.addEventListener('change', async (event) => {
        //     const target = event.target
        //     if (target.files && target.files[0]) {
        //         const maxAllowedSize = this.maxAvatarSize * 1024
        //         if (target.files[0].size > maxAllowedSize) {
        //             this.$toasted.error(
        //                 `Maximum file is ${this.maxAvatarSize}Kb`
        //             )
        //             target.value = ''
        //         } else {
        //             this.profile.avatar = await this.base64(target.files[0])
        //             console.log(this.profile.avatar)
        //         }
        //     }
        // })
    },
    computed: {
        cUserId() {
            return this.$auth.user.username;
        },
        cUserEmail() {
            return this.$auth.user.email;
        }
    },
    methods: {
        // ...mapActions('profile', ['fetchProfile', 'updateProfile']),
        ...mapActions('authen', ['updateAccessKey', 'getApiKey']),
        // changeAvatar() {
        //     document.getElementById('avatar').click()
        // },
        base64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            })
        },
        copyTestingCode() {
            const xAccessKeyCopy = document.querySelector('#use_x_key')
            xAccessKeyCopy.setAttribute('type', 'text')
            xAccessKeyCopy.select()
            document.execCommand('copy')
            if (!this.sIsShowXAccessKey) {
                xAccessKeyCopy.setAttribute('type', 'password')
            }
            window.getSelection().removeAllRanges()
        },
        toggleShow() {
            this.sIsShowXAccessKey = !this.sIsShowXAccessKey
        },
        isShowModalChangePassword() {
            this.$refs['change-password'].openModal()
        },
        async onSaveProfile() {
            await this.updateProfile(this.profile)
            await this.updateAccessKey(this.sXAccessKey)
            this.$toasted.success('Success')
        },
        async handleGetApiKey() {
            this.sApiKey = await this.getApiKey();
        },
    },
    data() {
        return {
            sIsShowXAccessKey: false,
            sXAccessKey: null,
            sApiKey: "",
            profile: {}, //안써도될것같은 변수
            maxAvatarSize: 300, // max image size allowed 300 Kb 안써도될것같은 변수
        }
    },
}
</script>
<style lang="scss">
.btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid #bbb;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    height: 32px;
}

.tab-btn {
    display: flex;
    flex-direction: column;
}

.tab-btn .btn {
    width: 100%;
    border-radius: 0;
}

.tab-btn .btn.active {
    background-color: #bbb;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 50px;
    width: 800px;
}

.profile-title {
    font-size: 25px;
    font-weight: 400;
    color: #6f6f6f;
    margin-bottom: 10px;
}

.avata {
    cursor: pointer;
    min-width: 100px;
    height: 100px;
}

.avata img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avata input {
    visibility: hidden;
}

.form .group {
    display: flex;
    padding: 20px 0;
}

.form .x-key {
    display: flex;
    padding: 20px 0;
}

.form .x-key .row-box {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.form .group .row-box {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.form .group .row-box label,
.form .x-key .row-box label {
    width: 25%;
}

.form .group .row-box input {
    width: 70%;
    border-bottom: none;
    color: #333;
}

.form .x-key .row-box input {
    width: 60%;
    border-bottom: none;
    color: #333;
}

.profile-icon {
    font-size: 20px;
    margin-right: 10px;
    color: #6333ff;
    display: flex;
    align-items: center;
}

.from-actions {
    display: flex;
    justify-content: flex-end;
}
</style>
