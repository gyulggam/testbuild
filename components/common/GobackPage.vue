<template>
    <div
        class="backpage d-flex-align-center"
        @click="pFunction"
    >
        <div class="d-flex-center d-flex-align-center mr-20">
            <img src="~/assets/images/icon_goback_btn.png" alt="">
        </div>
        <p class="sub-title">{{ pTitle }}</p>
    </div>

</template>

<script>
export default {
    props: {
        pFunction: {
            type: Function
        },
        pTitle: {
            type: String,
            default: ""
        }
    }
}
</script>

<style>
@import "~/assets/scss/common/goback-page.scss";
</style>