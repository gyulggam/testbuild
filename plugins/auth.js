import Vue from 'vue'

class AuthService {
    constructor(store) {
        this.$store = store
    }

    get isAuthenticated() {
        return this.$store.state.auth.gIsAuthenticated
    }

    get user() {
        return this.$store.state.auth.gUser
    }

    get email() {
        if (!this.user) return
        return this.user.attributes.email
    }
}
  
export default async ({ store}) => {
    const sAuthService = new AuthService(store)
    Vue.prototype.$auth = sAuthService
    Vue.$auth = sAuthService
    await store.dispatch('auth/load')
}