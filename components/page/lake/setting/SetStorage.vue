<template>
    <div class="stroage-wrap border-bottom">
        <VueSlideBar
            :min="pMinValue"
            :max="pMaxValue"
            :range="cSliderRange"
            :isDisabled="pDisabled"
            :draggable="pDragDisabled"
            v-model="sSliderValue"
            @input="handleChangeStorage"
        />
    </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'

export default {
    components: {
        VueSlideBar,
    },
    props: {
        pMinValue: {
            type: Number
        },
        pMaxValue: {
            type: Number
        },
        pCurrentValue: {
            type: Number
        },
        pDisabled: { /* slider disable 제한 true가 제한*/
            type: Boolean,
            default: false,
        },
        pDragDisabled: { /* slider drag 제한 false가 제한*/
            type: Boolean,
            default: false,
        }
    },
    data () {
        return {
            sSliderValue: 0,
        }
    },
    computed: {
        cSliderRange() {
            const sMinValue = parseInt(this.pMinValue) >= 1024 ? parseInt(this.pMinValue) / 1024 + "TB" : parseInt(this.pMinValue) + "GB";
            const sMaxValue = parseInt(this.pMaxValue) >= 1024 ? parseInt(this.pMaxValue) / 1024 + "TB" : parseInt(this.pMaxValue) + "GB";

            return [
                {
                    label: sMinValue,
                },
                {
                    label: sMaxValue,
                },
            ]
        },
    },
    methods: {
        handleChangeStorage() {
            this.$emit('eSetStorage', this.sSliderValue);
        }
    },
    created() {
        this.sSliderValue = this.pCurrentValue;
    },
    mounted() {
        this.$emit('eSetStorage', this.sSliderValue);
    }
   
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_storage.scss";
</style>