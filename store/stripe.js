const gStripeCallUrl = 'https://api.stripe.com/';
const gStripe = require("stripe")(process.env.STRIPE_PK)

const state = () => ({
    gStripeCostomerList: null,
});

const getters = {
};

const actions = {
    async getStripeCostomerList({ commit, dispatch, state }, aPayload) {
        try {
            let sResult = await axios.$post(`${gStripeCallUrl}/v1/customers`, {});
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
    async createStripeCostomer({ commit, dispatch, state }, aPayload) {
        try {
            const sCustomer = await gStripe.customers.create({
                email:"67sc2@naver.com",
                name: "test"
            });
            console.log("sCustomer",sCustomer);
            commit('setCustomer', sCustomer);
        } catch (error) {
            console.log(error)
        }
    },
}
const mutations = {
    setCustomer(state, aData) {
        state.gStripeCostomerList = aData;
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
