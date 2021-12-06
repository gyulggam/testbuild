<template>
    <div class="frm-field--group create-lake__tag">
        <h3>Tag</h3>
        <div class="field-wrap">
            <div class="field-wrap__inner">
                <div class="field-select border-bottom">
                    <span>Name</span>
                    <button
                        class="btn"
                        @click="isShowLengthTag = !isShowLengthTag"
                    >
                        <i v-if="isShowLengthTag" class="far fa-angle-up"></i>
                        <i v-else class="far fa-angle-down"></i>
                    </button>
                </div>
                <button class="btn" @click="isShowAdd = !isShowAdd">
                    <i class="far fa-plus"></i>
                </button>
                <div v-if="isShowAdd" class="field__tool">
                    <AddColumn @AddColumn="handleAddValue" name_column="add_tag_schema"/>
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
        <div v-if="sTag_schema.length > 0">
            <ul v-show="sTag_schema.length > 0" class="list-tag">
                <li
                    v-for="(aItem, aIdx) in sTag_schema"
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
            <AddColumn :tag="tag_edit" @AddColumn="handleUpdateValue" name_column="edit_add_tag_schema"/>
        </div>
    </div>
</template>

<script>
import AddColumn from '~/components/page/lake/AddColumn'
export default {
    components: {
        AddColumn,
    },
    data() {
        return {
            isShowAdd: false,
            isShowEdit: false,
            sTag_schema: [],
            tag_edit: null,
            isShowLengthTag: false,
            sLength: 40,
        }
    },
    methods: {
        handleAddValue(e) {
            if(e.name){
                this.isShowAdd = false
                const sItem = {
                    col_name: e.name,
                    col_type: e.type,
                    col_length: e.length,
                }
                const sTagSchemaList = this.sTag_schema.filter(
                    (aItem) => aItem.col_name === sItem.col_name
                )
                if (sTagSchemaList.length === 0) {
                    this.sTag_schema.push(sItem)
                    this.$emit('AddTagSchema', this.sTag_schema)
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
            this.sTag_schema.splice(aIdx, 1);
        },
        handleUpdateValue(aItem) {
            const sEidtTagSchema = this.sTag_schema.filter((aVal) => aVal.col_name === aItem.name);

            if (aItem.name === '') {
                this.$toasted.error('Please enter a tag name');
                return;
            }

            if (sEidtTagSchema.length === 0) {
                this.sTag_schema = this.sTag_schema.map((tag) => {
                    if (tag.col_name === this.tag_edit.col_name) {
                        tag.col_name = aItem.name;
                        tag.col_type = aItem.type;
                        tag.col_length = parseInt(aItem.length);
                    }
                    return tag;
                })
                this.$emit('AddTagSchema', this.sTag_schema);
                this.isShowEdit = false;
            }

            if (this.tag_edit.col_name === aItem.name) {
                this.sTag_schema = this.sTag_schema.map((tag) => {
                    if (tag.col_name === aItem.name) {
                        tag.col_type = aItem.type;
                        tag.col_length = parseInt(aItem.length);
                    }
                    return tag;
                })
                this.$emit('AddTagSchema', this.sTag_schema);
                this.isShowEdit = false;
            } else {
                this.isShowEdit = false;
            }
        },
        handleChangeLength(e){
            this.$emit('changeLength',e.target.value)
        }
    },
}
</script>