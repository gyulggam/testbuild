<template>
  <AppModal 
    width="65rem"
    title="Delete Value"
    @close="$emit('close')"
    okText="Delete"
    @ok="handleDeleteValue"
  >
      <div class="value-modal__content" slot="content">
          <span class="name-lake">{{this.lake.lake_info.lake_name}}</span>
          <div class="group-input">
            <AppDatePicker
              class="group-input__item"
              type="datetime"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              valueType="timestamp"
              :value="basic_time"
            />
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
              <input
                class="input-text"
                v-model="tag_name" 
                placeholder="Tag name" 
                :disabled="checked"/>
            </div>
          </div>
      </div>
  </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
import AppDatePicker from '~/components/common/AppDatePicker'
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
    data() {
      return {
        tag_name:"",
        basic_time: Date.now(),
        checked:false
      }
    },
    methods: {
      ...mapActions("value",["deleteValue"]),
      async handleDeleteValue(){
        const payload = {
          lake_id: this.lake.lake_id,
          basic_time: this.basic_time,
          tag_name: this.tag_name
        }
        const rs = await this.deleteValue(payload)
        if(rs.status == "success"){
            this.$toasted.success("Success")
        }else{
            this.$toasted.error(rs.message)
        }
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