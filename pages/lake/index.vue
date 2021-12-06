<template>
    <div class="page-component">
        <div 
            v-if="cInitDataCheck && !cInitErrorCheck" 
            class="container"
        >
            <div class="lake-page">
                <div class="lake-page-control-box d-flex-end mb-20">
                    <button 
                        type="button" 
                        class="mBtn mBtn-small-addlake"
                        @click="handleOpenCreatelake"
                    >
                        <i class="far fa-plus"></i> Lake
                    </button>
                </div>
                <div
                    v-if="
                        gLakeList &&
                        ((gLakeList.lake !== null && (gLakeList.lake.length > 0)) ||
                            (gLakeList.mount !== null && gLakeList.mount.length > 0) ||
                            (gLakeList.share !== null && gLakeList.share.length > 0))
                    "
                >
                    <LiveLake
                        v-if="tab == 1"
                        :pLakeList="gLakeList.lake"
                        @eRefreshLakeList="handleRefreshCreate"
                    />
                    <MountedLake v-if="tab == 2" />
                    <SharedLake v-if="tab == 3" />
                </div>
                <div v-else-if="gLakeList.lake.length === 0"> <!-- 레이크가 없을때 +레이크 버튼 -->
                    <button
                        class="mBtn mBtn-addLake"
                        @click="handleOpenCreatelake"
                    >
                        <i class="fal fa-3x fa-plus"></i>
                        <span>Lake</span>
                    </button>
                </div>
            </div>
        </div>

        <div 
            v-else
            class="d-flex-center"
        >
            <ItemLoading v-if="!cInitErrorCheck" />
            <span v-else>{{ gLakeList.title }}</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import LiveLake from '~/components/page/lake/LiveLake'
import MountedLake from '~/components/page/lake/MountedLake'
import SharedLake from '~/components/page/lake/SharedLake'
export default {
    components: {
        MountedLake,
        LiveLake,
        SharedLake,
    },
    data() {
        return {
            sCreateStatusIntervalList: [],
            sCreateStatus: {"lake_id" : '', "status" : ''},
            sCreateLakeList: [],
            mount: [],
            share: [],
            tab: 1,
        }
    },
    computed: {
        ...mapState('lake', ['gLakeList']),
        cInitDataCheck() {
            return this.gLakeList;
        },
        cInitErrorCheck() {
            return this.gLakeList && this.gLakeList.hasOwnProperty("title");
        },
        cDrawLakeList() {
            return this.gLakeList.lake;
        }
    },
    methods: {
        ...mapActions('lake', [
            'getListLake',
            'getCreateLakeStatus',
        ]),
        ...mapMutations('lake', [
            'setListLake',
            'setOpenDetailLakeId'
        ]),
        ...mapMutations('global', [
            'setLoading',
        ]),
        async handleRefreshCreate() {
            await this.getListLake();
        },
        async handleRefreshDelete() {
            await this.setListLake(null);
            await this.getListLake();
        },
        handleOpenCreatelake() {
            this.$router.push('/lake/createlake');
        },
    },
    async created() {
        this.setOpenDetailLakeId("");
        await this.getListLake();
    }
}
</script>
<style lang="scss">
.lake-page {
    width: 100%;
    min-width: 700px;
    padding: 30px 10%;
    h1 {
        font-size: 30px;
        text-align: center;
        margin: 0 0 30px;
    }
}
.empty-create-box {
    margin: 10px 0 0;
    height: 230px;

    & + .empty-create-box {
        margin: 30px 0 0;
    }
}
</style>
