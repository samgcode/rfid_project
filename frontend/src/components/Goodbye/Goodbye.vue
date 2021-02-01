<template>
  <div id="home" class="main">
    <div class="display-4 text-secondary">
      Thank you for signing out
    </div>
    <h2 class="text-secondary">
      Have a great rest of your day {{name}}!
    </h2>
  </div>
</template>

<script>
export default {
  name: 'goodbye',
  data() {
    return {
      name: '',
      timeOut: null
    }
  },
  watch: {
    $route() {
      this.name = this.$route.params.name;
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$router.push({name: 'Home'});
      }, 5000);
    }
  },
  mounted() {
    this.name = this.$route.params.name;
    this.timeOut = setTimeout(() => {
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