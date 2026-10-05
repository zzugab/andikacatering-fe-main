import { ref, onMounted } from 'vue';
import { DataTable } from 'simple-datatables';
import { getPurchasePlan, getPurchasePlanPrint } from '../services/purchasePlanService';
import { useRoute } from 'vue-router';
import { API_URL } from '../../config/index'; // Sesuaikan dengan konfigurasi API Anda

export default {
    setup() {
        const route = useRoute();

        const purchasePlan = ref([]);
        let dataTableInstancePurchasePlan = null;

        const loadPurchasePlan = async () => {
            try {
                const orderId = route.params.uuid;
                const response = await getPurchasePlan(orderId);
                purchasePlan.value = response;

                initializeDataTableActivity();
            } catch (error) {
                console.error('Error loading purchasePlan:', error);
            }
        };

        const initializeDataTableActivity = () => {
            if (dataTableInstancePurchasePlan) {
                dataTableInstancePurchasePlan.destroy();
            }

            const tableElement = document.getElementById('datatablesPurchase');
            dataTableInstancePurchasePlan = new DataTable(tableElement, {
                data: {
                    headings: ['No', 'Nama Bahan', 'Kuantitas', 'Satuan'],
                    data: purchasePlan.value.total.map((purchasePlan, index) => [
                        index + 1,
                        purchasePlan.name,
                        purchasePlan.quantity,
                        purchasePlan.unit,
                    ]),
                },
            });
        };
        const printPurchasePlan = async () => {
            try {
                const orderId = route.params.uuid;
                getPurchasePlanPrint(orderId); // URL tujuan
                // window.open(printUrl, "_blank"); // Buka di tab baru
            } catch (error) {
                console.error("Error printing purchase plan:", error);
            }
        };

        onMounted(() => {
            loadPurchasePlan();
        });

        return {
            printPurchasePlan,
            purchasePlan,
            loadPurchasePlan,
        };
    },
};
