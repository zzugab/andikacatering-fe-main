import { ref, onMounted } from 'vue';
import { getAllActivities } from '../services/activityService';
import { DataTable } from 'simple-datatables';

export default {
  setup() {
    const activities = ref([]);
    let dataTableInstanceActivity = null;

    const loadActivities = async () => {
      try {
        const response = await getAllActivities();
        activities.value = response;
        initializeDataTableActivity();
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const initializeDataTableActivity = () => {
      if (dataTableInstanceActivity) {
        dataTableInstanceActivity.destroy();
      }

      const tableElement = document.getElementById('datatablesActivities');
      dataTableInstanceActivity = new DataTable(tableElement, {
        data: {
          headings: ['No', 'Activity Name', 'Description', 'Date'],
          data: activities.value.data.map((activity, index) => [
            index + 1,
            activity.user.name,
            activity.description,
            formatDate(activity.created_at),
          ]),
        },
      });
    };

    onMounted(() => {
      loadActivities();
    });

    return {
      activities,
      loadActivities,
    };
  },
};
