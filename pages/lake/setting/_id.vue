<template>
    <div class="container">
        <div
            v-if="cNullCheckSettingLakeInfo"
            class="setting-wrap d-flex"
        >
            <SideMenu
                :pMenuList="sSideMenuList"
            >
            </SideMenu>

            <div class="setting-content d-flex-column pl-20">
                <div class="setting-content-main-title d-flex-center d-flex-align-center">
                    <img src="~/assets/images/icon_gear.svg">
                    Setting
                </div>

                <SetLakeName 
                    id="setLakename"
                    :pLakeInfo="sSettingLakeInfo.lake_info"
                    @eSetLakeName="setLakeName"
                />

                <SetTimezone
                    id="setTimezone"
                    :pLakeInfo="sSettingLakeInfo.lake_info"
                    @eSetTimezone="setTimezone"
                />

                <div
                    class="updatelake-mainbtn d-flex-center self-align-center"
                    @click="sIsShowConfirmModal = true"
                >
                    Update Lake
                </div>

                <div class="border-bottom mt-80 mb-80"></div>

                <p class="setting-content-main-title d-flex-center">Detail Setting</p>

                <SetAccessControl
                    id="setAccess"
                    :pLakeId="sLakeId"
                    :pLakeAclList="sSettingLakeInfo.access_control_list"
                    @eSetAclList="setAclList"
                    @eRefresh="setInitSetting"
                />

                <SetPlan
                    id="setPlan"
                    :pLakeInfo="sSettingLakeInfo.lake_info"
                    :pStroageSize="sSettingLakeInfo.plan_limit.max_storage"
                    @eSetLakePlan="setLakePlan"
                    @eSetStorage="setStorage"
                />
            </div>
        </div>

        <div v-else>
            {{ cErrorCheckViewLake && sSettingLakeInfo.title }}
            <ItemLoading />
        </div>

        <div v-if="sIsShowUpdateLoading">
            <ItemLoading />
        </div>

        <AppModal
            title="Create Lake"
            width="25rem"
            v-if="sIsShowConfirmModal"
            :okText="'OK'"
            @close="sIsShowConfirmModal = false"
            @ok="handleUpdateLake"
        >
            <div slot="content">
                Do you want to Update lake?
            </div>
        </AppModal>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SideMenu from '~/components/common/SideMenu'
import SetLakeName from '~/components/page/lake/setting/SetLakename'
import SetAccessControl from '~/components/page/lake/setting/SetAccessControl'
import SetTimezone from '~/components/page/lake/setting/SetTimezone'
import SetPlan from '~/components/page/lake/setting/SetPlan'
import { SETTING_SIDE_MENU } from '~/utils/config'
import VueWorldMap from 'vue-world-map'
import AppModal from '~/components/common/AppModal'

export default {
    asyncData({ params, query }) {
        return {
            sLakeId: params.id, 
        }
    },
    components: {
        SideMenu,
        SetLakeName,
        SetAccessControl,
        SetTimezone,
        SetPlan,
        VueWorldMap,
        AppModal
    },
    data() {
        return {
            sSideMenuList: SETTING_SIDE_MENU,
            sLakeName: null,
            sLakePlan: null,
            sTimezone: null,
            sStorageSize: null,
            sAccessControlList: null,
            sLakeList: null,
            sSettingLakeInfo: null,
            sIsShowConfirmModal: false,
            sIsShowUpdateLoading: false,
            sUpdateLakeObj: {},
        }
    },
    computed: {
        ...mapState('lake', ['gLakeList']),
        cErrorCheckViewLake() {
            return this.sSettingLakeInfo && this.sSettingLakeInfo.hasOwnProperty("title");
        },
        cNullCheckSettingLakeInfo() {
            return this.sSettingLakeInfo && this.sSettingLakeInfo.hasOwnProperty("lake_id");
        }
    },
    methods: {
        ...mapActions('lake', [
                    "viewLake",
                    'updateLake',
                ]
            ),
        ...mapMutations('global', ["setCurrentPage"]),
        async setInitSetting() {
            this.sSettingLakeInfo = null;
            this.sSettingLakeInfo = await this.viewLake(this.sLakeId);
        },
        setLakeName(aName) {
            this.sLakeName = aName;
        },
        setLakePlan(aLakePlan) {
            this.sLakePlan = aLakePlan;
        },
        setTimezone(aTimezone) {
            this.sTimezone = aTimezone;
        },
        setStorage(aStorageSize) {
            this.sStorageSize = aStorageSize;
        },
        setAclList(aAclList) {
            this.sAccessControlList = aAclList;
        },
        handleCheckCreateInfoValidity() {
            return !this.sLakeName || !this.sTimezone;
        },
        async handleUpdateLake() {
            const sValidity = this.handleCheckCreateInfoValidity();
            this.sIsShowConfirmModal = false;

            if (sValidity) {
                this.$toasted.error("Please check edit value");

                return;
            };

            this.sUpdateLakeObj = {
                lake_id: this.sLakeId,
                lake_name: this.sLakeName,
                timezone: this.sTimezone
            };

            this.sIsShowUpdateLoading = true;

            const sResult = await this.updateLake(this.sUpdateLakeObj);
            if (sResult.status === "success") {
                this.$toasted.success(`Lake Update ${sResult.status}`);
                this.$router.push("/lake");
            } else {
                this.$toasted.error(sResult.message);
            }

            this.sIsShowUpdateLoading = false;
        },
    },
    async created() {
        this.setCurrentPage("setting");
        await this.setInitSetting();
    }
}
</script>
<style lang="scss" scope>
@import "~/assets/scss/components/lake/_setting-lake.scss";
</style>