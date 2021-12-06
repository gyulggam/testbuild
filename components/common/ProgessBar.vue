<template>
    <div 
        class="progress-bar progress-bar-wrap"
        :class="!pExpendCheck && 'mb-20'"
    >
        <div class="progress-bar__status d-flex-center d-flex-align-center mb-5">
            <span class="semi-title">{{ this.name }}</span>
            <i
                class="fas fa-question-circle self-align-start ml-5"
                v-tooltip="{
                    content:cQuestionTooltip,
                }"
            >
            </i>
            <span class="ml-auto">{{ this.percent }}%</span>
        </div>
        <div
            class="progress-bar__current"
            v-tooltip="{
                content:cValueTooltip,
                placement: 'bottom'
            }"
        >
            <div class="progress-info" :style="`width: ${this.percent}%; background-color:${cStateColor};`"></div>
        </div>

        <div
            v-if="pExpendCheck && !cCheckDetailValueLength"
            class="progress-bar-detail mt-5 d-flex-column">
            <div class="d-flex-end">
                <span class="semi-title">{{ cDetailValue.use }} / {{ cDetailValue.total }}</span>
            </div>
            <div>
                <span class="semi-title">{{'\xa0'}}</span> <!-- 칸을 맞추기 위한 빈공간 -->
            </div>
        </div>

        <div
            v-if="pExpendCheck && cCheckDetailValueLength"
            class="progress-bar-detail mt-5 d-flex-column">
            <span class="semi-title">{{ cDetailValue.use }}</span>
            <span class="semi-title d-flex-end">/ {{ cDetailValue.total }}</span>
        </div>
    </div>
</template>
<script>

import { getStateColor, getUnit } from '~/assets/js/common.js'

export default {
    props: {
        name: {
            type: String,
            default: '',
        },
        percent: {
            type: Number,
            default: 0,
        },
        pTooltipInfo: {
            type: Object,
            default: {},
        },
        pExpendCheck: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        cStateColor() {
            const sColor = getStateColor(this.percent);

            return sColor;
        },
        cCheckDetailValueLength() {
            const sLimitLength = 15;

            return this.cDetailValue.use.length + this.cDetailValue.total.length === sLimitLength;
        },
        cDetailValue() {
            let sResult = {use: "", totla: ""};

            if (this.pTooltipInfo) {
                switch(this.name) {
                    case "API Call" :
                        sResult = {
                            "use": getUnit(this.pTooltipInfo.lake_status.query_call, "unit"),
                            "total": getUnit(this.pTooltipInfo.plan_limit.max_query, "unit")
                        };
                    break;
                    case "Tag" :
                        sResult = {
                            "use": getUnit(this.pTooltipInfo.lake_status.count_of_tag, "unit"),
                            "total": getUnit(this.pTooltipInfo.plan_limit.default_tag_count, "unit")
                        };
                    break;
                    case "Traffic" :
                        sResult = {
                            "use": getUnit(this.pTooltipInfo.lake_status.traffic, "byte"),
                            "total": getUnit(this.pTooltipInfo.plan_limit.max_network, "byte")
                        };
                    break;
                    default :
                        sResult = {use: "", totla: ""};
                }
            }

            return sResult;
        },
        cValueTooltip() {
            let sResult = "";

            switch(this.name) {
                case "API Call" :
                    sResult = this.pTooltipInfo && `Use : ${this.pTooltipInfo.lake_status.query_call.toLocaleString()}\nTotal: ${this.pTooltipInfo.plan_limit.max_query.toLocaleString()}`;
                break;
                case "Tag" :
                    sResult = this.pTooltipInfo && `Use : ${this.pTooltipInfo.lake_status.count_of_tag.toLocaleString()}\nTotal: ${this.pTooltipInfo.plan_limit.default_tag_count.toLocaleString()}`;
                break;
                case "Traffic" :
                    sResult = this.pTooltipInfo && `Use : ${this.pTooltipInfo.lake_status.traffic} byte\nTotal: ${this.pTooltipInfo.plan_limit.max_network} byte`;
                break;
                default :
                    sResult = "Nothing"
            }

            return sResult;
        },
        cQuestionTooltip() {
            let sResult = "";

            switch(this.name) {
                case "API Call" :
                    sResult = 'Total number of API calls this month';
                break;
                case "Tag" :
                    sResult = 'Total number of Tags currently created';
                break;
                case "Traffic" :
                    sResult = 'Traffic Question';
                break;
                default :
                    sResult = "Nothing"
            }

            return sResult;
        },
    },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/common/progess-bar.scss';
</style>
