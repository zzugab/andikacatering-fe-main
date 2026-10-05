// /src/components/financialRecordGlobalComponent.js
import { ref, reactive, watch, nextTick } from 'vue';
import {
    getFinancialRecord,
    getIncomeDetail,
    getOutcomeDetail,
} from '../services/financialRecordGlobal';
import { DataTable } from 'simple-datatables';
import { formatNominalRupiah } from '../helpers/formatRupiah';
import { event } from 'jquery';

export default {
    setup() {
        const financialRecords = ref({});
        const totalIncome = ref(0);
        const totalOutcome = ref(0);
        const loading = ref(false);
        const error = ref(null);
        let dataTableInstanceOutcome = null;
        let dataTableInstanceIncome = null;


        const filters = reactive({
            date_start: '',
            date_end: '',
        });


        const loadFinancialRecords = async () => {
            loading.value = true;
            error.value = null;

            try {
                const response = await getFinancialRecord(filters);
                financialRecords.value = response.data;
                totalIncome.value = response.data.totalIncome;
                totalOutcome.value = response.data.totalOutcome;
                if (financialRecords.value && financialRecords.value.dataIncome && financialRecords.value.dataOutcome) {
                    await nextTick(() => {
                        initializeDataTable(financialRecords);
                    });
                } else {
                    console.error("Financial records data is incomplete.");
                }
            } catch (err) {
                console.error('Error loading financial records:', err);
                error.value = 'Failed to load financial records. Please try again later.';
            } finally {
                loading.value = false;
            }
        };

        const initializeDataTable = (records) => {
            if (dataTableInstanceIncome) {
                dataTableInstanceIncome.destroy();
            }

            if (dataTableInstanceOutcome) {
                dataTableInstanceOutcome.destroy();
            }
            const tableElementIncome = document.getElementById('dataIncomeTable');
            const tableElementOutcome = document.getElementById('dataOutcomeTable');

            if (!tableElementIncome || !tableElementOutcome) {
                console.error("Table element with ID not found.");
                return;
            }

            if (records.value.dataIncome) {
                const headings = [
                    'No',
                    'Nama Pelanggan',
                    'Tanggal Acara',
                    'Total Pembayaran',
                    'Total Dibayarkan',
                ];
                const data = records.value.dataIncome.map((record, index) => {
                    return [
                        index + 1,
                        record.payment ? record.payment.order.customer.name || '-' : '-',
                        record.payment ? record.payment.order.event_date|| '-' : '-' ,
                        formatNominalRupiah(record.amount),
                        formatNominalRupiah(record.payment.amount),
                    ];

                });
                // Initialize the DataTable if it doesn't exist
                dataTableInstanceIncome = new DataTable(tableElementIncome, {
                    data: {
                        headings,
                        data
                    }
                });
            }
            if (records.value.dataOutcome) {
                const headings = [
                    'No',
                    'Nama Pelanggan',
                    'Tanggal Acara',
                    'Dana Customer',
                    'Total Belanja',
                    'Dana Sisa/Hutang',
                ];
                const data = records.value.dataOutcome.map((record, index) => {
                    return [
                        index + 1,
                        record.order ? record.order.customer.name || '-' : '-',
                        record.order ? record.order.event_date|| '-' : '-' ,
                        formatNominalRupiah(record.amount),
                        formatNominalRupiah(record.payment.amount),
                        formatNominalRupiah(record.amount - record.payment.amount),
                    ];

                });

                dataTableInstanceOutcome = new DataTable(tableElementOutcome, {
                    data: {
                        headings,
                        data
                    }
                });

            }

        };

        const applyFilters = () => {
            loadFinancialRecords();
        };


        return {

            financialRecords,
            totalIncome,
            totalOutcome,
            loading,
            error,
            filters,
            applyFilters,
            loadFinancialRecords,
        };
    }
};
