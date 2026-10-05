import {
    ref,
    reactive,
    onMounted
} from 'vue';
import Swal from 'sweetalert2';

import {
    getMenus,
    getAllRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} from '../services/recipesService'; // Sesuaikan path sesuai dengan lokasi file service Anda
import {
    DataTable
} from 'simple-datatables';

export default {
    setup() {
        const recipes = ref([]);
        const menus = ref([]);
        let uuid_data = '';
        let dataTableInstanceMenu = null;
        const modalInstance = ref(null);

        const isViewOnly = ref(false);
        const defaultRecipe = {
            uuid: '',
            recipes: [{
                uuid: '',
                name: '',
                menu_id: '',
                quantity: 0,
                portion: 0,
            }],
            nullable: false
        };
        
        const currentRecipe = reactive({
            ...defaultRecipe
        });
        
        function resetRecipeState() {
            for (const key in defaultRecipe) {
                currentRecipe[key] = defaultRecipe[key];
            }
        }

        const addIngredient = () => {
            currentRecipe.recipes.push({
                uuid: '',
                name: '',
                menu_id: currentRecipe.uuid,
                quantity: 0,
                portion: 0,
            });
        };

        const removeIngredient = (index) => {
            currentRecipe.recipes.splice(index, 1);
        };

        const openAddModal = () => {
            isViewOnly.value = false;
            currentRecipe.uuid = '';
            currentRecipe.recipes = [{
                name: '',
                quantity: 0,
                portion: 0,
            }];
            modalInstance.value.show();
        };

        const openViewModal = async (uuid) => {
            isViewOnly.value = true;
            currentRecipe.uuid = uuid;
            currentRecipe.view = true;

            // Memuat resep menggunakan loadRecipes yang asinkron
            await loadRecipes(uuid);
            if (recipes.value === null || recipes.value.length == 0) {
                currentRecipe.nullable = true;
                recipes.value = []; // Tetapkan ke array kosong agar dapat menggunakan .map() tanpa error
            } else {
                // Menyalin isi ke currentRecipe.recipes
                currentRecipe.recipes = recipes.value.map(ing => ({
                    ...ing
                }));
                currentRecipe.nullable = false;
            }
            modalInstance.value.show();
            afterModalDisplayCleanup();
        };

        const editRecipe = async (uuid) => {
            isViewOnly.value = false;
            currentRecipe.uuid = uuid;
            uuid_data =  uuid;          
            await loadRecipes(uuid);
            if (!Array.isArray(recipes.value) || recipes.value.length === 0) {
                recipes.value = []; // Tetapkan ke array kosong agar dapat menggunakan .map() tanpa error
            } else {
                currentRecipe.recipes = recipes.value.map(ing => ({
                    ...ing
                }));
            }

            if (currentRecipe.recipes.length === 0) {
                currentRecipe.recipes = [{
                    uuid: '',
                    name: '',
                    menu_id: uuid,
                    quantity: 0,
                    portion: 0,

                }];
                console.warn("No ingredients found for recipe", recipe);
            }

            modalInstance.value.show();
            afterModalDisplayCleanup();
        };

        function afterModalDisplayCleanup() {
            recipes.value = []; // Atau set nilai default yang diinginkan
        }
       
        const hideModal = () => {
            if (modalInstance.value) {
                modalInstance.value.hide();

            } else {
                console.error("Modal instance not found");
            }
        };

        const loadMenus = async () => {
            try {
                const response = await getMenus(); // Changed from getMenus to getCategories
                menus.value = response.data;
                initializeDataTableMenu(); // Call function to initialize DataTable
            } catch (error) {
                console.error("Error loading menus:", error);
            }
        };

        const initializeDataTableMenu = () => {
            if (dataTableInstanceMenu) {
                dataTableInstanceMenu.destroy(); // Destroy the previous instance if exists
            }

            const tableElement = document.getElementById('datatablesSimple');
            dataTableInstanceMenu = new DataTable(tableElement, {
                data: {
                    headings: ["No", "Nama Menu", "Category", "Aksi"], // Changed from "Nama Kategori" to "Nama Menu"
                    data: menus.value.map((menu, index) => [
                        index + 1,
                        menu.name,
                        menu.category ? menu.category.name : 'No Category',
                        `<button class="btn btn-primary btn-sm view-btn" data-id="${menu.uuid}">View</button>
                         <button class="btn btn-warning btn-sm edit-btn" data-id="${menu.uuid}">Update Resep</button>`
                    ])
                }
            });

            // Add event listeners for Edit and Delete buttons
            tableElement.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const menuId = button.getAttribute('data-id');
                    editRecipe(menuId);
                    resetRecipeState();
                });
            });

            tableElement.querySelectorAll('.view-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const menuId = button.getAttribute('data-id');
                    openViewModal(menuId);
                    resetRecipeState();
                });
            });
        };

        const loadRecipes = async (uuid) => {
            try {
                const response = await getAllRecipes(uuid);
                recipes.value = response.data;
            } catch (error) {
                console.error("Error loading recipes:", error);
            }
        };

        const updateRecipeHandler = async (recipeData) => {
            try {
                await updateRecipe(uuid_data, recipeData.recipes);
                Swal.fire(
                    'Updated!',
                    'The recipe has been updated successfully.',
                    'success'
                );
                hideModal();
            } catch (error) {
                console.error(`Error updating recipe with uuid ${uuid}:`, error.response ? error.response.data : error.message);
                Swal.fire(
                    'Failed!',
                    'There was an error updating the recipe. Please check the console for more details.',
                    'error'
                );
            }
        };


        const deleteRecipeHandler = async (uuid) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You will not be able to recover this recipe!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                try {
                    await deleteRecipe(uuid);
                    await loadRecipes();
                    Swal.fire(
                        'Deleted!',
                        'The recipe has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error(`Error deleting recipe with uuid ${uuid}:`, error);
                    Swal.fire(
                        'Failed!',
                        'There was an error deleting the recipe.',
                        'error'
                    );
                }
            }
        };

        onMounted(() => {
            modalInstance.value = new bootstrap.Modal(document.getElementById('recipeModal'), {
                // additional options here if needed
            });
            loadMenus();
            loadRecipes(); // Load recipes when the component is mounted
        });

        return {
            addIngredient,
            removeIngredient,
            openViewModal,
            recipes,
            currentRecipe,
            loadMenus,
            openAddModal,
            hideModal,
            updateRecipeHandler,
            deleteRecipeHandler,
            editRecipe,
            isViewOnly
        };
    }
};