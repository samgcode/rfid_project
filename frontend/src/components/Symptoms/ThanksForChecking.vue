<template>
  <div id="home" class="main">
    <div class="display-4 text-secondary">
      Thank you for checking your symptoms
    </div>
    <h2 class="text-secondary">
      Have a great day {{ name }}!
    </h2>
  </div>
</template>

<script>
export default {
  name: 'ThanksForChecking',
  data() {
    return {
      name: '',
    }
  },
  watch: {
    $route() {
      this.name = this.$route.params.name;
    }
  },
  mounted() {
    this.name = this.$route.params.name;
    setTimeout(() => {
      this.$router.push({name: 'Home'});
    }, 5000);
  },
}
</script>

<style scoped>
h2 {
  padding-top: 2%;
}
</style>