<template>
    <AppModal
        @close="$emit('close')"
        title="Schema"
        :footer="false"
    >
        <div slot="content" class="schema-modal d-flex-spacebetween">
            <div class="d-flex-column d-flex-align-start mt-10 w-45">
                <p class="sub-title">Tag Meta</p>

                <div class="tagmeta-box mb-10">
                    <div class="tagmeta-header border-bottom mt-10">
                        <div class="semi-title ptb-5">Name</div>
                        <div class="semi-title ptb-5">Type</div>
                    </div>

                    <div
                        v-for="(aItem, aIdx) in sTagSchema"
                        :key="`tagmeta-item-${aIdx}`"
                        class="tagmeta-item"
                    >
                        <div
                            class="border-bottom ptb-5"
                            v-tooltip="{
                                content: aItem.col_name,
                            }"
                        >
                            {{ limitLength(aItem.col_name, 13) }}
                        </div>

                        <div class="border-bottom ptb-5 prl-10 inline-block text-center">
                            {{ aItem.col_type }}
                            <span 
                                v-show="aItem.col_length > 0"
                                class="text-primary-color"
                            >
                                ({{ aItem.col_length }})
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex-column d-flex-align-start mt-10 w-45">
                <p class="sub-title">Value</p>
                <div class="value-box mb-10">
                    <div class="tagmeta-header border-bottom mt-10">
                        <div class="semi-title ptb-5">Name</div>
                        <div class="semi-title ptb-5">Type</div>
                    </div>
                    
                    <div
                        v-for="(aItem, aIdx) in sValueSchema"
                        :key="`value-item-${aIdx}`"
                        class="value-item"
                    >
                        <div 
                            class="border-bottom ptb-5"
                            v-tooltip="{
                                content: aItem.col_name,
                            }"
                        >
                            {{ limitLength(aItem.col_name, 13) }}
                        </div>

                        <div class="border-bottom ptb-5 prl-10 inline-block text-center">
                            {{ aItem.col_type }}
                            <span 
                                v-show="aItem.col_length > 0"
                                class="text-primary-color"
                            >
                                ({{ aItem.col_length }})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
import { limitLength } from '~/assets/js/common.js'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        AppModal,
    },
    props: {
        pLakeInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            sTagSchema: null,
            sValueSchema: null,
        }
    },
    methods: {
        limitLength
    },
    created() {
        this.sTagSchema = this.pLakeInfo.tag_schema;
        this.sValueSchema = this.pLakeInfo.value_schema;
    }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/components/lake/schema-modal.scss"
</style>
