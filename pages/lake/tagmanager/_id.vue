<template>
    <div class="container">
        <div
            v-if="cInitDataCheck"
            class="tagmanager-wrap w-100"
        >
            <div class="d-flex">
                <GobackPage
                    :pFunction="handleClickBackpage"
                    pTitle="Lake list"
                    class="absolute-box"
                />
                <div class="tagmanager-main-title">Tag manager</div>
            </div>

            <div
                v-if="!cInitErrorCheck"
                class="tagmanager-content section-card d-flex-column pl-20"
            >
                <div class="d-flex tagmanager-content-btnline">
                    <div class="lake-name">{{ sLakeObj.lake_info.lake_name }}</div>
                    <div class="ml-auto group-btn">
                        <button class="btn-icon" @click="handleClickAddTag">
                            <i class="far fa-plus"></i><span>New</span>
                        </button>
                    </div>
                </div>

                <AppTable
                    :columns="sTableHeads"
                    :tableData="gTagList"
                    :expandOption="sExpandOption"
                    @clickRow="handleClickRow"
                    @search="handleSearchTag"
                />

                <AddTagModal
                    v-if="sShowAddModal"
                    :pLake="sLakeObj"
                    @close="sShowAddModal=false"
                    @refreshTag="handleRefresh"
                />

                <AppModal
                    title="Delete Tag"
                    width="25rem"
                    v-if="sShowDeleteModal"
                    okText="Delete"
                    @close="sShowDeleteModal = false"
                    @ok="handleConfirmDelete"
                >
                    <div slot="content">
                        Do you want to delete this tag?
                    </div>
                </AppModal>
            </div>

            <div 
                v-else
                class="tagmanager-content section-card d-flex-column pl-20"
            >
                <span>{{ sTagListResultCheck.title }}</span>
            </div>
        </div>

        <div v-else>
            <ItemLoading v-if="!cInitErrorCheck"/>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import AppTable from '~/components/common/AppTable';
import AppModal from '~/components/common/AppModal'
import AddTagModal from '~/components/page/lake/tag/AddTagModal.vue'
import GobackPage from '~/components/common/GobackPage'
import CheckBoxBtn from '~/components/common/CheckBoxBtn'

export default {
    asyncData({ params, query }) {
        return {
            sLakeId: params.id,
        }
    },
    components: {
        AppTable,
        AppModal,
        AddTagModal,
        CheckBoxBtn,
        GobackPage
    },
    data() {
        return {
            sExpandOption: null,
            sLakeObj: null,
            sItemDelete: null,
            sItemEdit: null,
            sPayload: null,
            sTagListResultCheck: null,
            sShowAddModal:false,
            sShowDeleteModal: false,
            sIsTagUpdateCheck: false,
            sTableHeads: [],
            sCopyTagList: [],
        }
    },
    computed: {
        ...mapState("tag",["gTagList"]),
        cInitDataCheck() {
            return this.sLakeObj && this.gTagList;
        },
        cInitErrorCheck() {
            return this.sTagListResultCheck && this.sTagListResultCheck.hasOwnProperty("title");
        },
    },
    methods: {
        ...mapActions('lake', ['viewLake']),
        ...mapActions("tag",["getTagList", "deleteTag", "updateTag"]),
        ...mapMutations('global', ["setCurrentPage"]),
        async handleGetList() {
            const sLakeIdObj = {
                lake_id: this.sLakeId,
            }

            this.sTagListResultCheck = await this.getTagList(sLakeIdObj);
            this.sCopyTagList = JSON.parse(JSON.stringify(this.gTagList));
        },
        setColumns() {
            this.sPayload = this.sLakeObj.tag_schema.map((aItem) => {
                aItem = {
                    col_name: aItem.col_name,
                    value: ""
                };

                return aItem;
            });
        },
        setTableHead() {
            const sTagIdColumn = [
                {
                    field: "tag_id",
                    key: "-2", 
                    title: "",
                    type:"expand",
                    column_id: "tag_id",
                    width: 30
                },
            ];
            let sHeads = this.sLakeObj.tag_schema.map((aItem, aIdx)=> {
                const sLength = aItem.col_length !== 0 ? aItem.col_length.toString() : ""

                aItem = {
                    field: aItem.col_name,
                    key: aIdx.toString(),
                    title: `${aItem.col_name}(${aItem.col_type} ${sLength})` ,
                    align: "left",
                    column_id: aItem.col_name,
                    width: 80
                }
                return aItem
            });
            
            sHeads.unshift(...sTagIdColumn);
            return sHeads;
        },
        handleClickBackpage() {
            this.$router.push("/lake");
        },
        handleClickRow(e) {
            if (this.sIsTagUpdateCheck) return;

            const sOriginTagName = e.name;
            this.sItemEdit = {...e};

            // Expand row
            this.sExpandOption = {
                defaultExpandedRowKeys: [this.sItemEdit.tag_id],
                render: ({ row, column, rowIndex }, h) => {
                    return (
                        <div class="group-edit-wrap">
                            <div
                                class="group-edit-wrap-btn edit-btn d-flex-center d-flex-align-center bg-disable"
                                on-click={() => this.handleEditTag(sOriginTagName)}
                            >
                                <i class="fas fa-check"></i>
                            </div>

                            <div
                                class="group-edit-wrap-btn cancel-btn d-flex-center d-flex-align-center"
                                on-click={() => this.handleCloseEdit()}
                            >
                                <i class="fas fa-times"></i>
                            </div>

                            <div
                                class="group-edit-wrap-btn delete-btn d-flex-center d-flex-align-center"
                                on-click={() => this.handleShowDelete(row)}
                            >
                                <i class="far fa-trash-alt"></i>
                            </div>
                        </div>
                    );
                }
            }

            // edit row
            this.sTableHeads = this.sTableHeads.map((aItem)=> {
                aItem["renderBodyCell"] = ({ row, column, rowIndex }, h) => {
                    const sIdx = this.sPayload.findIndex((bItem)=> {
                        if (bItem.col_name === column.column_id) {

                            return true;
                        }
                    });

                    if (row.tag_id === this.sItemEdit.tag_id) {
                        if (column.field === "tag_id" || column.field === "") {
                            return row[column.field];
                        } else {
                            this.sPayload[sIdx].value = this.sItemEdit[column.field];

                            return <input class="section-card-input" value={this.sPayload[sIdx].value} onInput={(aEvent) => this.changePayload(aEvent, column.field)}/>
                        }
                    }
                    return row[column.field];
                }
                return aItem;
            })

            this.sIsTagUpdateCheck = true;
        },
        changePayload(aEvent, aColumnField) {
            this.sItemEdit[aColumnField] = aEvent.target.value;
        },
        handleCloseEdit() {
            this.sTableHeads = this.sTableHeads.map((aItem)=>{
                delete aItem.renderBodyCell;
                return aItem;
            })
            this.sExpandOption = null;
            this.sIsTagUpdateCheck = false;
        },
        handleCheckEditValidity() {
            let sResult = false;

            this.sPayload.forEach(aItem => {
                if (!aItem.value && aItem.value !== 0) {
                    sResult = true;
                }
            });

            return sResult;
        },
        async handleSearchTag(aTagName){
            const sPayload = {
                lake_id: this.sLakeId,
                name: aTagName
            }

            await this.getTagList(sPayload);
        },
        handleClickAddTag() {
            this.sShowAddModal = true;
        },
        async handleEditTag(aOringinTagName) {
            if (this.handleCheckEditValidity()) {
                this.$toasted.error("There are no values entered.");
                return;
            }

            const sEditTagObj = {
                lake_id : this.sLakeId,
                oring_tag_name: aOringinTagName,
                ext_columns : this.sPayload
            }

            const sResult = await this.updateTag(sEditTagObj);
            if(sResult.status == "success"){
                this.$toasted.success(sResult.status);
            } else {
                this.$toasted.error(sResult.status);
            }

            this.handleCloseEdit();
            await this.handleGetList();
        },
        async handleConfirmDelete(){
            const sResult = await this.deleteTag(this.sItemDelete);
            if (sResult.status == "success") {
                this.$toasted.success(sResult.status);
            } else {
                this.$toasted.error(sResult.title);
            }

            this.sShowDeleteModal = false;
            this.handleCloseEdit();
            await this.handleGetList();
        },
        async handleShowDelete(aRow) {
            const payload = {
                lake_id: this.sLakeId,
                name: aRow.name
            }
            this.sItemDelete = payload;
            this.sShowDeleteModal = true;
        },
        async handleRefresh() {
            this.sShowAddModal = false;
            this.handleCloseEdit();
            await this.handleGetList();
        },
    },
    async created() {
        this.setCurrentPage("tagmanager");
        this.sLakeObj = await this.viewLake(this.sLakeId);
        await this.handleGetList();
        this.sTableHeads = this.setTableHead();
        this.setColumns();
    },
}
</script>
<style lang="scss" scope>
@import "~/assets/scss/page/lake//tagmanager/tagmanager.scss";
</style>