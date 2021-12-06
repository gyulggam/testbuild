<template>
    <div class="account-info">Welcome {{ account }}</div>
</template>
<script>
export default {
    data() {
        return {
            account: 'Test',
        }
    },
}
</script>
<style lang="scss" scoped>
.account-info {
    background: #ccc;
}
</style>
