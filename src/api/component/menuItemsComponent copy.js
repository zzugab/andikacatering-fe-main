import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import {
  getAllMenuItems,
  createMenuItem,
  listMenuItem,
  AddMenuItem,
} from "../services/menuItemsService";
import { getDataByType, getPackageData } from "../services/packagefoodService";
import { getMenuById, getMenus, getMenusType } from "../services/foodService";

export default {
  setup() {
    const route = useRoute();
    // Mengambil ID order dari parameter route
    const orderId = route.params.uuid;

    const currentPrice = ref(null);

    // listPackageAll dan listPackageFiltered untuk menyimpan data paket makanan
    const listPackageAll = ref([]);
    const listPackageFiltered = ref([]);

    const listMenuPakagePopUp = ref([]);
    const showPaketPopup = ref(false);
    const loadingPopup = ref(false);

    const popupError = ref("");

    // packageItems Daftar Data paket
    const packageItems = ref([
      {
        uuid: null,
        type: null,
        package_id: null,
        portion: null,
        details: "",
      },
    ]);

    const menuItemsCostum = ref([
      {
        uuid: null,
        menu_id: null,
        name: null,
        portion: null,
        details: "",
      },
    ]);

    // itemsPackages Daftar Menu
    const itemsPackages = ref([]);
    const menuItems = ref([]);

    // menuItemsCostum Daftar Menu Kustom
    const listPayment = ref([
      {
        uuid: null,
        others: [
          {
            uuid: null,
            type: null,
            price: null,
            details: "",
          },
        ],
        total_price: "",
      },
    ]);

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
                price: pkg?.price || 0,
              };
            });
          }

          // yang lain kalau perlu
          itemsPackages.value = response.data?.package_menu || [];
          if (
            Array.isArray(response.data?.custom_menu) &&
            response.data.custom_menu.length > 0
          ) {
            menuItemsCostum.value = response.data.custom_menu;
          } else {
            menuItemsCostum.value.splice(0, 1, defaultMenuCostumRow());
          }

          listPayment.value = response.data.payment;
          // if (listPayment.others.length > 1) {
          //   listPayment.value.others = response.data.payment.others;
          // } else {
          //   listPayment.value.splice(0, 1, defaultPaymentItem());
          // }

          // console.log(listPayment.others.value);
          

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

    const handleNonPaket = async (value) => {
      try {
        // loadMenuItems(value);
      } catch (error) {
        console.error("Error loading paket description:", error);
      }
    };

    const optionsByType = (type) => {
      const all = listPackageAll.value || [];
      if (!type) return all;
      return all.filter((p) => p.type === type);
    };

    const pkgByIdPackage = (uuid) =>
      (listPackageAll.value || []).find((p) => String(p.uuid) === String(uuid));

    watch(
      () => packageItems.value.map((i) => i.package_id), // cuma amati id-nya
      (newIds) => {
        newIds.forEach((id, idx) => {
          if (!id) return;
          const item = packageItems.value[idx];
          const pkg = pkgByIdPackage(id);
          if (!pkg) return;

          // Isi price hanya jika belum ada (null/undefined/''/0 dianggap kosong kalau mau)
          if (
            item.price == null ||
            item.price === "" ||
            item.price != "" ||
            item.price != 0
          ) {
            item.price = pkg.price;
          }
        });
      }
    );

    const getSelectedById = (id, type) => {
      const target = String(id ?? "");
      const optsJson = JSON.stringify(optionsByType(type));
      const opts = JSON.parse(optsJson);

      const found = opts.find((o) => String(o.uuid) === target);

      return found?.name ?? "";
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

    const updateHargaPaket = (uuid, index) => {
      const selected = packageItems.value[index];
      const paketData = listPackageAll.value.find(
        (pkg) => String(pkg.uuid) === String(selected.package_id)
      );
      if (paketData) {
        selected.price = Number(paketData.price || 0);
      }
    };

    const tambahPaket = () => {
      packageItems.value.push({
        uuid: null,
        package_id: null,
        type: null,
        portion: null,
        details: "",
      });
    };

    const deletePaket = (index) => {
      if (packageItems.value.length <= 1) {
        // opsional: reset isian baris terakhir biar “kosong”
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
      };
    }

    const tambahMenuNonPaket = () => {
      menuItemsCostum.value.push({
        type: "",
        selectedMenu: null,
        quantity: "",
        description: "",
      });
    };

    const deleteMenuNonPaket = (index) => {
      if (menuItemsCostum.value.length <= 1) {
        // opsional: reset isian baris terakhir biar “kosong”
        menuItemsCostum.value.splice(0, 1, defaultMenuCostumRow());
        return;
      }
      menuItemsCostum.value.splice(index, 1);
    };

    const tambahBiayaLain = () => {
      listPayment.value.others.push(defaultOtherItem());
    };

    const hapusBiayaLain = (otherIndex) => {
      const others = listPayment.value.others;
      if (others.length <= 1) {
        others.splice(0, 1, defaultOtherItem()); // reset jadi kosong
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
      others: [
        {
          uuid: null,
          type: null,
          price: null,
          details: "",
        },
      ],
      total_price: "",
    });

    function defaultMenuCostumRow() {
      return {
        uuid: null,
        menu_id: null,
        name: null,
        portion: null,
        details: "",
      };
    }

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
            portion: item?.portion ?? 0,
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
      return {
        menu,
      };
    };

    // Klik "Simpan" dari modal
    const savePopupMenus = async () => {
      try {
        const payload = buildPopupMenuPayload();
        const response = await AddMenuItem(orderId, payload);
        closePaketPopup();
      } catch (e) {
        console.error("Gagal menyimpan menu:", e);
        popupError.value = "Gagal menyimpan data.";
      }
    };

    const TotalPrize = computed(() => {
      const paketTotal = packageItems.value.reduce((acc, paket) => {
        const price = Number(paket.price || 0);
        const portion = Number(paket.portion || 0);
        return acc + price * portion;
      }, 0);

      const menuTotal = menuItemsCostum.value.reduce((acc, item) => {
        const price = Number(item.price || 0);
        const portion = Number(item.portion || 0);
        return acc + price * portion;
      }, 0);

      const otherTotal = (listPayment.value[0]?.others || []).reduce(
        (acc, paket) => {
          const price = Number(paket.price || 0);
          if (paket.type === "increase") return acc + price;
          if (paket.type === "decrease") return acc - price;
          return acc;
        },
        0
      );

      return paketTotal + menuTotal + otherTotal;
    });

    const TotalPrizeFormatted = computed(() => {
      return `Rp ${TotalPrize.value.toLocaleString("id-ID")}`;
    });

    const filteredMenuItems = (type) => {
      return menuItems.value.filter((menu) => menu.type === type);
    };

    const handleSelectPackage = (uuid, index) => {
      const pkg = listPackageAll.value.find(
        (p) => String(p.uuid) === String(uuid)
      );

      if ((packageItems[index].price ?? null) === null && pkg) {
        packageItems[index].price = pkg.price;
      }
    };

    watch(
      menuItemsCostum,
      (newVal) => {
        newVal.forEach((item) => {
          if (item.selectedMenu) {
            item.uuid = item.selectedMenu.uuid;
            item.price = item.selectedMenu.price;
          } else {
            item.uuid = null;
            item.price = null;
          }
        });
      },
      { deep: true }
    );

    // --- Totals (pakai watch) ---
    const HargaPaket = ref(0);
    const HargaCostumMenu = ref(0);
    const TotalCurrentPrice = ref(0);

    function hitungTotal() {
      TotalCurrentPrice.value =
        (Number(HargaPaket.value) || 0) + (Number(HargaCostumMenu.value) || 0);
    }

    // Watch untuk paket (price * portion)
    watch(
      packageItems,
      (val) => {
        HargaPaket.value = (val || []).reduce((sum, p) => {
          const price = Number(p?.price) || 0;
          const portion = Number(p?.portion) || 0;
          return sum + price * portion;
        }, 0);
        hitungTotal();
      },
      { deep: true, immediate: true }
    );

    // Watch untuk menu kustom (price * portion)
    // Catatan: di data kamu, harga ada di item.price yang diset dari selectedMenu pada watcher di bawah.
    // Jika kamu pakai item.menu?.price di template, ini tetap aman karena kita hitung dari state reaktifnya.
    watch(
      menuItemsCostum,
      (val) => {
        HargaCostumMenu.value = (val || []).reduce((sum, i) => {
          const price = Number(i?.price ?? i?.menu?.price) || 0; // fallback jika struktur berubah
          const portion = Number(i?.portion) || 0;
          return sum + price * portion;
        }, 0);
        hitungTotal();
      },
      { deep: true, immediate: true }
    );

    onMounted(() => {
      fetchData();
      // loadMenuItems();
      // loadPackages();
    });

    return {
      HargaPaket,
      HargaCostumMenu,
      TotalCurrentPrice,
      pkgByIdPackage,
      handleSelectPackage,
      filteredMenuItems,
      updateHargaPaket,
      TotalPrizeFormatted,
      tambahBiayaLain,
      hapusBiayaLain,
      pkgName,
      handleNonPaket,
      handleTypePaket,
      getSelectedById,
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
      submitPaketMenu,
      orderId,
      handleTypePaket,
      tambahPaket,
      deletePaket,
      tambahMenuNonPaket,
      deleteMenuNonPaket,
      listPayment,
    };
  },
};
