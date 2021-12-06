<template>
  <AppModal 
    width="65rem"
    title="Export Value"
    @close="$emit('close')"
    okText="Export"
    @ok="handleExportValue"
  >
      <div class="value-modal__content" slot="content">
          <span class="name-lake">{{this.lake.lake_info.lake_name}}</span>
          <div class="group-input">
            <div class="group-input__item">
              <AppDatePicker
                type="datetime"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                valueType="timestamp"
                :value="basic_time"
              />
            </div>
            <div class="group-input__item">
              <div class="group-input__item-checkbox">
                <input 
                  type="checkbox" 
                  :value="true" 
                  v-model="checked"
                  @change="handleCheckBox"
                />
                <label>All Tags</label>
              </div>
              <input  class="input-text group-input__item" placeholder="Tag name" v-model="tag_name" :disabled="checked"/>
              <input  class="input-text" placeholder="File Name" v-model="file_name"/>
            </div>
          </div>
      </div>
  </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
import AppDatePicker from '~/components/common/AppDatePicker'
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
    data() {
      return {
        tag_name:"",
        basic_time: Date.now(),
        checked:false,
        file_name: ""
      }
    },
    methods: {
      async handleExportValue(){
        const payload = {
          lake_id: this.lake.lake_id,
          basic_time: this.basic_time,
          tag_name: this.tag_name,
          file_name: this.file_name
        }
        this.$toasted.error('URL that does not exist')
      },
      handleCheckBox(){
        if(this.checked){
          this.tag_name = ""
        }
      }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/page/lake/value/_value-modal.scss";
</style>