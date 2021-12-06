import Vue from 'vue';
import { StripeCheckout, StripeElementCard } from '@vue-stripe/vue-stripe';

export default () => {
    Vue.component('stripe-checkout', StripeCheckout);
    Vue.component('stripe-element-card', StripeElementCard);
};