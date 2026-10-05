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
                                            Data Keuangan
                                        </h1>
                                        <div class="page-header-subtitle">
                                            Manage all your financial records here.
                                        </div>

                                    </div>
                                    <div class="col-12 col-xl-auto mt-4">
                                        <div class="input-group input-group-joined border-0" style="width: 16.5rem">
                                            <span class="input-group-text"><i class="text-primary"
                                                    data-feather="calendar"></i></span>
                                            <input class="form-control ps-0 pointer" ref="litepickerRange"
                                                placeholder="Select date range..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <!-- Main page content-->
                    <div class="container-xl px-4 mt-n10">
                        <div class="row"><!-- Monthly Earnings (Total DP) -->
                            <div class="col-lg-6 col-xl-4 mb-4">
                                <div class="card bg-primary text-white h-100">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="me-3">
                                                <div class="text-white-75 small">Pemasukan</div>
                                                <div class="text-lg fw-bold">{{ formatNominalRupiah(totalIncome) }}</div>
                                            </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-calendar feather-xl text-white-50">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- Annual Earnings (Total Expenses) -->
                            <div class="col-lg-6 col-xl-4 mb-4">
                                <div class="card bg-warning text-white h-100">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="me-3">
                                                <div class="text-white-75 small">Pengeluaran</div>
                                                <div class="text-lg fw-bold">{{ formatNominalRupiah(totalOutcome) }}</div>
                                            </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-dollar-sign feather-xl text-white-50">
                                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- Task Completion (Payment Gap) -->
                            <div class="col-lg-6 col-xl-4 mb-4">
                                <div class="card bg-success text-white h-100">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="me-3">
                                                <div class="text-white-75 small">Keuntungan</div>
                                                <div class="text-lg fw-bold">{{ formatNominalRupiah(totalIncome - totalOutcome) }}</div>
                                            </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
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
                        <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h2>Data Pemasukan</h2>
                            </div>
                            <div class="card-body">
                                <table id="dataIncomeTable" class="table">
                                </table>
                            </div>
                        </div>

                        <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h2>Data Pengeluaran</h2>
                            </div>
                            <div class="card-body">
                                <table id="dataOutcomeTable" class="table">
                                </table>
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
    </div>
</template>

<script>
import NavbarDashboard from "../../../Components/NavbarDasboard.vue";
import Sidebar from "../../../Components/Sidebar.vue";
import financialRecordGlobalComponent from "../../../../api/component/financialRecordGlobalComponent";
import { onMounted, ref, nextTick } from "vue";
import Litepicker from "litepicker";
import "litepicker/dist/css/litepicker.css";
import { formatNominalRupiah } from "../../../../api/helpers/formatRupiah";

export default {
    components: {
        NavbarDashboard,
        Sidebar,
    },
    setup() {
        const {
            loadFinancialRecords,
            financialRecords,
            totalIncome,
            totalOutcome,
            loading,
            error,
            applyFilters,
            filters
        } = financialRecordGlobalComponent.setup();
        const litepickerRange = ref(null);

        onMounted(() => {
            nextTick(() => {
                if (litepickerRange.value) {
                    new Litepicker({
                        element: litepickerRange.value,
                        singleMode: false,
                        numberOfMonths: 2,
                        numberOfColumns: 2,
                        format: "YYYY-MM-DD",
                        autoApply: true, // Tombol "Apply" muncul
                        allowRepick: true,
                        dropdowns: {
                            minYear: 2020,
                            maxYear: 2030,
                        },
                        setup: (picker) => {
                            picker.on('selected', (date1, date2) => {
                                filters.date_start = date1.format("YYYY-MM-DD");
                                filters.date_end = date2.format("YYYY-MM-DD");
                                applyFilters();
                            });
                        }
                    });
                }
            });

            loadFinancialRecords();
        });

        return {
            formatNominalRupiah,
            filters,
            litepickerRange,
            applyFilters,
            financialRecords,
            totalIncome,
            totalOutcome,
            loading,
            error,
        };
    },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css");
@import url("https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css");
@import url("../../../../assets/css/styles.css");
</style>