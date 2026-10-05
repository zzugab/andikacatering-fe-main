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
                      Data Gudang
                    </h1>
                    <div class="page-header-subtitle">Example dashboard overview and content summary</div>
                  </div>
                </div>
              </div>
              <div>
                <ul class="nav nav-pills bg-white rounded border p-2">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'dataInventory',
                        'text-white': activeTab === 'dataInventory',
                        'text-dark': activeTab !== 'dataInventory',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'dataInventory'"
                    >
                      Data Gudang
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'dataEvent',
                        'text-white': activeTab === 'dataEvent',
                        'text-dark': activeTab !== 'dataEvent',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'dataEvent'"
                    >
                      Data Barang Acara
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'dataTransfer',
                        'text-white': activeTab === 'dataTransfer',
                        'text-dark': activeTab !== 'dataTransfer',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'dataTransfer'"
                    >
                      Data Transfer Barang Acara
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div>
            <div class="tab-content mt-3">
              <div v-if="activeTab === 'dataInventory'">
                <DataInventory />
              </div>
              <div v-if="activeTab === 'dataEvent'">
                <DataEventInventory />
              </div>
              <div v-if="activeTab === 'dataTransfer'">
                <DataTransfer />
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
import DataTransfer from './Transfer/DataTransferInventory.vue';
import DataEventInventory from './DataEventInventory/ListEventInventory.vue';
import DataInventory from './DataInventory/DataInventory.vue';

import Sidebar from '../../Components/Sidebar.vue';
import NavbarDashboard from '../../Components/NavbarDasboard.vue';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js';

export default {
  components: {
    Sidebar,
    NavbarDashboard,
    DataEventInventory,
    DataTransfer,
    DataInventory,
  },
  data() {
    return {
      activeTab: 'dataInventory',
    };
  },
  created() {
    if (this.$route.name === 'Inventory') {
      this.activeTab = 'dataInventory';
    } else {
      this.activeTab = 'dataEvent';
    }
  },
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css');
@import url('https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css');
@import url('../../../assets/css/styles.css');
</style>
