import { setAccess, removeAccess } from "~/utils/authen"
import { getApiRequest } from "~/utils/baseService"
import { Auth } from 'aws-amplify'


const state = () => ({
    username: 'admin',
    password: '12345',
    gAccessKey: '',
    isAuthenticated: false,
})

const getters = {
    isAuthenticated(state) {
        return !!state.isAuthenticated
    },
    getAccessKey(state) {
        return state.gAccessKey
    }
}
const actions = {
    async login({ commit, dispatch, state }, payload) {
        // const { data } = await this.$axios.post(APIs.LOGIN, payload);
        if (payload.username == state.username && payload.password == state.password) {
            commit('setLogin', {...payload, x_access_key: '0EFFAABBC0FF147B68' })
        }
        return
    },
    updateAccessKey({ commit }, accessKey) {
        // const { data } = await this.$axios;
        commit('setAccesskey', accessKey)
    },
    changePassword({ commit }, newPassword) {
        // const { data } = await this.$axios;
        commit('setPassword', newPassword)
    },
    logout({ commit }) {
        commit('setLogout')
    },
    async getApiKey({ commit }, payload) {
        try {
            const data = await getApiRequest(`api-key/?userid=${Auth.user.username}`, this.$axios)
           
            return data.data["api-key"];
        } catch (error) {
            console.log(error)
        }
    },
}
const mutations = {
    setLogin(state, payload) {
        state.username = payload.username
        state.password = payload.password
        state.gAccessKey = payload.x_access_key
        state.isAuthenticated = true
        setAccess()
    },
    setLogged(state) {
        state.isAuthenticated = true
        setAccess()
    },
    removeLogged(state) {
        state.isAuthenticated = false
        removeAccess()
    },
    setLogout(state) {
        state.isAuthenticated = false
        state.gAccessKey = null
        removeAccess()
    },
    setAccesskey(state, accessKey) {
        state.gAccessKey = accessKey
    },
    setPassword(state, pw) {
        state.password = pw
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
