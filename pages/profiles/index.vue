<template>
    <div class="container">
        <div class="profile-wrap d-flex">
            <SideMenu
                :pMenuList="sSiedeMenu"
            />
            <div class="profile-content d-flex-column pl-20">
                <div class="profile-content-main-title d-flex-center d-flex-align-center">
                    <img src="~/assets/images/icon_user.png">
                    <span class="ml-10">Account</span>
                </div>

                <EditProfile v-if="tab == 1" />
                <Payment v-if="tab == 2" />
            </div>
        </div>
    </div>
</template>

<script>
import EditProfile from '~/components/page/profiles/EditProfile'
import SideMenu from '~/components/common/SideMenu'
import Payment from '~/components/page/profiles/Payment.vue'
import { PROFILE_SIDE_MENU } from '~/utils/config'

export default {
    components: {
        EditProfile,
        SideMenu,
        Payment
    },
    data() {
        return {
            isLoading: false,
            tab: 2,
            sSiedeMenu: PROFILE_SIDE_MENU,
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/page/_profile.scss";
</style>