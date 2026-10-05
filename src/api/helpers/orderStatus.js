export const getStatusDescription = (value) => {
    const statusDescriptions = {
      booking: 'Pemesanan',
      confirmed: 'Dikonfirmasi',
      preparing: 'Sedang Dipersiapkan',
      ready_for_delivery: 'Siap Dikirim',
      delivered: 'Telah Dikirim',
      event_in_progress: 'Acara Sedang Berlangsung',
      event_completed: 'Acara Selesai',
      refund: 'Pengembalian Dana',
      event_finish: 'Acara Berakhir'
    };

    return statusDescriptions[value] || 'Status tidak dikenal';
  }

  export const getStatusPayment = (value) => {
    const statusPayments = {
      'not finished': 'Belum Selesai',
      'completed': 'Selesai',
      'refund': 'Pengembalian Dana',
      'cancelled': 'Dibatalkan',
    };
  
    return statusPayments[value] || 'Status tidak dikenal';
  }