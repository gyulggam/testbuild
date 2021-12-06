const state = () => ({
    profile: {},
})

const getters = {
    getProfile(state) {
        return state.profile
    },
}
const actions = {
    fetchProfile({commit}) {
        const data = {
            avatar: 'https://giaitri.vn/wp-content/uploads/2019/07/avatar-la-gi-01.jpg',
            name: 'Mr. Bean',
            email: 'bean@gmail.com',
            id: '123456',
        }
        // const {data} = await this.$axios
        commit('setProfile', data)
    },
    updateProfile({commit}, payload) {
        // const {data} = await this.$axios
        commit('setProfile', payload)
    }
}
const mutations = {
    setProfile(state, payload) {
        state.profile = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

  