<template>
     <div class="schema-wrap">
        <span class="section-card-title">{{ cMetaTitle }}</span>
        <div class="section-card d-flex w-100">
            <div class="schema-box d-flex-column d-flex-align-center w-100">
                <div class="schema-content d-flex-column d-flex-align-center w-100">
                    <div class="schema-content-list d-flex-column d-flex-align-center w-90">
                        <div class="schema-content-list-header mb-10">
                            <div
                                v-for="(aItem, aIdx) in sMetaHeader" :key="`header-${aIdx}`"
                            >
                                {{ aItem.col_name }}
                            </div>
                        </div>

                        <div class="schema-content-list-item mb-20">
                            <input
                                type="text"
                                class="section-card-input"
                                :class="{
                                    'input-border-validity': sColNameHint
                                }"
                                placeholder="column name"
                                v-model="sAddColName"
                                @blur="handleCheckSchemaValidity"
                                v-tooltip="{
                                    content: sColNameHint,
                                    show: sColNameHint,
                                    trigger: 'manual',
                                    placement: 'top',
                                }"
                            />

                            <vSelect
                                class="section-card-vselect"
                                :options="cTypeColumnNameList"
                                :clearable="false"
                                :searchable="false"
                                v-model="sAddColType"
                                @input="handelChangeColType"
                            >
                            </vSelect>

                            <div v-if="cCheckOpenLength"
                                class="d-flex-center"
                            >
                                <img src="~/assets/images/x-box.png">
                            </div>

                            <input v-else
                                class="section-card-input text-center"
                                v-model.number="sAddColLength"
                            />

                            <div @click="handleAddNewColumn">
                                <i class="fas fa-plus-circle schema-btn add-schema-btn"></i>
                            </div>
                        </div>

                        <SchemaList
                            v-for="(aItem, aIdx) in sSchemaList"
                            :key="`content-${aIdx}`"
                            class="schema-content-list-item mt-15"
                            :pSchemaObj="aItem"
                            :pSchemaIdx="aIdx"
                            :pDeleteSchemaList="handleDeleteSchemaList"
                            pType="listcol"
                        />
                    </div>
                </div>

                <div class="schema-content-list-footer d-flex-column d-flex-align-center w-90 mt-40">
                    <CheckBoxBtn
                        :pStatus="sIsCheckSetSchema"
                        :pFunction="handleClickCheckBtn"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { LAKE_META_HEADER, TYPE_COLUMN } from '~/utils/config'
import SchemaList from '~/components/page/lake/setting/SchemaList'
import CheckBoxBtn from '~/components/common/CheckBoxBtn'
import vSelect from 'vue-select';

export default {
    components: {
        CheckBoxBtn,
        SchemaList,
        vSelect
    },
    props: {
        pSchemaType: {
            type: String,
            default: () => "tag",
        },
        pSchema: {
            type: Array,
            require: true,
        }
    },
    data() {
        return {
            sMetaHeader: LAKE_META_HEADER,
            sTypeColumnList: TYPE_COLUMN,
            sIsCheckSetSchema: false,
            sSchemaEmitType: "",
            sCheckSetSchemaType: "",
            sAddColType: "varchar",
            sAddColName: "",
            sColNameHint: "",
            sAddColLength: 10,
            sSchemaList: [],
        }
    },
    computed: {
        cMetaTitle() {
            return this.pSchemaType === "tag" ? "Tag meta" : "Value"
        },
        cTypeColumnNameList() {
            return this.sTypeColumnList.map(aItem => {
                return aItem.name;
            });
        },
        cCheckOpenLength() {
            switch(this.sAddColType) {
                case "varchar":
                    return false;
                default:
                    return true;
            }
        }
    },
    methods: {
        handleAddNewColumn() {
            const sNewSchema = {
                col_name: this.sAddColName,
                col_type: this.sAddColType,
                col_length: parseInt(this.sAddColLength)
            }

            this.handleCheckSchemaValidity();

            if (this.sColNameHint !== "") return;

            this.sIsCheckSetSchema = false;
            this.$emit(this.sCheckSetSchemaType, this.sIsCheckSetSchema);
            this.sAddColName = "";
            this.sSchemaList.push(sNewSchema);
        },
        handleDeleteSchemaList(aIdx) {
            this.sSchemaList.splice(aIdx, 1);

            this.sIsCheckSetSchema = false;
            this.$emit(this.sCheckSetSchemaType, this.sIsCheckSetSchema);
        },
        handleClickCheckBtn() {
            this.sIsCheckSetSchema = !this.sIsCheckSetSchema;

            this.$emit(this.sCheckSetSchemaType, this.sIsCheckSetSchema);
            this.$emit(this.sSchemaEmitType, this.sIsCheckSetSchema ? this.sSchemaList : null);
        },
        handelChangeColType() {
            this.sAddColLength = this.sAddColType === "varchar" ? 10 : 0;
        },
        handleCheckSchemaValidity() {
            const sRulePattern = /^[a-zA-Z0-9_-]*$/;
            this.sColNameHint = !this.sAddColName ? "Enter the Name" : "";

            if (!this.sColNameHint) {
                this.sColNameHint = !this.sAddColName.match(sRulePattern) ? "Special characters cannot be used" : "";
            }

            if (!this.sColNameHint) {
                this.sColNameHint = this.sSchemaList.some(aItem => {
                    return aItem.col_name === this.sAddColName;
                }) ? "Check duplicate column name" : "";
            }
        },
    },
    created() {
        this.sSchemaList = JSON.parse(JSON.stringify(this.pSchema));
        this.sSchemaEmitType = this.pSchemaType === "tag" ? "eSetTagmetaSchema" : "eSetValueSchema";
        this.sCheckSetSchemaType = this.pSchemaType === "tag" ? "eCheckTagSchema" : "eCheckSValuechema";
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_schema.scss";
</style>