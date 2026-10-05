import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { DataTable } from "simple-datatables";
import router from "../../router/index";
import { useRoute } from "vue-router";

import {
  getAllEvent,
  getAllInventory,
  getAllData,
  createItem,
  updateItem,
  deleteItem,
  getInventoryEventPrint,
} from "../services/inventoryDataEventService"; // Adjust the path as needed

export default {
  setup() {
    const route = useRoute();
    const events = ref([]);
    const items = ref([]);
    const inventories = ref([]); // Store all inventory data
    const currentEventUuid = ref(null);
    const currentItem = ref({ name: "", quantity: 0, status: "" });
    const newItems = ref([{ item_id: "", quantity: 0 }]);
    const currentItems = ref([]);
    const addModalInstance = ref(null);
    const editModalInstance = ref(null);
    let dataTableInstanceEvent = null;
    let dataTableInstanceItem = null;

    const loadEvents = async () => {
      try {
        const response = await getAllEvent();
        events.value = response.data.data;
        initializeDataTableEvent();
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    const loadInventories = async () => {
      try {
        const response = await getAllInventory();
        inventories.value = response.data.data_inventory;
      } catch (error) {
        console.error("Error loading inventories:", error);
      }
    };

    const initializeDataTableEvent = () => {
      if (dataTableInstanceEvent) {
        dataTableInstanceEvent.destroy();
      }

      const tableElement = document.getElementById("datatablesSimpleEvent");
      if (!tableElement) return;

      dataTableInstanceEvent = new DataTable(tableElement, {
        data: {
          headings: ["Event Name", "Customer Name", "Action"],
          data: events.value.map((event) => [
            event.order_name,
            event.customer.name,
            `<button class="btn btn-primary btn-sm detail-btn" data-id="${event.uuid}">Detail Data Barang</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll(".detail-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const uuid = button.getAttribute("data-id");
          openEventDetail(uuid);
        });
      });
    };

    const openEventDetail = async (uuid) => {
      currentEventUuid.value = uuid;
      await router.push({
        name: "InventoryEvent",
        params: { uuid: currentEventUuid.value },
      });
    };

    const loadItems = async () => {
      try {
        const uuid_item = route.params.uuid;
        const response = await getAllData(uuid_item);
        items.value = response.data.data;
        initializeDataTableItem();
      } catch (error) {
        console.error(`Error loading items for event `, error);
      }
    };

    const initializeDataTableItem = () => {
      if (dataTableInstanceItem) {
        dataTableInstanceItem.destroy();
      }

      const tableElement = document.getElementById("datatablesSimpleItem");
      if (!tableElement) return;

      dataTableInstanceItem = new DataTable(tableElement, {
        data: {
          headings: [
            "Nama Barang",
            "Jumlah Total Barang",
            "Jumlah Barang Tidak Kembali",
            "Jumlah Barang di Client",
            "Total Sisa Barang",
            "Actions",
          ],
          data: items.value.map((item) => [
            item.inventory.name,
            item.quantity,
            item.items_not_returned,
            item.in_client_hands,
            parseInt(item.quantity, 10) -
              (parseInt(item.items_not_returned, 10) +
                parseInt(item.in_client_hands, 10)),
            `<button class="btn btn-danger btn-sm delete-btn" data-id="${item.uuid}">Delete</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const uuid = button.getAttribute("data-id");
          deleteItemHandler(uuid);
        });
      });
    };

    const openAddModal = () => {
      newItems.value = [{ item_id: "", quantity: 0 }];
      const modalElement = document.getElementById("addItemModal");
      if (modalElement) {
        addModalInstance.value = new bootstrap.Modal(modalElement);
        addModalInstance.value.show();
      }
    };

    const openEditModal = async () => {
      const modalElement = document.getElementById("editItemModal");
      if (modalElement) {
        editModalInstance.value = new bootstrap.Modal(modalElement);
        editModalInstance.value.show();
      }
    };

    const addNewItem = () => {
      newItems.value.push({ item_id: "", quantity: 0 });
    };

    const removeNewItem = (index) => {
      if (newItems.value.length > 1) {
        newItems.value.splice(index, 1);
      }
    };

    const addItemHandler = async () => {
      try {
        const eventUuid = route.params.uuid;
        const dataInput = { items: newItems.value };

        console.log("🚀 ~ addItemHandler ~ dataInput:", dataInput);
        await createItem(eventUuid, dataInput);
        await loadItems(currentEventUuid.value);
        Swal.fire("Added!", "Item has been added successfully.", "success");
        addModalInstance.value.hide();
      } catch (error) {
        Swal.fire("Failed!", "There was an error adding the item.", "error");
      }
    };

    const updateItemHandler = async () => {
      try {
        const eventUuid = route.params.uuid;
        const dataInput = {
          items: items.value.map((item) => ({
            item_id: item.item_id,
            quantity: item.quantity,
            uuid: item.uuid,
          })),
        };
        await updateItem(eventUuid, dataInput);
        await loadItems(currentEventUuid.value);
        Swal.fire("Updated!", "Item has been updated successfully.", "success");
        editModalInstance.value.hide();
      } catch (error) {
        Swal.fire("Failed!", "There was an error updating the item.", "error");
      }
    };

    const deleteItemHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deleteItem(uuid);
          await loadItems(currentEventUuid.value);
          Swal.fire(
            "Deleted!",
            "Item has been deleted successfully.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Failed!",
            "There was an error deleting the item.",
            "error"
          );
        }
      }
    };

    const printInventoryEvent = async () => {
      try {
        const orderId = route.params.uuid;
        const response = getInventoryEventPrint(orderId);

        if (response.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan saat memproses data.",
          });
        }
        // window.open(printUrl, "_blank"); // Buka di tab baru
      } catch (error) {
        console.error("Error printing purchase plan:", error);
      }
    };

    onMounted(() => {
      const modalElement = document.getElementById("itemComponentPage");
      if (modalElement) {
        addModalInstance.value = new bootstrap.Modal(
          document.getElementById("addItemModal")
        );
        editModalInstance.value = new bootstrap.Modal(
          document.getElementById("editItemModal")
        );
        loadItems();
        loadInventories(); // Load inventories when component is mounted
      } else {
        loadEvents();
      }
    });

    return {
      printInventoryEvent,
      events,
      items,
      inventories, // Return inventories to be used in the component
      currentItem,
      newItems,
      currentItems,
      openAddModal,
      addNewItem,
      removeNewItem,
      addItemHandler,
      updateItemHandler,
      deleteItemHandler,
      openEditModal,
    };
  },
};
