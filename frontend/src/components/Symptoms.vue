<template>
    <div id="home" class="main">
        <div class="text-secondary">
            <h2>Welcome, {{ name }}</h2>
        </div>
        <div class="text-secondary">
            <h4>Please check if you have these symptoms</h4>
        </div>
        
        <table class="table">
            <tbody>
                <div v-for="symptom in symptomList" :key="symptom.col1">
                    <tr class="row">
                        <td class="col-sm-2"><h5>{{symptom.col1}}</h5></td>
                        <td class="col-sm-2"><h5>{{symptom.col2}}</h5></td>
                        <td class="col-sm-2"><h5>{{symptom.col3}}</h5></td>
                        <td class="col-sm-3"><h5>{{symptom.col4}}</h5></td>
                        <td class="col-sm-3"><h5>{{symptom.col5}}</h5></td>
                    </tr>
                </div>
            </tbody>
        </table>

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
        name: '',
        symptomList: [//https://www.alberta.ca/covid-19-testing-in-alberta.aspx
            {col1:'cough', col2:'fever', col3:'shortness of breath', col4:'runny nose', col5:'sore throat'},
            {col1:'Painful swallowing', col2:'Chills', col3:'Headache', col4:'Muscle or joint aches', col5:'Feeling unwell or fatigue'},
            {col1:'Nausea', col2:'vomiting', col3:'unexplained loss of appetite', col4:'Loss of sense of smell or taste', col5:'Conjunctivitis, also known as pink eye',},
        ]
    }
  },
  watch: {
    $route() {
        console.log(this.$route.params.id);
        this.name = this.$route.params.name;
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
    this.name = this.$route.params.name;
  }
}
</script>

<style scoped>
hr {
    padding-top: 0%;
}

.table {
    margin-left: 2%;
    width: 96%;
}

.btn {
    padding-top: 0.8rem;
}
</style>