<template>
    <div class="login-page">
        <div class="container">
            <div class="frm-login">
                <h1>Machbase Login</h1>
                <div class="frm-base">
                    <div class="frm-field">
                        <label for="txt-username"
                            ><i class="fal fa-user-circle"></i
                        ></label>
                        <input
                            id="txt-username"
                            v-model="payload.username"
                            type="text"
                            class="field-input"
                            placeholder="Username"
                        />
                    </div>
                    <div class="frm-field">
                        <label for="txt-password"
                            ><i class="fal fa-unlock"></i
                        ></label>
                        <input
                            id="txt-password"
                            v-model="payload.password"
                            type="password"
                            class="field-input"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="button"
                        @click="handlLogin()"
                        class="mBtn mBtn-login"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        @click="handlLogout()"
                        class="mBtn mBtn-login"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            payload: {
                username: null,
                password: null,
                loggedIn: false
            },
        }
    },
    computed: {
        ...mapState('authen', ['username', 'isAuthenticated']),
    },
    methods: {
        ...mapActions('authen', ['login', 'logout']),
        handlLogin(payload) {
            this.login(payload)
            if (this.isAuthenticated) {
                this.$router.push('/lake')
            } else {
                this.$toasted.error('Wrong username or password')
            }
        },
        handlLogout() {
            this.logout()
        },
        login() {
            this.$auth.loginWith("awsCognito");
        }
    },
    created() {
        this.loggedIn = this.$auth.strategy.token.get();
    },
}
</script>

<style lang="scss">
#content {
    .login-page {
        margin: 0;
        padding: 0;
        .container {
            display: block;
            text-align: center;
            padding: 50px 0;
        }
        h1 {
            display: block;
            width: 100%;
        }
    }
}

.frm-login {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px 15px;
    border-radius: 10px;
    .frm-field {
        position: relative;
        label {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            text-align: center;
            font-size: 25px;
            color: #999;
        }
    }
    input {
        &[type='text'],
        &[type='password'] {
            font-size: 16px;
            padding: 20px 0 20px 50px;
            height: 56px;
            border: none;
            border-bottom: solid 1px rgba(0, 0, 0, 0.1);
            width: 100%;
            box-sizing: border-box;
            transition: all 0.3s linear;
            color: #000;
            font-weight: 400;
            -webkit-appearance: none;
        }
    }
}
</style>
