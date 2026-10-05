import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import router from '../../router/index';
import { useRoute } from 'vue-router';
import {
  getAllCustomer,
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from '../services/customerService';
import { DataTable } from 'simple-datatables';

export default {
  setup() {
    const route = useRoute();
    const customers = ref([]);
    const customersDetail = ref([]);
    const currentCustomer = ref({
      name: '',
      phone_1: '',
      phone_2: '',
      address: '',
    });

    let dataTableInstanceCustomer = null;
    let dataTableInstanceDetailCustomer = null;

    const modalInstance = ref(null);

    const openAddModal = () => {
      currentCustomer.value = {
        name: '',
        phone_1: '',
        phone_2: '',
        address: '',
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

    const loadCustomers = async () => {
      try {
        const response = await getAllCustomer();
        customers.value = response;
        initializeDataTableCustomer();
      } catch (error) {
        console.error('Error loading customers:', error);
      }
    };

    const initializeDataTableCustomer = () => {
      if (dataTableInstanceCustomer) {
        dataTableInstanceCustomer.destroy();
      }

      const tableElement = document.getElementById('datatablesSimple');
      dataTableInstanceCustomer = new DataTable(tableElement, {
        data: {
          headings: ['No', 'Name', 'Phone 1', 'Phone 2', 'Address', 'Actions'],
          data: customers.value.data.map((customer, index) => [
            index + 1,
            customer.name || 'Belum diisi',
            customer.phone_number_1 || 'Belum diisi',
            customer.phone_number_2 || 'Belum diisi',
            customer.address || 'Belum diisi',
            `<button class="btn btn-info btn-sm detail-btn my-1" data-id="${customer.uuid}">Customer Detail</button>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${customer.uuid}">Edit</button>`,
            // <button class="btn btn-primary btn-sm addorder-btn" data-id="${customer.uuid}">Tambah Pesanan</button>
          ]),
        },
      });

      tableElement.querySelectorAll('.detail-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const customerId = button.getAttribute('data-id');
          router.push({ name: 'CustomerDetail', params: { uuid: customerId } });
        });
      });

      tableElement.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const customerId = button.getAttribute('data-id');
          const customer = customers.value.data.find((c) => c.uuid === customerId);
          editCustomer(customer);
        });
      });

      tableElement.querySelectorAll('.addorder-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const customerId = button.getAttribute('data-id');
          router.push({ name: 'OrderData', params: { uuid: customerId } });
        });
      });

      tableElement.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const customerId = button.getAttribute('data-id');
          deleteCustomerHandler(customerId);
        });
      });
    };

    const loadDetailCustomers = async () => {
      try {
        const uuid = route.params.uuid;
        const response = await getCustomerById(uuid);
        customersDetail.value = response.data;

        initializeDataTableDetailCustomer();
      } catch (error) {
        console.error('Error loading customers:', error);
      }
    };

    const initializeDataTableDetailCustomer = () => {
      const tableElementDetail = document.getElementById('datatablesSimpleDetailCustomer');
      if (!tableElementDetail) {
        console.error('Table element for Detail Customer not found.');
        return;
      }

      if (dataTableInstanceDetailCustomer) {
        dataTableInstanceDetailCustomer.destroy();
      }

      dataTableInstanceDetailCustomer = new DataTable(tableElementDetail, {
        data: {
          headings: ['No', 'No Order', 'Tanggal Acara', 'Waktu Acara', 'Lokasi', 'Porsi', 'Status'],
          data: customersDetail.value.order.map((detailCustomer, index) => [
            index + 1,
            detailCustomer.order_name || 'Belum diisi',
            detailCustomer.event_date || 'Belum diisi',
            detailCustomer.event_time || 'Belum diisi',
            detailCustomer.location || 'Belum diisi',
            detailCustomer.portion || 'Belum diisi',
            detailCustomer.status || 'Belum diisi',
          ]),
        },
      });
    };

    const createCustomerHandler = async (customerData) => {
      try {
        await createCustomer(customerData);
        await loadCustomers();
        hideModal();
        Swal.fire('Added!', 'The customer has been added successfully.', 'success');
      } catch (error) {
        console.error('Error creating customer:', error);
        Swal.fire('Failed!', 'There was an error adding the customer.', 'error');
      }
    };

    const updateCustomerHandler = async (id, customerData) => {
      try {
        await updateCustomer(id, customerData);
        await loadCustomers();
        hideModal();
        Swal.fire('Updated!', 'The customer has been updated successfully.', 'success');
      } catch (error) {
        console.error(`Error updating customer with ID ${id}:`, error);
        Swal.fire('Failed!', 'There was an error updating the customer.', 'error');
      }
    };

    const editCustomer = (customer) => {
      currentCustomer.value = { ...customer };
      new bootstrap.Modal(document.getElementById('customerModal')).show();
    };

    const deleteCustomerHandler = async (id) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this customer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await deleteCustomer(id);
          await loadCustomers();
          Swal.fire('Deleted!', 'The customer has been deleted.', 'success');
        } catch (error) {
          console.error(`Error deleting customer with ID ${id}:`, error);
          Swal.fire('Failed!', 'There was an error deleting the customer.', 'error');
        }
      }
    };

    onMounted(() => {
      const modalElement = document.getElementById('customerModal');
      if (modalElement) {
        modalInstance.value = new bootstrap.Modal(document.getElementById('customerModal'), {});
        loadCustomers();
      } else {
        loadDetailCustomers();
      }
    });

    return {
      customers,
      customersDetail,
      currentCustomer,
      openAddModal,
      hideModal,
      createCustomerHandler,
      updateCustomerHandler,
      deleteCustomerHandler,
      editCustomer,
    };
  },
};
