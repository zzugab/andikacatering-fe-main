// /src/components/financialRecordGlobalComponent.js
import { ref, reactive, watch, onMounted } from 'vue';
import {
    getFinancialRecord,
    getIncomeDetail,
    getOutcomeDetail,
} from '../services/financialRecordGlobal';
import { DataTable } from 'simple-datatables';
import { formatNominalRupiah } from '../helpers/formatRupiah';
import router from '../../router';

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
            type: '',
            date_start: '',
            date_end: '',
        });


        const loadFinancialRecords = async () => {
            loading.value = true;
            error.value = null;

            try {
                const response = await getFinancialRecord(filters);
                const typeData = filters.type;

                financialRecords.data = response.data;
                totalIncome.value = response.data.totalIncome;
                totalOutcome.value = response.data.totalOutcome;

                initializeDataTable(financialRecords.data, typeData);
            } catch (err) {
                console.error('Error loading financial records:', err);
                error.value = 'Failed to load financial records. Please try again later.';
            } finally {
                loading.value = false;
            }
        };

        const initializeDataTable = (records, typeData) => {
            const tableElementIncome = document.getElementById('dataIncomeTable');
            const tableElementOutcome = document.getElementById('dataOutcomeTable');
            const dataTableElements = { Income: tableElementIncome, Outcome: tableElementOutcome };

            // Verifikasi keberadaan elemen tabel
            if (!tableElementIncome || !tableElementOutcome) {
                console.error("Table element with ID not found.");
                return;
            }

            // Destroy existing DataTable instances
            [dataTableInstanceIncome, dataTableInstanceOutcome].forEach(instance => {
                if (instance) {
                    instance.destroy();
                    instance = null;
                }
            });

            // Menangani tidak adanya data
            if (!records || records.length === 0) {
                Object.values(dataTableElements).forEach(table => {
                    table.innerHTML = "<thead><tr><th colspan='5' class='text-center'>Tidak Ada Data</th></tr></thead>";
                });
                return;
            }


            if (typeData == 'event') {
                if (records.dataIncome) {
                    const headings = [
                        'No',
                        'Nama Pelanggan',
                        'Tanggal Acara',
                        'Total Pembayaran',
                        'Total Dibayarkan',
                        'Detail'
                    ];
                    const data = records.dataIncome.map((record, index) => {
                        return [
                            index + 1,
                            record.customer_name,
                            convertDate(record.event_date),
                            formatNominalRupiah(record.total_amount),
                            formatNominalRupiah(record.payment_amount),
                            `<button class="btn btn-info btn-sm detail-income-btn" data-id="${record.payment_id}">Detail</button>`
                        ];

                    });
                    dataTableInstanceIncome = new DataTable(tableElementIncome, {
                        data: {
                            headings,
                            data
                        }
                    });
                }
                if (records.dataOutcome) {
                    const headings = [
                        'No',
                        'Nama Pelanggan',
                        'Tanggal Acara',
                        'Dana Customer',
                        'Total Belanja',
                        'Dana Sisa/Hutang',
                        'Detail'
                    ];
                    const data = records.dataIncome.map((record, index) => {
                        return [
                            index + 1,
                            record.customer_name,
                            convertDate(record.event_date),
                            formatNominalRupiah(record.total_amount),
                            formatNominalRupiah(record.payment_amount),
                            formatNominalRupiah(record.total_amount - record.payment_amount),
                            `<button class="btn btn-info btn-sm detail-outcome-btn" data-id="${record.order_id}">Detail</button>`
                        ];

                    });
                    
                    dataTableInstanceIncome = new DataTable(tableElementOutcome, {
                        data: {
                            headings,
                            data
                        }
                    });

                    console.log(dataTableInstanceIncome);
                    
                }

            } else {
                if (records.dataIncome) {
                    const headings = [
                        'No',
                        'Nama Pelanggan',
                        'Tanggal Acara',
                        'Total Pembayaran',
                        'Total Dibayarkan',
                        'Detail'
                    ];
                    const data = records.dataIncome.map((record, index) => {
                        return [
                            index + 1,
                            record.payment.order.customer.name,
                            convertDate(record.payment.order.event_date),
                            formatNominalRupiah(record.amount),
                            formatNominalRupiah(record.payment.amount),
                            `<button class="btn btn-info btn-sm detail-income-btn" data-id="${record.order_id}">Detail</button>`
                        ];

                    });
                    dataTableInstanceIncome = new DataTable(tableElementIncome, {
                        data: {
                            headings,
                            data
                        }
                    });
                }
                if (records.dataOutcome) {
                    const headings = [
                        'No',
                        'Nama Pelanggan',
                        'Tanggal Acara',
                        'Total Belanja',
                        'Detail'
                    ];
                    const data = records.dataOutcome.map((record, index) => {
                        return [
                            index + 1,
                            record.order.customer.name,
                            convertDate(record.date),
                            formatNominalRupiah(record.amount),
                            `<button class="btn btn-info btn-sm detail-outcome-btn" data-id="${record.order_id}">Detail</button>`
                        ];

                    });
                    dataTableInstanceIncome = new DataTable(tableElementOutcome, {
                        data: {
                            headings,
                            data
                        }
                    });
                }
            }

            tableElementIncome.querySelectorAll('.detail-income-btn').forEach((button) => {
                button.addEventListener('click', () => {
                    const uuid = button.getAttribute('data-id');
                    router.push({ name: 'Installment', params: { uuid } });
                });
            });
            tableElementOutcome.querySelectorAll('.detail-outcome-btn').forEach((button) => {
                button.addEventListener('click', () => {
                    const uuid = button.getAttribute('data-id');
                    // router.push({ name: 'Installment', params: { uuid } });
                });
            });
        };


        const loadIncomeDetail = async (uuid) => {
            loading.value = true;
            error.value = null;

            try {
                const data = await getIncomeDetail(uuid);
                incomeDetail.value = data;
            } catch (err) {
                console.error('Error loading income detail:', err);
                error.value = 'Failed to load income detail. Please try again later.';
            } finally {
                loading.value = false;
            }
        };

        const loadOutcomeDetail = async (uuid) => {
            loading.value = true;
            error.value = null;

            try {
                const data = await getOutcomeDetail(uuid);
                outcomeDetail.value = data;
            } catch (err) {
                console.error('Error loading outcome detail:', err);
                error.value = 'Failed to load outcome detail. Please try again later.';
            } finally {
                loading.value = false;
            }
        };

        const applyFilters = () => {
            loadFinancialRecords();
        };

        function convertDate(dateString) {
            const date = new Date(dateString);
            const dayNames = [
                "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
            ];
            const dayName = dayNames[date.getDay()];
            const day = date.getDate().toString().padStart(2, '0');
            const monthNames = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${dayName}, ${day} ${month} ${year}`;
        }

        return {
            financialRecords,
            totalIncome,
            totalOutcome,
            loading,
            error,
            filters,
            applyFilters,
            loadFinancialRecords,
            loadIncomeDetail,
            loadOutcomeDetail,
        };
    }
};

