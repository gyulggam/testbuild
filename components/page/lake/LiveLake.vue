<template>
    <div class="live-lake">
        <LiveItem
            v-for="(aItem, aIdx) in cLakeList"
            :key="aIdx"
            :pLakeInfo="aItem"
            @eRefreshLakeList="handleRefreshLakeList"
        />
    </div>
</template>

<script>
import LiveItem from '~/components/page/lake/LiveItem'

export default {
    components: {
        LiveItem,
    },
    props: {
        pLakeList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
        }
    },
    computed: {
        cLakeList() {
            return this.pLakeList && this.pLakeList;
        }
    },
    methods: {
        handleRefreshLakeList() {
            this.$emit("eRefreshLakeList");
        }
    },
}
</script>

<style lang="scss" scoped>
// @import "~/assets/scss/components/lake/live-lake.scss";
</style>
