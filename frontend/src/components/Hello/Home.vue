<template>
  <div id="home" class="main">
    <orbit-loader :loading="loading"/>
    <error-display :message="errorMessage" :class="{'d-none': !error}"/>
    <div :class="{'d-none': loading}">
      <div class="display-3 text-secondary">
        Hello
      </div>
      <h3 class="text-secondary">
        Please scan card to check symptoms
      </h3>
    </div>
  </div>
</template>

<script>
import OrbitLoader from '../Loading/OrbitLoader.vue';
import serviceLocator from '../../services/serviceLocator';
import ErrorDisplay from '../Error/ErrorDisplay';

const eventService = serviceLocator.services.eventService;


export default {
  components: { OrbitLoader, ErrorDisplay },
  name: 'home',
  data() {
    return {
      loading: true,
      error: true,
      errorMessage: "backend not connected, if it isn't resolved in a minute try restarting the raspberry pi"
    }
  },
  methods: {
    handleEvent: function(event) {
      const data = JSON.parse(event.data);
      console.log(data.id);
      if(data.id) {
        this.scanEvent(data);
      } else {
        this.stopLoading();
      }
    },
    stopLoading: function() {
      this.loading = false;
      this.error = false;
    },
    onError: function() {
      this.loading = true;
      this.error = true;
    },
    scanEvent: function(data) {
      if(data.checkSypmtomsRequired) {
        if(data.needName) {
          if(this.$router.currentRoute.path != `/enterName/${data.id}/false`) {
            this.$router.push({
              name: `EnterName`,
              params: {
                  id: data.id,
                  changeName: false
                }
            });
          }
        } else {
          if(this.$router.currentRoute.path != `/symptoms/${data.id}/${data.name}`) {
            this.$router.push({
              name: `Symptoms`,
              params: {
                id: data.id,
                name: data.name
              }
            });
          }
        }
      } else {
        if(this.$router.currentRoute.path != `/goodbye`) {
          this.$router.push({
            name: `Goodbye`,
            params: {
                name: data.name
              }
          });
        }
      }
    }
  },
  mounted() {
    console.log(this.$router.currentRoute.path);
    eventService.setOnError(this.onError);
    eventService.setOnOpen(this.stopLoading);
    eventService.setOnMessage(this.handleEvent);
    if(eventService.isOpen() === true) {
      this.stopLoading();
    }
}
}
</script>