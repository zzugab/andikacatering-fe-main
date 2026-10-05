<template>
  <div class="nav-fixed">
    <NavbarDashboard />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <main id="itemComponentPage">
          <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div class="container-xl px-4">
              <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto mt-4">
                    <h1 class="page-header-title">
                      <div class="page-header-icon">
                        <i data-feather="shopping-cart"></i>
                      </div>
                      Event Inventory Details
                    </h1>
                    <div class="page-header-subtitle">Detailed view of the event inventory</div>
                  </div>
                </div>
                <nav class="mt-4 rounded" aria-label="breadcrumb">
                  <ol class="breadcrumb px-3 py-2 rounded mb-0">
                    <li class="breadcrumb-item">
                      <a href="/app/inventory/event">Events</a>
                    </li>
                    <li class="breadcrumb-item active">Event Inventory Detail</li>
                  </ol>
                </nav>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Informasi Barang Event</h2>
                <div class="">
                  <button class="btn btn-primary mx-2" @click="openEditModal">Edit Barang</button>
                  <button class="btn btn-primary" @click="openAddModal">Tambah Barang</button>
                  <button class="btn btn-secondary mx-2" @click="printInventoryEvent">Print List Barang</button>
                </div>
              </div>
              <div class="card-body">
                <table id="datatablesSimpleItem"></table>
              </div>
            </div>

            <!-- Modal for Adding Item -->
            <div
              class="modal fade"
              id="addItemModal"
              tabindex="-1"
              aria-labelledby="addItemModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="addItemModalLabel">Add Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="addItemHandler">
                      <div v-for="(item, index) in newItems" :key="index" class="row mb-1">
                        <div class="col-4">
                          <label class="form-label">Item Name</label>
                          <select class="form-control" v-model="item.item_id" required>
                            <option v-for="inventory in inventories" :key="inventory.uuid" :value="inventory.uuid">
                              {{ inventory.name }}
                            </option>
                          </select>
                        </div>
                        <div class="col-3">
                          <label class="form-label">Quantity</label>
                          <input type="number" class="form-control" v-model="item.quantity" required />
                        </div>
                        <div class="col-2 d-flex align-items-end">
                          <button
                            type="button"
                            class="btn btn-danger mx-3 fw-bold"
                            style="font-size: 30px; height: 40px; width: 40px"
                            @click="removeNewItem(index)"
                            v-if="newItems.length > 1"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary mx-3"
                            style="font-size: 30px; height: 40px; width: 40px"
                            @click="addNewItem"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary mt-3">Add</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal for Editing Item -->
            <div
              class="modal fade"
              id="editItemModal"
              tabindex="-1"
              aria-labelledby="editItemModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editItemModalLabel">Edit Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="updateItemHandler">
                      <div v-for="(item, index) in items" :key="index" class="row mb-3">
                        <div class="col-6">
                          <label for="itemName" class="form-label mt-2">Item</label>
                          <input type="text" class="form-control" v-model="item.inventory.name" disabled />
                        </div>
                        <div class="col-6">
                          <label for="itemQuantity" class="form-label mt-2">Quantity</label>
                          <input type="number" class="form-control" v-model="item.quantity" required />
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary mt-3">Update</button>
                    </form>
                  </div>
                </div>
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
import InventoryDataEventComponent from '../../../../api/component/InventoryDataEventComponent'; // Adjust path accordingly
import Sidebar from '../../../Components/Sidebar.vue';
import NavbarDashboard from '../../../Components/NavbarDasboard.vue';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js';

export default {
  components: {
    Sidebar,
    NavbarDashboard,
  },
  setup() {
    const {
      printInventoryEvent,
      items,
      inventories,
      currentItem,
      newItems,
      currentItems,
      openAddModal,
      addNewItem,
      removeNewItem,
      addItemHandler,
      updateItemHandler,
      deleteItemHandler,
      openEditModal,
    } = InventoryDataEventComponent.setup();

    return {
      printInventoryEvent,
      items,
      inventories,
      currentItem,
      newItems,
      currentItems,
      openAddModal,
      addNewItem,
      removeNewItem,
      addItemHandler,
      updateItemHandler,
      deleteItemHandler,
      openEditModal,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
