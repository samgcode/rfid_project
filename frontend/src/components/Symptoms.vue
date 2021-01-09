<template>
    <div id="home" class="main">
        <div class="display-3 text-secondary">
            Welcome,
        </div>
        <div class="text-secondary">
            <h2>Please check if you have these symptoms</h2>
        </div>

        <div v-for="symptom in symptomList" :key="symptom">
            <hr> 
            <h5 class="symptoms">
                {{symptom}}
            </h5> 
        </div>
        <hr>

        <button type="button" class="btn btn-success" @click="submit()">
            <h4>I do not have any of these symptoms</h4>
        </button>
    </div>
</template>

<script>
import serviceLocator from '../services/serviceLocator';

const symptomScanTimeService = serviceLocator.services.symptomScanTimeService;

export default {
  name: 'Symptoms',
  data() {
    return {
        symptomList: [
            'fever',
            'dry cough',
            'tiredness',
            'aches and pains',
            'sore throat',
            'diarrhoea',
            'conjunctivitis',
            'headache',
            'loss of taste or smell',
            'a rash on skin',
            'discolouration of fingers or toes'
        ]
    }
  },
  methods: {
    submit: async function() {
        await symptomScanTimeService.updateSymptomScanTime(this.$route.params.id, true);
        this.$router.push({name: 'Home'});
    }
  },
  mounted() {
    console.log(this.$route.params.id);
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