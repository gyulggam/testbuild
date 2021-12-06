import { getApiRequest } from "~/utils/baseService"

const state = () => ({
    gLoading: false,
    gCurrentPage: "Dashboard",
    gRegionList: null
})
const getters = {
};
const actions = {
    async getTimezoneList({ commit }, aContury) {
        try {
            let sResult = await getApiRequest(`server/timezonelist`, this.$axios);
            if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                };
            }

            return sResult.data;
        } catch (error) {
            console.log(error)
        }
    },
    async getRegionList({ commit, dispatch, state }) {
        try {
            let sResult = await getApiRequest(`server/regionlist`, this.$axios);
            if (sResult.status === "success") {
                commit('setRegionList', sResult.data);
            } else if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                };
            }

            return sResult.data;
        } catch (error) {
            console.log(error)
        }
    },
}
const mutations = {
    setLoading(state, aLoading) {
        state.gLoading = aLoading;
    },
    setCurrentPage(state, aPage) {
        state.gCurrentPage = aPage;
    },
    setRegionList(state, aList) {
        state.gRegionList = aList;
    },
}
export default {
    state,
    getters,
    actions,
    mutations,
}
