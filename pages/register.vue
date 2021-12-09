<template>
    <div class="d-flex-center h-100">
        <div class="register-page d-flex-column">
             <div class="register-header ptb-20">
                <div>
                    <img src="~/assets/images/logo_MachLake_Nomark.png">
                </div>
            </div>
            <div class="register-content d-flex-spacebetween">
                <div class="register-page-img-wrap">
                    <p class="register-page-title mb-40">Sign up</p>
                    <img
                        class="register-mainimg"
                        src="~/assets/images/login/login_image.png"
                    />
                </div>

                <form
                    class="register-page-form-wrap d-flex-spacebetween"
                    @submit.prevent="confirmSingup"
                >
                    <div
                        class="register-page-required d-flex-column"
                    >
                        <p class="havy-title mb-40">Required</p>

                        <input
                            class="section-card-input w-100 mb-40"
                            type="text"
                            v-model="sRegisterForm.username"
                            placeholder="Id"
                        />

                        <input
                            class="section-card-input w-100 mb-10"
                            type="password"
                            v-model="sRegisterForm.password"
                            placeholder="Password"
                        />
                        <input
                            class="section-card-input w-100 mb-60"
                            type="password"
                            v-model="sConfirmPassword"
                            placeholder="Confirm Password"
                        />

                        <input
                            class="section-card-input w-100 mb-10"
                            type="email"
                            v-model="sRegisterForm.email"
                            placeholder="Email"
                        />

                        <input
                            v-if="sIsClickEmailConfirmBtn"
                            v-model="sConfirmForm.code"
                            class="section-card-input w-100 mb-10"
                            placeholder="Code"
                        />

                        <!-- <button
                            v-if="sIsClickEmailConfirmBtn"
                            class="confirm-btn semi-title"
                            @click="confirmSingup"
                        >
                            Verify Email
                        </button> -->

                        <div
                            v-if="!sIsClickEmailConfirmBtn"
                            class="confirm-btn semi-title"
                            @click="checkSignup"
                        >
                            Submit Code
                        </div>

                        <button
                            v-else
                            type="submit"
                            class="register-btn main-title"
                        >
                            Sign up
                        </button>

                    </div>

                    <!-- <div
                        class="register-page-optional d-flex-column"
                    >
                        <p class="havy-title mb-40">Optional</p>

                        <span class="semi-title mb-10">Name</span>
                        <input
                            class="section-card-input w-100 mb-10"
                            type="text"
                            v-model="sRegisterForm.firstname"
                            placeholder="First name"
                        />
                        <input
                            class="section-card-input w-100 mb-40"
                            type="text"
                            v-model="sRegisterForm.lastname"
                            placeholder="Last name"
                        />

                        <span class="semi-title mb-10">Phone number</span>
                        <MazPhoneNumberInput
                            id="phone-number-selecter"
                            size="sm"
                            no-example
                            v-model="sRegisterForm.phonenumber"
                            :translations="sTranslations"
                            @update="sPhonnumberInfo = $event"
                        />
                        <button type="submit" class="register-btn main-title">Sign up</button>
                    </div> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sIsClickEmailConfirmBtn: false,
            sStep:"register",
            sPhonnumberInfo: null,
            sTranslations: {
                countrySelectorLabel: null,
            },
            sConfirmPassword: "",
            sRegisterForm: {
                username: "",
                email: "",
                password: "",
            },
            sConfirmForm: {
                username: "",
                code: ""
            }
        }
    },

    methods: {
        async checkSignup() {
            try {
                const sCheckSignupResult = await this.$store.dispatch('auth/register', this.sRegisterForm);

                if(sCheckSignupResult) {
                    this.sIsClickEmailConfirmBtn = true;
                    this.sConfirmForm.username = this.sRegisterForm.username
                }
            } catch (aErr) {
                this.$toasted.error(aErr);
            }
        },
        async confirmSingup() {
            try {
                await this.$store.dispatch('auth/confirmRegistration', this.sConfirmForm)
                await this.$store.dispatch('auth/login', this.sRegisterForm)
                this.$router.push('/lake')
            } catch (aErr) {
                this.$toasted.error(aErr);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/page/_register.scss";
</style>