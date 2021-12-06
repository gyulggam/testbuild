<template>
    <div class="frm-field--group create-lake__value">
        <h3>Value</h3>
        <div class="field-wrap">
            <div class="field-wrap__inner">
                <span class="border-bottom">time</span>
                <span class="border-bottom">value</span>
                <button class="btn" @click="isShowAdd = !isShowAdd">
                    <i class="far fa-plus"></i>
                </button>
                <div v-if="isShowAdd" class="field__tool">
                    <AddColumn @AddColumn="handleAddValue" name_column="add_value_schema"/>
                </div>
            </div>
        </div>
        <div v-if="sValue_schema.length > 0">
            <ul v-show="sValue_schema.length > 0" class="list-tag">
                <li
                    v-for="(item, index) in sValue_schema"
                    :key="index"
                    @click="handleEditValue(item)"
                >
                    {{ item.col_name }}
                     <i
                        class="far fa-trash-alt"
                        @click.stop="handleDeleteValue(aIdx)"
                    ></i>
                </li>
            </ul>
        </div>
        <div v-if="isShowEdit">
            <h4>Edit</h4>
            <AddColumn :tag="tag_edit" @AddColumn="handleUpdateValue" name_column="edit_value_schema"/>
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
            sValue_schema: [],
            tag_edit: null,
        }
    },
    methods: {
        handleAddValue(e) {
            if(e.name){
                this.isShowAdd = false
                const item = {
                    col_name: e.name,
                    col_type: e.type,
                    col_length: parseInt(e.length),
                }
                const cd = this.sValue_schema.filter(
                    (i) => i.col_name === item.col_name
                )
                if (cd.length === 0) {
                    this.sValue_schema.push(item)
                    this.$emit('AddValueSchema', this.sValue_schema)
                }
            }else{
                this.$toasted.error("Field name is required")
            }
        },
        handleEditValue(e) {
            if (!this.isShowEdit) {
                this.isShowEdit = true
                this.tag_edit = e
            } else {
                console.log('Only edit one field in same time')
            }
        },
        handleDeleteValue(aIdx) {
            this.sValue_schema.splice(aIdx, 1);
        },
        handleUpdateValue(aItem) {
            const sEidtValueSchema = this.sValue_schema.filter((aVal) => aVal.col_name === aItem.name);

            if (aItem.name === '') {
                this.$toasted.error('Please enter a Value name');
                return;
            }
            
            if (sEidtValueSchema.length === 0) {
                this.sValue_schema = this.sValue_schema.map((tag) => {
                    if (tag.col_name === this.tag_edit.col_name) {
                        tag.col_name = aItem.name
                        tag.col_type = aItem.type
                        tag.col_length = parseInt(aItem.length)
                    }
                    if (aItem.name === this.tag_edit.col_name) {
                        tag.col_type = aItem.type
                        tag.col_length = parseInt(aItem.length)
                    }
                    return tag
                })
                this.$emit('AddValueSchema', this.sValue_schema)
                this.isShowEdit = false
            }

            if (this.tag_edit.col_name === aItem.name) {
                this.sValue_schema = this.sValue_schema.map((tag) => {
                    if (tag.col_name === aItem.name) {
                        tag.col_type = aItem.type
                        tag.col_length = parseInt(aItem.length)
                    }
                    return tag
                })
                this.$emit('AddValueSchema', this.sValue_schema)
                this.isShowEdit = false
            } else {
                this.isShowEdit = false
            }
        },
    },
}
</script>
