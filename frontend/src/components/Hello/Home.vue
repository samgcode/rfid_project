<template>
  <div id="home" class="main">
    <orbit-loader :loading="loading"/>
    <error-display :message="errorMessage" :class="{'d-none': !error}"/>
    <div :class="{'d-none': loading}" class="sticky">
      <div class="display-3 text-secondary">
        Hello
      </div>
      <h3 class="text-secondary">
        Please scan card to check symptoms
      </h3>
      <signed-in-list></signed-in-list>
    </div>
  </div>
</template>

<script>
import OrbitLoader from '../Loading/OrbitLoader.vue';
import serviceLocator from '../../services/serviceLocator';
import ErrorDisplay from '../Error/ErrorDisplay';
import SignedInList from '../signedInList/SignedInList.vue';

// const logger = require('logger').logger;
const eventService = serviceLocator.services.eventService;

export default {
  components: { OrbitLoader, ErrorDisplay, SignedInList },
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
    goToPath: function(location, matchUrl, params) {
      if(this.$router.currentRoute.path != matchUrl) {
        this.$router.push({
          name: location,
          params
        });
      }
    },
    scanEvent: function(data) {
      console.log(data)
      if(data.checkSypmtomsRequired) {
        if(data.needName) {
          this.goToPath('EnterName', `/enterName/${encodeURIComponent(data.id)}/false`, 
            {id: data.id, changeName: false}
          )
        } else {
          this.goToPath('Symptoms', `/symptoms/${encodeURIComponent(data.id)}/${data.name}`, 
            {id: data.id, name: data.name}
          )
        }
      } else {
        if(data.checkedIn) {
          this.goToPath('Goodbye', '/goodbye', 
              {name: data.name}
          )
        } else {
          this.$router.push({
            name: `Thanks`,
            params: {
                name: data.name,
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

<style scoped>
.sticky {
  position: sticky;
}
</style>