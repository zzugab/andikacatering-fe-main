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
                        <i data-feather="users"></i>
                      </div>
                      Daftar Paket
                    </h1>
                    <div class="page-header-subtitle">
                      Example dashboard overview and content summary
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Data Package</h2>
                <button class="btn btn-primary" @click="openAddModal">
                  Add Package
                </button>
              </div>
              <div class="card-body">
                <table id="datatablesSimple"></table>
              </div>
            </div>

            <!-- Modal for Adding/Editing Package -->
            <div class="modal fade" id="packageModal" tabindex="-1" aria-labelledby="packageModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="packageModalLabel">
                      {{
                        currentPackage && currentPackage.uuid
                          ? "Edit Package"
                          : "Add Package"
                      }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="
                      currentPackage && currentPackage.uuid
                        ? updatePackageHandler(
                          currentPackage.uuid,
                          currentPackage
                        )
                        : createPackageHandler(currentPackage)
                      ">
                      <div class="mb-3">
                        <label for="packageName" class="form-label">Package Name</label>
                        <input type="text" class="form-control" id="packageName" v-model="currentPackage.name"
                          required />
                        <label for="packageDescription" class="form-label">Description</label>
                        <textarea class="form-control" id="packageDescription" v-model="currentPackage.description"
                          required></textarea>
                        <label for="packagePrice" class="form-label">Price</label>
                        <input type="text" class="form-control" id="packagePrice" v-model="currentPackage.price"
                          required />
                        <label for="packageType" class="form-label">Type</label>
                        <select class="form-control" id="packageType" v-model="currentPackage.type" required>
                          <option disabled value="">Pilih Tipe Paket</option>
                          <option value="Paket Utama">Paket Utama</option>
                          <option value="Paket Nasi Box">Paket Nasi Box</option>
                        </select>

                      </div>
                      <button type="submit" class="btn btn-primary">
                        {{
                          currentPackage && currentPackage.uuid
                            ? "Update"
                            : "Add"
                        }}
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
import packageListComponent from '../../../../api/component/packageListComponent'; // sesuaikan dengan path file foodComponent.js
import Sidebar from "../../../Components/Sidebar.vue";
import NavbarDashboard from "../../../Components/NavbarDasboard.vue";

export default {
  components: {
    NavbarDashboard,
    Sidebar,
  },
  setup() {
    return packageListComponent.setup();
  }
};
</script>
