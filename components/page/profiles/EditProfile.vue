<template>
    <div class="profile-edit-wrap">
        <!-- <div class="avata" @click="changeAvatar()"> 이미지 부분 제거
            <img :src="profile.avatar" alt="" />
            <input id="avatar" type="file" accept="image/*" />
        </div> -->
        <div class="section-card form">
            <div class="form-profile">
                <div class="group border-bottom">
                    <div class="row-box">
                        <label class="sub-title">ID</label>
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
                        <label class="semi-title">Email</label>
                        <input type="text" class="field-input" v-model="this.cUserEmail" readonly>
                    </div>
                </div>
                <div class="group border-bottom">
                    <div class="row-box d-flex">
                        <label class="semi-title">X Api Key</label>
                        <input
                            :type="!sIsShowXAccessKey ? 'password' : 'text'"
                            id="use_x_key"
                            class="x-api-key-box field-input"
                            v-model="this.sApiKey"
                            readonly
                        />
                    </div>
                    <div class="row-box d-flex-end">
                        <button type="button" class="profile-x-api-icon" @click="toggleShow">
                            <i class="fal" :class="{'fa-eye-slash': sIsShowXAccessKey, 'fa-eye': !sIsShowXAccessKey}"></i>
                        </button>
                        <button
                            type="button"
                            class="profile-x-api-icon"
                            @click="copyTestingCode"
                        >
                            <i class="far fa-clone"></i>
                        </button>
                        <button type="button" class="profile-x-api-icon" @click="handleGetApiKey">
                            <i class="fas fa-redo"></i>
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
    data() {
        return {
            sIsShowXAccessKey: false,
            sXAccessKey: null,
            sApiKey: "",
            profile: {}, //안써도될것같은 변수
            maxAvatarSize: 300, // max image size allowed 300 Kb 안써도될것같은 변수
        }
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
            const xAccessKeyCopy = document.querySelector('#use_x_key');
            xAccessKeyCopy.setAttribute('type', 'text');
            xAccessKeyCopy.select();
            document.execCommand('copy')
            if (!this.sIsShowXAccessKey) {
                xAccessKeyCopy.setAttribute('type', 'password')
            }
            window.getSelection().removeAllRanges();
            this.$toasted.success("copied");
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

.form .group {
    display: flex;
    padding: 12px 0;
}

.form .x-key {
    display: flex;
    padding: 12px 0 ;
    height: 49px;
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

.form .x-key .row-box input {
    width: 55%;
    border-bottom: none;
    color: #333;
    font-size: 14px;
}

.profile-icon {
    font-size: 17px;
    margin-right: 10px;
    color: #6333ff;
    display: flex;
    align-items: center;
    font-weight: 300;
}
</style>
