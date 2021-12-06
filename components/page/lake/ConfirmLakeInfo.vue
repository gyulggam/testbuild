<template>
    <div class="confirm-createlake-wrap section-card w-70">
        <ItemLoading v-if="sIsShowLoading" />
        <div class="confirm-createlake-header d-flex-column">
            <button
                class="close-btn self-align-end"
            >
                <i
                    class="fal fa-2x fa-times"
                    @click="handleClickCancelConfirm"
                >
                </i>
            </button>

            <div class="confirm-createlake-header-discription havy-title text-center ptb-50">
                <p>Please check creation info</p>
            </div>

            <div class="d-flex-center mt-15">
                <span class="lake-iconbox mr-15">
                    <img src="~/assets/images/icon_lake.png" alt="" />
                </span>

                <span class="havy-title">{{ cLakeInfo.lake_name }}</span>
            </div>
        </div>

        <div class="confirm-createlake-content mt-30">
            <div
                :class="sIsShowDetail ? 'confirm-createlake-content-detail' : 'confirm-createlake-content-default'"
            >
                <div
                    class="confirm-createlake-plan d-flex border-bottom"
                    :class="sIsShowDetail ? 'ptb-40' : 'ptb-20'"
                >
                    <div class="main-title w-20">
                        <span>{{ cLakeInfo.lake_plan }}</span>
                    </div>
                    <div class="w-30">
                        <span class="havy-title text-primary-color">
                            {{ cSelectedPlanUnit }}{{ cCalculatedPrice }}
                        </span>
                        <span>/{{ cSelectedPlanDuration }}</span>
                        <p class="semi-text">{{ `${this.cLakeInfo.storage_size}GB` }} Storage</p>
                    </div>
                    <div
                        v-if="sIsShowDetail"
                        class="w-40"
                    >
                        <p
                            v-for="(aItem, aIdx) in cPlanDiscription" :key="aIdx"
                            class="semi-text"
                        >
                            {{ aItem }}
                        </p>
                    </div>
                </div>

                <div
                    v-if="!sIsShowDetail"
                    class="confirm-createlake-schema d-flex border-bottom"
                    :class="sIsShowDetail ? 'ptb-50' : 'ptb-30'"
                >
                    <div class="tagmeta-box w-50">
                        <p class="main-title mb-15">Tag meta</p>
                        <p class="semi-title">Total : {{ cTagmetaSchema.length }}</p>
                    </div>
                    <div class="value-box w-40">
                        <p class="main-title mb-15">Value</p>
                        <p class="semi-title">Total : {{ cValueSchema.length }}</p>
                    </div>
                </div>

                <div
                    v-else
                    class="confirm-createlake-schema d-flex-column border-bottom"
                    :class="sIsShowDetail ? 'ptb-50' : 'ptb-30'"
                >
                    <p class="main-title mb-15">Tag meta</p>

                    <div class="tagmeta-box-detail w-100 mt-30">
                        <div class="tagmeta-box-detail-header mb-10">
                            <div
                                v-for="(aItem, aIdx) in sMetaHeader"
                                :key="`tagmeta-header-${aIdx}`"
                                class="sub-title"
                            >
                                {{ aItem.col_name }}
                            </div>
                        </div>

                        <div class="tagmeta-box-detail-content mb-10">
                            <div
                                v-for="(aItem, aIdx) in cTagmetaSchema"
                                :key="`tagmeta-content-${aIdx}`"
                                class="tagmeta-box-detail-item mt-20"
                            >
                                <div class="border-bottom ptb-5"
                                    v-tooltip="{
                                        content: aItem.col_name,
                                        placement: 'bottom',
                                    }"
                                >
                                    {{ limitLength(aItem.col_name, 20) }}
                                </div>
                                <div class="border-bottom ptb-5">{{ aItem.col_type }}</div>
                                <div
                                    class="border-bottom ptb-5 text-center"
                                    v-show="aItem.col_length > 0"
                                >
                                    {{ aItem.col_length }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="sIsShowDetail"
                    class="confirm-createlake-schema border-bottom"
                    :class="sIsShowDetail ? 'ptb-50' : 'ptb-30'"
                >
                    <p class="main-title mb-15">Value</p>

                    <div class="value-box-detail w-100 mt-30">
                        <div class="value-box-detail-header mb-10">
                            <div
                                v-for="(aItem, aIdx) in sMetaHeader"
                                :key="`value-header-${aIdx}`"
                                class="sub-title"
                            >
                                {{ aItem.col_name }}
                            </div>
                        </div>

                        <div class="value-box-detail-content mb-10">
                            <div
                                v-for="(aItem, aIdx) in cValueSchema"
                                :key="`value-content-${aIdx}`"
                                class="value-box-detail-item mt-20"
                            >
                                <div 
                                    class="border-bottom ptb-5"
                                    v-tooltip="{
                                        content: aItem.col_name,
                                        placement: 'bottom',
                                    }"
                                >
                                    {{ limitLength(aItem.col_name, 20) }}
                                </div>
                                <div class="border-bottom ptb-5">{{ aItem.col_type }}</div>
                                <div
                                    class="border-bottom ptb-5 text-center"
                                    v-show="aItem.col_length > 0"
                                >
                                    {{ aItem.col_length }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="confirm-createlake-region d-flex"
                    :class="{
                        'ptb-50': sIsShowDetail,
                        'ptb-30': !sIsShowDetail,
                        'd-flex-center': sIsShowDetail
                    }"
                >
                    <div 
                        class="tagmeta-box"
                        :class="{
                            'w-30': sIsShowDetail,
                            'w-50': !sIsShowDetail
                        }"
                    >
                        <p class="main-title mb-15">Region</p>
                        <p class="semi-title">{{ cRegionInfo.name }}</p>
                        <p class="semi-title">{{ cRegionInfo.code }}</p>
                    </div>
                    
                    <div 
                        class="value-box"
                        :class="{
                            'w-30': sIsShowDetail,
                            'w-50': !sIsShowDetail
                        }"
                    >
                        <p class="main-title mb-15">Default timezone</p>
                        <p class="semi-title">{{ cTimezone }}</p>
                    </div>
                </div>

                <!-- create에서 acl 제거 -->
                <!-- <div
                    v-if="!sIsShowDetail"
                    class="confirm-createlake-acl d-flex-column"
                    :class="sIsShowDetail ? 'ptb-50' : 'ptb-30'"
                >
                    <div class="confirm-createlake-acl-header mb-15">
                        <span class="main-title">Access control</span>
                    </div>

                    <div class="confirm-createlake-acl-content">
                        <div class="w-40 d-flex-spacebetween semi-title">
                            <span>{{ cAclList[0].name }}</span>
                            <span>{{ cAclList[0].cidr }}</span>
                            <span>
                                <i class="fas fa-plus"></i>
                                {{ cAclList.length - 1}}
                            </span>
                        </div>
                    </div>
                </div> -->

                <!-- <div
                    v-else
                    class="confirm-createlake-acl ptb-30"
                >
                    <p class="main-title mb-15">Access control</p>

                    <div class="acl-box-detail w-100 mt-30 pl-30">
                        <div class="acl-box-detail-header mb-10">
                            <div
                                v-for="(aItem, aIdx) in sAclHeader"
                                :key="`acl-header-${aIdx}`"
                                class="sub-title"
                            >
                                {{ aItem.col_name }}
                            </div>
                        </div>

                        <div class="acl-box-detail-content mb-10">
                            <div
                                v-for="(aItem, aIdx) in cAclListRange"
                                :key="`acl-content-${aIdx}`"
                                class="acl-box-detail-item mt-20"
                            >
                                <div class="border-bottom ptb-5">{{ cAclList[aIdx].name }}</div>
                                <div class="border-bottom ptb-5">{{ cAclList[aIdx].cidr }}</div>
                            </div>
                        </div>

                        <ListPagenation
                            :pTotalCount="cAclList.length"
                            @ePagenation="setPagenationRange"
                            class="d-flex-end mt-20 pr-50"
                        />
                    </div>
                </div> -->

                <div 
                    class="confirm-createlake-footer d-flex-align-center d-flex-column mt-20"
                    :class="{'pr-35': sIsShowDetail}"
                >
                    <div
                        class="detail-view-btn d-flex-column d-flex-align-center w-100 ptb-15"
                        @click="sIsShowDetail = !sIsShowDetail"
                    >
                        <p class="semi-title mb-5">View detail</p>
                        <i class="fas"
                            :class="sIsShowDetail ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                    </div>

                    <div class="d-flex-center w-100 mt-60">
                        <div
                            class="confirm-createlake-btn createlake-btn"
                            @click="sIsShowConfirmModal = true"
                        >
                            OK
                        </div>
                        <div
                            class="confirm-createlake-btn cancel-btn ml-10"
                            @click="handleClickCancelConfirm"
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AppModal
            title="Create Lake"
            width="25rem"
            v-if="sIsShowConfirmModal"
            :okText="'OK'"
            @close="sIsShowConfirmModal = false"
            @ok="handleCreatelake"
        >
            <div slot="content">
                Do you want to Create lake?
            </div>
        </AppModal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { LAKE_META_HEADER, LAKE_ACCESS_CONTOL_HEADER } from '~/utils/config'
import { limitLength } from '~/assets/js/common.js'
import SchemaList from '~/components/page/lake/setting/SchemaList'
import SetAccessControl from '~/components/page/lake/setting/SetAccessControl'
import ListPagenation from '~/components/page/lake/setting/ListPagenation'
import AppModal from '~/components/common/AppModal'

export default {
    components: {
        SchemaList,
        SetAccessControl,
        ListPagenation,
        AppModal
    },
    props: {
        pCreateLakeObj: {
            type: Object,
            default: () => {}
        },
    },
    data() {
        return {
            sAclHeader: LAKE_ACCESS_CONTOL_HEADER,
            sMetaHeader: LAKE_META_HEADER,
            sIsShowDetail: false,
            sIsShowLoading: false,
            sIsShowConfirmModal: false,
            sPagingStart: 0,
            sPagingEnd: 0,
        }
    },
    computed: {
        ...mapState('plan', ["gPlanList"]),
        ...mapState('global', ["gRegionList"]),
        cLakeInfo() {
            return this.pCreateLakeObj && this.pCreateLakeObj.lake_info;
        },
        cTagmetaSchema() {
            return this.pCreateLakeObj && this.pCreateLakeObj.tag_schema;
        },
        cValueSchema() {
            return this.pCreateLakeObj && this.pCreateLakeObj.value_schema;
        },
        cAclList() {
            return this.pCreateLakeObj && this.pCreateLakeObj.access_control_list;
        },
        cRegionInfo() {
            const sSelectRegionInfo = this.gRegionList && 
                this.gRegionList.filter(aItem => {
                    return this.cLakeInfo.region === aItem.code;
                })[0];

            return sSelectRegionInfo;
        },
        // cRegion() {
        //     return this.cLakeInfo && this.cLakeInfo.region;
        // },
        cTimezone() {
            return this.cLakeInfo && this.cLakeInfo.timezone;
        },
        cAclListRange() {
            return this.sPagingEnd - this.sPagingStart;
        },
        cPlanInfo() {
            return this.pCreateLakeObj &&
                this.gPlanList.filter(aItem => {
                    return aItem.plan_name === this.pCreateLakeObj.lake_info.lake_plan;
                })[0];
        },
        cSelectedPlanMinStorage() {
            return this.cPlanInfo && this.cPlanInfo.storage_range.min;
        },
        cSelectedPlanMaxStorage() {
            return this.cPlanInfo && this.cPlanInfo.storage_range.max;
        },
        cSelectedPlanStorageExt() {
            return this.cPlanInfo && this.cPlanInfo.storage_range.ext;
        },
        cSelectedPlanUnit() {
            return this.cPlanInfo && this.cPlanInfo.price.unit;
        },
        cSelectedPlanDuration() {
            return this.cPlanInfo && this.cPlanInfo.price.duration.toLowerCase();
        },
        cSelectedPlanMin() {
            return this.cPlanInfo && this.cPlanInfo.price.min;
        },
        cSelectedPlanMax() {
            return this.cPlanInfo && this.cPlanInfo.price.max;
        },
        cCalculatedPrice() {
            /* storage를 추가한 가격을 계산하는 함수 
            (현재 storage값 - 최소 stroage값) * GB당 가격(ext) + 기본가격 */
            return ((this.cLakeInfo.storage_size - this.cSelectedPlanMinStorage) * this.cSelectedPlanStorageExt + this.cSelectedPlanMin).toFixed(2);
        },
        cPlanDiscription() {
            return this.cPlanInfo && this.cPlanInfo.discription.filter(aItem => {
                if (aItem.indexOf("Storage") === -1) {
                    return aItem;
                }
            });
        }
    },
    methods :{
        limitLength,
        ...mapActions('lake', ['createLake']),
        setPagenationRange(aRange = {"start": this.sPagingStart, "end": this.sPagingEnd}) {
            this.sPagingStart = aRange.start === 0 ? aRange.start : aRange.start - 1;
            this.sPagingEnd = aRange.end;
        },
        handleClickCancelConfirm() {
            this.$emit("eCancelCreateLakeInfo", this.pCreateLakeObj);
        },
        async handleCreatelake() {
            this.sIsShowConfirmModal = false;
            this.sIsShowLoading = true;

            const sResult = await this.createLake(this.pCreateLakeObj);
            if (sResult.status === "success") {
                setTimeout(() => {
                    this.sIsShowLoading = false;
                    this.$router.push("/lake");
                }, 1000);
            } else {
                this.sIsShowLoading = false;
                this.$toasted.error(sResult.data.title);
            }
        }
    },
    async created() {
        this.setPagenationRange();
    },
}
</script>