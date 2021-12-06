<template>
    <div class="add-column">
        <ul class="list-inline">
            <li>
                <input
                    v-model="payload.name"
                    class="add-column__input"
                    placeholder="Name"
                />
            </li>
            <li>
                <div
                    class="add-column__type"
                    v-click-outside="handleClickOutSide"
                >
                    <div class="d-flex" @click="handleShowType">
                        <span>Type : {{this.payload.type}}</span>
                        <button class="ml-auto btn">
                            <i
                                v-if="isShowType"
                                class="far fa-chevron-left"
                            ></i>
                            <i v-else class="far fa-chevron-right"></i>
                        </button>
                    </div>
                    <ul v-show="isShowType">
                        <li v-for="(item, index) in type" :key="index">
                            <label :for="item.name + name_column">
                                <input
                                    :id="item.name + name_column"
                                    v-model="payload.type"
                                    type="radio"
                                    :value="item.value"
                                    :name="name_column"
                                    @change="isShowType = false"
                                />
                                <span>{{ item.name }}</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </li>
            <li v-show="payload.type == 'varchar'">
                <input
                    v-model="payload.length"
                    placeholder="length"
                    class="add-column__input"
                    type="number"
                />
            </li>
            <li>
                <button
                    class="mBtn mbtn-click"
                    @click="$emit('AddColumn', payload)"
                >
                    Done
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { TYPE_COLUMN } from '../../../utils/config'
export default {
    props: {
        tag: {
            type: Object,
            default: () => {},
        },
        name_column:{
            type: String,
            required: true
        }
    },
    data() {
        return {
            isShowType: false,
            type: TYPE_COLUMN,
            payload: {
                name: null,
                type: null,
                length: null,
            },
        }
    },
    created() {
        this.payload.name = this.tag ? this.tag.col_name : null
        this.payload.type = this.tag ? this.tag.col_type : 'varchar'
        this.payload.length = this.tag ? this.tag.col_length : 40
    },
    methods: {
        handleShowType() {
            this.isShowType = !this.isShowType
        },
        handleClickOutSide() {
            this.isShowType = false
        },
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_add-column.scss";
</style>
