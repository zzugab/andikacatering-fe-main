import { ref, onMounted, computed } from 'vue';
import {
  getAllData
} from '../services/landingService'; // Adjust the path as needed

export default {
    setup() {
      const landingData = ref([]);
  
      const loadLandingData = async () => {
        try {
          const response = await getAllData();
          landingData.value = response.data.data;
        } catch (error) {
          console.error('Error loading activities:', error);
        }
      };

      const groupedTestimonials = computed(() => {
        const result = [];
        const items = landingData.value.testimoni || [];
        for (let i = 0; i < items.length; i += 3) {
          result.push(items.slice(i, i + 3));  // Membagi array menjadi sub-array dengan tiga item
        }
        return result;
      });
  
      onMounted(() => {
        loadLandingData();
      });
  
      return {
        groupedTestimonials,
        landingData,
        loadLandingData,
      };
    },
  };
  