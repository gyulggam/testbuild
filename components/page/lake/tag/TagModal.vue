<template>
    <AppModal 
        :footer="false" 
        @close="$emit('close')"
        title="Tag Manager"
        width="85rem"
        class="tag-modal"
    >
    <div slot="content" class="tag-modal__content">
      <div class="d-flex tag-modal__content-head">
        <div class="lake-name">{{ this.lake.lake_info.lake_name }}</div>
        <div class="ml-auto group-btn" v-if="!btnDoneDelete">
          <button class="btn-icon" @click="showAddModal = true">
            <i class="far fa-plus"></i><span>New</span>
          </button>
          <button class="btn-icon" @click="handleDelete">
              <i class="fal fa-trash"></i><span>Delete</span>
          </button>
          <!-- <button class="btn-icon" @click="showImportModal=true"> tag manager import export 버튼 숨기기
              <i class="fal fa-arrow-from-top"></i><span>Import</span>
          </button>
          <button class="btn-icon" @click="handleExportTag">
              <i class="fal fa-arrow-from-bottom"></i><span>Export</span>
          </button> -->
        </div>
      </div>
      <div v-if="btnDoneDelete" class="wrapper-btn-done">
        <button @click="handleDoneDelete">Done</button>
      </div>
      <AppTable
        :columns="heads"
        :tableData="this.cTableDataList && this.cTableDataList.length > 0 ? this.cTableDataList : []"
        @search="handleSearchTag"
        :expandOption="expandOption"
        @clickRow="handleClickRow"
      />
      <AddTagModal
        v-if="showAddModal"
        @close="showAddModal=false"
        :lake="this.lake"
        @refreshTag="handleRefresh"
      />
      <ImportTagModal
        v-if="showImportModal"
        @close="showImportModal = false"
        @handleImport="handleImportTag"
      />
      <AppModal
        title="Delete Tag"
        width="25rem"
        v-if="showDeleteModal"
        @close="showDeleteModal = false"
        @ok="handleConfirmDelete"
      >
        <div slot="content">
            Do you want to delete this tag?
        </div>
      </AppModal>
    </div>
  </AppModal>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex"
import AppModal from '~/components/common/AppModal'
import AppTable from '~/components/common/AppTable'
import AddTagModal from '~/components/page/lake/tag/AddTagModal.vue'
import EditTagInput from '~/components/page/lake/tag/EditTagInput.vue'
import ImportTagModal from '~/components/page/lake/tag/ImportTagModal'
export default {
    components: {
        AppModal,
        AppTable,
        AddTagModal,
        EditTagInput,
        ImportTagModal
    },
    props: {
        lake:{
            type: Object,
            default: ()=>{}
        }
    },
    computed:{
        ...mapState("tag",["gTagList"]),
        ...mapState("global",["gIsTagUpdateCheck"]),

        getTagSchema() {
            return this.lake.tag_schema ? this.lake.tag_schema : [];
        },
        getHeadTable() {
            const hd = [
                { // tag_id 가 사라지면서 client에서 직접 만들어서 사용해야 함
                    field: "tag_id",
                    key: "-2", 
                    title: "",
                    type:"expand",
                    column_id: "tag_id",
                    width: 50
                },
                // {
                //     field:"",
                //     key:"-4",
                //     column_id:"",
                //     width: 0
                // },
                // {
                //     field: "tag_name",
                //     key: "-1",
                //     column_id: "name",
                //     title: "Name",
                // }
            ];
            let heads = this.getTagSchema.map((item, index)=> {
                item = {
                    field: item.col_name,
                    key: index.toString(), 
                    title: item.col_name,
                    align: "left",
                    column_id: item.col_name,
                    width: 200
                }
                return item
            });
            
            heads.unshift(...hd);
            return heads;
        },
        cTableDataList() {
            return this.gTagList && this.gTagList;
        }
    },
    methods: {
        ...mapActions("tag",["getTagList","deleteTag","createTag","updateTag"]),
        ...mapMutations("global",["setTagUpdateCheck"]),
        setColumns() {
            this.payload = this.getTagSchema.map((aItem) => {
                aItem = {
                    col_name: aItem.col_name,
                    value: ""
                };

                return aItem;
            });
        },
        async handleGetList() {
            const payload = {
                lake_id: this.lake.lake_id
            }

            await this.getTagList(payload);
            this.sCopyTagList = JSON.parse(JSON.stringify(this.gTagList));
        },
        async handleRefresh(){
            this.showAddModal = false;
            await this.handleGetList();
            this.$emit('handleRefresh');
        },
        handleDelete() {
            this.handleCloseEdit()
            this.btnDoneDelete = true
            const sColumnDelete = {
                field: "",
                key: "-3",
                title: "Clear",
                width: 10,
                renderBodyCell: ({ row, column, rowIndex }, h) => {
                    return (
                        <button class="btn-delete-tag-table" on-click={()=>this.handleShowDelete(row)}><i class="far fa-window-minimize"></i></button>
                    );
                },
            }
            this.heads.push(sColumnDelete)
        },
        async handleShowDelete(e){
            const payload = {
                lake_id: this.lake.lake_id,
                name: e.name
            }
            this.itemDelete = payload;
            this.showDeleteModal = true 
        },
        async handleConfirmDelete(){
            const rs = await this.deleteTag(this.itemDelete)
            if(rs.status == "success"){
                this.showDeleteModal = false
                this.$toasted.success("Success") 
                await this.handleGetList();
            }
        },
        handleDoneDelete(){
            this.btnDoneDelete = false
            this.heads = this.heads.filter(item=>item.key != "-3")
        },
        async handleImportTag(e){
            const list = e.map(item=>{
                item = Object.values(item)
                return item
            })
            const payload ={
                lake_id:this.lake.lake_id,
                params: list
            }
            const rs = await this.createTag(payload)
            if (rs.status =="success") {
                await this.handleGetList()
                this.$toasted.success("Success")
                this.showImportModal = false
            } else {
                this.$toasted.error(rs.message)
            }
        },
        async handleExportTag(){
            await this.handleGetList()
        },
        async handleSearchTag(e){
            const payload = {
                lake_id: this.lake.lake_id,
                name: e
            }

            await this.getTagList(payload)
        },
        handleClickRow(e) {
            const sOriginTagName = e.name;
            this.itemEdit = {...e};

            // Expand row
            this.expandOption = {
                trigger: "row",
                defaultExpandedRowKeys:[this.itemEdit.tag_id],
                expandable: ({ row, column, rowIndex }) => {
                    if (row["tag_id"] === this.itemEdit.tag_id) {
                        return true;
                    }

                    return false
                },
                render: ({ row, column, rowIndex }, h) => {
                    return (
                        <div class="group-edit-tag-table">
                            <button on-click={() => this.handleEditTag(sOriginTagName)}>Apply</button>
                            <button on-click={() => this.handleCloseEdit()}>Cancel</button>
                        </div>
                    );
                }
            }

            if (this.btnDoneDelete === false && this.gIsTagUpdateCheck === false) {
                this.setTagUpdateCheck(true);

                // edit row
                this.heads = this.heads.map((item)=> {
                    item["renderBodyCell"] = ({ row, column, rowIndex }, h) => {
                        const sIdx = this.payload.findIndex((item)=> {
                            if (item.col_name === column.column_id) {

                                return true;
                            }
                        });

                        if (row.tag_id === this.itemEdit.tag_id) {
                            if (column.field === "tag_id" || column.field === "") {
                                return row[column.field];
                            } else {
                                this.payload[sIdx].value = this.sCopyTagList[rowIndex][column.field];

                                return <input class="input-tag-table" value={this.payload[sIdx].value} onInput={(aEvent) => this.changePayload(aEvent, sIdx, rowIndex, column.field, item)}/>
                            }
                        }
                        return row[column.field];
                    }
                    return item
                })
            }
        },
        handleCloseEdit() {
            this.heads = this.heads.map((item)=>{
                delete item.renderBodyCell
                return item
            })
            this.expandOption = null;
            this.setTagUpdateCheck(false);
        },
        changePayload(aEvent, aIdx, aRowIdx, aColumnField, aItem) {
            this.sCopyTagList[aRowIdx][aColumnField] = aEvent.target.value;
        },
        async handleEditTag(aOringinTagName) {
            const pl = {
                lake_id : this.lake.lake_id,
                oring_tag_name: aOringinTagName,
                ext_columns : this.payload
            }
            const rs = await this.updateTag(pl);
            if (rs.status == "success") {
                this.handleCloseEdit();
                await this.handleGetList();
                this.$toasted.success(rs.status);
            }
        }
    },
    async mounted() {
        await this.handleGetList();
        this.setColumns();
    
        this.heads = this.getHeadTable;
    },
    data() {
        return {
            heads:[],
            data_table:[],
            showAddModal:false,
            showDeleteModal: false,
            itemDelete: null,
            btnDoneDelete: false,
            showImportModal:false,
            itemEdit: null,
            expandOption: null,
            payload: null,
            sCopyTagSchema: [],
            sCopyTagList:[],
            tag_name: null,
        }
    },
}
</script>
<style lang="scss">
@import "~/assets/scss/components/lake/_tag-modal.scss"
</style>
