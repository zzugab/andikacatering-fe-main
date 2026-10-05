import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import {
  getAllMenuItems,
  AddOrderAll,
  listMenuItem,
  AddMenuItem,
} from "../services/menuItemsService";
import { getDataByType, getPackageData } from "../services/packagefoodService";
import { getMenuById, getMenus, getMenusType } from "../services/foodService";

export default {
  setup() {
    const route = useRoute();
    const orderId = route.params.uuid;
    // --- helpers kecil ---
    const toNum = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);
    const toStr = (v) => String(v ?? "");

    // ---------- STATE ----------
    const listPackageAll = ref([]);
    const listPackageFiltered = ref([]);
    const listMenuPakagePopUp = ref([]);
    const showPaketPopup = ref(false);
    const loadingPopup = ref(false);
    const popupError = ref("");

    const filteredByType = ref([]);

    const packageItems = ref([
      {
        uuid: null,
        type: null,
        package_id: null,
        portion: null,
        details: "",
        price: null,
      },
    ]);

    const menuItemsCostum = ref([
      {
        uuid: null,
        menu_id: null,
        selectedMenu: null,
        price: null,
        portion: null,
        details: "",
        type: null,
      },
    ]);

    const itemsPackages = ref([]);
    const menuItems = ref([]);

    // >>> Dirapikan: jadikan OBJECT, bukan array
    const listPayment = ref({
      uuid: null,
      others: [{ uuid: null, type: null, price: null, details: "" }],
      total_price: 0,
    });

    // ---------- HELPERS ----------
    const formatIDR = (v) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(Math.round(v || 0));

    const optionsByType = (type) => {
      const all = listPackageAll.value || [];
      if (!type) return all;
      return all.filter((p) => p.type === type);
    };

    const pkgByIdPackage = (uuid) =>
      (listPackageAll.value || []).find((p) => String(p.uuid) === String(uuid));

    // ---------- FETCH ----------
    const fetchData = async () => {
      try {
        const response = await getAllMenuItems(orderId);

        if (response.status === true) {
          const rawPackages = response.data.list_package || [];
          listPackageAll.value = rawPackages.map((p) => ({
            uuid: String(p.uuid ?? p.id ?? p.package_id),
            name: p.name ?? "",
            type: p.type ?? "",
            price: p.price ?? 0,
          }));

          console.log(listPackageAll.value);
          

          // packageItems

          const getPkgByUuid = (id) => {
            return listPackageAll.value.find((p) => p.uuid === id);
          };

          const menuRows = response.data?.package || [];
          if (menuRows <= 1) {
            packageItems.value.splice(0, 1, defaultPaketRow());
          } else {
            packageItems.value = menuRows.map((it) => {
              const pkg = getPkgByUuid(String(it.package_id));
              return {
                uuid: it.uuid || "",
                package_id:
                  it.package_id != null ? String(it.package_id) : null,
                type: pkg?.type || it.type || "",
                name: pkg?.name || it.name || "",
                portion: it.portion ?? 0,
                details: it.details || "",
                price: pkg?.price || null,
              };
            });
          }

          // yang lain kalau perlu
          itemsPackages.value = response.data?.package_menu || [];
          // itemsPackages.value = (response.data?.package_menu.portion || []).map(item => ({
          //   ...item,
          //   portion: item.portion === 0 ? null : item.portion
          // }));
          

          menuItemsCostum.value = response.data.custom_menu.map((item) => ({
            uuid: item.uuid,
            menu_id: item.menu_id,
            selectedMenu: item.menu, // ini berisi object menu dari API
            price: item.menu.price ?? null,
            portion: item.portion ?? null,
            details: item.details ?? "",
          }));
          if (response.data.custom_menu.length < 1) {
            menuItemsCostum.value.splice(0, 1, defaultMenuCostumRow());
          }

          listPayment.value = response.data.payment;
          if (listPayment.value.others.length < 1) {
            listPayment.value.others.splice(0, 1, defaultOtherItem());
          }

          console.log(itemsPackages.value);
        } else {
          if (packageItems.value.length <= 1) {
            // opsional: reset isian baris terakhir biar “kosong”
            packageItems.value.splice(0, 1, defaultPaketRow());
            return;
          }
        }

        const responseAllMenus = await getMenus();
        if (responseAllMenus.status === true) {
          menuItems.value = responseAllMenus.data;
        } else {
          console.error("Failed to load all menus:", responseAllMenus.message);
        }

      } catch (error) {
        console.error("Failed to load menu items:", error);
      }
    };

    // ---------- HANDLERS ----------

    const handleNonPaket = (value) => {
      filteredByType.value = menuItems.value.filter((m) => m.type === value);
    };

    const nameByUuid = computed(() => {
      const m = new Map();
      for (const p of listPackageAll.value || []) {
        m.set(String(p.uuid), p.name || "");
      }
      return m;
    });
    function pkgName(uuid) {
      if (!uuid) return "";
      return nameByUuid.value.get(String(uuid)) || "";
    }

    const handleTypePaket = async (typeData) => {
      try {
        listPackageFiltered.value = listPackageAll.value.filter(
          (item) => item.type === typeData
        );
      } catch (error) {
        console.error(`Error loading packages for type ${typeData}:`, error);
      }
    };

    const updateHargaPaket = (_uuid, index) => {
      const selected = packageItems.value[index];
      const paketData = listPackageAll.value.find(
        (pkg) => String(pkg.uuid) === String(selected.package_id)
      );
      if (paketData) selected.price = toNum(paketData.price);
    };

    const tambahPaket = () => {
      packageItems.value.push(defaultPaketRow());
    };
    const deletePaket = (index) => {
      if (packageItems.value.length <= 1) {
        packageItems.value.splice(0, 1, defaultPaketRow());
        return;
      }
      packageItems.value.splice(index, 1);
    };
    function defaultPaketRow() {
      return {
        uuid: null,
        type: null,
        package_id: null,
        portion: null,
        details: "",
        price: null,
      };
    }

    const tambahMenuNonPaket = () => {
      menuItemsCostum.value.push(defaultMenuCostumRow());
    };
    const deleteMenuNonPaket = (index) => {
      if (menuItemsCostum.value.length <= 1) {
        menuItemsCostum.value.splice(0, 1, defaultMenuCostumRow());
        return;
      }
      menuItemsCostum.value.splice(index, 1);
    };
    function defaultMenuCostumRow() {
      return {
        uuid: null,
        menu_id: null,
        selectedMenu: null,
        price: null,
        portion: null,
        details: "",
        type: null,
      };
    }

    const tambahBiayaLain = () => {
      listPayment.value.others.push(defaultOtherItem());
    };
    const hapusBiayaLain = (otherIndex) => {
      const others = listPayment.value.others;
      if (others.length <= 1) {
        others.splice(0, 1, defaultOtherItem());
        return;
      }
      others.splice(otherIndex, 1);
    };
    const defaultOtherItem = () => ({
      uuid: null,
      type: null,
      price: null,
      details: "",
    });
    const defaultPaymentItem = () => ({
      uuid: null,
      others: [defaultOtherItem()],
      total_price: 0,
    });

    const closePaketPopup = () => {
      showPaketPopup.value = false;
      window.location.reload();
    };

    const submitPaketMenu = async () => {
      showPaketPopup.value = true;
      loadingPopup.value = true;
      popupError.value = "";
      listMenuPakagePopUp.value = [];

      try {
        const payload = {
          package: (packageItems.value || []).map((item) => ({
            uuid: item?.uuid ?? null,
            package_id: item?.package_id ?? null,
            portion: toNum(item?.portion),
            details: item?.details ?? "",
          })),
        };

        const response = await listMenuItem(orderId, payload);
        const data = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];
        if (!Array.isArray(data) || data.length === 0) {
          popupError.value = "Data kosong atau format tidak sesuai.";
        }
        listMenuPakagePopUp.value = data;
      } catch (err) {
        console.error("Gagal submit paket menu:", err);
        popupError.value = "Gagal memuat data dari server.";
      } finally {
        loadingPopup.value = false;
      }
    };

    const buildPopupMenuPayload = () => {
      const menu = (listMenuPakagePopUp.value || []).map((it) => ({
        uuid: it.uuid ?? "",
        menu_id: it.menu_id,
        status: Number(it.status === 1 ? 1 : 0),
      }));
      return { menu };
    };

    const savePopupMenus = async () => {
      try {
        const payload = buildPopupMenuPayload();
        await AddMenuItem(orderId, payload);
        closePaketPopup();
      } catch (e) {
        console.error("Gagal menyimpan menu:", e);
        popupError.value = "Gagal menyimpan data.";
      }
    };

    const filteredMenuItems = (type) => {
      const list = Array.isArray(menuItems.value) ? menuItems.value : [];
      return type ? list.filter((m) => m.type === type) : list;
    };

    const handleSelectPackage = (uuid, index) => {
      const pkg = listPackageAll.value.find(
        (p) => String(p.uuid) === String(uuid)
      );

      if ((packageItems[index].price ?? null) === null && pkg) {
        packageItems[index].price = pkg.price;
      }
    };

    // ---------- TOTALS ----------
    const HargaPaket = ref(0);
    const HargaCostumMenu = ref(0);
    const OtherPrice = ref(0);
    const TotalCurrentPrice = ref(0);
    const TotalPriceFinal = ref(0);

    // paket
    watch(
      packageItems,
      (val) => {
        HargaPaket.value = (val || []).reduce(
          (sum, p) => sum + toNum(p?.price) * toNum(p?.portion),
          0
        );
        recalcTotals();
      },
      { deep: true, immediate: true }
    );

    // menu kustom
    watch(
      menuItemsCostum,
      (val) => {
        HargaCostumMenu.value = (val || []).reduce((sum, i) => {
          const price = toNum(
            i?.price ?? i?.menu?.price ?? i?.selectedMenu?.price
          );
          const portion = toNum(i?.portion);
          return sum + price * portion;
        }, 0);
        recalcTotals();
      },
      { deep: true, immediate: true }
    );

    // biaya lainnya
    watch(
      () => listPayment.value.others,
      (others) => {
        OtherPrice.value = (others || []).reduce((sum, o) => {
          const val = toNum(o?.price);
          if (o?.type === "increase") return sum + val;
          if (o?.type === "decrease") return sum - val;
          return sum;
        }, 0);
        recalcTotals();
      },
      { deep: true, immediate: true }
    );

    function recalcTotals() {
      TotalCurrentPrice.value =
        toNum(HargaPaket.value) + toNum(HargaCostumMenu.value);
      TotalPriceFinal.value = TotalCurrentPrice.value + toNum(OtherPrice.value);

      // simpan angka mentah (kalau mau izinkan minus, hapus Math.max)
      listPayment.value.total_price = Math.max(
        0,
        Math.round(TotalPriceFinal.value)
      );
    }

    const TotalPrize = computed(() => TotalPriceFinal.value);
    const TotalPrizeFormatted = computed(() => formatIDR(TotalPrize.value));

    // sinkronkan formatted bila total berubah
    watch(
      TotalPrize,
      () => {
        // tidak perlu set string ke input kalau pakai v-model angka; tampilkan formatted di template
      },
      { immediate: true }
    );

    // sinkronkan price dari selectedMenu (kalau kamu pakai multiselect yang set ke selectedMenu)
    watch(
      menuItemsCostum,
      (newVal) => {
        newVal.forEach((item) => {
          if (item.selectedMenu) {
            item.uuid = item.uuid;
            item.menu_id = item.menu_id;
            item.portion = item.portion;
            item.price = toNum(item.selectedMenu.price);
          } else {
            item.uuid = null;
            item.price = null;
          }
        });
      },
      { deep: true }
    );

    // Susun payload sesuai format yang diminta
    const buildSubmitPayload = () => {
      // package: ambil dari packageItems
      const pkg = (packageItems.value || [])
        .filter((it) => it?.package_id && toNum(it?.portion) > 0)
        .map((it) => ({
          uuid: toStr(it?.uuid || ""),
          package_id: toStr(it?.package_id),
          portion: toStr(it?.portion), // string
          details: it?.details ?? "",
        }));

      // package_menu: ambil dari itemsPackages (tabel "Data Menu (Paket)")
      // fallback menu_id dari menu.uuid atau menu_id yang sudah ada
      const pkgMenu = (itemsPackages.value || [])
        .filter((mp) => mp?.menu?.uuid || mp?.menu_id)
        .map((mp) => ({
          uuid: toStr(mp?.uuid || ""),
          menu_id: toStr(mp?.menu?.uuid ?? mp?.menu_id),
          portion: toStr(mp?.portion ?? null),
          details: mp?.details ?? "",
          status: Number(mp?.status ?? 1), // default hidup
        }));

      // custom_menu: ambil dari menuItemsCostum
      const mappedMenu = menuItemsCostum.value.map((it) => ({
        uuid: toStr(it?.uuid || ""),
        menu_id: toStr(it?.selectedMenu?.uuid ?? it?.menu_id),
        portion: toStr(it?.portion ?? 0),
        details: it?.details ?? null,
      }));
      
      // Cek kalau semua item kosong/null
      const allEmpty = mappedMenu.every(item =>
        (item.uuid === "" || item.uuid === null) &&
        (item.menu_id === "" || item.menu_id === null) &&
        (item.portion === "" || item.portion === null || item.portion == 0 ) &&
        (item.details === "" || item.details === null)
      );

      const customMenu = allEmpty ? [] : mappedMenu;

      // payment:
      // - price = TotalCurrentPrice (sebelum others)
      // - total_price = setelah ditambah/kurang others (sudah ada di listPayment.total_price)
      const others = (listPayment.value?.others || [])
        .filter((o) => o?.type === "increase" || o?.type === "decrease")
        .map((o) => ({
          uuid: toStr(o?.uuid || ""),
          type: o?.type,
          price: toStr(toNum(o?.price)),
          details: o?.details ?? "",
        }));

      const payment = {
        uuid: toStr(listPayment.value?.uuid || ""),
        price: toStr(TotalCurrentPrice.value || 0),
        others,
        total_price: toStr(listPayment.value?.total_price || 0),
      };

      return {
        package: pkg,
        package_menu: pkgMenu,
        custom_menu: customMenu,
        payment,
      };
    };

    // Fungsi yang dipanggil saat submit form
    const submitData = async () => {
      try {
        const payload = buildSubmitPayload();

        // kalau mau cek cepat:
        console.log("SUBMIT PAYLOAD:", payload);

        // OPTIONAL: panggil API kalau endpoint kamu siap
        // pastikan signature createMenuItem(orderId, payload) benar
        const resp = await AddOrderAll(orderId, payload);
        if (resp?.status) {
          Swal.fire(
            "Failed!",
            "There was an error adding the Menu Items.",
            "error"
          );
        } else {
          // console.log(resp);
          Swal.fire(
            "Added!",
            "Menu has been added successfully.",
            "success"
          ).then(() => {
            location.reload(); // refresh halaman
          });
        }

        // sementara, kembalikan payload (atau pakai console.log)
        // return payload;
      } catch (e) {
        console.error("Gagal submit data:", e);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      // state + helpers
      filteredByType,
      pkgByIdPackage,
      handleSelectPackage,
      filteredMenuItems,
      updateHargaPaket,
      tambahBiayaLain,
      hapusBiayaLain,
      pkgName,
      handleNonPaket,
      handleTypePaket,
      listMenuPakagePopUp,
      showPaketPopup,
      loadingPopup,
      savePopupMenus,
      popupError,
      optionsByType,
      submitPaketMenu,
      closePaketPopup,
      packageItems,
      listPackageAll,
      listPackageFiltered,
      itemsPackages,
      menuItems,
      menuItemsCostum,
      orderId,
      tambahPaket,
      deletePaket,
      tambahMenuNonPaket,
      deleteMenuNonPaket,
      listPayment,
      submitData,

      // totals
      HargaPaket,
      HargaCostumMenu,
      OtherPrice,
      TotalCurrentPrice,
      TotalPriceFinal,
      TotalPrize,
      TotalPrizeFormatted,
    };
  },
};
