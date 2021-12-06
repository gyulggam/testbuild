<template>
  <AppModal 
    width="65rem"
    title="Import Value"
    @close="$emit('close')"
    okText="Import"
    @ok="handleImportValue"
  >
      <div slot="content">
          <h3>{{this.lake.lake_info.lake_name}}</h3>
          <div>
              <input type="file" ref="file" v-on:change="handleFileUpload" accept=".csv,text/csv"/>
          </div>
      </div>
  </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
import { mapActions } from "vuex"
export default {
    components:{
        AppModal
    },
    props:{
        lake:{
            type: Object,
            default: ()=>{}
        }
    },
    data() {
        return {
            value:null
        }
    },
    methods: {
        ...mapActions("value",["createValue"]),
        onComplete(results, file){
            const data = results.data.filter((item,index)=>{
                const condition = Object.values(item)
                if(JSON.stringify(condition) == JSON.stringify([""])){
                    return false
                }
                return true
            })
            this.value = data
            console.log(this.value)
        },
        handleFileUpload(e){
            let file = e.target.files[0];
            console.log('file',file)
            this.$papa.parse(file, {
                header: true,
                complete: this.onComplete
            });
        },
        async handleImportValue(){
            const payload = {
                lake_id: this.lake.lake_id,
                values: this.value
            }
            const rs = await this.createValue(payload)
            if(rs.status == "success"){
                this.$toasted.success("Success")
            }else{
                this.$toasted.error(rs.message)
            }
        }
    },
}
</script>