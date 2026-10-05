// orderAddEditComponent.js
import { ref } from 'vue';
import Swal from 'sweetalert2';
import router from '../../router/index';
import { createOrder, updateOrder } from '../services/orderService';
import { searchCustomer } from '../services/customerService';

export const orderAddEditComponent = {
  setup() {
    const customerSuggestions = ref([]);
    const showCustomerSuggestions = ref(false);

    const searchCustomerName = async () => {
      const name = formData.value.customer_name?.trim();

      if (!name) {
        customerSuggestions.value = [];
        showCustomerSuggestions.value = false;
        return;
      }

      try {
        const response = await searchCustomer(name);

        customerSuggestions.value = response.slice(0, 5);
        showCustomerSuggestions.value = true;
      } catch (error) {
        console.error('Error searching customer:', error);
        customerSuggestions.value = [];
        showCustomerSuggestions.value = false;
      }
    };

    const selectCustomer = (customer) => {
      formData.value.customer_id = customer.uuid;
      formData.value.customer_name = customer.name;
      formData.value.phone_number_1 = customer.phone_number_1 || '';
      formData.value.phone_number_2 = customer.phone_number_2 || '';
      formData.value.address = customer.address || '';

      customerSuggestions.value = [];
      showCustomerSuggestions.value = false;
    };

    const customers = ref([]);

    const formData = ref({
      uuid: '',

      // Customer
      customer_id: '',
      customer_name: '',
      phone_number_1: '',
      phone_number_2: '',
      address: '',

      // Order
      location: '',
      event_date: '',
      event_time: '',
      portion: '',
      note: '',
      status: '',

      // Order Detail
      akad_start: '',
      akad_end: '',
      resepsi_start: '',
      resepsi_end: '',
      nuance: '',
      general_buffet: '',
      vip_buffet: '',
      vip_table: '',
      wedding_food_table: '',
      akad_table: '',
      reception_table: '',
      for_naib: '',
      ayam_bekakak_nasi_punar: '',
      mica_for_besan: '',
    });

    const nextStep = () => {
      const customer_name = document.getElementById('customer_name').value;
      const phone_number_1 = document.getElementById('phone_number_1').value;
      const phone_number_2 = document.getElementById('phone_number_2').value;
      const address = document.getElementById('address').value;

      if (!customer_name || !phone_number_1 || !phone_number_2 || !address) {
        Swal.fire({
          icon: 'warning',
          title: 'Data Wajib',
          text: 'Status dan Tanggal Acara (Event Date) harus diisi sebelum melanjutkan.',
        });
        return;
      }

      document.getElementById('step2-tab').click();
    };

    const prevStep = () => {
      document.getElementById('step1-tab').click();
    };

    const submitForm = () => {
      const dataOrder = { ...formData.value };

      // Saat create, UUID order tidak dikirim
      if (dataOrder.uuid === '') {
        delete dataOrder.uuid;
        createOrderHandler(dataOrder);
        return;
      }

      updateOrderHandler(dataOrder.uuid, dataOrder);
    };

    const createOrderHandler = async (data) => {
      try {
        const response = await createOrder(data);

        Swal.fire(
          'Added!',
          'The order has been added successfully.',
          'success'
        );

        router.push({
          name: 'OrderDetail',
          params: {
            uuid: response.data.uuid,
          },
        });
      } catch (error) {
        console.error('Error creating order:', error);

        Swal.fire(
          'Failed!',
          'There was an error adding the order.',
          'error'
        );
      }
    };

    const updateOrderHandler = async (uuid, data) => {
      try {
        await updateOrder(uuid, data);

        Swal.fire(
          'Updated!',
          'The order has been updated successfully.',
          'success'
        );
      } catch (error) {
        console.error(
          `Error updating order with ID ${uuid}:`,
          error
        );

        Swal.fire(
          'Failed!',
          'There was an error updating the order.',
          'error'
        );
      }
    };
    

    return {
      nextStep,
      prevStep,
      submitForm,
      customers,
      formData,
      createOrderHandler,
      updateOrderHandler,

      customerSuggestions,
      showCustomerSuggestions,
      searchCustomerName,
      selectCustomer,
    };
  },
};