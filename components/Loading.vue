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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
}
</style>
