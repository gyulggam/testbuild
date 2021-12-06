<template>
    <div>
        <i v-if="!sIsShowText" class="fal fa-info-circle" @click="sIsShowText = true"></i>
        <div v-else class="lake-item__info__toggle">
            <strong class="lake-item__info__id">
                Lake ID: <span :id="pText">{{ pText }}</span>
            </strong>
            <button type="button" class="mBtn mBtn--icon" @click="copyLakeID(pText)">
                <i class="far fa-clone"></i>
            </button>
            <button type="button" class="mBtn mBtn--icon" @click="sIsShowText = false">
                <i class="fal fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pText: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            sIsShowText: false,
        }
    },
    methods: {
        copyLakeID(aEvent){
            const copied = document.querySelector(`#${CSS.escape(aEvent)}`)
            let textArea = document.createElement("textarea");
            textArea.value = copied.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
            this.$toasted.show("Copied");
        },
    }
}
</script>
