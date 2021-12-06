<template>
    <div class="container">
        <div
            v-if="!sIsShowConfirmCreateLake"
            class="createlake-wrap d-flex"
        >
            <SideMenu
                :pMenuList="sSideMenuList"
            >
                <template slot="side-menu-custum">
                    <div
                        class="createlake-btn d-flex-center mt-30 bg-gray"
                        @click="handleCreatelake"
                    >
                        Create Lake
                    </div>
                </template>
            </SideMenu>
            <div class="createlake-content d-flex-column pl-20">
                <div class="createlake-content-main-title d-flex-center d-flex-align-center">
                    <img src="~/assets/images/icon_createlake.svg" alt="">
                    Create lake
                </div>

                <SetLakeName
                    id="setLakename"
                    :pLakeInfo="sDefaultLakeInfo"
                    @eSetLakeName="setLakeName"
                />
                <SetPlan
                    id="setPlan"
                    :pLakeInfo="sDefaultLakeInfo"
                    @eSetLakePlan="setLakePlan"
                    @eSetStorage="setStorage"
                />
                <SetSchema
                    id="setTag"
                    pSchemaType="tag"
                    :pSchema="sTagmetaSchema"
                    @eCheckTagSchema="setTagSchemaCheck"
                    @eSetTagmetaSchema="setTagmetaSchema"
                />
                <SetSchema
                    id="setValue"
                    pSchemaType="value"
                    :pSchema="sValueSchema"
                    @eCheckSValuechema="setValueSchemaCheck"
                    @eSetValueSchema="setValueSchema"
                />
                <SetRegion
                    id="setRegion"
                    :pLakeInfo="sDefaultLakeInfo"
                    @eSetRegion="setRegion"
                />
                <SetTimezone
                    id="setTimezone"
                    ref="time_zone"
                    :pLakeInfo="sDefaultLakeInfo"
                    @eSetTimezone="setTimezone"
                />

                <div
                    class="createlake-mainbtn d-flex-center self-align-center"
                    @click="handleCreatelake"
                >
                    Create Lake
                </div>
            </div>
        </div>

        <ConfirmLakeInfo
            v-else
            :pCreateLakeObj="sCreateLakeObj"
            @eCancelCreateLakeInfo="setCancelCreateLakeInfo"
        />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { CREATELAKE_SIDE_MENU, DEFAUlT_LAKEINFO, DEFAULT_TAGMETA_SCHEMA, DEFAULT_VALUE_SCHEMA } from '~/utils/config'
import SideMenu from '~/components/common/SideMenu'
import SetLakeName from '~/components/page/lake/setting/SetLakename'
import SetAccessControl from '~/components/page/lake/setting/SetAccessControl'
import SetRegion from '~/components/page/lake/setting/SetRegion'
import SetTimezone from '~/components/page/lake/setting/SetTimezone'
import SetPlan from '~/components/page/lake/setting/SetPlan'
import SetSchema from '~/components/page/lake/setting/SetSchema'
import ConfirmLakeInfo from '~/components/page/lake/ConfirmLakeInfo'
import VueWorldMap from 'vue-world-map'

export default {
    components: {
        SideMenu,
        SetLakeName,
        SetAccessControl,
        SetRegion,
        SetTimezone,
        SetPlan,
        SetSchema,
        ConfirmLakeInfo,
        VueWorldMap,
    },
    data() {
        return {
            sSideMenuList: CREATELAKE_SIDE_MENU,
            sDefaultLakeInfo: JSON.parse(JSON.stringify(DEFAUlT_LAKEINFO)),
            sIsShowConfirmCreateLake: false,
            sIsTagSchemaCheck: false,
            sIsValueSchemaCheck: false,
            sLakeName: null,
            sLakePlan: null,
            sRegion: null,
            sTimezone: null,
            sStorageSize: null,
            sTagmetaSchema: JSON.parse(JSON.stringify(DEFAULT_TAGMETA_SCHEMA)),
            sValueSchema: JSON.parse(JSON.stringify(DEFAULT_VALUE_SCHEMA)),
            sCreateLakeObj: {},
            sErrorContents: "",
        }
    },
    methods: {
        ...mapMutations('global', ["setCurrentPage"]),
        ...mapActions('lake', ['createLake']),
        setLakeName(aName) {
            this.sLakeName = aName;
        },
        setLakePlan(aLakePlan) {
            this.sLakePlan = aLakePlan;
        },
        setRegion(aRegion) {
            this.sRegion = aRegion;
        },
        setTimezone(aTimezone) {
            this.sTimezone = aTimezone;
        },
        setStorage(aStorageSize) {
            this.sStorageSize = aStorageSize;
        },
        setTagmetaSchema(aTagmetaSchema) {
            this.sTagmetaSchema = aTagmetaSchema;
        },
        setValueSchema(aValeSchema) {
            this.sValueSchema = aValeSchema;
        },
        setTagSchemaCheck(aSchemaCheck) {
            this.sIsTagSchemaCheck = aSchemaCheck;
        },
        setValueSchemaCheck(aSchemaCheck) {
            this.sIsValueSchemaCheck = aSchemaCheck;
        },
        setCancelCreateLakeInfo(aCancelLakeInfo) {
            //confirm화면에서 cancel을 눌렸을때 confirm으로 가기전 등록했던 정보들 복원
            this.sIsShowConfirmCreateLake = false;
            this.sIsTagSchemaCheck = false;
            this.sIsValueSchemaCheck = false;
            this.sCreateLakeObj = JSON.parse(JSON.stringify(aCancelLakeInfo));

            this.sDefaultLakeInfo.lake_name = aCancelLakeInfo.lake_info.lake_name;
            this.sDefaultLakeInfo.lake_plan = aCancelLakeInfo.lake_info.lake_plan;
            this.sDefaultLakeInfo.region = aCancelLakeInfo.lake_info.region;
            this.sDefaultLakeInfo.timezone = aCancelLakeInfo.lake_info.timezone;
            this.sDefaultLakeInfo.storage_size = aCancelLakeInfo.lake_info.storage_size;
            this.sTagmetaSchema = aCancelLakeInfo.tag_schema;
            this.sValueSchema = aCancelLakeInfo.value_schema;
        },
        handleCheckCreateInfoValidity() {
            if (!this.sTimezone) {
                this.$router.push({hash: "#setTimezone"});
                this.sErrorContents = "Check Timezone";
                return;
            }
            if (!this.sRegion) {
                this.$router.push({hash: "#setRegion"});
                this.sErrorContents = "Check Region";
                return;
            }
            if (!this.sIsValueSchemaCheck) {
                this.$router.push({hash: "#setValue"});
                this.sErrorContents = "Check Value";
                return;
            }
            if (!this.sIsTagSchemaCheck) {
                this.$router.push({hash: "#setTag"});
                this.sErrorContents = "Check Tagmeta";
                return;
            }
            if (!this.sLakePlan && !this.sStorageSize) {
                this.$router.push({hash: "#setPlan"});
                this.sErrorContents = "Check Lake plan";
                return;
            }
            if (!this.sLakeName) {
                this.$router.push({hash: "#setLakename"});
                this.sErrorContents = "Check Lake name";
                return;
            }

            this.sErrorContents = "";

        },
        async handleCreatelake() {
            this.handleCheckCreateInfoValidity();

            if (this.sErrorContents) {
                this.$toasted.error(this.sErrorContents);
                return;
            };

            this.sCreateLakeObj = {
                lake_info: {
                    lake_name: this.sLakeName,
                    lake_plan: this.sLakePlan,
                    owner: this.$auth.user.username,
                    region: this.sRegion,
                    timezone: this.sTimezone,
                    storage_size: this.sStorageSize,
                },
                tag_schema: this.sTagmetaSchema,
                value_schema: this.sValueSchema,
                // access_control_list: this.sAccessControlList /* create할땐 빠짐 */
            };

            this.sIsShowConfirmCreateLake = true;
        },
        handleCancelConfirmCreateLake() {
            this.sIsShowConfirmCreateLake = !this.sIsShowConfirmCreateLake;
        }
    },
    async created() {
        this.setCurrentPage("createlake");
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_create-lake.scss";
</style>