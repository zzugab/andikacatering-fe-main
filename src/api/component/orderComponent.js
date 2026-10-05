import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import router from '../../router/index';
import { getAllOrders, createOrder, printDataDapur, updateOrder, deleteOrder, printData } from '../services/orderService';
import { DataTable } from 'simple-datatables';
import { convertDate } from '../helpers/formatDate';
import { getStatusDescription } from '../helpers/orderStatus';

export default {
  setup() {
    const orders = ref([]);
    const selectedYear = ref('');
    const selectedMonth = ref('');

    const currentOrder = ref({
      name: '',
      date: '',
      status: '',
      customer: '',
    });

    let dataTableInstanceOrder = null;
    const modalInstance = ref(null);

    const openAddModal = () => {
      currentOrder.value = {
        name: '',
        date: '',
        status: '',
        customer: '',
      };
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      } else {
        console.error('Modal instance not found');
      }
    };

    const loadOrders = async (month = '', year = '') => {
      try {
        let response;

        if (month || year) {
          response = await getAllOrders(month, year);
        } else {
          response = await getAllOrders();
        }

        orders.value = response;

        initializeDataTableOrder();
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };

    const filterOrders = () => {
      if (!selectedMonth.value || !selectedYear.value ) {
        Swal.fire({
          icon: 'warning',
          title: 'Filter belum lengkap',
          text: 'Silakan pilih tahun dan bulan terlebih dahulu.',
        });
        return;
      }

      loadOrders(
        selectedMonth.value,
        selectedYear.value
      );
    };

    const initializeDataTableOrder = () => {
      if (dataTableInstanceOrder) {
        dataTableInstanceOrder.destroy();
      }

      const tableElement = document.getElementById('datatablesSimple');
      dataTableInstanceOrder = new DataTable(tableElement, {
        data: {
          headings: ['No', 'Order ID', 'Tanggal', 'Status', 'Pelanggan', 'Aksi'],
          data: orders.value.data.map((order, index) => [
            index + 1,
            order.order_name,
            order.event_date,
            getStatusDescription(order.status),
            order.customer?.name,
            `<button class="btn btn-info btn-sm detail-btn" data-id="${order.uuid}">Order Detail</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${order.uuid}">Hapus</button>
            <button class="btn btn-secondary btn-sm print-btn" data-id="${order.uuid}">Print - Customer</button>
            <button class="btn btn-secondary btn-sm print-dapur-btn" data-id="${order.uuid}">Print - Dapur </button>`,
          ]),
        },
      });

      tableElement.querySelectorAll('.detail-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const orderId = button.getAttribute('data-id');
          router.push({ name: 'OrderDetail', params: { uuid: orderId } });
        });
      });

      tableElement.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const orderId = button.getAttribute('data-id');
          const order = orders.value.data.find((o) => o.uuid === orderId);
          editOrder(order);
        });
      });

      tableElement.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const orderId = button.getAttribute('data-id');
          deleteOrderHandler(orderId);
        });
      });

      tableElement.querySelectorAll('.print-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const orderId = button.getAttribute('data-id');
          printData(orderId);
        });
      });

      tableElement.querySelectorAll('.print-dapur-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const orderId = button.getAttribute('data-id');
          printDataDapur(orderId);
        });
      });
    };

    const createOrderHandler = async (orderData) => {
      try {
        await createOrder(orderData);
        await loadOrders();
        hideModal();
        Swal.fire('Added!', 'The order has been added successfully.', 'success');
      } catch (error) {
        console.error('Error creating order:', error);
        Swal.fire('Failed!', 'There was an error adding the order.', 'error');
      }
    };

    const updateOrderHandler = async (id, orderData) => {
      try {
        await updateOrder(id, orderData);
        await loadOrders();
        hideModal();
        Swal.fire('Updated!', 'The order has been updated successfully.', 'success');
      } catch (error) {
        console.error(`Error updating order with ID ${id}:`, error);
        Swal.fire('Failed!', 'There was an error updating the order.', 'error');
      }
    };

    const editOrder = (order) => {
      currentOrder.value = { ...order };
      new bootstrap.Modal(document.getElementById('orderModal')).show();
    };

    const deleteOrderHandler = async (id) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this order!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await deleteOrder(id);
          await loadOrders();
          Swal.fire('Deleted!', 'The order has been deleted.', 'success');
        } catch (error) {
          console.error(`Error deleting order with ID ${id}:`, error);
          Swal.fire('Failed!', 'There was an error deleting the order.', 'error');
        }
      }
    };

    const months = Array.from({ length: 12 }, (_, index) =>
      new Date(2000, index, 1).toLocaleString('id-ID', {
        month: 'long',
      })
    );

    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(document.getElementById('orderModal'), {});
      loadOrders();
    });

    return {
      orders,
      currentOrder,
      selectedYear,
      selectedMonth,
      openAddModal,
      hideModal,
      createOrderHandler,
      updateOrderHandler,
      deleteOrderHandler,
      editOrder,
      filterOrders,
      months
    };
  },
};
