<template>
  <div class="flex justify-end my-8 mr-20">
    <button type="button" class="px-9 py-2 bg-blue-400 text-center text-white rounded-md font-serif" @click="showModal">Add</button>
  </div>
  <div class="p-6">
    <div class="overflow-x-auto rounded-2xl shadow-lg">
      <table class="min-w-full border-collapse bg-white text-sm text-left">
        <thead class="bg-gradient-to-r from-orange-600 to-amber-700 text-white">
        <tr>
          <th class="px-4 py-3 font-semibold">Logo</th>
          <th class="px-4 py-3 font-semibold">Reg No</th>
          <th class="px-4 py-3 font-semibold">Restaurant Name</th>
          <th class="px-4 py-3 font-semibold">Owner Name</th>
          <th class="px-4 py-3 font-semibold">Telephone Number</th>
          <th class="px-4 py-3 font-semibold">Restaurant Address</th>
          <th class="px-4 py-3 font-semibold">Opening Hours</th>
          <th class="px-4 py-3 font-semibold">Closing Hours</th>
          <th class="px-4 py-3 font-semibold">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd:bg-stone-100 even:bg-stone-50 hover:bg-amber-100 transition" v-for="restaurant in restaurants" :key="restaurant.id">
          <td class="px-4 py-3">
            <img :src="restaurant.logo" class="w-12 h-12" />
          </td>
          <td class="px-4 py-3"> {{ restaurant.regNumber }}</td>
          <td class="px-4 py-3">{{ restaurant.restaurantName }}</td>
          <td class="px-4 py-3">{{ restaurant.ownerName }}</td>
          <td class="px-4 py-3">{{ restaurant.tel }}</td>
          <td class="px-4 py-3">{{ restaurant.restaurantAddress }}</td>
          <td class="px-4 py-3">{{ restaurant.openingHours }}</td>
          <td class="px-4 py-3">{{ restaurant.closingHours }}</td>
          <td class="px-4 py-3">
          <div class="flex justify-center items-center space-x-4">
            <button type="button" class="px-9 py-2 bg-gray-400 text-center text-white rounded-md font-serif" @click="editModal(restaurant.id)">Edit</button>
            <button type="button" class="px-9 py-2 bg-red-400 text-center text-white rounded-md font-serif" @click="deleteRestaurant(restaurant.id)">Delete</button>
          </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { createApp } from "vue";
import RestaurantForm from "@/components/AddRestaurantForm.vue";
import EditRestaurantForm from "@/components/EditRestaurantForm.vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: "Home",
  data() {
    return {
      restaurants: []
    }
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({
        name: 'signUp'
      })
    }
    this.restaurantData()
  },
  methods: {
    showModal() {
      let formApp;
      let formInstance;
      const vm = this;
      Swal.fire({
        title: 'Add Your Restaurant',
        html: `<div id="vue-form"></div>`,
        showCancelButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        focusConfirm: false,
        didOpen() {
          formApp = createApp(RestaurantForm);
          formInstance = formApp.mount("#vue-form");
          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.setAttribute("type", "button");
          }
        },
        async preConfirm() {
          return await axios.post('http://localhost:3000/restaurants', {
            regNumber: vm.generateRegistrationNumber(),
            restaurantName: formInstance.restaurantName,
            ownerName: formInstance.ownerName,
            tel: formInstance.tel,
            emailAddress: formInstance.emailAddress,
            restaurantAddress: formInstance.restaurantAddress,
            openingHours: formInstance.openingHours,
            closingHours: formInstance.closingHours,
            logo: formInstance.selectedFile,
          }).then((response) => {
            if (response.status === 201) {
              return {
                status: response.status,
                data: response.data
              };
            }
          }).catch((err) => {
            Swal.showValidationMessage(`Request failed: ${err}`);
          });
        } ,
        willClose() {
          formApp.unmount()
        }
      }).then((result) => {
        if (result.isConfirmed && result.value.status === 201) {
          console.log("Restaurant Added Successfully", result);
          vm.restaurantData()
          toast.success(' New Restaurant Successfully Added', {
            autoClose: 2200,
            style: {
              width: '370px'
            },
          });
        } else {
          console.log("Cancelled", result);
        }
      });
    },
    generateRegistrationNumber() {
      const prefix = "RES";
      const randomNum = Math.floor(Math.random() * 1000);
      return `${prefix}-${randomNum}`;
    },
    editModal(id) {
      let formApp;
      let formInstance;
      const vm = this;

      Swal.fire({
        title: "Edit Restaurant",
        html: `<div id="vue-edit-form"></div>`,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        focusConfirm: false,
        didOpen() {
          formApp = createApp(EditRestaurantForm, { restaurantId: id });
          formInstance = formApp.mount("#vue-edit-form");

          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.setAttribute("type", "button");
          }
        },
        async preConfirm() {
          return await axios.put(`http://localhost:3000/restaurants/${id}`, {
            regNumber: formInstance.regNumber,
            restaurantName: formInstance.restaurantName,
            ownerName: formInstance.ownerName,
            tel: formInstance.tel,
            emailAddress: formInstance.emailAddress,
            restaurantAddress: formInstance.restaurantAddress,
            openingHours: formInstance.openingHours,
            closingHours: formInstance.closingHours,
            logo: formInstance.selectedFile
          }).then((response) => {
            if (response.status === 200) {
              return {
                status: response.status,
                data: response.data
              };
            }
          }).catch((err) => {
            Swal.showValidationMessage(`Update failed: ${err}`);
          });
        },
        willClose() {
          formApp.unmount();
        }
      }).then((result) => {
        if (result.isConfirmed && result.value.status === 200) {
          console.log("Restaurant updated", result);
          vm.restaurantData();
          toast.success('Restaurant Successfully updated', {
            autoClose: 2200,
            style: {
              width: '350px'
            },
          });
        }else {
          console.log("Cancelled", result);
        }
      });
    },
    deleteRestaurant(id) {
      const vm = this;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
       async preConfirm() {
          return await axios.delete(`http://localhost:3000/restaurants/${id}`).then((response) => {
            if (response.status === 200) {
              return response.status;
            }
          }).catch((err) => {
            Swal.showValidationMessage(`Update failed: ${err}`);
          });
        }
      }).then((result) => {
        if (result.isConfirmed && result.value === 200) {
          console.log("Restaurant deleted Successfully", result)
          vm.restaurantData()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }else {
          console.log("Cancelled", result)
        }
      });
    },
    async restaurantData() {
      let result = await axios.get('http://localhost:3000/restaurants');
      if (result.status === 200) {
        this.restaurants = result.data
      }else {
        console.log("Api Call Failed", result);
      }
    }
  }
}
</script>

<style scoped>

</style>
