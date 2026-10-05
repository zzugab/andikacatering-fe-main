<template>
  <div class="nav-fixed">
    <NavbarDashboard />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <main>
          <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div class="container-xl px-4">
              <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto mt-4">
                    <h1 class="page-header-title">
                      <div class="page-header-icon">
                        <i data-feather="activity"></i>
                      </div>
                      Detail Transfer Inventory
                    </h1>
                    <div class="page-header-subtitle">Detail of inventory transfer</div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Transfer Details</h2>
              </div>
              <div class="card-body">
                <table id="transferDetailsTable" class="table table-striped"></table>
              </div>
            </div>

            <!-- New Card for Input Array -->
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Input Array</h2>
              </div>
              <div class="card-body">
                <form @submit.prevent="submitHandler">
                  <div v-for="(item, index) in currentInventory.transfer_items" :key="index" class="row mb-1">
                    <div class="col-6">
                      <label class="form-label">Barang</label>
                      <select class="form-control" v-model="item.item_id" required>
                        <option value="" disabled>Pilih item</option>
                        <option v-for="inventory in inventoryList" :key="inventory.uuid" :value="inventory.uuid">
                          {{ inventory.name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-4">
                      <label class="form-label">Kuantitas</label>
                      <input type="number" class="form-control" v-model="item.quantity" required />
                    </div>
                    <div class="col-2 d-flex align-items-end">
                      <button
                        type="button"
                        class="btn btn-danger mx-3 fw-bold"
                        style="font-size: 30px; height: 40px; width: 40px"
                        @click="removeItem(index)"
                        v-if="currentInventory.transfer_items.length > 1"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary mx-3"
                        style="font-size: 30px; height: 40px; width: 40px"
                        @click="addItem"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary mt-3">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <footer class="footer-admin mt-auto footer-light">
          <div class="container-xl px-4">
            <div class="row">
              <div class="col-md-6 small">Copyright &copy; Your Website 2021</div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Privacy Policy</a>
                &middot;
                <a href="#!">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../../Components/Sidebar.vue';
import NavbarDashboard from '../../../Components/NavbarDasboard.vue';
import InventoryTransferDetailComponent from '../../../../api/component/InventoryTransferDetailComponent';

export default {
  components: {
    Sidebar,
    NavbarDashboard,
    InventoryTransferDetailComponent,
  },
  setup() {
    const { currentInventory, inventoryList, submitHandler, addItem, removeItem } =
      InventoryTransferDetailComponent.setup();

    return {
      currentInventory,
      inventoryList,
      submitHandler,
      addItem,
      removeItem,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
