import { callApiRequest } from "~/utils/baseService"
import { Auth } from 'aws-amplify'

const gLakeUrl = '.machlake.com/lakes/';
const state = () => ({
    listValue: null
})
const getters = {

}
const actions = {
    async createValue({ commit }, payload) {
        try {
            const rq = {
                url: `https://${payload.lake_id}${gLakeUrl}/values/bulk`,
                method: 'POST',
                params: {
                    date_format: "YYYY-MM-DD HH24:MI:SS",
                    values: payload.values
                },
                user_id: Auth.user.username
            }
            const data = await callApiRequest(rq, this.$axios)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async deleteValue({ commit }, payload) {
        try {
            const rq = {
                url: `https://${payload.lake_id}${gLakeUrl}/values/raw`,
                method: 'DELETE',
                params: {
                    tag_name: payload.tag_name,
                    base_time: payload.base_time
                },
                user_id: Auth.user.username
            }
            const data = await callApiRequest(rq, this.$axios)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}
const mutations = {

}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
