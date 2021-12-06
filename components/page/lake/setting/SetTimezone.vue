<template>
     <div class="timezone-wrap">
        <span class="section-card-title">Default timezone</span>
        <div class="section-card d-flex w-100">
            <div class="timezone-box d-flex-column w-100">
                <div class="timezone-header d-flex-spacebetween d-flex-align-center w-90">
                    <v-select
                        class="timezone-select w-50"
                        :class="{
                            'select-border-success': sIsCheckSetTimezone,
                            'select-border-validity': sTimezoneHint
                        }"
                        :options="cTimezoneNameList"
                        v-model="sSelectedTimezone"
                        placeholder="Please select"
                        @input="handleChangeTimezone"
                        v-tooltip="{
                            content: sTimezoneHint,
                            show: sTimezoneHint,
                            trigger: 'manual',
                            placement: 'top',
                        }"
                    >
                    </v-select>

                    <div class="timezone-utcinfo d-flex-spacebetween d-flex-align-center w-30">
                        <span class="timezone-utcinfo-label">UTC</span>
                        <span>{{ sTimezoneOffset }}</span>
                    </div>

                    <CheckBoxBtn
                        :pStatus="sIsCheckSetTimezone"
                        :pFunction="handleClickCheckBtn"
                    />
                </div>

                <div class="timezone-content d-flex-column">
                    <div class="timezone-content-now d-flex d-flex-align-center">
                        <span class="semi-title">{{ cSelectedTimezone }}</span>
                        <span class="timezone-content-now-label ml-10">now</span>
                    </div>

                    <div class="timezone-content-worldmap d-flex-center">
                        <WorldMapTimezone
                            class="mt-30"
                            :pCoordinate="cCoordinate"
                            :pTimezoneOffset="sTimezoneOffset"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import WorldMapTimezone from '~/components/common/WorldMapTimezone';
import CheckBoxBtn from '~/components/common/CheckBoxBtn'
import Moment from 'moment-timezone';
import vSelect from 'vue-select';

export default {
    components: {
        WorldMapTimezone,
        vSelect,
        CheckBoxBtn
    },
    props: {
        pLakeInfo: {
            type: Object,
            require: true,
        }
    },
    data() {
        return {
            sIsCheckSetTimezone: false,
            sSelectedTimezone: "",
            sTimezoneHint: "",
            sTimezoneOffset: "",
            sTimezoneList: [],
        }
    },
    computed: {
        ...mapState('lake', ['gLakeList']),
        cTimezoneNameList() {
            return this.sTimezoneList.map(aItem => {
                return aItem.name;
            });
        },
        cCoordinate() {
            return this.sTimezoneList.find(aItem => {
                return aItem.name === this.sSelectedTimezone;
            });
        },
        cSelectedTimezone() {
            return this.sSelectedTimezone ? this.sSelectedTimezone : "Please select Timezone"
        },
    },
    methods: {
        ...mapActions('global', ['getTimezoneList']),
        handleChangeTimezone() {
            this.sTimezoneOffset = Moment.tz(this.sSelectedTimezone).format('Z');
            this.sIsCheckSetTimezone = false;

            this.$emit("eSetTimezone", null);
        },
        handleClickCheckBtn() {
            if (!this.sSelectedTimezone) {
                this.sTimezoneHint = "Please select Timezone";
                return;
            } else {
                this.sTimezoneHint = "";
            }

            this.sIsCheckSetTimezone = !this.sIsCheckSetTimezone;
            this.$emit("eSetTimezone", this.sIsCheckSetTimezone ? this.sSelectedTimezone : null);
        },
    },
    async created() {
        this.sTimezoneList = await this.getTimezoneList();
        this.sSelectedTimezone = this.pLakeInfo.timezone;
        this.handleChangeTimezone();
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_timezone.scss";
</style>