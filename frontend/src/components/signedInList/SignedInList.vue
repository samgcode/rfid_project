<template>
  <div class="main">
    <orbit-loader :loading="loading" />
    <error-display :message="errorMessage" :class="{ 'd-none': !error }" />
    <div :class="{ 'd-none': loading }">
      <hr />
      <h3 class="text-secondary signed-in">Who is currently signed out?</h3>
      <h4 v-show="checkedInList.length === 0" class="text-secondary">no one is currently signed out</h4>
      <ul>
        <li v-for="user in checkedInList" :key="user.uid" class="row">
          <h3 v-show="user.signedIn" class="text-right px-5 text-danger">Signed out</h3>
          <h3 v-show="user.signedIn" class="text-left">{{user.name}}</h3>
          <!-- <h3 v-show="user.signedIn" class="text-right px-5 text-danger">Signed out</h3> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OrbitLoader from '../Loading/OrbitLoader.vue';
import serviceLocator from '../../services/serviceLocator';
import ErrorDisplay from '../Error/ErrorDisplay';

const userService = serviceLocator.services.userService

export default {
  data() {
    return {
      loading: true,
      error: false,
      errorMessage:
        "test",
      checkedInList: []
    };
  },
  components: {
    OrbitLoader,
    ErrorDisplay
  },
  async mounted() {
    try {
      this.checkedInList = await userService.getCurrentlySignedIn()
      this.loading = false
    } catch(err) {
      loading = false
      this.error = true
      this.errorMessage = err
    }
  }
};
</script>


<style scoped>
ul {
  list-style-type: none;
}

.signed-in {
  border-top: gray;
}
</style>