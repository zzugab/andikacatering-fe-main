import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import router from '../../router/index';
import { getOrderById, updateOrder, updateOrderPayment } from '../services/orderService';
import { event } from 'jquery';
import { getStatusDescription } from '../helpers/orderStatus';
import { convertDate } from '../helpers/formatDate';
import { formatNominalRupiah } from '../helpers/formatRupiah';

export default {
  setup() {
    const route = useRoute();
    const currentOrder = ref({});
    const currentDetail = ref({});
    const currentPayment = ref({});
    const infoOrder = ref({});


    const modalInstance = ref(null);
    const tempOrderData = ref({});

    const openOrderDetailModal = () => {
      tempOrderData.value = { ...infoOrder.value };

      modalInstance.value.show();
    };

    const saveOrderDetails = () => {
      currentOrder.value = { ...tempOrderData.value };
      modalInstance.value.hide();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      } else {
        console.error('Modal instance not found');
      }
    };

    const loadOrder = async () => {
      try {
        const orderId = route.params.uuid;
        const response = await getOrderById(orderId);
        
        currentOrder.value = response.data;
        
        currentDetail.value = response.data.detail;

        currentPayment.value = response.data.payment;
 
        infoOrder.value = {
          order_name : currentOrder.value?.order_name || null,
          uuid : currentOrder.value?.uuid,
          customer_id: currentOrder.value?.customer_id || null,
          location: currentOrder.value?.location || null,
          event_date: currentOrder.value?.event_date || null,
          event_time: currentOrder.value?.event_time || null,
          portion: currentOrder.value?.portion || null,
          note: currentOrder.value?.note || null,
          status: currentOrder.value?.status || null,
          akad_start: currentOrder.value?.detail?.akad_start || null,
          akad_end: currentOrder.value?.detail?.akad_end || null,
          resepsi_start: currentOrder.value?.detail?.resepsi_start || null,
          resepsi_end: currentOrder.value?.detail?.resepsi_end || null,
          nuance: currentOrder.value?.detail?.nuance || null,
          general_buffet: currentOrder.value?.detail?.general_buffet || null,
          vip_buffet: currentOrder.value?.detail?.vip_buffet || null,
          vip_table: currentOrder.value?.detail?.vip_table || null,
          wedding_food_table: currentOrder.value?.detail?.wedding_food_table || null,
          akad_table: currentOrder.value?.detail?.akad_table || null,
          reception_table: currentOrder.value?.detail?.reception_table || null,
          for_naib: currentOrder.value?.detail?.for_naib || null,
          ayam_bekakak_nasi_punar: currentOrder.value?.detail?.ayam_bekakak_nasi_punar || null,
          mica_for_besan: currentOrder.value?.detail?.mica_for_besan || null
        };

        console.log(infoOrder.value);
        


        if (currentOrder.value.status) {
          currentOrder.value.status = getStatusDescription(currentOrder.value.status);
        }
        if(currentOrder.value.event_date){
          currentOrder.value.event_date = convertDate(currentOrder.value.event_date);
        }
        if(currentPayment.value.amount){
          currentPayment.value.amount = formatNominalRupiah(currentPayment.value.amount);
        }

      } catch (error) {
        console.error('Error loading order:', error);
      }
    };

    function terjemahkanStatusOrder(status) {
      const mapping = {
        'booking': 'Pemesanan',
        'confirmed': 'Dikonfirmasi',
        'preparing': 'Sedang Dipersiapkan',
        'ready_for_delivery': 'Siap Dikirim',
        'delivered': 'Telah Dikirim',
        'event_in_progress': 'Acara Sedang Berlangsung',
        'event_completed': 'Acara Selesai',
        'event_finish': 'Acara Berakhir',
        'refund': 'Pengembalian Dana',
        'not finished': 'Belum Selesai',   // kalau masih dipakai
        'completed': 'Selesai',            // kalau masih dipakai
        'cancelled': 'Dibatalkan'          // kalau masih dipakai
      };
    
      return mapping[status] || '-';
    }
    

    function terjemahkanStatus(status) {
      const mapping = {
        'not finished': 'Belum Selesai',
        'completed': 'Selesai',
        'refund': 'Dikembalikan',
        'cancelled': 'Dibatalkan'
      };
    
      return mapping[status] || '-';
    }
    
    const updateOrderDetail = async ( infoOrder) => {
      // Helper untuk rapikan nilai
      const toDate = (v) => {
        if (!v) return null;
        // support "2024-11-10T00:00:00Z" atau "2024-11-10"
        const s = String(v);
        return s.includes('T') ? s.split('T')[0] : s;
      };
    
      const toTime = (v) => {
        if (!v) return null;
        // support "19:00:00" atau "19:00"
        const s = String(v);
        return s.length >= 5 ? s.slice(0, 5) : s;
      };
    
      const toNullIfEmpty = (v) => (v === '' || v === undefined ? null : v);
    
      try {
        // Susun payload order sesuai struktur baru (flat)
        const orderPayload = {
          customer_id: infoOrder.customer_id,              // wajib sesuai input kamu
          location: infoOrder.location,
          event_date: toDate(infoOrder.event_date),
          event_time: toTime(infoOrder.event_time),
          portion: toNullIfEmpty(infoOrder.portion),
          note: toNullIfEmpty(infoOrder.note),
          status: infoOrder.status,
    
          akad_start: toTime(infoOrder.akad_start),
          akad_end: toTime(infoOrder.akad_end),
          resepsi_start: toTime(infoOrder.resepsi_start),
          resepsi_end: toTime(infoOrder.resepsi_end),
    
          nuance: toNullIfEmpty(infoOrder.nuance),
          general_buffet: toNullIfEmpty(infoOrder.general_buffet),
          vip_buffet: toNullIfEmpty(infoOrder.vip_buffet),
          vip_table: toNullIfEmpty(infoOrder.vip_table),
          wedding_food_table: toNullIfEmpty(infoOrder.wedding_food_table),
          akad_table: toNullIfEmpty(infoOrder.akad_table),
          reception_table: toNullIfEmpty(infoOrder.reception_table),
          for_naib: toNullIfEmpty(infoOrder.for_naib),
          ayam_bekakak_nasi_punar: toNullIfEmpty(infoOrder.ayam_bekakak_nasi_punar), // "Ya"/"Tidak" sesuai add form
          mica_for_besan: toNullIfEmpty(infoOrder.mica_for_besan),                    // "Ya"/"Tidak"
        };
    
        console.log('orderPayload :', orderPayload, "uuid : ",infoOrder.uuid);
        // Lakukan update (uncomment jika API siap)
        await updateOrder(infoOrder.uuid, orderPayload);
        hideModal();
        Swal.fire('Success', 'Order updated successfully', 'success');
      } catch (error) {
        console.error('Error updating order:', error);
        Swal.fire('Error', 'Gagal mengupdate order', 'error');
      }
    };
    

    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(document.getElementById('openOrderDetailModal'), {});
      loadOrder();
    });

    return {
      infoOrder,
      terjemahkanStatusOrder,
      terjemahkanStatus,
      currentOrder,
      currentDetail,
      openOrderDetailModal,
      saveOrderDetails,
      hideModal,
      updateOrderDetail,
      currentPayment,
    };
  },
};
