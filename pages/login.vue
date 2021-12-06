<template>
    <div class="d-flex-center h-100">
        <div class="login-page d-flex-column">
            <div class="login-header ptb-20">
                <div>
                    <img src="~/assets/images/logo_MachLake_Nomark.png">
                </div>
            </div>

            <div class="login-content d-flex-spacebetween ml-10">
                <div class="login-page-img-wrap">
                    <img
                        src="~/assets/images/login/login_image.png"
                    />
                </div>

                <div class="login-page-form-wrap d-flex-column">
                    <p class="login-page-title text-center mb-40">
                        Log in
                    </p>

                    <div
                        class="google-login-btn semi-title d-flex-center"
                        @click= "handelClickGoogleLogin"
                    >
                        <img src="~/assets/images/login/logo_google.png" class="mr-10">
                        Continue with Google
                    </div>

                    <form
                        class="login-form pt-40 mt-20"
                        @submit.prevent="handelClickLogin"
                    >
                        <input
                            type="text"
                            placeholder="ID"
                            v-model="sLoginInfo.username"
                            class="section-card-input w-100 mb-10"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            v-model="sLoginInfo.password"
                            class="section-card-input w-100"
                        />

                        <button type="submit" class="login-btn main-title">Login</button>
                    </form>

                    <nuxt-link to="/register" class="login-link semi-title">forgot password?</nuxt-link>
                    <nuxt-link to="/register" class="login-link semi-title">No Account yet? <span class="text-primary-color">Sign up</span></nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    data: () => ({
        sLoginInfo: {
            username: '',
            password: ''
        }
    }),
    methods: {
        ...mapActions('auth', [
            "login",
            "logout",
            "googleLogin"
        ]),
        async handelClickLogin() {
            try {
                await this.login(this.sLoginInfo);
            } catch (error) {
                console.log({ error });
            }
        },
        async handelClickLogout() {
            try {
                await this.logout();
            } catch (error) {
                console.log({ error });
            }
        },
        async handelClickGoogleLogin() {
            try {
                this.googleLogin();
            } catch (error) {
                console.log({ error });
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/page/_login.scss";
</style>