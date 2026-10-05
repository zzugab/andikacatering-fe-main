<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Rencana Pembelanjaan</h2>
        <button class="btn btn-primary" @click="printPurchasePlan">Print</button>

      </div>
      <div class="card-body">
        <table id="datatablesPurchase"></table>
      </div>
    </div>
  </div>
</template>

<script>
import purchasePlanComponent from '../../../../api/component/purchasePlanComponent';

export default {
  setup() {
    return purchasePlanComponent.setup();
  },
};
</script>
