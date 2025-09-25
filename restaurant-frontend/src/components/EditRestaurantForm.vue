<template>
  <div class="text-left space-y-6">

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Restaurant Name</label>
      <input type="text" v-model="restaurantName"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Owner Name</label>
      <input type="text" v-model="ownerName"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Contact Number</label>
      <input type="tel" v-model="tel"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
      <input type="email" v-model="emailAddress"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Full Address</label>
      <textarea v-model="restaurantAddress" rows="3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"></textarea>
    </div>

    <div class="flex items-center space-x-4">
      <div class="w-1/2">
        <label class="block mb-2 text-sm font-medium text-gray-700">Opening Hours</label>
        <input type="time" v-model="openingHours"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
      </div>
      <div class="w-1/2">
        <label class="block mb-2 text-sm font-medium text-gray-700">Closing Hours</label>
        <input type="time" v-model="closingHours"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
      </div>
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Restaurant Image</label>
      <input type="file" @change="handleFileUpload"
             class="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
                           file:bg-red-50 file:text-red-700 file:font-semibold file:border-none file:px-4 file:py-2.5 file:mr-4 hover:file:bg-red-100">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditRestaurantForm",
  props: [
    "restaurantId"
  ],
  data() {
    return {
      regNumber: null,
      restaurantName: "",
      ownerName: "",
      tel: "",
      emailAddress: "",
      restaurantAddress: "",
      openingHours: "",
      closingHours: "",
      selectedFile: null
    }
  },
   mounted() {
     this.selectedRestaurantData()
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async selectedRestaurantData() {
      if (this.restaurantId) {
        try {
          let response = await axios.get(`http://localhost:3000/restaurants/${this.restaurantId}`);
          if (response.status === 200) {
            let data = response.data;
            this.regNumber = data.regNumber
            this.restaurantName = data.restaurantName;
            this.ownerName = data.ownerName;
            this.tel = data.tel;
            this.emailAddress = data.emailAddress;
            this.restaurantAddress = data.restaurantAddress;
            this.openingHours = data.openingHours;
            this.closingHours = data.closingHours;
            this.selectedFile = data.logo;
          }
        } catch (err) {
          console.error("Failed to fetch restaurant", err);
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
