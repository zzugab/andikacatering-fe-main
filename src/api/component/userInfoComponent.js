import { getUserInfo, updateUserProfile } from '../services/userInfoService';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

export default {
  setup() {
    const user = ref({
      name: '',
      username: '',
      email: '',
      phone_number: '',
      role: { name: '' },
      is_active: true,
    });

    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        user.value = response;
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    const handleUpdateProfile = async () => {
      try {
        await updateUserProfile(user.value);
        Swal.fire('Updated!', 'User profile has been updated successfully.', 'success');
      } catch (error) {
        console.error('Failed to update user profile:', error);
        Swal.fire('Failed!', 'There was an error updating the user profile.', 'error');
      }
    };

    onMounted(() => {
      fetchUserInfo();
    });

    return {
      user,
      handleUpdateProfile,
    };
  },
};
