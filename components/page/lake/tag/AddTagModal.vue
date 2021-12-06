<template>
    <AppModal
        width="30rem"
        @close="$emit('close')"
        title="Create Tag"
        okText="Create"
        @ok="handleCreateTag"
    >
        <div slot="content" class="add-tag-modal">
            <div
                v-for="(aItem, aIdx) in this.sTagschema"
                class="frm-base mb-20" 
                :key="aIdx"
            >
                <div class="d-flex-align-center mb-10">
                    <label class="semi-title"
                        v-tooltip="{
                            content: aItem.col_name,
                            placement: 'bottom'
                        }"
                    >
                        {{ limitLength(aItem.col_name, 15) }} 
                    </label>
                    <div class="column-type ml-5">{{ aItem.col_type }}{{ aItem.col_length !== 0 ? aItem.col_length : "" }}</div>
                    <span
                        v-if="sHintList[aIdx] !== ''"
                        class="column-hint ml-10 denial-color"
                    >
                        {{ sHintList[aIdx] }}
                    </span>
                </div>
                
                <input
                    v-if="handleCheckInputType(aItem.col_type)"
                    class="input field-input"
                    type="number"
                    v-model.number="aItem.col_value"
                    @input="aEvent => handleChangeInputHint(aEvent, aItem, aIdx)" 
                />

                <input
                    v-else
                    class="input field-input"
                    type="text"
                    v-model="aItem.col_value"
                    @input="aEvent => handleChangeInputHint(aEvent, aItem, aIdx)" 
                />
            </div>
        </div>
    </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
import { mapState, mapActions } from 'vuex'
import { TYPE_LIST } from '~/utils/config.js'
import { limitLength } from '~/assets/js/common.js'

export default {
    components: {
        AppModal,
    },
    props: {
        pLake: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            sTypeList: TYPE_LIST,
            sTagschema: null,
            sHintList: [],
        }
    },
    computed: {
        ...mapState("tag",["gTagList"]),
        getTagSchema() {
            return this.pLake.tag_schema ? this.pLake.tag_schema : [];
        },
        cTagNameList() {
            return this.gTagList.map(aItem => {
                return aItem.name;
            });
        }
    },
    methods: {
        limitLength,
        ...mapActions('tag', ['createTag']),
        setTagschema() {
            /* create tagmeta를 하기위해 입력 받을 input을 만들때 사용할 빈 value의 tagschema
            input 개수만큼 hintlist의 array에 값을 입력하라는 초기값도 셋팅한다. */

            this.sTagschema = this.getTagSchema.map((aItem, aIdx) => {
                this.sHintList[aIdx] = "Please enter a value";

                aItem = {
                    col_name: aItem.col_name,
                    col_value: null,
                    col_type: aItem.col_type,
                    col_length: aItem.col_length
                }

                return aItem;
            })
        },
        async handleCreateTag() {
            if (!this.handleCheckTagmetaValidity()) return;

            const sTag = this.sTagschema.map((aItem) => {
                return aItem.col_value;
            });
            const sPayload = {
                lake_id: this.pLake.lake_id,
                params: [sTag],
            }
            const sResult = await this.createTag(sPayload);
            if (sResult.status === 'success') {
                this.$emit('refreshTag');
                this.$toasted.success('Success');
            } else {
                this.$toasted.error(sResult.title);
            }
        },
        handleCheckInputType(aColType) {
            return this.sTypeList.int.includes(aColType) || this.sTypeList.float.includes(aColType);
        },
        handleChangeInputHint(aEvent, aSchemaItem, aInputIdx) {
            /* 
                입력되지 않은 값은 없는지 체크
                create tag meta input 값이 바뀔때 해당 타입에 맞는 값인지 체크 
                name 중복 체크
            */
           
            this.sHintList[aInputIdx] = !aEvent.target.value ? "Please enter a value" : "";

            if ((this.sTypeList.int.includes(aSchemaItem.col_type) && !parseInt(aEvent.target.value)) ||
            (this.sTypeList.float.includes(aSchemaItem.col_type) && !parseFloat(aEvent.target.value))) {
                this.sHintList[aInputIdx] = "This column can only be number";
            } else {
                this.sHintList[aInputIdx] = "";
            }

            this.sHintList[aInputIdx] = this.cTagNameList.includes(aEvent.target.value) ? "That tag name already exists" : "";
        },
        handleCheckTagmetaValidity() {
            return this.sHintList.some(aItem => {
                return !aItem;
            });
        },
    },
    mounted() {
        this.setTagschema();
    },
}
</script>
<style lang="scss" scoped>
.add-tag-modal{
    padding-right:20px;
    padding-left: 20px;
    
    .frm-base{
        text-align: left;
        margin-top:10px;
    }

    input{
        width: 100%;
    }

    .column-type {
        font-size: 12px;
        padding: 2px;
        border-radius: 3px;
        background-color: #e4ffee;
        color: #6ad98d;
    }

    .column-hint {
        font-size: 12px;
        font-weight: 500;
    }
}
</style>
