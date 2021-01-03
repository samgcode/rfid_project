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
import serviceLocator from '../services/serviceLocator';

const eventService = serviceLocator.services.eventService;


export default {
  name: 'home',
  data() {
    return {
      uid: null
    }
  },
  methods: {
    handleEvent: function(event) {
      const data = JSON.parse(event.data);
      console.log(data.id);
      if(data.checkSypmtomsRequired) {
        this.$router.push({
          name: `Symptoms`,
          params: {id: data.id}
        });
      } else {
        this.$router.push({name: `Goodbye`}); 
      }
    }
  },
  mounted() {
    eventService.setOnMessage(this.handleEvent);
  }
}
</script>