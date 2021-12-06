<template>
    <AppModal 
        width="65rem"
        title="Insert Value"
        @close="$emit('close')"
        okText="Insert"
        @ok="handleCreateValue"
    >
        <div class="value-modal__content" slot="content">
            <span class="name-lake">{{this.lake.lake_info.lake_name}}</span>
            <div class="group-input" ref="scroll_container" @mousewheel="scrollX">
                <input 
                    class="group-input__item input-text" 
                    placeholder="Tag Name" 
                    v-model="tag_name"
                />
                <AppDatePicker
                    class="group-input__item"
                    type="datetime"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    valueType="timestamp"
                    :value="this.tag_time"
                />
                <input
                    class="group-input__item input-text" 
                    placeholder="Value" 
                    v-model="tag_value"
                />
                <div
                    class="group-input__item" 
                    v-for="(item,index) in this.value_schema"
                    :key="index"
                >
                    <label class="group-input__item-label">{{item.col_name}}</label>
                    <input 
                        class="input-text"
                        :placeholder="item.col_name"
                        v-model="item.col_value"
                    />
                </div>
            </div>
        </div>
  </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
import AppDatePicker from '~/components/common/AppDatePicker'
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
    components:{
        AppModal,
        AppDatePicker
    },
    props:{
        lake:{
            type: Object,
            default: ()=>{}
        }
    },
    computed:{
        getValueSchema(){
            return this.lake.value_schema
        }
    },
    mounted() {
        this.value_schema = this.getValueSchema.map(item=>{
            item= {
                col_name: item.col_name,
                col_value: null
            }
            return item
        })
    },
    data() {
        return {
            value_schema:null,
            tag_name:null,
            tag_time:Date.now(),
            tag_value:null
        }
    },
    methods: {
        ...mapActions("value",["createValue"]),
        async handleCreateValue(){
            const tag = this.value_schema.map(item=>{
                item = item.col_value || null
                return item
            })
            const time = moment(this.tag_time).format("YYYY-MM-DD HH:mm:ss")
            const payload = {
                lake_id: this.lake.lake_id,
                values: tag.length === 0 ? [[this.tag_name, time, this.tag_value]] : [[this.tag_name, time, this.tag_value],tag],
            }
            console.log(payload)
            const rs = await this.createValue(payload)
            if(rs.status == "success"){
                this.$toasted.success("Success")
            }else{
                this.$toasted.error(rs.message)
            }
        },
        scrollX(e) {
            this.$refs['scroll_container'].scrollLeft += e.deltaY;
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/page/lake/value/_value-modal.scss";
</style>
