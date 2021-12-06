<template>
    <div class="modal-vue">
        <div v-if="showModal" class="overlay" @click="showModal = false"></div>
        <div v-if="showModal" class="modal">
            <button class="mBtn mBtn--icon close" @click="showModal = false">
                x
            </button>
            <form action="" class="form-profile">
                <div class="field">
                    <label for="current_password">Current Password</label>
                    <input
                        id="current_password"
                        type="password"
                        class="input field-input"
                        v-model="currentPassword"
                    />
                </div>
                <div class="field">
                    <label for="new_password">New Password</label>
                    <input
                        id="new_password"
                        type="password"
                        class="input field-input"
                        v-model="newPassword"
                    />
                </div>
                <div class="field">
                    <label for="confirm_new_password"
                        >Confirm New Password</label
                    >
                    <input
                        id="confirm_new_password"
                        type="password"
                        class="input field-input"
                        v-model="confirmPassword"
                    />
                </div>
                <button
                    class="btn btn-change"
                    @click.prevent="onChangePassword()"
                >
                    change password
                </button>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            showModal: false,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    },
    computed: {
        ...mapState('authen', ['password']),
    },
    methods: {
        ...mapActions('authen', ['changePassword']),
        openModal() {
            this.showModal = true
        },
        validate() {
            if (
                !this.currentPassword ||
                !this.newPassword ||
                !this.confirmPassword
            ) {
                this.$toasted.error('Please enter all field!')
                return false
            }
            if (this.currentPassword !== this.password) {
                this.$toasted.error('Incorrect password!')
                return false
            }
            if (this.newPassword !== this.confirmPassword) {
                this.$toasted.error('Confirm new password is not macth!')
                return false
            }
            return true
        },
        async onChangePassword() {
            if (!this.validate()) return
            await this.changePassword(this.newPassword)
            this.$toasted.success('Change password successfully!')
            this.showModal = false
        },
    },
}
</script>
<style lang="scss">
.modal-vue {
    .overlay {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        z-index: 9999;
        margin: 0 auto;
        padding: 20px 30px;
        background-color: #fff;
    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .form-profile {
        .field {
            margin: 0 0 20px;
        }
    }
}
</style>
