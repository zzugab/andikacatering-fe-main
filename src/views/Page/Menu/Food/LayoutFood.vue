<template>
  <div class="nav-fixed">
    <NavbarDashboard />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <main>
          <header
            class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10"
          >
            <div class="container-xl px-4">
              <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto mt-4">
                    <h1 class="page-header-title">
                      <div class="page-header-icon">
                        <i data-feather="activity"></i>
                      </div>
                      Data Makanan
                    </h1>
                    <div class="page-header-subtitle">
                      Example dashboard overview and content summary
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul class="nav nav-pills bg-white rounded border p-2">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'category',
                        'text-white': activeTab === 'category',
                        'text-dark': activeTab !== 'category',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'category'"
                    >
                      Kategori Makanan
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'data',
                        'text-white': activeTab === 'data',
                        'text-dark': activeTab !== 'data',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'data'"
                    >
                      Data Makanan
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div>
            <div class="tab-content mt-3">
              <div v-if="activeTab === 'category'">
                <CategoryFood />
              </div>
              <div v-if="activeTab === 'data'">
                <DataFood />
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
import CategoryFood from "./CategoryFood.vue";
import DataFood from "./DataFood.vue";
import Sidebar from "../../../Components/Sidebar.vue";
import NavbarDashboard from "../../../Components/NavbarDasboard.vue";
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js";

export default {
  components: {
    Sidebar,
    NavbarDashboard,
    CategoryFood,
    DataFood,
  },
  data() {
    return {
      activeTab: "data",
    };
  },
};
</script>
    
<style>
@import url("https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css");
@import url("https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css");
@import url("../../../../assets/css/styles.css");
</style>