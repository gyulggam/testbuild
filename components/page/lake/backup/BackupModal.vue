<template>
  <AppModal width="35rem" title="Backup Modal" @close="$emit('close')">
    <div class="backup-modal" slot="content">
      <div class="group-name">
        <label>Name of Backup</label>
        <input/>
      </div>
      <div class="d-flex">
        <div>
          <label>To</label>
          <AppDatePicker/>
        </div>
        <div class="ml-auto">
          <label>From</label>
          <AppDatePicker/>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script>
import AppModal from '~/components/common/AppModal'
import AppDatePicker from '~/components/common/AppDatePicker'
export default {
  components: {
    AppModal,
    AppDatePicker,
  },
}
</script>
<style lang="scss" scoped>
.backup-modal{
  padding-left:30px;
  padding-right: 30px;
  div{
    text-align: left;
  }
  .group-name{
    margin-bottom: 20px;
    input{
      width: 100%;
      height: 32px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
}
</style>