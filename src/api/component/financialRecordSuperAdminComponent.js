// /src/components/financialRecordGlobalComponent.js
import { ref, reactive, watch, nextTick, onMounted } from 'vue';
import { getFinancialRecord, getDetailFinance } from '../services/financialRecordSa';
import { DataTable } from 'simple-datatables';
import { formatNominalRupiah } from '../helpers/formatRupiah';
import router from '../../router/index';
import { useRoute } from 'vue-router';



export default {
    setup() {
        const financialRecords = ref({});
        const detailFinancialCutomer = ref({});
        const detailFinancialIncome = ref({});
        const detailFinancialOutcome = ref({});
        const total_income = ref(0);
        const total_expenses = ref(0);
        const profit_remaining_funds = ref(0);
        const loading = ref(false);
        const error = ref(null);
        const route = useRoute();
        let dataTableInstance = null;
        let dataTableIncomeInstance = null;
        let dataTableOutcomeInstance = null;
        const imageModalInstance = ref(null);
        const modalImageSrc = ref('');



        const filters = reactive({
            date_start: '',
            date_end: '',
        });

        const openImageModal = (src) => {
            modalImageSrc.value = src;
            imageModalInstance.value.show();
        };


        const loadFinancialRecords = async () => {
            loading.value = true;
            error.value = null;

            try {
                const response = await getFinancialRecord(filters);

                financialRecords.value = response.data;
                total_income.value = response.data.total_income;
                total_expenses.value = response.data.total_expenses;
                profit_remaining_funds.value = response.data.profit_remaining_funds;
                initializeDataTable(financialRecords);

            } catch (err) {
                console.error('Error loading financial records:', err);
                error.value = 'Failed to load financial records. Please try again later.';
            } finally {
                loading.value = false;
            }
        };

        const initializeDataTable = (records) => {
            if (dataTableInstance) {
                dataTableInstance.destroy();
            }
            const tableFinance = document.getElementById('dataFinanceTable');
            if (!tableFinance) {
                console.error("Table element with ID not found.");
                return;
            }
            if (records.value) {
                const headings = [
                    'No',
                    'No Order',
                    'Nama Pelanggan',
                    'Tanggal Acara',
                    'Jam Acara',
                    'Lokasi',
                    'Total Pembayaran',
                    'Total Dibayarkan',
                    'Total Sisa Pembayaran',
                    'Detail'

                ];
                const data = records.value.data_order.map((record, index) => {
                    return [
                        index + 1,
                        record.order_name,
                        record.customer.name,
                        record.event_date,
                        record.event_time,
                        record.location,
                        formatNominalRupiah(record.total_payment),
                        formatNominalRupiah(record.total_paid),
                        formatNominalRupiah(record.remaining_funds),
                        `<button class="btn btn-primary detail-btn" data-uuid="${record.uuid}">Detail</button>`
                    ];

                });

                dataTableInstance = new DataTable(tableFinance, {
                    data: {
                        headings,
                        data
                    }
                });

            }

            tableFinance.querySelectorAll('.detail-btn').forEach((button) => {
                button.addEventListener('click', () => {
                    const uuid = button.getAttribute('data-uuid');
                    router.push({ name: 'DetailFinanceSa', params: { uuid } });

                });
            });
        };

        const loadDetailFinance = async () => {
            loading.value = true;
            error.value = null;
            const uuid = route.params.uuid

            try {
                const data = await getDetailFinance(uuid);
                detailFinancialCutomer.value = data.customer;
                detailFinancialIncome.value = data.income;
                detailFinancialOutcome.value = data.outcome;
                initializeDetailIncomeDataTable(detailFinancialIncome.value.payment)
                initializeDetailOutcomeDataTable(detailFinancialOutcome.value.payment)
            } catch (err) {
                console.error('Error loading income detail:', err);
                error.value = 'Failed to load income detail. Please try again later.';
            } finally {
                loading.value = false;
            }
        };

        const initializeDetailIncomeDataTable = (records) => {
            if (dataTableIncomeInstance) {
                dataTableIncomeInstance.destroy();
            }
            const tableIncomeFinance = document.getElementById('dataIncomeTable');
            if (!tableIncomeFinance) {
                console.error("Table element with ID not found.");
                return;
            }

            if (records) {
                const headings = [
                    'No',
                    'Bukti Pembayaran',
                    'Total Pembayaran',
                    'Tanggal Acara',
                    'Bank',
                ];
                const data = records.map((record, index) => {
                    return [
                        index + 1,
                        `<img src="${record.payment_proof}" alt="" width="50" height="50" class="view-image" data-src="${record.payment_proof}">`,
                        record.payment_amount,
                        record.payment_date,
                        record.bank_name,
                    ];
                });

                dataTableIncomeInstance = new DataTable(tableIncomeFinance, {
                    data: {
                        headings,
                        data
                    }
                });
            }
            tableIncomeFinance.addEventListener('click', (event) => {
                if (event.target.classList.contains('view-image')) {
                    const src = event.target.getAttribute('data-src');
                    openImageModal(src);
                }
            });
        };

        const initializeDetailOutcomeDataTable = (records) => {
            if (dataTableOutcomeInstance) {
                dataTableOutcomeInstance.destroy();
            }
            const tableOutcomeFinance = document.getElementById('dataOutcomeTable');
            if (!tableOutcomeFinance) {
                console.error("Table element with ID not found.");
                return;
            }
            if (records) {
                const headings = [
                    'No',
                    'Bukti Pembayaran',
                    'Total Pembelanjaan',
                    'Tanggal Belanja',
                    'Deskripsi',
                ];
                const data = records.map((record, index) => {
                    return [
                        index + 1,
                        `<img src="${record.receipt_proof}" alt="" width="50" height="50" class="view-image" data-src="${record.receipt_proof}">`,
                        record.total_spent,
                        record.shopping_date,
                        record.description,
                    ];
                });

                dataTableOutcomeInstance = new DataTable(tableOutcomeFinance, {
                    data: {
                        headings,
                        data
                    }
                });

            }
            tableOutcomeFinance.addEventListener('click', (event) => {
                if (event.target.classList.contains('view-image')) {
                    const src = event.target.getAttribute('data-src');
                    openImageModal(src);
                }
            });
        };

        const applyFilters = () => {
            loadFinancialRecords();
        };

        onMounted(() => {
            const imageModalElement = document.getElementById('imageModal');
            if (imageModalElement) {
                imageModalInstance.value = new bootstrap.Modal(imageModalElement, {});
                loadDetailFinance();

            }
        });


        return {
            modalImageSrc,
            openImageModal,
            loadDetailFinance,
            financialRecords,
            detailFinancialCutomer,
            detailFinancialIncome,
            detailFinancialOutcome,
            total_income,
            total_expenses,
            profit_remaining_funds,
            loading,
            error,
            filters,
            applyFilters,
            loadFinancialRecords,
        };
    }
};
