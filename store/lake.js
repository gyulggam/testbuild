import { callApiRequest, gDefaultLakeUrl, getApiRequest } from "~/utils/baseService"
import { DEFAUlT_LAKEINFO } from "~/utils/config"
import { Auth } from 'aws-amplify'


//date 10이하 숫자앞에 0을 붙이기 위한 함수
function leftPad(value) { if (value >= 10) { return value; } return `0${value}`; }
//date 10이하 숫자앞에 0을 붙이기 위한 함수

const gFullDate = new Date();
const gDate = gFullDate.getFullYear() + '-' + leftPad((gFullDate.getMonth() + 1)) + '-' + leftPad(gFullDate.getDate());

const state = () => ({
    gLakeList: null,
    gDefaultSettingLakeInfo: DEFAUlT_LAKEINFO,
    gOpenDetailLakeId: '',
})
const getters = {
};

const actions = {
    async getListLake({ commit, dispatch, state }, payload) {
        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes`,
                method: 'GET',
                params: {},
                user_id: Auth.user.username
            }

            let sResult = await callApiRequest(rq, this.$axios)
            if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                }
            }

            commit('setListLake', sResult.data);

            return sResult.data;
        } catch (error) {
            console.log(error)
        }
    },
    async createLake({ commit, dispatch, state }, payload) {
        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes`,
                method: 'POST',
                params: payload,
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
    async viewLake({ commit, dispatch, state }, lake_id) {
        let sResult = null;

        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes/${lake_id}?date=${gDate}`,
                method: 'GET',
                params: {},
                user_id: Auth.user.username
            }

            sResult = await callApiRequest(rq, this.$axios);
            if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                }
            }
        } catch (error) {
            sResult = {
                status: "fail",
                data: { "title": error.message }
            }
            console.log(error)
        }

        return sResult.data;
    },
    async getLakeLog({ commit, dispatch, state }, lake_id) {
        let sResult = null;

        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes/${lake_id}/log`,
                method: 'GET',
                params: {},
                user_id: Auth.user.username
            }

            sResult = await callApiRequest(rq, this.$axios);
            if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                }
            }
        } catch (error) {
            sResult = {
                status: "fail",
                data: { "title": error.message }
            }
            console.log(error)
        }

        return sResult.data;
    },
    async deleteLake({ commit, dispatch, state }, lake_id) {
        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes/` + lake_id,
                method: 'DELETE',
                params: {},
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
    async updateLake({ commit, dispatch, state }, payload) {
        try {
            const rq = {
                url: `${gDefaultLakeUrl}lakes/${payload.lake_id}/info`,
                method: 'PUT',
                params: {
                    lake_name: payload.lake_name,
                    timezone: payload.timezone
                },
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
            console.log(error);
        }
    },
    async getCreateLakeStatus({ commit }, aLakeId) {
        try {
            const sData = await getApiRequest(`server/lakestatuslog/${aLakeId}`, this.$axios);
            return sData.data;
        } catch (error) {
            console.log(error)
        }
    },
}
const mutations = {
    setListLake(state, data) {
        state.gLakeList = data;
    },
    setOpenDetailLakeId(state, aId) {
        state.gOpenDetailLakeId = aId;
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
