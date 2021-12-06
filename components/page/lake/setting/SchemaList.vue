<template>
    <div class="schema-content-list-item"
        :class="{'mb-20': pType === 'addcol'}" 
    >
        <div
            class="section-card-item"
            v-tooltip="{
                content: cSchemaObj.col_name,
                placement: 'bottom-start'
            }"
        >
            {{ limitLength(cSchemaObj.col_name, 28) }}
        </div>

        <div
            class="section-card-item"
        >
            {{ cSchemaObj.col_type }}
        </div>


        <div v-if="cCheckOpenLength"
            class="d-flex-center"
        >
            <img src="~/assets/images/x-box.png">
        </div>

        <div v-if="cSchemaObj.col_name !== 'name' && !cCheckOpenLength"
            class="section-card-item text-center"
        >
            {{ cSchemaObj.col_length }}
        </div>

        <input v-if="cSchemaObj.col_name === 'name' && !cCheckOpenLength"
            class="section-card-input text-center"
            v-model.number="cSchemaObj.col_length"
        />

        <!-- input 버전 -->
        <!-- <input
            type="text"
            class="section-card-input"
            placeholder="column name"
            v-model="cSchemaObj.col_name"
        />

        <v-select
            class="section-card-vselect"
            :options="cTypeColumnNameList"
            v-model="cSchemaObj.col_type"
        >
        </v-select>

        <div v-if="cCheckOpenLength"
            class="d-flex-center"
        >
            <img src="~/assets/images/x-box.png">
        </div>

        <input v-else
            class="section-card-input text-center"
            v-model.number="cSchemaObj.col_length"
        /> -->
        <!-- input 버전 -->

        <div v-if="pType === 'listcol' && cShowManageBtn"
            @click="() => pDeleteSchemaList(pSchemaIdx)"
        >
            <i class="fas fa-minus-circle schema-btn delete-schema-btn"></i>
        </div>

        <div v-else-if="pType === 'addcol'"
            @click="() => pAddSchemaList(cSchemaObj)"
        >
            <i class="fas fa-plus-circle schema-btn add-schema-btn"></i>
        </div>
    </div>
</template>

<script>
import { TYPE_COLUMN } from '~/utils/config';
import { limitLength } from '~/assets/js/common.js'
import vSelect from 'vue-select';

export default {
    components: {
        vSelect
    },
    props: {
        pSchemaObj: {
            type: Object,
            default: () => {}
        },
        pSchemaIdx: {
            type: Number,
            default: 0
        },
        pAddSchemaList: {
            type: Function,
        },
        pDeleteSchemaList: {
            type: Function,
        },
        pType: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            sTypeColumnList: TYPE_COLUMN,
            sDefaultSchemaObj: {
                col_name: "",
                col_type: "varchar",
                col_length: 0
            }
        }
    },
    computed: {
        cTypeColumnNameList() {
            return this.sTypeColumnList.map(aItem => {
                return aItem.name;
            });
        },
        cSchemaObj() {
            return this.pSchemaObj ? this.pSchemaObj : this.sDefaultSchemaObj;
        },
        cShowManageBtn() {
            switch(this.cSchemaObj.col_name) {
                case "name":
                    return false;
                case "time":
                    return false;
                case "value":
                    return false;
                default:
                    return true;
            }
        },
        cCheckOpenLength() {
            switch(this.cSchemaObj.col_type) {
                case "varchar":
                    return false;
                default:
                    return true;
            }
        }
    },
    methods: {
        limitLength
    }
}
</script>
