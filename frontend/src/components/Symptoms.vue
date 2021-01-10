<template>
    <div id="home" class="main">
        <div class="text-secondary">
            <h3>Welcome</h3>  
        </div>
        <div class="text-secondary">
            <h6>Please check if you have these symptoms</h6>
        </div>

        <div v-for="symptom in symptomList" :key="symptom">
            <hr> 
            <div class="row">
                <div class="symptoms col-sm-3">
                    {{symptom.col1}}
                </div>
                <div class="symptoms col-sm-3">
                    {{symptom.col2}}
                </div>
                <div class="symptoms col-sm-3">
                    {{symptom.col3}}
                </div>
                <div class="symptoms col-sm-3">
                    {{symptom.col4}}
                </div>
            </div> 
        </div>
        <hr>

        <button type="button" class="btn btn-success" @click="submit()">
            <h6>I do not have any of these symptoms</h6>
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
        symptomList: [//https://www.alberta.ca/covid-19-testing-in-alberta.aspx
            {col1:'cough', col2:'fever', col3:'shortness of breath', col4:'runny nose'},
            {col1:'sore throat', col2:'Painful swallowing', col3:'Chills', col4:'Headache'},
            {col1:'Muscle or joint aches', col2:'Feeling unwell or fatigue', col3:'Nausea', col4:'vomiting'},
            {col1:'unexplained loss of appetite', col2:'Loss of sense of smell or taste', col3:'Conjunctivitis, also known as pink eye', col4:''},
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
hr {
    padding-top: 0%;
}

.symptoms {
    text-align: left;
    padding-left: 10%;
    font-size: 11px;
}

.btn {
    padding-top: 0.8rem;
}
</style>