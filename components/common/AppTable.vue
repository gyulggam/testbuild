<template>
    <div class="app-table">
        <ve-table
            :columns="this.columns"
            :table-data="this.cCurrentTableData"
            :expand-option="this.expandOption"
            row-key-field-name='tag_id'
            :event-custom-option="eventCustomOption"
            :border-around="false"
            class="table-content"
            :cell-selection-option="cellSelectionOption"
        />
        <div v-show="this.showEmpty" class="empty-data">Data Empty.</div>
        <div class="table-pagination">
            <ve-pagination
                :total="totalCount"
                :page-index="pageIndex"
                :page-size="pageSize"
                @on-page-number-change="pageNumberChange"
                @on-page-size-change="pageSizeChange"
            />

            <div class="table__frm-search" v-click-outside="handleClickOutside">
                <div
                    v-if="showSearchInput"
                    class="d-flex"
                >
                    <input
                        class="input-search"
                        placeholder="Search"
                        v-model="sSearchText" 
                        v-on:keyup.enter="searchInputChange"
                    />

                    <button
                        type="button"
                        class="mBtn mBtn--icon"
                        @click="searchInputChange"
                    >
                        <i class="far fa-search"></i>
                    </button>
                </div>

                <button
                    v-else
                    type="button"
                    class="mBtn mBtn--icon"
                    @click="showSearchInput = true"
                >
                    <i class="far fa-search"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        expandOption: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            sSearchText: "",
            eventCustomOption: {
                bodyRowEvents: ({ row, rowIndex }) => {
                    return {
                        click: (event) => {
                            this.$emit('clickRow', row);
                        },
                    }
                },
            },
            showSearchInput: false,
            cellSelectionOption: {
                enable: false,
            },
        }
    },
    computed: {
        totalCount() {
            return this.tableData.length
        },
        cCurrentTableData() {
            return this.tableData.slice((this.pageIndex - 1 ) * this.pageSize, this.pageIndex * this.pageSize);
        },
        showEmpty() {
            return this.tableData.length > 0 ? false : true
        },
    },
    mounted() {},
    methods: {
        ...mapMutations("global", ["setTagUpdateCheck"]),
        searchInputChange(e) {
            this.$emit('search', this.sSearchText)
        },
        pageNumberChange(pageIndex) {
            this.pageIndex = pageIndex
        },
        pageSizeChange(pageSize) {
            this.pageIndex = 1
            this.pageSize = pageSize
        },
        handleClickOutside(){
            this.showSearchInput = false
        }
    },
}
</script>
<style lang="scss">
@import '~/assets/scss/common/app-table.scss';
</style>
