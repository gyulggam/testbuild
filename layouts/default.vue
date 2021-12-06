<template>
    <div id="wrapper">
        <Header v-if="!cIsCheckLoginPage" />
        <main
            v-if="cIsCheckLoginPage || cInitDataCheck"
            id="content"
            class="w-100"
        >
            <Nuxt />
        </main>
        <ItemLoading v-if="!cIsCheckLoginPage && !cInitDataCheck" />
        <portal-target name="modal" multiple></portal-target>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex"

export default {
    watch: {
        //로그인 됐을대 lake로이동 로그인이 안되어있을때 login화면으로 이동
        gIsAuthenticated() {
            if (this.gIsAuthenticated) {
                this.$router.push('/lake');
                this.setInitData();
            } else {
                this.$router.push('/login');
            }
        }
    },
    computed: {
        ...mapState('lake', ["gLakeList"]),
        ...mapState('plan', ["gPlanList"]),
        ...mapState('global', ["gRegionList"]),
        ...mapState("auth", ["gIsAuthenticated"]),
        cInitDataCheck() {
            return this.gPlanList && this.gRegionList;
        },
        cIsCheckLoginPage() {
            return this.$route.path.includes('/login') || this.$route.path.includes('/register');
        },
    },
    methods: {
        ...mapActions('lake', [
            'getListLake',
        ]),
        ...mapActions('plan',[
            'getPlanList'
        ]),
        ...mapActions('global', [
            "getRegionList"
        ]),
        async setInitData() {
            await this.getListLake();
            await this.getPlanList();
            await this.getRegionList();
        }
    },
    created() {
        if (!this.cIsCheckLoginPage) {
            this.setInitData();
        }
    }
}
</script>
<style lang="scss">
#wrapper {
    display: flex;
    height: 100vh;
}
#content {
    min-width: 680px;

    .container {
        display: flex;
        justify-content: center;

        .sidebar {
            width: 130px;
            padding: 30px 15px 30px 0;
            li {
                a {
                    display: block;
                    padding: 5px;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 26px;
                    color: #b6b6b6;
                }
                &.active a{
                    color: #505050;
                }
            }
        }
        .main-content {
            flex: 1;
        }
    }
}
</style>
