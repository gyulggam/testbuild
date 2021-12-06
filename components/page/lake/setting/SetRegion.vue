<template>
     <div class="region-wrap">
        <span class="section-card-title">Lake region</span>
        <div class="section-card d-flex w-100">
            <div class="region-box d-flex-column w-100">
                <div class="region-header d-flex-center d-flex-align-center">
                    <vSelect
                        class="region-select w-40"
                        :class="{
                            'select-border-success': sIsCheckSetRegion,
                            'select-border-validity': sRegionHint
                        }"
                        :options="cRegionNameList"
                        v-model="sSelectedRegion"
                        placeholder="Select Region"
                        @input="handleChangeRegion"
                        v-tooltip="{
                            content: sRegionHint,
                            show: sRegionHint,
                            trigger: 'manual',
                            placement: 'top',
                        }"
                    />
                </div>

                <div class="region-content d-flex-column">
                    <div
                        class="region-content-now d-flex-center d-flex-align-center"
                    >
                        <span class="semi-title">{{ cSelectedRegion }}</span>
                        <span class="region-content-now-label ml-10">now</span>
                    </div>
                    <div class="region-content-worldmap d-flex-center">
                        <WorldMapTimezone
                            class="mt-15"
                            :pCoordinate="cSelectedRegionObj"
                        />
                    </div>
                </div>

                <div class="region-footer d-flex-center">
                    <CheckBoxBtn
                        :pStatus="sIsCheckSetRegion"
                        :pFunction="handleClickCheckBtn"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WorldMapTimezone from '~/components/common/WorldMapTimezone'
import CheckBoxBtn from '~/components/common/CheckBoxBtn'
import vSelect from 'vue-select'

export default {
    components: {
        WorldMapTimezone,
        CheckBoxBtn,
        vSelect,
    },
    props: {
        pLakeInfo: {
            type: Object,
            require: true,
        }
    },
    data() {
        return {
            sSelectedRegion: "",
            sRegionHint: "",
            sIsCheckSetRegion: false,
        }
    },
    computed: {
        ...mapState('global', ["gRegionList"]),
        cRegionNameList() {
            return this.gRegionList.map(aItem => {
                return aItem.name;
            });
        },
        cSelectedRegionObj() {
            const sFindSelectRegionObj = this.gRegionList.find(aItem => {
                return aItem.name === this.sSelectedRegion;
            });
            const sResultObj = sFindSelectRegionObj && {
                name: sFindSelectRegionObj.code,
                region: sFindSelectRegionObj.region_value,
            };

            return sResultObj;
        },
        cSelectedRegion() {
            return this.sSelectedRegion ? this.sSelectedRegion : "Please select Region"
        },
    },
    methods: {
        ...mapActions('global', ["getRegionList"]),
        handleChangeRegion() {
            this.sIsCheckSetRegion = false;

            this.$emit("eSetRegion", null);
        },
        handleClickCheckBtn() {
            if (!this.sSelectedRegion) {
                this.sRegionHint = "Please select Region";
                return;
            } else {
                this.sRegionHint = "";
            }

            this.sIsCheckSetRegion = !this.sIsCheckSetRegion;
            this.$emit("eSetRegion", this.sIsCheckSetRegion ? this.cSelectedRegionObj.name : null);
        },
    },
    created() {
        this.gRegionList.forEach(aItem => {
            if (aItem.code === this.pLakeInfo.region) {
                this.sSelectedRegion = aItem.name;
            }
        });
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/region.scss";
</style>