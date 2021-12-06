<template>
    <div>
        <h1>payment</h1>

        <!-- <stripe-element-card 
             ref="elementRef"
            :pk="sPublickey"
            :hidePostalCode=true
            @token="testtoken"
        /> -->

        <button @click="createCustomer">Generate token</button>

        <stripe-checkout
            ref="checkoutRef"
            mode="subscription"
            :pk="sPublickey"
            :line-items="sItems"
            :successUrl="successUrl"
            :cancelUrl="cancelUrl"
        />

        <button @click="checkout">Checkout</button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
     data () {
        this.sPublickey = process.env.STRIPE_PK;
        return {
            sItems: [
                {
                    price: 'price_1JytLCLxhYn7H10DLNXcvbF8',
                    quantity: 1,
                },
            ],
            successUrl: 'http://localhost:5000',
            cancelUrl: 'http://localhost:5000',
            tokenCreated: ""
        };
    },
    computed: {
        ...mapState("stripe", [
            "gStripeCostomerList"
        ])
    },
    methods: {
        ...mapActions("stripe", [
            "createStripeCostomer"
        ]),
        checkout() {
            this.$refs.checkoutRef.redirectToCheckout();
        },
        submit() {
            this.$refs.elementRef.submit();
        },
        createCustomer() {
            this.createStripeCostomer();
        }
    },
}
</script>