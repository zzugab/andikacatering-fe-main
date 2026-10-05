<template>
  <div class="nav-fixed">
    <NavbarDasboard />
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
                        <i data-feather="shopping-cart"></i>
                      </div>
                      Order Details
                    </h1>
                    <div class="page-header-subtitle">Detailed view of the order</div>
                  </div>
                </div>
                <nav class="mt-4 rounded" aria-label="breadcrumb">
                  <ol class="breadcrumb px-3 py-2 rounded mb-0">
                    <li class="breadcrumb-item">
                      <a href="/app/pelanggan/order">Orders</a>
                    </li>
                    <li class="breadcrumb-item active">Order Detail</li>
                  </ol>
                  <div>
                    <ul class="nav nav-pills bg-white rounded border p-2">
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{
                            active: activeTab === 'detail',
                            'text-white': activeTab === 'detail',
                            'text-dark': activeTab !== 'detail',
                          }"
                          href="#"
                          @click.prevent="activeTab = 'detail'"
                        >
                          Detail Order
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{
                            active: activeTab === 'menu',
                            'text-white': activeTab === 'menu',
                            'text-dark': activeTab !== 'menu',
                          }"
                          href="#"
                          @click.prevent="activeTab = 'menu'"
                        >
                          Menu Item
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{
                            active: activeTab === 'finansial',
                            'text-white': activeTab === 'finansial',
                            'text-dark': activeTab !== 'finansial',
                          }"
                          href="#"
                          @click.prevent="activeTab = 'finansial'"
                        >
                          Laporan Pengeluaran
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{
                            active: activeTab === 'pembelanjaan',
                            'text-white': activeTab === 'pembelanjaan',
                            'text-dark': activeTab !== 'pembelanjaan',
                          }"
                          href="#"
                          @click.prevent="activeTab = 'pembelanjaan'"
                        >
                          Rencana Pembelanjaan
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div>
            <div class="tab-content mt-3">
              <div v-if="activeTab === 'detail'">
                <OrderDetailPage />
              </div>
              <div v-if="activeTab === 'menu'">
                <MenuItemPage />
              </div>
              <div v-if="activeTab === 'finansial'">
                <FinancialRecord />
              </div>
              <div v-if="activeTab === 'pembelanjaan'">
                <PurchasePlan />
              </div>
            </div>
          </div>
        </main>
        <footer class="footer-admin mt-auto footer-light">
          <div class="container-xl px-4">
            <div class="row">
              <div class="col-md-6 small">Copyright &copy; Your Website 2021</div>
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
import NavbarDasboard from '../../../Components/NavbarDasboard.vue';
import Sidebar from '../../../Components/Sidebar.vue';
import OrderDetailPage from './OrderDetailPage.vue';
import MenuItemPage from './MenuItemPage.vue';
import FinancialRecord from './FinancialRecord.vue';
import PurchasePlan from './PurchasePlan.vue';

export default {
  components: {
    NavbarDasboard,
    Sidebar,
    OrderDetailPage,
    MenuItemPage,
    FinancialRecord,
    PurchasePlan
  },
  data() {
    return {
      activeTab: '',
    };
  },
  created() {
    this.activeTab = 'detail';
  },
};
</script>
