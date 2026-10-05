import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { getAllPayments, getPaymentById, updatePayment, deletePayment } from '../services/paymentIndexService';
import { DataTable } from 'simple-datatables';
import { getStatusPayment } from '../helpers/orderStatus';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const payments = ref([]);
    const totalIncome = ref(0);
    const totalPayment = ref(0);
    const totalGap = ref(0);
    const currentPayment = ref({
      order_id: '',
      amount: null,
      status: '',
      installment: [],
    });

    let dataTableInstance = null;
    const modalInstance = ref(null);

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      } else {
        console.error('Modal instance not found');
      }
    };

    const openAddModal = () => {
      currentPayment.value = {
        order_id: '',
        amount: null,
        status: '',
        installment: [],
      };
      const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
      modal.show();
    };

    const loadPayments = async () => {
      try {
        const response = await getAllPayments();
        if (response.status) {
          const paymentsData = response.data.list_payment.map((payment) => ({
            uuid: payment.uuid,
            order_name: payment.order ? payment.order.order_name || '-' : '-',
            name_customer: payment.order ? payment.order.customer.name || '-' : '-',
            amount: payment.amount || '-',
            total_amount: payment.installment.reduce(
              (sum, installment) => sum + parseFloat(installment.total_amount),
              0
            ),
            status: payment.status || '-',
            installment: payment.installment || '-',
          }));

          payments.value = paymentsData;
          totalIncome.value = response.data.total_income;
          totalPayment.value = response.data.total_payment;
          totalGap.value = response.data.total_gap;
        } else {
          console.error('Error loading payments:');
        }

        initializeDataTable();
      } catch (error) {
        console.error('Error loading payments:', error);
      }
    };

    const formatRupiah = (amount) => {
      const numberString = amount.replace(/[^,\d]/g, '').toString();
      const split = numberString.split(',');
      const sisa = split[0].length % 3;
      let rupiah = split[0].substr(0, sisa);
      const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
      return 'Rp. ' + rupiah;
    };

    const formatNumber = (event) => {
      let value = event.target.value.replace(/[^0-9]/g, '');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      event.target.value = value;
      currentPayment.value.amount = parseInt(value.replace(/\./g, ''), 10);
    };

    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById('datatablesPayments');

      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: ['No', 'No. Order', 'Nama', 'Total', 'Dibayar', 'Status', 'Actions'],
          data: payments.value.map((payment, index) => [
            index + 1,
            payment.order_name,
            payment.name_customer,
            payment.amount !== null ? formatRupiah(payment.amount.toString()) : formatRupiah('0'),
            formatRupiah(payment.total_amount.toString()),
            getStatusPayment(payment.status),
            `
              <button class="btn btn-primary installment-btn my-1" data-uuid="${payment.uuid}">Cicilan</button>
              <button class="btn btn-warning edit-btn my-1" data-uuid="${payment.uuid}">Edit</button>
              <button class="btn btn-danger delete-btn my-1" data-uuid="${payment.uuid}">Delete</button>
            `,
          ]),
        },
      });

      // Add event listeners for both buttons
      tableElement.addEventListener('click', (event) => {
        const uuid = event.target.getAttribute('data-uuid');

        if (event.target.classList.contains('installment-btn')) {
          goToInstallmentPage(uuid);
        } else if (event.target.classList.contains('edit-btn')) {
          openEditModal(uuid);
        } else if (event.target.classList.contains('delete-btn')) {
          deleteRecord(uuid);
        }
      });
    };

    const goToInstallmentPage = (uuid) => {
      router.push({ name: 'Installment', params: { uuid } });
    };

    const openEditModal = async (uuid) => {
      try {
        const response = await getPaymentById(uuid);
        if (response.status) {
          currentPayment.value = response.data;
          modalInstance.value.show();
        } else {
          console.error('Error fetching payment:', response);
        }
      } catch (error) {
        console.error('Error opening edit modal:', error);
      }
    };

    const updatePaymentHandler = async (uuid, paymentData) => {
      try {
        await updatePayment(uuid, paymentData);
        await loadPayments();
        hideModal();
        Swal.fire('Success', 'Payment updated successfully', 'success');
      } catch (error) {
        console.error(`Error updating payment with uuid ${uuid}:`, error);
        Swal.fire('Failed', 'There was an error updating the payment.', 'error');
      }
    };

    const deleteRecord = async (uuid) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this payment!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          const response = await deletePayment(uuid);
          if (response.status) {
            await loadPayments();
            Swal.fire('Deleted!', 'The payment has been deleted.', 'success');
          } else {
            console.error('Error deleting payment:', response);
            Swal.fire('Failed', 'There was an error deleting the payment.', 'error');
          }
        } catch (error) {
          console.error(`Error deleting payment with uuid ${uuid}:`, error);
          Swal.fire('Failed', 'There was an error deleting the payment.', 'error');
        }
      }
    };

    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(document.getElementById('paymentModal'), {});
      const inputElement = document.getElementById('amount');
      inputElement.addEventListener('input', function (e) {
        formatNumber(e);
      });
      loadPayments();
    });

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
