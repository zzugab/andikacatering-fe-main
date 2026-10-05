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
                      Daftar Menu Paket
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
                    <li class="breadcrumb-item active">Daftar Menu Paket</li>
                  </ol>
                </nav>
              </div>
            </div>
          </header>
          <div class="container-xl px-4 mt-n10">
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Data Menu Paket</h2>
                <button class="btn btn-primary" @click="openAddModal">
                  Add Package
                </button>
              </div>
              <div class="card-body">
                <table id="datatablesSimple"></table>
              </div>
            </div>

            <div class="modal fade" id="packageModal" tabindex="-1" aria-labelledby="packageModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="packageModalLabel">
                      {{ currentUpdatePackage.uuid ? "Edit Package" : "Add Package" }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form
                      @submit.prevent="currentUpdatePackage.uuid ? updatePackageMainHandler(currentUpdatePackage.uuid, currentUpdatePackage) : createPackageMainHandler(currentPackage)">
                      <div class="row align-items-center justify-content-center mb-3"
                        v-for="(packageItem, index) in currentPackage.category" :key="index">
                        <div class="col-4">
                          <label for="packageName" class="form-label">Nama Kategori</label>
                          <multiselect v-model="packageItem.category_id" :options="categories" :multiple="false"
                            :taggable="false" :close-on-select="true" :custom-label="category => category.name"
                            :placeholder="currentUpdatePackage.uuid ? currentUpdatePackage.category_name : 'Select one'" label="name" track-by="uuid"
                            :value="currentUpdatePackage.uuid ? currentUpdatePackage.category_id : packageItem.category_id"
                            :disabled="!!currentUpdatePackage.uuid">
                          </multiselect>
                        </div>
                        <div class="col-4">
                          <label for="packageDescription" class="form-label">Jumlah (%)</label>
                          <input type="number" class="form-control"
                            :value="currentUpdatePackage.uuid ? currentUpdatePackage.quantity_percent : packageItem.quantity_percent"
                            @input="currentUpdatePackage.uuid ? currentUpdatePackage.quantity_percent = $event.target.value : packageItem.quantity_percent = $event.target.value"
                            required />
                        </div>
                        <div class="col-2 d-flex justify-content-start">
                          <button type="button" class="btn btn-danger mx-3 fw-bold"
                            style="font-size: 50px; height: 50px; width: 50px;" @click="removePackageMenu(index)"
                            v-if="!currentUpdatePackage.uuid && !isViewOnly && index !== 0">
                            -
                          </button>

                          <!-- Tombol Add (+) -->
                          <button type="button" class="btn btn-primary mx-3"
                            style="font-size: 50px; height: 50px; width: 50px;" @click="addPackageMenu"
                            v-if="!currentUpdatePackage.uuid && !isViewOnly && index === currentPackage.category.length - 1">
                            +
                          </button>
                        </div>
                      </div>
                      <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">
                          {{ currentUpdatePackage.uuid ? "Update Data" : "Tambah Data" }}
                        </button>
                      </div>
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
import packageMainComponent from "../../../../api/component/packageMainComponent";
import Sidebar from "../../../Components/Sidebar.vue";
import NavbarDashboard from "../../../Components/NavbarDasboard.vue";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'; // Import CSS for Vue Multiselect

export default {
  components: {
    NavbarDashboard,
    Sidebar,
    Multiselect
  },
  setup() {
    const {
      categories,
      category,
      currentPackage,
      currentUpdatePackage,
      createPackageMainHandler,
      updatePackageMainHandler,
      deletePackageMainHandler,
      openAddModal,
      hideModal,
      addPackageMenu,
      removePackageMenu,
      isViewOnly
    } = packageMainComponent.setup();

    return {
      categories,
      category,
      currentPackage,
      currentUpdatePackage,
      addPackageMenu,
      removePackageMenu,
      createPackageMainHandler,
      updatePackageMainHandler,
      deletePackageMainHandler,
      openAddModal,
      hideModal,
      isViewOnly
    };
  },
};
</script>
