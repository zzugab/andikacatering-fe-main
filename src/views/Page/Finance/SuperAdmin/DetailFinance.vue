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
                                            Detail Data Keuangan
                                        </h1>
                                        <div class="page-header-subtitle">
                                            Manage all your financial records here.
                                        </div>

                                    </div>
                                        <nav class="mt-4 rounded" aria-label="breadcrumb">
                                            <ol class="breadcrumb px-3 py-2 rounded mb-0">
                                                <li class="breadcrumb-item">
                                                    <a href="#" @click.prevent="$router.go(-1)">Data Keuangan</a>
                                                </li>
                                                <li class="breadcrumb-item active">
                                                    Detail Data Keuangan
                                                </li>
                                            </ol>
                                        </nav>
                                </div>
                            </div>
                        </div>
                    </header>
                    <!-- Main page content-->
                    <div class="container-xl px-4 mt-n10">

                        <!-- Customer Detail-->
                        <div class="col-lg-6 mb-4">
                            <div class="card">
                                <div class="card-header bg-gray">
                                    <h2 class="mb-0">Data Pelanggan</h2>
                                </div>
                                <div class="card-body">
                                    <table class="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <th scope="row" style="width: 30%">Name</th>
                                                <td>{{ detailFinancialCutomer.name }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Phone 1</th>
                                                <td>{{ detailFinancialCutomer.phone_1 }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Phone 2</th>
                                                <td>{{ detailFinancialCutomer.phone_2 }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Lokasi</th>
                                                <td>{{ detailFinancialCutomer.location_event }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Tanggal Event</th>
                                                <td>{{ detailFinancialCutomer.event_date }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-lg-6 col-xl-3 mb-4">
                                    <div class="card bg-primary text-white h-100">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="me-3">
                                                    <div class="text-white-75 small">Total Pembayaran</div>
                                                    <div class="text-lg fw-bold">{{
                                                        formatNominalRupiah(detailFinancialIncome.total_payment) }}
                                                    </div>
                                                </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-calendar feather-xl text-white-50">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Annual Earnings (Total Expenses) -->
                                <div class="col-lg-6 col-xl-3 mb-4">
                                    <div class="card bg-warning text-white h-100">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="me-3">
                                                    <div class="text-white-75 small">Total Yang Dibayarkan</div>
                                                    <div class="text-lg fw-bold">{{
                                                        formatNominalRupiah(detailFinancialIncome.total_paid)
                                                        }}
                                                    </div>
                                                </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-dollar-sign feather-xl text-white-50">
                                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Task Completion (Payment Gap) -->
                                <div class="col-lg-6 col-xl-3 mb-4">
                                    <div class="card bg-danger text-white h-100">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="me-3">
                                                    <div class="text-white-75 small">Total Belanja</div>
                                                    <div class="text-lg fw-bold">{{
                                                        formatNominalRupiah(detailFinancialOutcome.total_expenditure) }}
                                                    </div>
                                                </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-check-square feather-xl text-white-50">
                                                    <polyline points="9 11 12 14 22 4"></polyline>
                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Task Completion (Payment Gap) -->
                                <div class="col-lg-6 col-xl-3 mb-4">
                                    <div class="card bg-success text-white h-100">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="me-3">
                                                    <div class="text-white-75 small">Keuntungan/Dana Sisa</div>
                                                    <div class="text-lg fw-bold">{{
                                                        formatNominalRupiah(detailFinancialOutcome.remaining_funds) }}
                                                    </div>
                                                </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-check-square feather-xl text-white-50">
                                                    <polyline points="9 11 12 14 22 4"></polyline>
                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Income Detail-->
                            <div class="card mb-4">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h2>Daftar Pemasukan</h2>
                                </div>
                                <div class="card-body">
                                    <table id="dataIncomeTable" class="table">
                                    </table>
                                </div>
                            </div>
                            <!-- Outcome Detail-->
                            <div class="card mb-4">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h2>Daftar Pengeluaran </h2>
                                </div>
                                <div class="card-body">
                                    <table id="dataOutcomeTable" class="table">
                                    </table>
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
                                <a href="#!">Terms & Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <!-- Modal for Viewing Image -->
        <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="imageModalLabel">View Image</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img :src="modalImageSrc" alt="Image" class="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import NavbarDashboard from "../../../Components/NavbarDasboard.vue";
import Sidebar from "../../../Components/Sidebar.vue";
import "litepicker/dist/css/litepicker.css";
import { formatNominalRupiah } from "../../../../api/helpers/formatRupiah";
import financialRecordSuperAdminComponent from "../../../../api/component/financialRecordSuperAdminComponent";

export default {
    components: {
        NavbarDashboard,
        Sidebar,
    },
    setup() {
        const {
            modalImageSrc,
            openImageModal,
            loading,
            error,
            loadDetailFinance,
            detailFinancialCutomer,
            detailFinancialIncome,
            detailFinancialOutcome,
        } = financialRecordSuperAdminComponent.setup();


        return {
            modalImageSrc,
            openImageModal,
            detailFinancialCutomer,
            detailFinancialIncome,
            detailFinancialOutcome,
            formatNominalRupiah,
            loadDetailFinance,
            loading,
            error,
        };
    },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css");

input[ref="litepickerRange"] {
    pointer-events: auto;
    cursor: pointer;
}
</style>