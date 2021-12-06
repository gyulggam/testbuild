<template>
  <AppModal width="35rem" title="Share Modal" @close="$emit('close')">
    <div class="share-modal" slot="content">
      <div class="form-search">
        <label>Users</label>
        <div class="wrapper-input">
          <input />
          <button class="mBtn mBtn-button">Search</button>
        </div>
        <div>
          <span>teasda ,</span>
          <span>dadasd ,</span>
          <span>teasda </span>
        </div>
      </div>
      <div class="group-radio">
        <input type="radio" id="ulimited"/>
        <label for="ulimited">Unlimited period</label>
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
.share-modal {
  padding-left: 30px ;
  padding-right: 30px;
  div{
    text-align: left;
  }
  .form-search{
    .wrapper-input{
      margin-top:20px;
      display: flex;
      input{
        width: 100%;
        height: 32px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }
  }
  .group-radio{
    margin-top:20px;
    margin-bottom:20px
  }
}
</style>