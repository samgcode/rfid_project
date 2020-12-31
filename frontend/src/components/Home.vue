<template>
  <div id="home" class="main">
    <div class="display-1 text-secondary">
      Hello
    </div>
    <h1 class="text-secondary">
      Please scan card to continue
    </h1>
    <router-link :to="{ name: 'Symptoms' }" class="btn btn-primary">test</router-link>
  </div>
</template>

<script>
console.log('test');
const source = new EventSource("http://localhost:3000/timeEvents");
source.onopen = () => console.log("Connected");
source.onerror = console.error;
source.onmessage = console.log;

export default {
  name: 'home',
}
</script>

<style>

</style>