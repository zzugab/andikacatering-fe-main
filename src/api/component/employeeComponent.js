// src/components/activityComponent.js
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import router from '../../router/index';

import {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  getRoles,
  employeeById,
  updatePassword,
  updateRole,
  accountActivation,
  accountSuspend,
} from '../services/employeeService';
import { DataTable } from 'simple-datatables';

export default {
  setup() {
    const employees = ref([]);
    const roles = ref([]);
    const currentEmployee = ref({
      name: '',
      username: '',
      email: '',
      password: '',
      role: '',
      phone_number: '',
    });
    const currentPassword = ref('');

    let dataTableInstanceEmployee = null;
    const addModalInstance = ref(null);
    const editModalInstance = ref(null);
    const passwordModalInstance = ref(null);

    const openAddModal = () => {
      currentEmployee.value = {
        name: '',
        username: '',
        email: '',
        password: '',
        role: '',
        phone_number: '',
      };
      addModalInstance.value.show();
    };

    const openEditModal = (employee) => {
      currentEmployee.value = { ...employee };
      editModalInstance.value.show();
    };

    const hideAddModal = () => {
      if (addModalInstance.value) {
        addModalInstance.value.hide();
      } else {
        console.error('Add modal instance not found');
      }
    };

    const hideEditModal = () => {
      if (editModalInstance.value) {
        editModalInstance.value.hide();
      } else {
        console.error('Edit modal instance not found');
      }
    };

    const hidePasswordModal = () => {
      if (passwordModalInstance.value) {
        passwordModalInstance.value.hide();
      } else {
        console.error('Password modal instance not found');
      }
    };

    const loadEmployees = async () => {
      try {
        const response = await getAllEmployee();
        employees.value = response;
        initializeDataTableEmployee();
      } catch (error) {
        console.error('Error loading employees:', error);
      }
    };

    const loadRoles = async () => {
      try {
        const response = await getRoles();
        roles.value = response.data;
      } catch (error) {
        console.error('Error loading roles:', error);
      }
    };

    const initializeDataTableEmployee = () => {
      if (dataTableInstanceEmployee) {
        dataTableInstanceEmployee.destroy();
      }

      const tableElement = document.getElementById('datatablesSimple');
      dataTableInstanceEmployee = new DataTable(tableElement, {
        data: {
          headings: ['No', 'Name', 'Username', 'Email', 'Role', 'Phone Number', 'Actions'],
          data: employees.value.data.map((employee, index) => [
            index + 1,
            employee.name,
            employee.username,
            employee.email,
            employee.role.name,
            employee.phone_number,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${employee.uuid}">Edit</button>
            <button class="btn btn-primary btn-sm password-btn" data-id="${employee.uuid}">Change Password</button>
            ${
              employee.is_active
                ? `<button class="btn btn-danger btn-sm suspend-btn" data-id="${employee.uuid}">Suspend</button>`
                : `<button class="btn btn-success btn-sm activate-btn" data-id="${employee.uuid}">Activate</button>`
            }`,
          ]),
        },
      });

      tableElement.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const employeeId = button.getAttribute('data-id');
          const employee = employees.value.data.find((e) => e.uuid === employeeId);
          openEditModal(employee);
        });
      });

      tableElement.querySelectorAll('.password-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const employeeId = button.getAttribute('data-id');
          openPasswordModal(employeeId);
        });
      });

      tableElement.querySelectorAll('.suspend-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const employeeId = button.getAttribute('data-id');
          suspendAccountHandler(employeeId);
        });
      });

      tableElement.querySelectorAll('.activate-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const employeeId = button.getAttribute('data-id');
          activateAccountHandler(employeeId);
        });
      });
    };

    const createEmployeeHandler = async (employeeData) => {
      try {
        await createEmployee(employeeData);
        await loadEmployees();
        hideAddModal();
        Swal.fire('Added!', 'The employee has been added successfully.', 'success');
      } catch (error) {
        console.error('Error creating employee:', error);
        Swal.fire('Failed!', 'There was an error adding the employee.', 'error');
      }
    };

    const updateEmployeeHandler = async (id, employeeData) => {
      console.log('🚀 ~ updateEmployeeHandler ~ employeeData:', employeeData);
      try {
        await updateEmployee(id, employeeData);
        await loadEmployees();
        hideEditModal();
        Swal.fire('Updated!', 'The employee has been updated successfully.', 'success');
      } catch (error) {
        console.error(`Error updating employee with ID ${id}:`, error);
        Swal.fire('Failed!', 'There was an error updating the employee.', 'error');
      }
    };

    const openPasswordModal = (employeeId) => {
      currentEmployee.value.uuid = employeeId;
      currentPassword.value = '';
      passwordModalInstance.value.show();
    };

    const updatePasswordHandler = async () => {
      try {
        await updatePassword(currentEmployee.value.uuid, { new_password: currentPassword.value });
        hidePasswordModal();
        Swal.fire('Updated!', 'The password has been updated successfully.', 'success');
      } catch (error) {
        console.error(`Error updating password for employee with ID ${currentEmployee.value.uuid}:`, error);
        Swal.fire('Failed!', 'There was an error updating the password.', 'error');
      }
    };

    const updateRoleHandler = async (id, roleId) => {
      try {
        await updateRole(id, roleId);
        await loadEmployees();
        Swal.fire('Updated!', 'The role has been updated successfully.', 'success');
      } catch (error) {
        console.error(`Error updating role for employee with ID ${id}:`, error);
        Swal.fire('Failed!', 'There was an error updating the role.', 'error');
      }
    };

    const activateAccountHandler = async (id) => {
      try {
        await accountActivation(id);
        await loadEmployees();
        Swal.fire('Activated!', 'The account has been activated successfully.', 'success');
      } catch (error) {
        console.error(`Error activating account for employee with ID ${id}:`, error);
        Swal.fire('Failed!', 'There was an error activating the account.', 'error');
      }
    };

    const suspendAccountHandler = async (id) => {
      try {
        await accountSuspend(id);
        await loadEmployees();
        Swal.fire('Suspended!', 'The account has been suspended successfully.', 'success');
      } catch (error) {
        console.error(`Error suspending account for employee with ID ${id}:`, error);
        Swal.fire('Failed!', 'There was an error suspending the account.', 'error');
      }
    };

    onMounted(() => {
      addModalInstance.value = new bootstrap.Modal(document.getElementById('addEmployeeModal'), {});
      editModalInstance.value = new bootstrap.Modal(document.getElementById('editEmployeeModal'), {});
      passwordModalInstance.value = new bootstrap.Modal(document.getElementById('passwordModal'), {});
      loadEmployees();
      loadRoles();
    });

    return {
      employees,
      roles,
      currentEmployee,
      currentPassword,
      openAddModal,
      openEditModal,
      hideAddModal,
      hideEditModal,
      hidePasswordModal,
      createEmployeeHandler,
      updateEmployeeHandler,
      openPasswordModal,
      updatePasswordHandler,
      updateRoleHandler,
      activateAccountHandler,
      suspendAccountHandler,
    };
  },
};
