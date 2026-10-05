import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { DataTable } from 'simple-datatables';
import {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} from '../services/inventoryDataService'; // Adjust the path as needed

export default {
  setup() {
    const inventories = ref([]);
    const quantityRealtime = ref([]);
    const currentInventory = ref({
      name: '',
      quantity: 0,
      status: '',
    });
    const newInventoryItems = ref([
      {
        name: '',
        quantity: 0,
        status: '',
      },
    ]);
    let dataTableInstance = null;
    const addModalInstance = ref(null);
    const editModalInstance = ref(null);

    const loadInventories = async () => {
      try {
        const response = await getAllInventory();
        inventories.value = Array.isArray(response.data.data_inventory) ? response.data.data_inventory : [];
        quantityRealtime.value = Array.isArray(response.data.quantity_realtime) ? response.data.quantity_realtime : [];
        initializeDataTable();
      } catch (error) {
        console.error('Error loading inventories:', error);
      }
    };

    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById('datatablesSimple');
      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: ['Name', 'Quantity Initial', 'Quantity Used', 'Quantity Remaining', 'Actions'],
          data: quantityRealtime.value.map((inventory) => [
            inventory.item_name,
            inventory.quantity_initial,
            inventory.quantity_used,
            inventory.quantity_remaining,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${inventory.uuid}">Edit</button>
             <button class="btn btn-danger btn-sm delete-btn" data-id="${inventory.uuid}">Delete</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          openEditModal(id);
        });
      });

      tableElement.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          deleteInventoryHandler(id);
        });
      });
    };

    const openAddModal = () => {
      newInventoryItems.value = [
        {
          name: '',
          quantity: 0,
          status: '',
        },
      ];
      addModalInstance.value.show();
    };

    const openEditModal = async (uuid) => {
      try {
        const response = await getInventoryById(uuid);
        if (response.data) {
          const inventoryData = response.data;
          currentInventory.value = {
            uuid: inventoryData.uuid,
            name: inventoryData.name,
            quantity: inventoryData.quantity,
            status: inventoryData.status,
          };
          editModalInstance.value.show();
        } else {
          console.error('No data returned for UUID: ', uuid);
        }
      } catch (error) {
        console.error(`Error fetching inventory by id ${uuid}:`, error);
      }
    };

    const addInventoryHandler = async () => {
      try {
        await createInventory({
          items: newInventoryItems.value,
        });
        await loadInventories();
        Swal.fire('Added!', 'Inventory has been added successfully.', 'success');
        addModalInstance.value.hide();
      } catch (error) {
        Swal.fire('Failed!', 'There was an error adding the inventory.', 'error');
      }
    };

    const updateInventoryHandler = async () => {
      try {
        await updateInventory(currentInventory.value.uuid, currentInventory.value);
        await loadInventories();
        Swal.fire('Updated!', 'Inventory has been updated successfully.', 'success');
        editModalInstance.value.hide();
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
          await deleteInventory(uuid);
          await loadInventories();
          Swal.fire('Deleted!', 'Inventory has been deleted successfully.', 'success');
        } catch (error) {
          Swal.fire('Failed!', 'There was an error deleting the inventory.', 'error');
        }
      }
    };

    const addNewInventoryItem = () => {
      newInventoryItems.value.push({
        name: '',
        quantity: 0,
        status: '',
      });
    };

    const removeNewInventoryItem = (index) => {
      if (newInventoryItems.value.length > 1) {
        newInventoryItems.value.splice(index, 1);
      }
    };

    onMounted(() => {
      addModalInstance.value = new bootstrap.Modal(document.getElementById('addInventoryModal'));
      editModalInstance.value = new bootstrap.Modal(document.getElementById('editInventoryModal'));
      loadInventories();
    });

    return {
      inventories,
      quantityRealtime,
      currentInventory,
      newInventoryItems,
      openAddModal,
      openEditModal,
      addInventoryHandler,
      updateInventoryHandler,
      deleteInventoryHandler,
      addNewInventoryItem,
      removeNewInventoryItem,
    };
  },
};
