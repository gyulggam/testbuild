<template>
    <div
        class="checkbox-btn d-flex-align-center"
        :class="{'bg-success': pStatus, 'bg-disable': !pStatus,}"
        @click="pFunction"
    >
        <i class="fas fa-check"></i>
    </div>
</template>

<script>
export default {
    props: {
        pStatus: {
            type: Boolean,
            default: false,
        },
        pFunction: {
            type: Function,
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_setting-lake.scss";
</style>