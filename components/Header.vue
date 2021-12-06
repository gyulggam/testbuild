<template>
    <header id="header">
        <div class="container">
            <div class="logo">
                <NuxtLink to="/">
                    <img src="~/assets/images/logo_MachLake.png">
                </NuxtLink>
            </div>
            <nav class="main-menu">
                <ul>
                    <li>
                        <NuxtLink to="/lake" class="main-menu-active">
                            <i class="fas fa-database"></i>
                            <span class="device-hidden">Lake</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <a class="main-menu-disable">
                            <i class="fas fa-user-friends"></i>
                            <span class="device-hidden">Share</span>
                        </a>
                    </li>
                    <li>
                        <a class="main-menu-disable">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span class="device-hidden">Mounted</span>
                        </a>
                    </li>
                    <!-- <li><NuxtLink to="/store">Store</NuxtLink></li> -->
                </ul>
            </nav>
            <nav class="header-bottom">
                <ul class="header-bottom-ul">
                    <li class="header-bottom-ul-li">
                        <a class="header-bottom-ul-li-a" href="https://www.machlake.com" target="_blank">
                            <i class="fas fa-home header-bottom-ul-li-a-i"></i>
                            <span class="device-hidden">Home</span>
                        </a>
                    </li>
                    <li>
                        <a class="header-bottom-ul-li-a" href="https://machlake.atlassian.net/wiki/spaces/MAC/pages/33338/Introduction" target="_blank">
                            <i class="far fa-file-alt header-bottom-ul-li-a-i"></i>
                            <span class="device-hidden">Doc</span>
                        </a>
                    </li>
                    <li>
                        <NuxtLink to="/profiles" class="header-bottom-ul-li-a">
                            <i class="fad fa-user-circle header-bottom-ul-li-a-i"></i>
                            <span class="device-hidden">Account</span>
                        </NuxtLink>
                    </li>
                    <li class="cursor-pointer" @click="handelClicklogout">
                        <a class="header-bottom-ul-li-a">
                            <i class="fas fa-sign-out-alt header-bottom-ul-li-a-i"></i>
                            <span class="device-hidden">Sign out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions('auth', [
            "login",
            "logout"
        ]),
        handleClickOutside(){
            this.sIsShowMenu = false;
        },
        handelClicklogout() {
            try {
                this.logout();
            } catch (error) {
                console.log({ error });
            }
        }
    },
}
</script>
<style lang="scss">
@import "~/assets/scss/layout/_header.scss";
</style>
