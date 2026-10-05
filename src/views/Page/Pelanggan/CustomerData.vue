<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Customer</h2>
        <!-- <button class="btn btn-primary" @click="openAddModal">
          Tambah Data
        </button> -->
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>

    <!-- Modal for Adding/Editing Customer -->
    <div class="modal fade" id="customerModal" tabindex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="customerModalLabel">
              {{ currentCustomer && currentCustomer.uuid ? "Edit Customer" : "Add Customer" }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="currentCustomer && currentCustomer.uuid ? updateCustomerHandler(currentCustomer.uuid, currentCustomer) : createCustomerHandler(currentCustomer)">
              <div class="mb-3">
                <label for="customerName" class="form-label">Nama Customer</label>
                <input type="text" class="form-control" id="customerName" v-model="currentCustomer.name" required />
              </div>
              <div class="mb-3">
                <label for="customerPhone1" class="form-label">Phone 1</label>
                <input type="text" class="form-control" id="customerPhone" v-model="currentCustomer.phone_number_1" required />
              </div>
              <div class="mb-3">
                <label for="customerPhone2" class="form-label">Phone 2</label>
                <input type="text" class="form-control" id="customerPhone" v-model="currentCustomer.phone_number_2" required />
              </div>
              <div class="mb-3">
                <label for="customerAddress" class="form-label">Alamat</label>
                <textarea class="form-control" id="customerAddress" v-model="currentCustomer.address"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                {{ currentCustomer && currentCustomer.uuid ? "Update" : "Add" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customerComponent from '../../../api/component/customerComponent.js'; // sesuaikan dengan path file customerComponent.js

export default {
  components: {},
  setup() {
    const { 
      customers,
      currentCustomer,
      openAddModal,
      hideModal,
      createCustomerHandler,
      updateCustomerHandler,
      deleteCustomerHandler,
      editCustomer,
       } = customerComponent.setup();
    return {
      customers,
      currentCustomer,
      openAddModal,
      hideModal,
      createCustomerHandler,
      updateCustomerHandler,
      deleteCustomerHandler,
      editCustomer,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>