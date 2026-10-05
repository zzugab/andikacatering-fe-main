import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { DataTable } from 'simple-datatables';
import { getTransferById, updateTransfer } from '../services/inventoryDataTransferService'; // Adjust the path as needed
import { getAllInventory } from '../services/inventoryDataService';

export default {
  setup() {
    const route = useRoute();
    const transferId = route.params.uuid; // Mendapatkan transferId dari parameter URL
    const currentInventory = ref({
      status: '',
      order_id_from: '',
      order_id_to: '',
      note: '',
      transfer_items: [
        {
          item_id: '',
          quantity: 0,
        },
      ],
    });
    const inventoryList = ref([]);
    let dataTableInstance = null;

    const loadInventoryDetail = async () => {
      try {
        const response = await getTransferById(transferId);
        currentInventory.value = response.data.data;
        initializeDataTable();
      } catch (error) {
        console.error(`Error fetching inventory by id ${transferId}:`, error);
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

    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById('transferDetailsTable');
      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: ['Status', 'Order ID From', 'Order ID To', 'Note'],
          data: [
            [
              currentInventory.value.status,
              currentInventory.value.order_id_from || 'None',
              currentInventory.value.order_id_to || 'None',
              currentInventory.value.note,
            ],
          ],
        },
      });
    };

    const submitHandler = async () => {
      try {
        const formattedData = {
          status: currentInventory.value.status,
          order_id_from: currentInventory.value.order_id_from,
          order_id_to: currentInventory.value.order_id_to,
          note: currentInventory.value.note,
          items: currentInventory.value.transfer_items.map((item) => ({
            item_id: item.item_id,
            quantity: item.quantity,
          })),
        };

        await updateTransfer(currentInventory.value.uuid, formattedData);
        Swal.fire('Updated!', 'Inventory has been updated successfully.', 'success');
      } catch (error) {
        Swal.fire('Failed!', 'There was an error updating the inventory.', 'error');
      }
    };

    const addItem = () => {
      currentInventory.value.transfer_items.push({
        item_id: '',
        quantity: 0,
      });
    };

    const removeItem = (index) => {
      if (currentInventory.value.transfer_items.length > 1) {
        currentInventory.value.transfer_items.splice(index, 1);
      }
    };

    onMounted(() => {
      loadInventoryDetail();
      loadInventoryList();
    });

    return {
      currentInventory,
      inventoryList,
      submitHandler,
      addItem,
      removeItem,
    };
  },
};
