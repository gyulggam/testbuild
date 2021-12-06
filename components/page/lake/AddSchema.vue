<template>
    <div class="frm-field--group create-lake__tag">
        <h3>{{ pSchemaType }}</h3>
        <div class="field-wrap">
            <div class="field-wrap__inner">
                <div 
                    v-for="(aItem, aIdx) in cSchemaList" :key="aIdx"
                    class="field-select schema-colname border-bottom"
                >
                    <span>{{ aItem.col_name }}</span>
                    <button
                        v-if="aItem.col_name === 'name'"
                        class="btn no-padding"
                        @click="isShowLengthTag = !isShowLengthTag"
                    >
                        <i v-if="isShowLengthTag" class="far fa-angle-up"></i>
                        <i v-else class="far fa-angle-down"></i>
                    </button>
                </div>
                <button class="btn no-padding" @click="isShowAdd = !isShowAdd">
                    <i class="far fa-plus"></i>
                </button>
                <div v-if="isShowAdd" class="field__tool">
                    <AddColumn @AddColumn="handleAddValue" :name_column="`add_${cSchemaType}`"/>
                </div>
            </div>
        </div>
        <div v-show="isShowLengthTag">
            <input
                v-model="sLength" 
                type="number" 
                placeholder="length" 
                @change="handleChangeLength"
            />
        </div>
        <div v-if="sSchemaList.length > 0">
            <ul v-show="sSchemaList.length > 0" class="list-tag">
                <li
                    v-for="(aItem, aIdx) in sSchemaList"
                    :key="aIdx"
                    @click="handleEditValue(aItem)"
                >
                    {{ aItem.col_name }}
                    <i
                        class="far fa-trash-alt"
                        @click.stop="handleDeleteTag(aIdx)"
                    ></i>
                </li>
            </ul>
        </div>
        <div v-if="isShowEdit">
            <h4>Edit</h4>
            <AddColumn :tag="tag_edit" @AddColumn="handleUpdateValue" :name_column="`edit_${cSchemaType}`"/>
        </div>
    </div>
</template>

<script>
import AddColumn from '~/components/page/lake/AddColumn'
export default {
    props: {
        pSchemaType: {
            type: String,
            default: () => 'Tag',
        }
    },
    components: {
        AddColumn,
    },
    computed: {
        cSchemaList() {
            return this.pSchemaType === "Tag" ? [{"col_name": 'name'}] : [{"col_name": 'time'}, {"col_name": 'value'}];
        },
        cSchemaType() {
            return this.pSchemaType === "Tag" ? "tag_schema" : "value_schema";
        }
    },
    methods: {
        handleAddValue(e) {
            if(e.name){
                this.isShowAdd = false
                const sItem = {
                    col_name: e.name,
                    col_type: e.type,
                    col_length: parseInt(e.length),
                }
                const sTagSchemaList = this.sSchemaList.filter(
                    (aItem) => aItem.col_name === sItem.col_name
                )
                if (sTagSchemaList.length === 0) {
                    this.sSchemaList.push(sItem);
                    
                    if (this.pSchemaType === 'Tag') {
                        this.$emit('AddTagSchema', sItem);
                    } else {
                        this.$emit('AddValueSchema', sItem);
                    }
                }
            }
            else{
                this.$toasted.error("Field name is required")
            }
        },
        handleEditValue(e) {
            if (!this.isShowEdit) {
                this.isShowEdit = true
                this.tag_edit = e
            } else {
                console.log('khong the ===')
            }
        },
        handleDeleteTag(aIdx) {
            this.sSchemaList.splice(aIdx, 1);
        },
        handleUpdateValue(aItem) {
            const sEidtTagSchema = this.sSchemaList.filter((aVal) => aVal.col_name === aItem.name);

            if (aItem.name === '') {
                this.$toasted.error('Please enter a tag name');
                return;
            }

            if (sEidtTagSchema.length === 0) {
                this.sSchemaList = this.sSchemaList.map((tag) => {
                    if (tag.col_name === this.tag_edit.col_name) {
                        tag.col_name = aItem.name;
                        tag.col_type = aItem.type;
                        tag.col_length = parseInt(aItem.length);
                    }
                    return tag;
                });

                if (this.pSchemaType === 'Tag') {
                    this.$emit('AddTagSchema', this.sSchemaList);
                } else {
                    this.$emit('AddValueSchema', this.sSchemaList);
                }

                this.isShowEdit = false;
            }

            if (this.tag_edit.col_name === aItem.name) {
                this.sSchemaList = this.sSchemaList.map((tag) => {
                    if (tag.col_name === aItem.name) {
                        tag.col_type = aItem.type;
                        tag.col_length = parseInt(aItem.length);
                    }
                    return tag;
                })

                if (this.pSchemaType === 'Tag') {
                    this.$emit('AddTagSchema', this.sSchemaList);
                } else {
                    this.$emit('AddValueSchema', this.sSchemaList);
                }
                
                this.isShowEdit = false;
            } else {
                this.isShowEdit = false;
            }
        },
        handleChangeLength(e){
            this.$emit('changeLength',e.target.value)
        }
    },
    data() {
        return {
            isShowAdd: false,
            isShowEdit: false,
            sSchemaList: [],
            tag_edit: null,
            isShowLengthTag: false,
            sLength: 40,
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_create-lake.scss";
</style>
