<template>
  <AppModal 
    width="65rem"
    title="Import Tag"
    @close="$emit('close')"
    @ok="handleImportTag"
    okText="Create"
  >
      <div slot="content">
          <input type="file" ref="file" v-on:change="handleFileUpload" accept=".csv,text/csv"/>
          <div>{{this.resultUplodad}}</div>
      </div>
  </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
export default {
    components:{
        AppModal
    },
    data(){
        return{
            tag:''
        }
    },
    computed:{
        resultUplodad(){
            return this.tag
        }
    },
    methods:{
        onComplete(results, file){
            const data = results.data.filter((item,index)=>{
                const condition = Object.values(item)
                if(JSON.stringify(condition) == JSON.stringify([""])){
                    return false
                }
                return true
            })
            this.tag = data
            console.log(this.tag)
        },
        handleFileUpload(e) {
            let file = e.target.files[0];
            console.log('file',file)
            this.$papa.parse(file, {
                header: true,
                complete: this.onComplete
            });
        },
        handleImportTag() {
            this.$emit('handleImport',this.tag)
        }
    }
}
</script>