<template>
     <div class="plan-wrap">
        <span class="section-card-title">Plan</span>
        <div
            v-if="cSelectedPlanInfo"
            class="section-card d-flex w-100"
        >
            <div class="plan-box w-100">
                <div class="plan-content">
                    <hooper
                        class="d-flex-center"
                        :settings="sHooperSettings"
                    >
                        <slide
                            v-for="(aItem, aIdx) in gPlanList" :key="aIdx"
                            class="d-flex-column"
                            :class="{'text-disable-color': aItem.plan_name !== 'basic' && gCurrentPage === 'setting'}"
                        >
                            <div
                                v-if="aItem.plan_name !== 'basic' && gCurrentPage === 'setting'"
                                class="disable-mask d-flex-center d-flex-align-center"
                            >
                                <span class="sub-title">Future Update</span>
                            </div>
                            <span class="section-card-title capitalize-text no-padding">{{ aItem.plan_name }}</span>
                            <span class="mt-10">
                                {{ aItem.price &&
                                    `${aItem.price.unit}${aItem.price.min} ~ ${aItem.price.unit}${aItem.price.max}/${aItem.price.duration}`
                                }}
                            </span>

                            <div
                                class="plan-btn d-flex-center mt-20 cursor-pointer"
                                :class="{
                                    'plan-btn-now': (handleCheckCurrentPlan(aItem.plan_name, 'setting')),
                                    'plan-btn-selected': (handleCheckCurrentPlan(aItem.plan_name, 'createlake')),
                                }"
                                @click="() => handleClickPlan(aItem.plan_name)"
                            >
                                {{ aItem.plan_name === sSelectedPlan ? cPlanBtnTextObj.selected : cPlanBtnTextObj.unselected}}
                            </div>

                            <div class="plan-discription-box mt-40">
                                <span
                                    v-for="(bItem, bIdx) in aItem.discription" :key="bIdx"
                                    class="d-flex-column"
                                >
                                    {{ bItem }}
                                </span>
                            </div>
                        </slide>

                        <hooper-navigation slot="hooper-addons"></hooper-navigation>
                    </hooper>

                    <div class="plan-storage d-flex-center d-flex-align-center d-flex-column mt-50">
                        <span class="semi-title self-align-start">Stroage</span>
                        <SetStorage
                            :pMinValue="cSelectedPlanInfo.storage_range.min"
                            :pMaxValue="cSelectedPlanInfo.storage_range.max"
                            :pCurrentValue="cStroageSize"
                            :pDisabled="this.gCurrentPage === 'setting'"
                            :pDragDisabled="this.gCurrentPage !== 'setting'"
                            @eSetStorage="handleChangeStorageValue"
                        />
                    </div>

                    <div class="plan-total-mount d-flex-spacebetween mt-30">
                        <div class="d-flex-spacebetween d-flex-align-center">
                            <span class="mr-30 text-primary-color capitalize-text">{{ sSelectedPlan }}</span>
                            <span class="semi-title">{{ cShowTranceStroageSize }} Storage</span>
                        </div>
                        <div class="plan-current-price d-flex-spacebetween d-flex-align-center">
                            <span class="havy-title mr-10 text-primary-color">{{ cSelectedPlanInfo.price.unit }}{{ cCalculatedPrice }}</span>
                            <span class="semi-title"> /{{ cSelectedPlanInfo.price.duration }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            Don't have a plan list. Please ask the manager.
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
    Hooper,
    Slide,
    Progress as HooperProgress,
    Pagination as HooperPagination,
    Navigation as HooperNavigation 
} from 'hooper';
import 'hooper/dist/hooper.css';
import SetStorage from '~/components/page/lake/setting/SetStorage'

export default {
    components: {
        Hooper,
        Slide,
        HooperProgress,
        HooperPagination,
        HooperNavigation,
        SetStorage,
    },
    props: {
        pLakeInfo: {
            type: Object,
            require: true,
        },
        pStroageSize: {
            type: Number,
        }
    },
    data() {
        return {
            sHooperSettings: {
                itemsToShow: 2,
            },
            sLakeInfo: {},
            sPriceInfo: "",
            sSelectedPlan: "basic",
            sStorageValue: 0,
            sIsShowDisableMask: false,
        }
    },
    computed: {
        ...mapState('lake', ['gLakeList']),
        ...mapState('plan', ['gPlanList']),
        ...mapState('global', ["gCurrentPage"]),
        cSelectedPlanInfo() {
            const sSelectedPlanInfo = this.gPlanList && this.gPlanList.filter(aItem => {
                return aItem.plan_name === this.sSelectedPlan;
            });

            return sSelectedPlanInfo && sSelectedPlanInfo[0];
        },
        cStroageSize() {
            return this.gCurrentPage === "setting" ? this.sStorageValue : this.cSelectedPlanInfo.storage_range.min;
        },
        cShowTranceStroageSize() {
            return parseInt(this.sStorageValue) >= 1024 ? (parseInt(this.sStorageValue) / 1024).toFixed(1) + "TB" : (parseInt(this.sStorageValue)).toFixed(1) + "GB"
        },
        cCalculatedPrice() {
            /* storage를 추가한 가격을 계산하는 함수 
            (현재 storage값 - 최소 stroage값) * GB당 가격(ext) + 기본가격 */
            return ((this.sStorageValue - this.cSelectedPlanInfo.storage_range.min) * this.cSelectedPlanInfo.storage_range.ext + this.cSelectedPlanInfo.price.min).toFixed(2);
        },
        cPlanBtnTextObj() {
            return this.gCurrentPage === "setting" ? { selected: "Now", unselected: "Upgrade" } : { selected: "Selected", unselected: "Subscribe" }
        }
    },
    methods: {
        ...mapActions('plan',['getPlanList']),
        handleChangeStorageValue(aStorageVal) {
            this.sStorageValue = aStorageVal;

            this.$emit("eSetStorage", this.sStorageValue);
        },
        handleClickPlan(aPlanName) {
            this.sSelectedPlan = aPlanName;
            
            this.$emit("eSetLakePlan", this.sSelectedPlan);
        },
        handleCheckCurrentPlan(aPlanName, aPage) {
            return aPlanName === this.sSelectedPlan && this.gCurrentPage === aPage;
        }
    },
    async created() {
        this.sSelectedPlan = this.pLakeInfo.lake_plan;
        this.sStorageValue = this.pStroageSize / (2 ** 30);
    },
    mounted() {
        this.$emit("eSetLakePlan", this.sSelectedPlan);
        this.$emit("eSetStorage", this.sStorageValue);
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_plan.scss";
</style>