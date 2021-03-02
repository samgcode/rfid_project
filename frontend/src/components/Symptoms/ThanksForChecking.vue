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