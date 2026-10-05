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
                        <i data-feather="credit-card"></i>
                      </div>
                      Detail Pembayaran
                    </h1>
                    <div class="page-header-subtitle">Tampilan detail pembayaran</div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <!-- Konten utama halaman -->
          <div class="container-xl px-4 mt-n10">
            <div class="row mb-4">
              <div class="col-md-4">
                <div class="card mb-3">
                  <div class="card-header text-white bg-primary">Total Pendapatan</div>
                  <div class="card-body bg-white text-dark">
                    <h5 class="card-title">{{ formatRupiah(totalIncome.toString()) }}</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-3">
                  <div class="card-header text-white bg-success">Total Pembayaran</div>
                  <div class="card-body bg-white text-dark">
                    <h5 class="card-title">{{ formatRupiah(totalPayment.toString()) }}</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-3">
                  <div class="card-header text-white bg-danger">Total Selisih</div>
                  <div class="card-body bg-white text-dark">
                    <h5 class="card-title">
                      {{ totalGap < 0 ? '-' : '' }}{{ formatRupiah(Math.abs(totalGap).toString()) }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-header flex align-items-center">
                <h2>Data Pembayaran</h2>
              </div>
              <div class="card-body">
                <table id="datatablesPayments"></table>
              </div>
            </div>

            <!-- Modal untuk Menambah/Mengedit Pembayaran -->
            <div
              class="modal fade"
              id="paymentModal"
              tabindex="-1"
              aria-labelledby="paymentModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="paymentModalLabel">
                      {{ currentPayment && currentPayment.uuid ? 'Edit Pembayaran' : 'Tambah Pembayaran' }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                  </div>
                  <div class="modal-body">
                    <form
                      @submit.prevent="
                        currentPayment && currentPayment.uuid
                          ? updatePaymentHandler(currentPayment.uuid, currentPayment)
                          : createPaymentHandler(currentPayment)
                      "
                    >
                      <div class="mb-3">
                        <label for="amount" class="form-label">Jumlah</label>
                        <input
                          type="text"
                          class="form-control"
                          id="amount"
                          v-model="currentPayment.amount"
                          @input="formatNumber"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label for="status" class="form-label">Status</label>
                        <select class="form-control" id="status" v-model="currentPayment.status" required>
                          <option value="completed">Selesai</option>
                          <option value="not finished">Belum Selesai</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary mt-3">
                        {{ currentPayment && currentPayment.uuid ? 'Update' : 'Tambah' }}
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
              <div class="col-md-6 small">Hak Cipta &copy; Website Anda 2021</div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Kebijakan Privasi</a> &middot;
                <a href="#!">Syarat &amp; Ketentuan</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import paymentIndexComponent from '../../../api/component/paymentIndexComponent'; // sesuaikan dengan path file paymentIndexComponent.js
import Sidebar from '../../Components/Sidebar.vue';
import NavbarDashboard from '../../Components/NavbarDasboard.vue';

export default {
  components: {
    NavbarDashboard,
    Sidebar,
  },
  setup() {
    const {
      payments,
      totalIncome,
      totalPayment,
      totalGap,
      currentPayment,
      hideModal,
      updatePaymentHandler,
      deleteRecord,
      openEditModal,
      openAddModal,
      formatRupiah,
      formatNumber,
    } = paymentIndexComponent.setup();

    return {
      payments,
      totalIncome,
      totalPayment,
      totalGap,
      currentPayment,
      hideModal,
      updatePaymentHandler,
      deleteRecord,
      openEditModal,
      openAddModal,
      formatRupiah,
      formatNumber,
    };
  },
};
</script>
