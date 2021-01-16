<template>
  <div id="home" class="main">
    <orbit-loader :loading="loading"/>
    <div :class="{'d-none': loading}">
      <div class="display-3 text-secondary">
        Hello
      </div>
      <h3 class="text-secondary">
        Please scan card to continue
      </h3>
    </div>
  </div>
</template>

<script>
import OrbitLoader from './OrbitLoader.vue';
import serviceLocator from '../services/serviceLocator';

const eventService = serviceLocator.services.eventService;


export default {
  components: { OrbitLoader },
  name: 'home',
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    handleEvent: function(event) {
      const data = JSON.parse(event.data);
      console.log(data.id);
      if(data.id) {
        this.scanEvent(data);
      }
    },
    stopLoading: function() {
      this.loading = false;
    },
    scanEvent: function(data) {
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
    eventService.setOnOpen(this.stopLoading);
    eventService.setOnMessage(this.handleEvent);
  }
}
</script>