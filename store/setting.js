import { callApiRequest, gDefaultLakeUrl, getApiRequest } from "~/utils/baseService"
import { Auth } from 'aws-amplify'

const state = () => ({
    gSettingLakeInfo: null,
    gPageGapCount: 5,
    gCheckClickAddListBtn: false,
})
const getters = {

};
const actions = {
    async createAcl({ commit, dispatch, state }, aPayload) {
        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes/${aPayload.lake_id}/acl`,
                method: 'POST',
                params: {access_control_list: aPayload.acl_list},
                user_id: Auth.user.username
            }
            let sResult = await callApiRequest(rq, this.$axios);
            if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                }
            }

            return sResult;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteAcl({ commit, dispatch, state }, aPayload) {
        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes/${aPayload.lake_id}/acl`,
                method: 'DELETE',
                params: aPayload.acl_obj,
                user_id: Auth.user.username
            }
            let sResult = await callApiRequest(rq, this.$axios);
            if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                }
            }

            return sResult;
        } catch (error) {
            console.log(error)
        }
    },
    async updateAcl({ commit, dispatch, state }, aPayload) {
        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes/${aPayload.lake_id}/acl`,
                method: 'PUT',
                params: {access_control_list: aPayload.acl_list},
                user_id: Auth.user.username
            }
            let sResult = await callApiRequest(rq, this.$axios);
            if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                }
            }

            return sResult;
        } catch (error) {
            console.log(error)
        }
    }
};
const mutations = {
    setSettingLakeInfo(state, aInfo) {
        state.gSettingLakeInfo = aInfo;
    },
    setPageGapCount(state, aCount) {
        state.gPageGapCount = aCount;
    },
    setCheckClickAddListBtn(state, aBool) {
        state.gCheckClickAddListBtn = aBool;
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}
