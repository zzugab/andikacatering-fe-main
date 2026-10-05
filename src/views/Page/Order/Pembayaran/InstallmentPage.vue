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
                      Detail Cicilan
                    </h1>
                    <div class="page-header-subtitle">Tampilan detail cicilan</div>
                  </div>
                </div>
                <nav class="mt-4 rounded" aria-label="breadcrumb">
                  <ol class="breadcrumb px-3 py-2 rounded mb-0">
                    <li class="breadcrumb-item">
                      <router-link to="/app/pelanggan/payment">Pembayaran</router-link>
                    </li>
                    <li class="breadcrumb-item active">Detail Cicilan</li>
                  </ol>
                </nav>
              </div>
            </div>
          </header>
          <!-- Konten utama halaman -->
          <div class="container-xl px-4 mt-n10">
            <div class="row mb-4">
              <div class="col-md-4">
                <div class="card mb-3">
                  <div class="card-header text-white bg-success">Total Pendapatan</div>
                  <div class="card-body bg-white text-dark">
                    <h5 class="card-title">{{ formatRupiah(totalIncome) }}</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-3">
                  <div class="card-header text-white bg-primary">Total Pembayaran</div>
                  <div class="card-body bg-white text-dark">
                    <h5 class="card-title">{{ formatRupiah(totalPayment) }}</h5>
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
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Data Cicilan</h2>
                <button class="btn btn-primary" @click="openAddModal">Tambah Data</button>
              </div>
              <div class="card-body">
                <table id="datatablesInstallments"></table>
              </div>
            </div>

            <!-- Modal untuk Menambah/Mengedit Cicilan -->
            <div
              class="modal fade"
              id="installmentModal"
              tabindex="-1"
              aria-labelledby="installmentModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="installmentModalLabel">
                      {{ currentInstallment && currentInstallment.uuid ? 'Edit Cicilan' : 'Tambah Cicilan' }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                  </div>
                  <div class="modal-body">
                    <form
                      @submit.prevent="
                        currentInstallment && currentInstallment.uuid
                          ? updateInstallmentHandler(currentInstallment.uuid, currentInstallment)
                          : createInstallmentHandler(currentInstallment)
                      "
                    >
                      <div class="mb-3">
                        <label for="payment_image" class="form-label">Gambar Pembayaran</label>
                        <input type="file" class="form-control" id="payment_image" @change="handleImageUpload" />

                        <label for="payment_datelines" class="form-label">Tanggal Pembayaran</label>
                        <input
                          type="date"
                          class="form-control"
                          id="payment_datelines"
                          v-model="currentInstallment.payment_datelines"
                          required
                        />
                        <label for="payment_bank_id" class="form-label">Bank</label>
                        <select
                          class="form-control"
                          id="payment_bank_id"
                          v-model="currentInstallment.payment_bank_id"
                          required
                        >
                          <option v-for="bank in banks" :key="bank.uuid" :value="bank.uuid">{{ bank.name }}</option>
                        </select>
                        <label for="type" class="form-label">Tipe</label>
                        <select class="form-control" id="type" v-model="currentInstallment.type" required>
                          <option value="payment installments">Cicilan Pembayaran</option>
                          <option value="final payment">Pembayaran Akhir</option>
                        </select>
                        <label for="amount" class="form-label">Jumlah</label>
                        <input
                          type="text"
                          class="form-control"
                          id="amount"
                          v-model="currentInstallment.amount"
                          required
                        />
                      </div>
                      <button type="submit" class="btn btn-primary">
                        {{ currentInstallment && currentInstallment.uuid ? 'Update' : 'Tambah' }}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal untuk Melihat Gambar -->
            <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">Gambar Cicilan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                  </div>
                  <div class="modal-body">
                    <img :src="modalImageSrc" class="img-fluid" alt="Gambar Cicilan" />
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
import NavbarDashboard from '../../../Components/NavbarDasboard.vue';
import Sidebar from '../../../Components/Sidebar.vue';
import paymentInstallmentComponent from '../../../../api/component/paymentInstallmentComponent'; // sesuaikan dengan path file paymentInstallmentComponent.js

export default {
  components: {
    NavbarDashboard,
    Sidebar,
  },
  setup() {
    const {
      installments,
      banks,
      currentInstallment,
      modalImageSrc,
      totalPayment,
      totalIncome,
      totalGap,
      openAddModal,
      hideModal,
      createInstallmentHandler,
      updateInstallmentHandler,
      deleteRecord,
      openEditModal,
      openImageModal,
      handleImageUpload,
      formatRupiah,
    } = paymentInstallmentComponent.setup();

    return {
      installments,
      banks,
      currentInstallment,
      modalImageSrc,
      totalPayment,
      totalIncome,
      totalGap,
      openAddModal,
      hideModal,
      createInstallmentHandler,
      updateInstallmentHandler,
      deleteRecord,
      openEditModal,
      openImageModal,
      handleImageUpload,
      formatRupiah,
    };
  },
};
</script>
