<template>
    <div id="home" class="main">
        <div class="display-3 text-secondary">
            Welcome,
        </div>
        <div class="text-secondary">
            <h2>Please check your symptoms</h2>
        </div>

        <hr> 
        <h5 class="symptoms">
            insert symptom here
        </h5> 
        
        <hr>
        <h5 class="symptoms">
            insert symptom here
        </h5>

        <hr>
        <button type="button" class="btn btn-success" @click="submit()">
            <h4>I do not have any of these symptoms</h4>
        </button>
    </div>
</template>

<script>
import serviceLocator from '../services/serviceLocator';

const timeService = serviceLocator.services.timeService;

export default {
  name: 'Symptoms',
  props: ['uid'],
  data() {
    return {

    }
  },
  methods: {
    submit: async function() {
        await timeService.updateTime('111111111', true);
        this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style scoped>
.symptoms {
    text-align: left;
    padding-left: 10%;
}

.btn {
    padding-top: 0.8rem;
}
</style>