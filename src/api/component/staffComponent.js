import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

import { getAllStaff, createStaff, staffById, updateStaff, deleteStaff } from '../services/staffService';
import { DataTable } from 'simple-datatables';

export default {
  setup() {
    const staff = ref([]);
    const currentStaff = ref({
      name: '',
      phone_number: '',
    });

    let dataTableInstanceStaff = null;
    const modalInstance = ref(null);

    const openAddModal = () => {
      currentStaff.value = {
        name: '',
        phone_number: '',
      };
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      }
    };

    const loadStaff = async () => {
      try {
        const response = await getAllStaff();
        staff.value = response;
        initializeDataTableStaff();
      } catch (error) {
        console.error('Error loading staff:', error);
      }
    };

    const initializeDataTableStaff = () => {
      if (dataTableInstanceStaff) {
        dataTableInstanceStaff.destroy();
      }

      const tableElement = document.getElementById('datatablesSimple');
      if (!tableElement) {
        console.error('Table element not found');
        return;
      }

      dataTableInstanceStaff = new DataTable(tableElement, {
        data: {
          headings: ['No', 'Name', 'Phone Number', 'Actions'],
          data: staff.value.data.map((staffMember, index) => [
            index + 1,
            staffMember.name,
            staffMember.phone_number,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${staffMember.uuid}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${staffMember.uuid}">Delete</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const staffId = button.getAttribute('data-id');
          const staffMember = staff.value.data.find((s) => s.uuid === staffId);
          editStaff(staffMember);
        });
      });

      tableElement.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const staffId = button.getAttribute('data-id');
          deleteStaffHandler(staffId);
        });
      });
    };

    const createStaffHandler = async (staffData) => {
      try {
        await createStaff(staffData);
        await loadStaff();
        hideModal();
        Swal.fire('Added!', 'The staff member has been added successfully.', 'success');
      } catch (error) {
        console.error('Error creating staff:', error);
        Swal.fire('Failed!', 'There was an error adding the staff member.', 'error');
      }
    };

    const updateStaffHandler = async (id, staffData) => {
      try {
        await updateStaff(id, staffData);
        await loadStaff();
        hideModal();
        Swal.fire('Updated!', 'The staff member has been updated successfully.', 'success');
      } catch (error) {
        console.error(`Error updating staff member with ID ${id}:`, error);
        Swal.fire('Failed!', 'There was an error updating the staff member.', 'error');
      }
    };

    const deleteStaffHandler = async (id) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this staff member!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await deleteStaff(id);
          await loadStaff();
          Swal.fire('Deleted!', 'The staff member has been deleted.', 'success');
        } catch (error) {
          console.error(`Error deleting staff member with ID ${id}:`, error);
          Swal.fire('Failed!', 'There was an error deleting the staff member.', 'error');
        }
      }
    };

    const editStaff = (staffMember) => {
      currentStaff.value = { ...staffMember };
      new bootstrap.Modal(document.getElementById('staffModal')).show();
    };

    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(document.getElementById('staffModal'));
      loadStaff();
    });

    return {
      staff,
      currentStaff,
      openAddModal,
      hideModal,
      createStaffHandler,
      updateStaffHandler,
      deleteStaffHandler,
    };
  },
};
