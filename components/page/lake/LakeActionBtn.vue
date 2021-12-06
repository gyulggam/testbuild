<template>
   <div class="live-item__control--right d-flex" v-click-outside="handleClickOutSide">
        <button type="button" class="mBtn mBtn-button mBtn-etc-button" @click="handleSchemaModal">
            <img src="~/assets/images/lakeitem/icon_structure.png">
        </button>
        <!-- <button type="button" class="mBtn mBtn-button mBtn-etc-button" @click="handleRedirectChart">
            <img src="~/assets/images/lakeitem/icon_chart.png">
        </button> -->
        <button type="button" class="mBtn mBtn-button mBtn-etc-button" @click="handleClickSettingIcon">
            <img src="~/assets/images/lakeitem/icon_gear.png">
        </button>
        <button type="button" class="mBtn mBtn-button mBtn-etc-button" @click="handleRefreshLake">
            <img src="~/assets/images/lakeitem/icon_refresh.png">
        </button>
        <button type="button" class="mBtn mBtn-button mBtn-etc-button" @click="sIsShowGroupEtc = true">
            <img src="~/assets/images/lakeitem/icon_more.png">
        </button>
        <div v-if="sIsShowGroupEtc" class="popup-showGroup popup-showGroup-etc">
            <ul>
                <li @click="handleRedirectTagmanager">
                    Tag Manager
                </li>
                <li 
                    class="lake-drop-btn"
                    @click="handelClickDestroyLakeBtn"
                >
                    Destroy Lake
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pLakeId: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            sIsShowGroupEtc: false,
        }
    },
    methods: {
        handleClickOutSide() {
            this.sIsShowGroupEtc = false;
        },
        handleSchemaModal() {
            this.$emit("eClickSchemaModalBtn");
        },
        handleRedirectChart() {
            window.open(`http://${this.pLakeId}.machlake.com:5003/`);
        },
        handleRedirectTagmanager() {
            this.$router.push(`/lake/tagmanager/${this.pLakeId}`);
        },
        handleClickSettingIcon() {
            this.$router.push(`/lake/setting/${this.pLakeId}`);
        },
        handleRefreshLake() {
            this.$emit("eClickRefreshBtn");
        },
        handelClickDestroyLakeBtn() {
            this.$emit("eClickDestroyLakeBtn");
        }
    }
}
</script>