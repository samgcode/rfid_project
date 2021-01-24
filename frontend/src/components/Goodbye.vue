<template>
  <div id="home" class="main">
    <div class="display-4 text-secondary">
      Have a great rest of your day {{name}}!
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodbye',
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
    setTimeout(() => {
        this.$router.push({name: 'Home'});
    }, 5000);
  },
  mounted() {
    this.name = this.$route.params.name;
  }
}
</script>