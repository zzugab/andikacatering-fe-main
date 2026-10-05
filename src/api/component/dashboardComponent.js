// dashboardComponent.js
import { ref,  onMounted} from 'vue';
import { getDashboardSuperAdmin, getDashboardAdmin, getDataUser } from '../services/dashboardService';
import Swal from 'sweetalert2';

export default {
    setup() {
        const dashboardData = ref({ });
        const userData = ref('');
        const filters = ref({
            event_date_start: '',
            event_date_end: ''
        });
        
        const loadDashboardData = async () => {
            try {
                const userResponse = await getDataUser();
                
                userData.value = userResponse.data.role.name;
                const dataResponse = userData.value === 'Superadmin'
                                     ? await getDashboardSuperAdmin(filters)
                                     : await getDashboardAdmin(filters);
                dashboardData.value = dataResponse.data;
                
            } catch (error) {
                console.error("Error loading dashboard data:", error);
                Swal.fire('Error!', 'Failed to load dashboard data.', 'error');
            }
        };

        const applyFilters = () => {
            loadDashboardData();
        };

        onMounted(() => {
            loadDashboardData();
          });

        return {
            dashboardData,
            filters,
            applyFilters
        };
    }
};
