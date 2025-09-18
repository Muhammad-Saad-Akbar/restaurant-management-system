<template>
  <header class="bg-gradient-to-r from-orange-700 to-amber-900 shadow-md">

    <nav class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">

        <!-- 1. Your Logo -->
        <div>
          <img :src="logo" class="h-13 w-auto" />
        </div>

        <!-- 2. Navigation Links & Button Container -->
        <div class="flex items-center space-x-9">

          <!-- Links for larger screens -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-stone-100 font-serif-display hover:text-white transition duration-300">Home</a>
            <a href="#" class="text-stone-100 font-serif-display hover:text-white transition duration-300">Add Restaurant</a>
            <a href="#" class="text-stone-100 font-serif-display hover:text-white transition duration-300">Update Restaurant</a>
          </div>

          <!-- 3. Get Started Button -->
          <button type="button" class="bg-stone-200 text-stone-800 font-serif-display font-semibold py-2 px-5 rounded-full shadow-lg hover:bg-stone-300
           transition duration-300 ease-in-out cursor-pointer" @click="logout">
            Logout
          </button>
        </div>

      </div>
    </nav>

  </header>

</template>

<script>
import logo from "@/assets/logo.png"
export default {
  name: "Header",
  data() {
    return {
      logo
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        name: 'Login'
      });
    }
  }
}
</script>

<style scoped>
.font-serif-display {
  font-family: 'Lora', serif;
}
</style>
