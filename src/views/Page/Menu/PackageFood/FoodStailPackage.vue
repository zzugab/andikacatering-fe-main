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
                        <i data-feather="package"></i>
                      </div>
                      Daftar Foodstall Paket
                    </h1>
                    <div class="page-header-subtitle">
                      Example dashboard overview and content summary
                    </div>
                  </div>
                </div>
                <nav class="mt-4 rounded" aria-label="breadcrumb">
                  <ol class="breadcrumb px-3 py-2 rounded mb-0">
                    <li class="breadcrumb-item">
                      <a href="/app/menu/package-food">Daftar Paket</a>
                    </li>
                    <li class="breadcrumb-item active">
                      Daftar Foodstall Paket
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Daftar Food Stall</h2>
                <button class="btn btn-primary" @click="openAddModal">
                  Add Food Stall Package
                </button>
              </div>
              <div class="card-body">
                <table id="datatablesSimple"></table>
              </div>
            </div>

            <!-- Modal for Adding/Editing Package Stall -->
            <div class="modal fade" id="packageStallModal" tabindex="-1" aria-labelledby="packageStallModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="packageStallModalLabel">
                      {{ currentUpdatePackageStall.uuid ? "Edit Paket FoodStall" : "Tambah Paket FoodStall" }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form
                      @submit.prevent="currentUpdatePackageStall.uuid ? updatePackageStallHandler(currentUpdatePackageStall) : createPackageStallHandler(currentPackageStall)">
                      <!-- Input hidden untuk UUID paket yang sedang diedit -->
                      <input type="hidden" v-if="currentUpdatePackageStall.uuid"
                        :value="currentUpdatePackageStall.uuid" />

                      <div class="mb-3">
                        <label for="stallMenu" class="form-label">Menu Foodstall</label>
                        <multiselect v-model="currentPackageStall.category[0].menu_id" :options="dataFoodstall"
                          :multiple="false" :close-on-select="true" label="name" track-by="uuid"
                          :placeholder="currentUpdatePackageStall.uuid ? currentUpdatePackageStall.menu.name : 'Select Foodstall Menu'"
                          :value="currentUpdatePackageStall.uuid ? currentUpdatePackageStall.menu_id : currentPackageStall.category[0].menu_id"
                          :disabled="!!currentUpdatePackageStall.uuid" />
                        <label for="stallQuantity" class="form-label mt-2">Quantity Percent</label>

                        <input v-if="currentUpdatePackageStall.uuid" type="number" class="form-control"
                          id="stallQuantity"
                          :value="currentUpdatePackageStall.uuid ? currentUpdatePackageStall.quantity_percent : currentPackageStall.category[0].quantity_percent"
                          @input="validateInputRange($event, 1, 100, 'Tolong isi persen dari 1 sampai 100'); currentUpdatePackageStall.uuid ? currentUpdatePackageStall.quantity_percent = $event.target.value : currentPackageStall = $event.target.value; "
                          min="1" max="100" required />
                        <input v-else type="number" class="form-control" id="stallQuantity" 
                          v-model="currentPackageStall.category[0].quantity_percent" 
                          min="1" max="100"
                          @input="validateInputRange($event, 1, 100, 'Tolong isi persen dari 1 sampai 100')"
                          required />
                      </div>
                      <button type="submit" class="btn btn-primary">
                        {{ currentUpdatePackageStall.uuid ? "Update" : "Add" }}
                      </button>
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
              <div class="col-md-6 small">
                Copyright &copy; Your Website 2021
              </div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Privacy Policy</a> &middot;
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
import packageFoodStaillComponent from "../../../../api/component/packageFoodStailComponent"; // Sesuaikan dengan path yang benar
import Sidebar from "../../../Components/Sidebar.vue";
import NavbarDashboard from "../../../Components/NavbarDasboard.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css"; // Import CSS for Vue Multiselect

export default {
  components: {
    NavbarDashboard,
    Sidebar,
    Multiselect,
  },
  setup() {
    
    return packageFoodStaillComponent.setup();
  },
};
</script>
