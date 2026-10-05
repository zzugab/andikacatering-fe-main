import { ref, onMounted, watch } from 'vue';
import Swal from 'sweetalert2';
import {
    getAllMeetingSchedules,
    createMeetingSchedule,
    updateMeetingSchedule,
    deleteMeetingSchedule
} from '../services/meetingScheduleService'; // Adjust this path as needed
import { DataTable } from 'simple-datatables';

export default {
    setup() {
        const meetingSchedules = ref([]);
        const currentSchedule = ref({
            title: '',
            date: '',
            start_time: '',
            end_time: '',
            location: '',
            note: ''
        });
        const error = ref(false);
        const errorMessage = ref('');
        const filters = ref({
            title: '',
            event_date_start: '',
            status: '',
            location: ''
        }); // Initialize filters
        let dataTableInstance = null;
        const modalInstance = ref(null);

        watch(currentSchedule.value, (newValue) => {
            if (newValue.end_time && newValue.start_time && newValue.end_time < newValue.start_time) {
                error.value = true;
                errorMessage.value = 'Waktu Selesai tidak boleh lebih awal dari Waktu Mulai.';
                currentSchedule.value.end_time = '';
            } else {
                error.value = false;
                errorMessage.value = '';
            }
        }, { deep: true });

        const openAddModal = () => {
            currentSchedule.value = {
                title: '',
                date: '',
                start_time: '',
                end_time: '',
                location: '',
                note: ''
            };
            modalInstance.value.show();
        };

        const hideModal = () => {
            if (modalInstance.value) {
                modalInstance.value.hide();
            } else {
                console.error("Modal instance not found");
            }
        };

        const loadMeetingSchedules = async (filterParams = {}) => {
            try {
                const response = await getAllMeetingSchedules(filterParams);
                meetingSchedules.value = response.data;
                initializeDataTable(); // Initialize DataTable after loading data
            } catch (error) {
                console.error("Error loading meeting schedules:", error);
            }
        };

        const applyFilters = () => {
            loadMeetingSchedules({
                title: filters.value.title,
                event_date_start: filters.value.event_date_start,
                status: filters.value.status,
                location: filters.value.location
            });
        };

        const clearFilters = () => {
            filters.value = {
                title: '',
                event_date_start: '',
                status: '',
                location: ''
            };
            loadMeetingSchedules(); // Reload schedules without filters
        };

        const initializeDataTable = () => {
            if (dataTableInstance) {
                dataTableInstance.destroy(); // Destroy the previous instance if exists
            }

            const tableElement = document.getElementById('datatablesSimple');
            dataTableInstance = new DataTable(tableElement, {
                data: {
                    headings: ["No", "Perihal", "Jadwal", "Waktu Mulai", "Waktu Selesai", "Lokasi", "Actions"],
                    data: meetingSchedules.value.map((schedule, index) => [
                        index + 1,
                        schedule.title,
                        schedule.date,
                        schedule.start_time,
                        schedule.end_time,
                        schedule.location,
                        `<button class="btn btn-warning btn-sm edit-btn my-1" data-id="${schedule.uuid}">Edit</button>
                         <button class="btn btn-danger btn-sm delete-btn" data-id="${schedule.uuid}">Delete</button>`
                    ])
                }
            });

            // Event listeners for Edit and Delete buttons
            tableElement.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const scheduleId = button.getAttribute('data-id');
                    const schedule = meetingSchedules.value.find(s => s.uuid === scheduleId);
                    editSchedule(schedule);
                });
            });

            tableElement.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const scheduleId = button.getAttribute('data-id');
                    deleteMeetingScheduleHandler(scheduleId);
                });
            });
        };

        const editSchedule = (schedule) => {
            currentSchedule.value = { ...schedule };
            modalInstance.value.show(); // Use the existing modal instance for editing
        };

        const createMeetingScheduleHandler = async (scheduleData) => {
            try {
                await createMeetingSchedule(scheduleData);
                await loadMeetingSchedules();
                hideModal();
                Swal.fire(
                    'Added!',
                    'The meeting schedule has been added successfully.',
                    'success'
                );
            } catch (error) {
                console.error("Error creating meeting schedule:", error);
                Swal.fire(
                    'Failed!',
                    'There was an error adding the meeting schedule.',
                    'error'
                );
            }
        };

        const updateMeetingScheduleHandler = async (uuid, scheduleData) => {
            try {
                await updateMeetingSchedule(uuid, scheduleData);
                await loadMeetingSchedules();
                hideModal();
                Swal.fire(
                    'Updated!',
                    'The meeting schedule has been updated successfully.',
                    'success'
                );
            } catch (error) {
                console.error(`Error updating meeting schedule with uuid ${uuid}:`, error);
                Swal.fire(
                    'Failed!',
                    'There was an error updating the meeting schedule.',
                    'error'
                );
            }
        };

        const deleteMeetingScheduleHandler = async (uuid) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You will not be able to recover this meeting schedule!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                try {
                    await deleteMeetingSchedule(uuid);
                    await loadMeetingSchedules();
                    Swal.fire(
                        'Deleted!',
                        'The meeting schedule has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error(`Error deleting meeting schedule with uuid ${uuid}:`, error);
                    Swal.fire(
                        'Failed!',
                        'There was an error deleting the meeting schedule.',
                        'error'
                    );
                }
            } 
        };
        const validateTime = () => {
            const submitButton = document.querySelector('button[type="submit"]');
            if (currentSchedule.value.start_time && currentSchedule.value.end_time) {
                if (currentSchedule.value.end_time < currentSchedule.value.start_time) {
                    error.value = true;
                    errorMessage.value = 'Waktu Selesai tidak boleh lebih awal dari Waktu Mulai.';

                    // Nonaktifkan tombol submit
                    if (submitButton) {
                        submitButton.disabled = true;
                    }
                } else {
                    error.value = false;
                    errorMessage.value = '';
                    if (submitButton) {
                        submitButton.disabled = false;
                      }
                }
            }
        };

        

        onMounted(() => {
            modalInstance.value = new bootstrap.Modal(document.getElementById('scheduleModal'), {});
            loadMeetingSchedules(); // Load meeting schedules when the component is mounted
        });

        return {
            validateTime,
            meetingSchedules,
            currentSchedule,
            filters,
            openAddModal,
            hideModal,
            createMeetingScheduleHandler,
            updateMeetingScheduleHandler,
            deleteMeetingScheduleHandler,
            editSchedule,
            applyFilters,
            clearFilters,
            error,
            errorMessage
        };
    }
};
