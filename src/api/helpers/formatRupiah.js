export const formatRupiah = (angka, prefix = 'Rp. ') => {
  // Hapus karakter selain angka dan koma
  if (angka === null || angka === undefined) {
    return prefix + '0';
  }

  const numberString = String(angka).replace(/[^,\d]/g, '').toString();
  const split = numberString.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // Tambahkan separator jika angka ribuan
  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix ? prefix + rupiah : rupiah;
};

export const formatNominalRupiah = (value) => {
  if (value === null || value === undefined) return 'Rp. 0';

  // Konversi angka ke string dan hapus karakter non-angka
  const numberString = value.toString().replace(/[^,\d]/g, '');
  const split = numberString.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // Tambahkan separator titik untuk ribuan
  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  return `Rp. ${rupiah}`;
};

// Fungsi untuk mengonversi format Rupiah ke angka murni
export const parseRupiah = (rupiah) => {
  // Hapus semua karakter non-digit kecuali koma
  const numberString = rupiah.replace(/[^,\d]/g, '');

  // Ganti koma dengan titik untuk memastikan format numerik valid
  const normalized = numberString.replace(',', '.');

  // Konversi string menjadi angka murni
  return parseFloat(normalized);
};