import { callApiRequest } from "~/utils/baseService"
import { Auth } from 'aws-amplify'

const gLakeUrl = '.machlake.com/lakes';
const state = () => ({
    gTagList: null,
})
const getters = {

}
const actions = {
    async getTagList({ commit, dispatch, state }, payload) {
        const sSearchTagQueryString = payload.hasOwnProperty("name") ? `tags?name=${payload.name}` : "tags";

        try {
            const rq = {
                url: `https://${payload.lake_id}${gLakeUrl}/${sSearchTagQueryString}`,
                method: 'GET',
                user_id: Auth.user.username
            }
            let sResult = await callApiRequest(rq, this.$axios);
            if (sResult.status == "success") {
                const sTagList = sResult.data.tag.map(
                    (aItem, aIdx) => {
                        aItem = {
                            "tag_id": aIdx + 1,
                            ...aItem
                        }
                        return aItem;
                    }
                )
                commit('setTagList', sTagList);
            } else if (sResult.status === "error") {
                sResult = {
                    status: sResult.status,
                    data: { "title": sResult.message }
                }
            }

            console.log('[Tag.list]', sResult);

            return sResult.data
        } catch (error) {
            console.log(error)
        }
    },
    async createTag({ commit, dispatch, state }, payload) {
        try {
            const rq = {
                url: `https://${payload.lake_id}${gLakeUrl}/tags`,
                method: 'POST',
                params: {
                    tag: payload.params
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
            return sResult
        } catch (error) {
            console.log(error)
        }
    },
    async deleteTag({ commit, dispatch, state }, payload) {
        try {
            const rq = {
                url: `https://${payload.lake_id}${gLakeUrl}/tags`,
                method: 'DELETE',
                params: {
                    name: payload.name || "",
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
            console.log(error)
        }
    },
    async updateTag({ commit, dispatch, state }, payload) {
        try {
            const rq = {
                url: `https://${payload.lake_id}${gLakeUrl}/tags`,
                method: 'PUT',
                params: {
                    name: payload.oring_tag_name,
                    columns: payload.ext_columns,
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
            return sResult
        } catch (error) {
            console.log(error)
        }
    },
}
const mutations = {
    setTagList(state, data) {
        console.log('[set List Tag]', data)
        state.gTagList = data
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
