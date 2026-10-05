<template>
  <div class="nav-fixed">
    <NavbarDashboard />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <ul class="nav nav-pills bg-white rounded">
          <li class="nav-item">
            <a class="nav-link" :class="{
              active: activeTab === 'financeDefault',
              'text-white': activeTab === 'financeDefault',
              'text-dark': activeTab !== 'financeDefault',
            }" href="#" @click.prevent="activeTab = 'financeDefault'">
              Keuangan Pembayaran Acara
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{
              active: activeTab === 'financeEvent',
              'text-white': activeTab === 'financeEvent',
              'text-dark': activeTab !== 'financeEvent',
            }" href="#" @click.prevent="activeTab = 'financeEvent'">
              Keuangan Tanggal Acara
            </a>
          </li>
        </ul>
        <div v-if="activeTab === 'financeDefault'">
          <FinanceDefault />
        </div>
        <div v-if="activeTab === 'financeEvent'">
          <FinanceEvent />
        </div>
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
import Sidebar from '../../Components/Sidebar.vue';
import NavbarDashboard from '../../Components/NavbarDasboard.vue';
import FinanceDefault from './FinanceDefault.vue';
import FinanceEvent from './FinanceEvent.vue';

export default {
  components: {
    Sidebar,
    NavbarDashboard,
    FinanceDefault,
    FinanceEvent
  },
  data() {
    return {
      activeTab: 'financeEvent',
    };
  },
};
</script>