<template>
  <div id="home" class="main">
    <div class="display-4 text-secondary">
      Have a great rest of your day!
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodbye',
  mounted() {
    setTimeout(() => {
        this.$router.push({name: 'Home'});
    }, 5000);
  }
}
</script>