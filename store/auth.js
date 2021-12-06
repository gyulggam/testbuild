import { Auth } from 'aws-amplify'

export const state = () => ({
  gIsAuthenticated: false,
  gUser: null
})

export const mutations = {
  set(state, aUser) {
    state.gIsAuthenticated= !!aUser
    state.gUser = aUser
  }
}

export const actions = {
    async load({ commit }) {
        try {
        const sUser = await Auth.currentAuthenticatedUser()
        commit('set', sUser)
        return sUser
        } catch (error) {
        commit('set', null)
        }
    },

    async register(_, { username, email, password }) {
        const sUser = await Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email
            }
        })
        return sUser
    },

    async confirmRegistration(_, { username, code }) {
        return await Auth.confirmSignUp(username, code)
    },

    async login({ commit }, { username, password }) {
        const sUser = await Auth.signIn(username, password)
        commit('set', sUser)
        return sUser
    },

    async logout({ commit }) {
        await Auth.signOut()
        commit('set', null)
    },

    async googleLogin(_) {
        await Auth.federatedSignIn({provider: 'Google'});
    }
}
