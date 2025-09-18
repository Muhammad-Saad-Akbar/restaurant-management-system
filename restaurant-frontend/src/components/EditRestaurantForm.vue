<template>
  <div>
    <input type="text" v-model="restaurantName" placeholder="Restaurant Name" class="swal2-input" />
    <input type="text" v-model="ownerName" placeholder="Owner Name" class="swal2-input" />
    <input type="tel" v-model="tel" placeholder="Contact Number" class="swal2-input" />
    <input type="email" v-model="emailAddress" placeholder="Email Address" class="swal2-input" />
    <textarea v-model="restaurantAddress" placeholder="Full Address"></textarea>
    <input type="time" v-model="openingHours" placeholder="Opening Hours" class="swal2-input" />
    <input type="time" v-model="closingHours" placeholder="Closing Hours" class="swal2-input" />
    <input type="file" @change="handleFileUpload" class="swal2-input cursor-pointer" />
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
