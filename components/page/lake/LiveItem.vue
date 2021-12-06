<template>
    <div
        v-if="cShowLake"
        class="live-item"
        :class="cExpendCheck ? 'showing': 'hidden'"
    >
        <div
            v-if="!cErrorCheckViewLake && !cStatusCheckViewLake && cNullCheckViewLake"
        >
            <ItemLoading v-if="sIsShowLakeLoading || cLakeStateCheck" />
            <div class="live-item__control">
                <div class="live-item__control--left">
                    <span 
                        class="live-item__control__title" v-if="!sIsEdit"
                         v-tooltip="{
                            content: `Lake ID : ${this.sViewLake.lake_id}`,
                            placement: 'bottom-start'
                        }"
                    >
                        <span class="live-item__control__title__icon">
                            <img src="~/assets/images/icon_lake.png" alt="" />
                        </span>
                        <span class="sub-title">
                            {{ sViewLake.lake_info.lake_name }}
                        </span>
                        <!-- <button class="mBtn mBtn--icon" @click="sIsEdit = true"> 업데이트 레이크 2차에 할예정
                            <i class="far fa-pen"></i>
                        </button> -->
                    </span>
                </div>

                <LakeActionBtn
                    :pLakeId="sViewLake.lake_id"
                    @eClickSchemaModalBtn="handleSchemaModal"
                    @eClickRefreshBtn="handleRefreshLake"
                    @eClickDestroyLakeBtn="handelClickDestroyLakeBtn"
                />
            </div>
            <div 
                class="live-item__content d-flex-spacebetween w-100 pl-50 "
                :class="cExpendCheck ? 'active-content-height': ''"
            >
                <PieChart
                    :storage="this.sViewLake.lake_status.storage"
                    :max_storage="this.sViewLake.plan_limit.max_storage"
                    :pLakeInfo="this.sViewLake.lake_info"
                    :pExpendCheck="cExpendCheck"
                />

                <div class="group-progess-box d-flex-spacebetween">
                    <div class="group-progess d-flex-column d-flex-spacebetween">
                        <ProgessBar
                            name="API Call"
                            :percent="this.cQueryValue"
                            :pTooltipInfo="sViewLake"
                            :pExpendCheck="cExpendCheck"

                        />
                        <ProgessBar 
                            name="Tag"
                            :percent="this.cTagValue"
                            :pTooltipInfo="sViewLake"
                            :pExpendCheck="cExpendCheck"
                        />
                    </div>
                    <div class="group-progess d-flex-column d-flex-spacebetween">
                        <div class="item-data-box">
                            <div
                                class="item-data d-flex-spacebetween border-bottom"
                                :class="!cExpendCheck && 'mb-20'"
                            >
                                <div class="item-data-title">
                                    <span class="semi-title">Traffic</span>
                                    <i
                                        class="fas fa-question-circle self-align-start"
                                        v-tooltip="{
                                            content: sTrafficTooltip,
                                        }"
                                    >
                                    </i>
                                </div>
                                <div
                                    class="item-data-value"
                                    v-tooltip="{
                                        content: cTooltipTraffic,
                                        placement: 'bottom'
                                    }"
                                >
                                    <span class="main-title">{{ cTrafficValue }}<sub>{{ cTrafficUnit }}</sub></span>
                                </div>
                            </div>
                            <div
                                v-if="cExpendCheck"
                                class="progress-bar-detail mt-5 d-flex-column">
                                    <span class="semi-title">{{'\xa0'}}</span> <!-- 칸을 맞추기 위한 빈공간 -->
                                    <span class="semi-title d-flex-end">{{'\xa0'}}</span>
                            </div>
                        </div>
                        <div class="item-data-box">
                            <div
                                class="item-data d-flex-spacebetween border-bottom"
                                :class="!cExpendCheck && 'mb-20'"
                            >
                                <div>
                                    <span class="semi-title">Record</span>
                                    <i
                                        class="fas fa-question-circle self-align-start"
                                        v-tooltip="{
                                            content: sRecordTooltip,
                                        }"
                                    >
                                    </i>
                                </div>
                                <div
                                    class="item-data-value"
                                    v-tooltip="{
                                        content: cTooltipCountValue,
                                        placement: 'bottom'
                                    }"
                                >

                                    <span class="main-title">{{ cRecordValue }}<sub>{{ cRecordUnit }}</sub></span>
                                </div>
                            </div>
                            <div
                                v-if="cExpendCheck"
                                class="progress-bar-detail mt-5 d-flex-column"
                            >
                                    <span class="semi-title">{{'\xa0'}}</span> <!-- 칸을 맞추기 위한 빈공간 -->
                                    <span class="semi-title d-flex-end">{{'\xa0'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-plan w-15">
                    <div v-show="!cExpendCheck">
                        <span class="semi-title">Plan</span>
                        <div class="item-plan__label"
                            v-tooltip="{
                                content: cTooltipCurrentPlanInfo,
                                placement: 'bottom'
                            }"
                        >
                            <span class="havy-title">{{ this.sViewLake.lake_info.lake_plan }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detail Lake -->
            <transition name="slide-fade">
                <DetailLake
                    v-if="this.gOpenDetailLakeId === this.sLakeListInfo.lake_id"
                    :pLakeInfo="sViewLake"
                />
            </transition>
            <!-- Detail Lake -->

            <div class="lake-item__bottom d-flex-center mt-10">
            <!-- Expend Btn -->
                <i
                    v-if="this.gOpenDetailLakeId === this.sLakeListInfo.lake_id"
                    class="fas fa-chevron-up cursor-pointer"
                    @click="handleExpendLake"
                >
                </i>

                <i
                    v-else
                    class="fas fa-chevron-down cursor-pointer"
                    @click="handleExpendLake"
                >
                </i>

                <div
                    class="lake-item__info"
                    v-if="!cExpendCheck"
                >
                    <ToggleTextOnOffBtn
                        :pText="sViewLake.lake_id"
                    />
                </div>
            <!-- Expend Btn -->
            </div>

            <!-- 별도 기능 Modal -->
            <AppModal
                v-if="sShowDeleteModal"
                width="25rem"
                title="Delete"
                okText="Delete"
                cancelText="Cancel"
                @close="sShowDeleteModal = false"
                @ok="handleDeleteItem"
            >
                <div slot="content">Do you want to delete this lake?</div>
            </AppModal>
            <SchemaModal
                v-if="sIsShowSchemaModal"
                :pLakeInfo="sViewLake"
                @close="sIsShowSchemaModal = false"
            />
            <!-- 별도 기능 Modal -->
        </div>

        <div
            v-else
            class="viewlake-loading d-flex-center d-flex-align-center"
        >
            <ItemLoading v-if="(!cErrorCheckViewLake && !cStatusCheckViewLake) || sIsShowLakeLoading" />

            <div
                v-if="cErrorCheckViewLake || cStatusCheckViewLake"
                class="d-flex-column d-flex-center d-flex-align-center"
            >
                <span
                    class="text-center"
                >
                    Lake Name : {{ sLakeListInfo.lake_info.lake_name }}
                </span>

                <span
                    v-if="cErrorCheckViewLake"
                    class="text-center"
                >
                    Error : {{ sViewLake.title }}
                </span>
                
                <span
                    v-else
                    class="text-center"
                >
                    Error : {{ sCreateFailedMessage }}
                </span>

                <div class="viewlake-error-btnline d-flex-center w-100">
                    <div
                        class="custum-btn denial-background mt-20"
                        @click="handleDeleteItem"
                    >
                        Delete
                    </div>

                    <div
                        class="custum-btn active-background mt-20 ml-10"
                        @click="handleErrorLakeRefreshLake"
                    >
                        Retry
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { getUnit } from '~/assets/js/common.js'
import LakeActionBtn from '~/components/page/lake/LakeActionBtn'
import PieChart from '~/components/common/PieChart'
import ProgessBar from '~/components/common/ProgessBar'
import DetailLake from '~/components/page/lake/DetailLake'
import AppModal from '~/components/common/AppModal'
import SchemaModal from '~/components/page/lake/SchemaModal'
import ToggleTextOnOffBtn from '~/components/page/lake/ToggleTextOnOffBtn'

export default {
    components: {
        LakeActionBtn,
        PieChart,
        ProgessBar,
        DetailLake,
        AppModal,
        SchemaModal,
        ToggleTextOnOffBtn
    },
    props: {
        pLakeInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            sViewLake: null,
            sLakeListInfo: null,
            sCreateFailedMessage: "",
            sIsEdit: false,
            sShowDeleteModal: false,
            sIsShowGroupEtc: false,
            sIsShowInsertModal: false,
            sIsShowDeleteValueModal: false,
            sIsShowLakeLoading: false,
            sIsShowSchemaModal: false,
            sIsShowInfoTooltip: false,
            sViewLakeInterval: [],
            sDefaultLake: {'lake_id': 'created'},
            sRecordTooltip: "Count of Record in Micro-data lake",
            sTrafficTooltip: "Current total Network in/out usage"
        }
    },
    computed: {
        ...mapState('lake', [
            'gOpenDetailLakeId',
            "gLakeList"
        ]),
        ...mapState('global', ['gLoading']),
        cErrorCheckViewLake() {
            return this.sViewLake && this.sViewLake.hasOwnProperty("title");
        },
        cNullCheckViewLake() {
            return this.sViewLake && this.sViewLake.hasOwnProperty("lake_id");
        },
        cStatusCheckViewLake() {
            return this.sViewLake && this.sViewLake.lake_status.state === "failed";
        },
        cLakeStateCheck() {
            return this.sViewLake && this.sViewLake.lake_status.state === "creating";
        },
        cQueryValue() {
            return parseFloat(this.handlePercent(this.sViewLake.lake_status.query_call, this.sViewLake.plan_limit.max_query));
        },
        cTagValue() {
            return parseFloat(this.handlePercent(this.sViewLake.lake_status.count_of_tag, this.sViewLake.plan_limit.max_tag));
        },
        cTrafficValue() {
            return getUnit(this.sViewLake.lake_status.traffic, "byte").split(' ')[0];
        },
        cTrafficUnit() {
            return getUnit(this.sViewLake.lake_status.traffic, "byte").split(' ')[1];
        },
        cRecordValue() {
            return getUnit(this.sViewLake.lake_status.count_of_value, "unit").split(' ')[0];
        },
        cRecordUnit() {
            return getUnit(this.sViewLake.lake_status.count_of_value, "unit").split(' ')[1];
        },
        cTooltipCountValue() {
            return `Use : ${this.sViewLake.lake_status.count_of_value.toLocaleString()}`;
        },
        cTooltipTraffic() {
            return `Use : ${this.sViewLake.lake_status.traffic.toLocaleString()}`;
        },
        cTooltipCurrentPlanInfo() {
            const sMaxStorage = parseFloat(this.sViewLake.plan_limit.max_storage / (1024 * 1024 * 1024)).toFixed(1);
            const sMaxLetwork = parseFloat(this.sViewLake.plan_limit.max_network / (1024 * 1024)).toFixed(1);

            return (
                `Plan Info\n  Storage : ${sMaxStorage}GB\n  Tag Count : ${this.sViewLake.plan_limit.default_tag_count.toLocaleString()}\n  Query Call : ${this.sViewLake.plan_limit.max_query.toLocaleString()}\n  Concurrent : ${this.sViewLake.plan_limit.max_concurrent.toLocaleString()}`
            );
        },
        cShowLake() {
            return (this.gOpenDetailLakeId !== '' && this.gOpenDetailLakeId === this.sViewLake.lake_id) || this.gOpenDetailLakeId === '';
        },
        cExpendCheck() {
            return (this.gOpenDetailLakeId !== '' && this.gOpenDetailLakeId === this.sViewLake.lake_id);
        },
    },
    methods: {
        ...mapActions('lake', [
            'viewLake',
            'deleteLake',
            'updateLake',
            'getLakeLog',
        ]),
        ...mapMutations('lake', [
            'setOpenDetailLakeId',
        ]),
        ...mapMutations('global', [
            'setLoading'
        ]),
        handlePercent(aValue, aMax) {
            const sComputed = (isNaN((aValue / aMax) * 100) || (aValue / aMax) * 100 === Infinity ? 0 : (aValue / aMax) * 100).toFixed(2);
            const sResult = sComputed > 100 ? 100 : sComputed;

            return sResult;
        },
        async handleDeleteItem() {
            this.sIsShowLakeLoading = true;
            this.sShowDeleteModal = false;

            const sResult = await this.deleteLake(this.sLakeListInfo.lake_id);
            if (sResult.status === 'success') {
                this.$emit("eRefreshLakeList");
                this.$toasted.success("Deleted!");
            } else {
                this.$toasted.error(`Lake Deleted ${sResult.status}`);
            }

            this.sIsShowLakeLoading = false;
        },
        handleSchemaModal() {
            this.sIsShowSchemaModal = true;
        },
        async handleExpendLake() {
            //Detail lake를 열때 클릭 이벤트
            const sDetailId = this.gOpenDetailLakeId === this.sLakeListInfo.lake_id ? '' : this.sLakeListInfo.lake_id;

            this.setOpenDetailLakeId(sDetailId);
        },
        async handleRefreshLake() {
            this.sIsShowLakeLoading = true;

            this.sViewLake = await this.viewLake(this.sLakeListInfo.lake_id);

            this.sIsShowLakeLoading = false;
        },
        handleClickGroupEtc() {
            this.sIsShowGroupEtc = true;
        },
        handelClickDestroyLakeBtn() {
            this.sShowDeleteModal = true;
        },
        async handleErrorLakeRefreshLake() {
            this.sIsShowLakeLoading = true;

            this.sViewLake = await this.viewLake(this.sLakeListInfo.lake_id);
            (!this.cErrorCheckViewLake && this.sViewLake.lake_status.state === "creating") && this.setCreateLakeInterval();

            this.sIsShowLakeLoading = false;
        },
        setCreateLakeInterval() {
            this.sCreateStatusIntervalList = setInterval(async () => {
                this.sViewLake = await this.viewLake(this.sLakeListInfo.lake_id);
                if (!this.sViewLake.hasOwnProperty("title")) {
                    if (this.sViewLake && this.sViewLake.lake_status.state === "running" || this.sViewLake.lake_status.state === "failed") {
                        // this.$toasted.success("Success"); 2번뜨는 경우때문에 일딴 안보이게
                        clearInterval(this.sCreateStatusIntervalList);
                    }
                } else {
                    this.$toasted.error(this.sViewLake.title);
                    clearInterval(this.sCreateStatusIntervalList);
                }
            }, 5000);
        },
        async setCreateFailedMessage() {
            this.sCreateFailedMessage = await this.getLakeLog(this.sLakeListInfo.lake_id);
        }
    },
    async created() {
        this.sLakeListInfo = JSON.parse(JSON.stringify(this.pLakeInfo));
        this.sViewLake = await this.viewLake(this.sLakeListInfo.lake_id);

        if (!this.cErrorCheckViewLake && this.sViewLake) {
            this.sViewLake.lake_status.state === "creating" && this.setCreateLakeInterval();
            this.sViewLake.lake_status.state === "failed" && this.setCreateFailedMessage();
        }
    }
}
</script>

<style lang="scss" scope>
@import "~/assets/scss/components/lake/live-item.scss";
.live-item {
    height: auto;

    &.showing {
        max-height: 1000px;
        transition: all 0.8s ease; 
    }
    &.hidden {
        max-height: 245px;
        transition: all 0.4s cubic-bezier(0.7, 0.6, 0.5, 0.8); 
    }
}

.slide-fade-enter-active {
    transition: all .6s ease;
}
.slide-fade-leave-active {
    transition: all .3s cubic-bezier(0.7, 0.5, 0.3, 0.6);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(-50px);
    opacity: 0;
}
</style>
