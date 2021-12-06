<template>
    <div class="loading-wrap">
        <i class="fas fa-3x fa-spinner fa-spin"></i>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.loading-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 999;
    background-color:#eaeaea80;
}
</style>
