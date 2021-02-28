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
        this.returnToHome();
      }, 5000);
    }
  },
  mounted() {
    this.name = this.$route.params.name;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.returnToHome();
    }, 5000);
  },
  methods: {
    returnToHome: function() {
      if(this.$router.currentRoute.path === `/goodbye/${this.name}` ||
         this.$router.currentRoute.path === `/thanks/${this.name}`) 
      {
        this.$router.push({name: 'Home'});
      }
    }
  }
}
</script>

<style scoped>
h2 {
  padding-top: 2%;
}
</style>