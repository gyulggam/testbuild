<template>
    <div v-if="visible">
        <portal to="modal" :order="order">
            <div class="app-modal-root">
                <div class="app-modal-overlay"></div>
                <div
                    v-bind="$attrs"
                    class="app-modal-wrapper"
                    tabindex="-1"
                    role="dialog"
                    :class="{ ...classes, ...componentClass }"
                    @click.self="$emit('close')"
                >
                    <div
                        class="app-modal"
                        role="document"
                        :style="{
                            width:
                                typeof width === 'number'
                                    ? width + 'px'
                                    : width,
                            maxWidth:
                                typeof maxWidth === 'number'
                                    ? maxWidth + 'px'
                                    : maxWidth,
                        }"
                    >
                        <div class="app-modal-components">
                            <div v-if="header" class="app-modal-header">
                                <slot name="header" :close="close">
                                    <div class="app-modal-header-content">
                                        <h4 class="app-modal-title">
                                            {{ title }}
                                        </h4>
                                        <button
                                            class="app-modal-close"
                                            @click="close"
                                        >
                                            <i class="fal fa-2x fa-times"></i>
                                        </button>
                                    </div>
                                </slot>
                            </div>

                            <div class="app-modal-content">
                                <slot name="content"></slot>
                            </div>

                            <div v-if="footer" class="app-modal-footer">
                                <slot name="footer">
                                    <div class="d-flex justify-content-end">
                                        <button
                                            class="btn-confirm"
                                            :loading="confirmLoading"
                                            :size="size"
                                            @click="ok"
                                        >
                                            <slot name="okText">{{
                                                okText
                                            }}</slot>
                                        </button>

                                        <button
                                            class="btn-cancel"
                                            color="default"
                                            outline
                                            :loading="cancelLoading"
                                            :size="size"
                                            @click="close"
                                        >
                                            <slot name="cancelText">{{
                                                cancelText
                                            }}</slot>
                                        </button>
                                    </div>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </portal>
    </div>
</template>

<script>
// import IconClose from "~/assets/svg/v2-icons/close_24px.svg?inline";

export default {
    inheritAttrs: false,

    components: {
        // IconClose
    },

    model: {
        prop: 'visible',
        event: 'visibleChange',
    },

    props: {
        width: {
            type: [Number, String],
            default: 600, // number in px or css value
        },
        maxWidth: {
            type: [Number, String],
        },
        size: {
            type: String,
            default: 'md',
            validator: (value) => ['sm', 'md'].indexOf(value) > -1,
        },
        componentClass: {
            type: Object,
            default: () => {},
        },
        order: {
            type: Number,
            default: 1,
        },
        centered: Boolean,
        visible: {
            type: Boolean,
            default: true,
        },
        title: String,
        confirmLoading: Boolean,
        cancelLoading: Boolean,
        footer: {
            type: Boolean,
            default: true,
        },
        header: {
            type: Boolean,
            default: true,
        },
        cancelText: {
            type: String,
            default: 'Close',
        },
        okText: {
            type: String,
            default: 'Save',
        },
    },

    computed: {
        classes() {
            return {
                'app-modal--centered': this.centered,
                'app-modal--size-md': this.size === 'md',
                'app-modal--size-sm': this.size === 'sm',
            }
        },
    },

    created() {
        if (process.browser) {
            window.addEventListener('keyup', this.closeByEscape)
        }
        this.$root.$el.classList.add('show-modal');
    },

    beforeDestroy() {
        window.removeEventListener('keyup', this.closeByEscape)
        this.$root.$el.classList.remove('show-modal');
    },

    methods: {
        close() {
            this.$emit('close')
        },

        ok() {
            this.$emit('ok')
        },

        cancel() {
            this.$emit('cancel')
        },

        closeByEscape(event) {
            if (event.key === 'Esc' || event.key === 'Escape') {
                this.close()
            }
        },
    },
}
</script>
<style lang="scss">
@import '~/assets/scss/common/app-modal.scss';
</style>
