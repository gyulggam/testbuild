<template>
    <div class="piechart piechart-wrap d-flex-column d-flex-spacebetween w-27 h-100">
        <div class="d-flex w-100 h-60">
            <svg 
                height="120" 
                width="120" 
                viewBox="0 0 20 20"
                v-tooltip="{
                    content: this.cTooltipStorageValue,
                    placement: 'left-start',
                }"
            >
            <circle r="10" cx="10" cy="10" fill="#f7f7f7" />
            <circle r="5" cx="10" cy="10" fill="transparent"
                    :stroke="cPieStateColor"
                    stroke-width="10"
                    :stroke-dasharray="'calc('+ cPiechartStroageSize + 'px' + ' * 31.4 /' + max_storage + ') 31.4'"
                    transform="rotate(-90) translate(-20)" />
            </svg>
            <div class="piechart__details d-flex-column w-50">
                <p class="sub-title">Storage</p>
                <div class="d-flex-column w-100 mt-15">
                    <sup>{{ cPercentStorage }}</sup>
                    <div class="d-flex-end">
                        <span class="semi-title">/ {{ cMaxStorage }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div 
            v-if="pExpendCheck"
            class="d-flex-column d-flex-spacebetween h-25"
        >
            <div class="inline-block">
                <span class="small-title">Created</span>
                <span class="small-text">{{ cCreatedTime }}</span>
            </div>

            <div
                v-if="cUpdatedTime !== '0'" 
                class="inline-block"
            >
                <span class="small-title">Last Updated</span>
                <span class="small-text">{{ cUpdatedTime }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { getStateColor } from '~/assets/js/common.js'

export default {
    props: {
        storage: {
            type: Number,
            default: 10,
        },
        max_storage: {
            type: Number,
            default: 30,
        },
        pLakeInfo: {
            type: Object,
            default: () => {}
        },
        pExpendCheck: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapState('lake', ['gOpenDetailLakeId']),
        cPiechartStroageSize() {
            // 현재 stroage 값이 max_storage 값을 초과시 max_storage값으로 적용
            return this.storage > this.max_storage ? this.max_storage : this.storage;
        },
        cMaxStorage() {
            const sGb = 2 ** 30;
            const sTb = 2 ** 40;
            let sResult = "";
            
            sResult = (this.max_storage / sGb).toFixed(2) + "GB";
            if (this.max_storage > sTb) {
                sResult = (this.max_storage / sTb).toFixed(2) + "TB";
            }

            return sResult;
        },
        cPercentStorage() {
            const sGb = 2 ** 30;
            const sTb = 2 ** 40;
            let sResult = "";

            sResult = (this.storage / sGb).toFixed(2);
            if (this.storage > sTb) {
                sResult = (this.storage / sTb).toFixed(2);
            }

            return sResult;
        },
        cPieStateColor() {
            const sStroge = (this.storage / this.max_storage) * 100;
            const sColor = getStateColor(sStroge);

            return sColor;
        },
        cCreatedTime() {
            return this.pLakeInfo && this.pLakeInfo.create_date;
        },
        cUpdatedTime() {
            return this.pLakeInfo && this.pLakeInfo.update_date;
        },
        cTooltipStorageValue() {
            return `Use : ${this.cPercentStorage}GB\nTotal: ${this.cMaxStorage}`;
        },
    },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/common/pie-chart.scss';
</style>
