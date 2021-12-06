<template>
    <div class="side-menu-wrap device-hidden">
        <div class="fixed-box">
            <GobackPage
                :pFunction="handleClickBackpage"
                pTitle="Lake list"
            />

            <ul
                v-for="(aItem, aIdx) in cSideMenuList"
                :key="aIdx"
                class="side-menu-content sub-title mt-10"
                :class="{'border-bottom': cSideMenuList.length - 1 !== aIdx}"
            >
                <li
                    v-for="(bItem, bIdx) in aItem"
                    :key="`${bIdx}`"
                >
                    <NuxtLink 
                        :to="`#${bItem.link}`"
                        :class="{'nuxt-link-active': cIsMenuActive && (aIdx === 0 && bIdx === 0)}"
                    >
                        {{ bItem.menu_name }}
                    </NuxtLink>
                </li>
            </ul>

            <slot name="side-menu-custum"></slot>
        </div>
    </div>
</template>

<script>
import GobackPage from '~/components/common/GobackPage'

export default {
    components: {
        GobackPage
    },
    props: {
        pMenuList: {
            type: Array,
            default:() => []
        },
    },
    data() {
        return {
        }
    },
    computed: {
        cSideMenuList() {
            let sCategoriesList = [];

            this.pMenuList.forEach(aItem => {
                if (sCategoriesList.includes(aItem.categories) === false) {
                    sCategoriesList.push(aItem.categories);
                }
            });

            return sCategoriesList.map(aItem => {
                return this.pMenuList.filter(bItem => {
                    return aItem === bItem.categories;
                });
            });
        },
        cIsMenuActive() {
            return this.$route.hash === "" ? true : false
        }
    },
    methods: {
        handleClickBackpage() {
            this.$router.push("/lake");
        },
    },
}
</script>
<style lang="scss" scope>
@import "~/assets/scss/common/side-menu.scss";
</style>