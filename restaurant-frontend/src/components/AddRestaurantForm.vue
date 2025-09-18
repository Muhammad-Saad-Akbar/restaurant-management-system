<template>
      <input type="text" v-model="restaurantName" placeholder="Restaurant Name" class="swal2-input" />
      <input type="text" v-model="ownerName" placeholder="Owner Name" class="swal2-input" />
      <input type="tel" v-model="tel" placeholder="Contact Number" class="swal2-input" />
      <input type="email" v-model="emailAddress" placeholder="Email Address" class="swal2-input" />
      <textarea v-model="restaurantAddress" placeholder="Full Address" />
      <input type="time" v-model="openingHours" placeholder="Opening Hours" class="swal2-input" />
      <input type="time" v-model="closingHours" placeholder="Closing Hours " class="swal2-input" />
      <input type="file" @change="handleFileUpload" class="swal2-input cursor-pointer" />
</template>

<script>
export default {
  name: "RestaurantForm",
  data() {
    return {
      restaurantName: "",
      ownerName: "",
      tel: "",
      emailAddress: "",
      restaurantAddress: "",
      openingHours: "",
      closingHours: "",
      selectedFile: null
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        return
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
</script>

<style scoped>

</style>
