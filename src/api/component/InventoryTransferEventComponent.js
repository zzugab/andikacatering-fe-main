import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { DataTable } from 'simple-datatables';
import {
  getAllData,
  createTransfer,
  updateTransfer,
  deleteTransfer,
  requestTransfer,
} from '../services/inventoryDataTransferService'; // Adjust the path as needed
import { convertDate } from '../helpers/formatDate';
import router from '../../router';
import { getAllOrders } from '../services/orderService';
import { getAllInventory } from '../services/inventoryDataService';

export default {
  setup() {
    const inventories = ref([]);
    const currentInventory = ref({
      status: '',
      order_id_from: '',
      order_id_to: '',
      note: '',
      items: [
        {
          item_id: '',
          quantity: 0,
        },
      ],
    });
    const currentRequestId = ref(null);
    const requestItems = ref([
      {
        item_id: '',
        quantity: 0,
      },
    ]);
    const orders = ref([]); // Initialize orders as an empty array
    const inventoryList = ref([]);
    let dataTableInstance = null;

    const addItem = () => {
      currentInventory.value.items.push({
        item_id: '',
        quantity: 0,
      });
    };

    const addRequestItem = () => {
      requestItems.value.push({
        item_id: '',
        quantity: 0,
      });
    };

    const removeRequestItem = (index) => {
      if (requestItems.value.length > 1) {
        requestItems.value.splice(index, 1);
      }
    };

    const removeItem = (index) => {
      if (currentInventory.value.items.length > 1) {
        currentInventory.value.items.splice(index, 1);
      }
    };

    const loadInventories = async () => {
      try {
        const responseOrder = await getAllOrders();
        orders.value = responseOrder.data;
        const response = await getAllData();
        inventories.value = response.data.data;

        initializeDataTable();
      } catch (error) {
        console.error('Error loading inventories:', error);
      }
    };

    const loadOrders = async () => {
      try {
        const response = await getAllOrders();
        orders.value = response.data;
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };

    const loadInventoryList = async () => {
      try {
        const response = await getAllInventory();
        inventoryList.value = response.data.data_inventory;
      } catch (error) {
        console.error('Error loading inventory list:', error);
      }
    };

    const addDataTransfer = () => {
      // Reset currentInventory
      currentInventory.value = {
        status: '',
        order_id_from: '',
        order_id_to: '',
        note: '',
        items: [
          {
            item_id: '',
            quantity: 0,
          },
        ],
      };
      // Open modal
      const modal = new bootstrap.Modal(document.getElementById('inventoryModal'));
      modal.show();
    };

    const getDayBefore = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      date.setDate(date.getDate() - 1); // Mengurangi satu hari dari tanggal yang ada
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[date.getUTCDay()];
      return ` ${date.toISOString().split('T')[0]}`;
    };

    const getDayAfter = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1); // Menambah satu hari dari tanggal yang ada
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[date.getUTCDay()];
      return ` ${date.toISOString().split('T')[0]}`;
    };

    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById('datatablesSimple');
      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: [
            'No',
            'Asal',
            'Lokasi Asal',
            'Tujuan',
            'Lokasi Tujuan',
            'Tanggal Pengiriman Barang',
            'Status',
            'Aksi',
          ],
          data: inventories.value.map((inventory, index) => [
            index + 1,
            inventory.order_from?.order_name || 'Dari Gudang',
            inventory.order_from?.location || (inventory.order_from ? 'Belum Ditentukan' : 'Gudang'),
            inventory.order_to?.order_name || 'Ke Gudang',
            inventory.order_to?.location || (inventory.order_to ? 'Belum Ditentukan' : 'Gudang'),
            inventory.status === 'to warehouse'
              ? getDayAfter(inventory.order_to?.event_date || inventory.order_from?.event_date)
              : getDayBefore(inventory.order_to?.event_date || inventory.order_from?.event_date),
            inventory.status,
            `<button class="btn btn-info btn-sm detail-btn" data-id="${inventory.uuid}">Detail</button>
             <button class="btn btn-secondary btn-sm request-btn" data-id="${inventory.order_id_to}">Request</button>
             <button class="btn btn-danger btn-sm delete-btn" data-id="${inventory.uuid}">Delete</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll('.detail-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const uuid = button.getAttribute('data-id');
          router.push({ name: 'DetailTransferInventory', params: { uuid } });
        });
      });

      tableElement.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          deleteInventoryHandler(id);
        });
      });

      tableElement.querySelectorAll('.request-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          currentRequestId.value = id;
          openRequestModal(id);
        });
      });
    };

    const openRequestModal = (id) => {
      requestItems.value = [
        {
          item_id: '',
          quantity: 0,
        },
      ];
      const modal = new bootstrap.Modal(document.getElementById('requestModal'));
      modal.show();
    };

    const handleRequest = async () => {
      try {
        const requestData = {
          items: requestItems.value,
        };
        await requestTransfer(currentRequestId.value, requestData);
        Swal.fire('Requested!', 'Inventory transfer request has been sent.', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('requestModal'));
        modal.hide();
      } catch (error) {
        console.error('Error requesting inventory transfer:', error);
        Swal.fire('Failed!', 'There was an error requesting the inventory transfer.', 'error');
      }
    };

    const createInventoryHandler = async (inventoryData) => {
      try {
        const formattedData = {
          status: inventoryData.status,
          order_id_from: inventoryData.order_id_from?.uuid || '',
          order_id_to: inventoryData.order_id_to?.uuid || '',
          note: inventoryData.note,
          items: inventoryData.items.map((item) => ({
            item_id: item.item_id,
            quantity: item.quantity,
          })),
        };

        await createTransfer(formattedData);
        await loadInventories();
        Swal.fire('Added!', 'Inventory has been added successfully.', 'success');

        // Close modal
        const modalElement = document.getElementById('inventoryModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      } catch (error) {
        console.error('Error creating inventory:', error);
        Swal.fire('Failed!', 'There was an error adding the inventory.', 'error');
      }
    };

    const updateInventoryHandler = async () => {
      try {
        await updateTransfer(currentInventory.value.uuid, currentInventory.value);
        await loadInventories();
        Swal.fire('Updated!', 'Inventory has been updated successfully.', 'success');
      } catch (error) {
        Swal.fire('Failed!', 'There was an error updating the inventory.', 'error');
      }
    };

    const deleteInventoryHandler = async (uuid) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this inventory?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await deleteTransfer(uuid);
          await loadInventories();
          Swal.fire('Deleted!', 'Inventory has been deleted successfully.', 'success');
        } catch (error) {
          Swal.fire('Failed!', 'There was an error deleting the inventory.', 'error');
        }
      }
    };

    onMounted(() => {
      loadInventories();
      loadOrders();
      loadInventoryList();
    });

    return {
      addDataTransfer,
      orders,
      addItem,
      removeItem,
      inventories,
      currentInventory,
      createInventoryHandler,
      updateInventoryHandler,
      deleteInventoryHandler,
      inventoryList,
      requestItems,
      addRequestItem,
      removeRequestItem,
      handleRequest,
    };
  },
};
