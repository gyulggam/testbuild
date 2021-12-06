import { getApiRequest } from "~/utils/baseService"

const state = () => ({
    gPlanList: null,
});
const getters = {};
const actions = {
    async getPlanList({ commit, dispatch, state }) {
        try {
            const sResult = await getApiRequest(`server/planlist`, this.$axios);
            if (sResult.status == "success") {
                commit('setPlanList', sResult.data)
            }
            return sResult.data
        } catch (error) {
            console.log(error)
        }
    },
};
const mutations = {
    setPlanList(state, data) {
        state.gPlanList = data;
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
};
