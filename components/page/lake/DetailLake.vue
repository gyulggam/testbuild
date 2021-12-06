<template>
    <div class="detail-lake-wrap mt-30 pl-50 d-flex-column">
        <div class="d-flex pt-30 pb-50 w-100 border-t">
            <div class="detail-lake-general-box d-flex-spacebetween w-100">
                <div class="detail-lake-general-info d-flex">
                    <div class="detail-lake-general-content d-flex-column">
                        <span class="detail-lake-general-title">Lake ID</span>
                        <span class="semi-text"> {{ cLakeId }}</span>
                    </div>
                </div>

                <div class="detail-lake-general-region d-flex-spacebetween">
                    <div class="detail-lake-general-content d-flex-column">
                        <span class="detail-lake-general-title">Region</span>
                        <span class="semi-text">{{ cRegionInfo.name }}</span>
                        <span class="semi-text">{{ cRegionInfo.code }}</span>
                    </div>
                    <div class="detail-lake-general-content d-flex-column">
                        <span class="detail-lake-general-title">Default timezone</span>
                        <span class="semi-text">{{ cLakeInfo.timezone }}</span>
                    </div>
                </div>

                <div class="empty-box w-15"></div>
            </div>
        </div>

        <div class="detail-lake-plan d-flex-column pt-30 pb-50 w-100 border-t">
            <div class="semi-title">Plan</div>
            <div class="detail-lake-plan-info d-flex">
                <div class="detail-lake-plan-content d-flex-column w-30">
                    <div class="havy-title mb-30">{{ cLakeInfo.lake_plan }}</div>
                    <div class="semi-title text-primary-color">Now plan</div>
                </div>
                <div class="detail-lake-plan-price-content d-flex-column w-30">
                    <span>{{ cSelectedPlanUnit }} {{ cCalculatedPrice }} /{{ cSelectedPlanDuration }}</span>
                </div>
                <div class="detail-lake-plan-price-content d-flex-column d-flex-spacebetween w-40">
                    <span
                        v-for="(bItem, bIdx) in cSelectedPlanDiscription" 
                        :key="bIdx"
                        class="d-flex-column"
                    >
                        <span v-if="bIdx === 1">{{ cStroageSize }}GB Stroage</span>
                        <span v-else>{{ bItem }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vueWorldMap from 'vue-world-map'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        vueWorldMap,
    },
    props: {
        pLakeInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            sLakeInfo: null,
            sRegionList: null,
        }
    },
    computed: {
        ...mapState('plan', [
            'gPlanList'
        ]),
        ...mapState('global', [
            'gRegionList'
        ]),
        cLakeId() {
            return this.sLakeInfo && this.sLakeInfo.lake_id;
        },
        cLakeInfo() {
            return this.sLakeInfo && this.sLakeInfo.lake_info;
        },
        cRegionInfo() {
            const sSelectRegionInfo = this.gRegionList && 
                this.gRegionList.filter(aItem => {
                    return this.cLakeInfo.region === aItem.code;
                })[0];

            return sSelectRegionInfo;
        },
        cSelectedPlanInfo() {
            const sSelectedPlanInfo = this.gPlanList && this.gPlanList.filter(aItem => {
                return aItem.plan_name === this.cLakeInfo.lake_plan;
            });

            return sSelectedPlanInfo && sSelectedPlanInfo[0];
        },
        cSelectedPlanDiscription() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.discription;
        },
        cStroageSize() {
            return this.sLakeInfo && (this.sLakeInfo.plan_limit.max_storage / (2 ** 30));
        },
        cSelectedPlanMinStorage() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.storage_range.min;
        },
        cSelectedPlanMaxStorage() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.storage_range.max;
        },
        cSelectedPlanStorageExt() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.storage_range.ext;
        },
        cSelectedPlanUnit() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.price.unit;
        },
        cSelectedPlanDuration() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.price.duration;
        },
        cSelectedPlanMin() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.price.min;
        },
        cSelectedPlanMax() {
            return this.cSelectedPlanInfo && this.cSelectedPlanInfo.price.max;
        },
        cCalculatedPrice() {
            /* storage를 추가한 가격을 계산하는 함수 
            (현재 storage값 - 최소 stroage값) * GB당 가격(ext) + 기본가격 */
            return ((this.cStroageSize - this.cSelectedPlanMinStorage) * this.cSelectedPlanStorageExt + this.cSelectedPlanMin).toFixed(2);
        },
    },
    async created() {
        this.sLakeInfo = this.pLakeInfo;
    }
}
</script>

<style lang="scss" scope>
@import "~/assets/scss/components/lake/detail-lake.scss";
</style>
