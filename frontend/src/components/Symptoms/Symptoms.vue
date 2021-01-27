<template>
    <div id="home" class="main">
        <div class="container">
            <div class="row justify-content-center">
                <div class="text-secondary my-auto col-sm-3">
                    <h2>Welcome, {{ name }}</h2>
                </div>
                <button type="button" class="btn btn-secondary btn-sm h-25 my-auto" @click="changeName()" :class="{'d-none': loading}">
                    Change name
                </button>
            </div>
        </div>
        <div class="text-secondary">
            <h4>Please check if you have these symptoms</h4>
        </div>
        <div class="container">
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
        </div>

        <sync-loader :loading="loading"/>
        <error-display :message="errorMessage" :class="{'d-none': !error}"/>

        <button type="button" class="btn btn-success" @click="submit()" :class="{'d-none': loading}">
            {{ btnText }}
        </button>
        <router-link :to='{name: "Home"}' class="btn btn-primary">Cancel</router-link>
    </div>
</template>

<script>
import serviceLocator from '../../services/serviceLocator';
import ErrorDisplay from '../Error/ErrorDisplay.vue';
import SyncLoader from '../Loading/SyncLoader.vue';

const symptomScanTimeService = serviceLocator.services.symptomScanTimeService;

export default {
  components: { SyncLoader, ErrorDisplay },
  name: 'Symptoms',
  data() {
    return {
        name: '',
        id: 0,
        symptomList: [//https://www.alberta.ca/covid-19-testing-in-alberta.aspx
            {col1:'cough', col2:'fever', col3:'shortness of breath', col4:'runny nose', col5:'sore throat'},
            {col1:'Painful swallowing', col2:'Chills', col3:'Headache', col4:'Muscle or joint aches', col5:'Feeling unwell or fatigue'},
            {col1:'Nausea', col2:'vomiting', col3:'unexplained loss of appetite', col4:'Loss of sense of smell or taste', col5:'Conjunctivitis, also known as pink eye',},
        ],
        loading: false,
        error: false,
        btnText: 'I do not have any of these symptoms',
        errorMessage: "backend not responding, if it isn't resolved in a minute try restarting the raspberry pi"
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
        this.error = false;
        this.loading = true;
        this.timeOut();
        await symptomScanTimeService.updateSymptomScanTime(this.$route.params.id, true);
        this.$router.push({name: 'Home'});
    },
    timeOut: function() {
        setTimeout(() => {
            this.btnText = 'Try again'
            this.error = true;
            this.loading = false;
        }, 10000);
    },
    changeName: function() {
        if(this.$router.currentRoute.path != `/enterName/${this.id}/true`) {
            this.$router.push({
                name: `EnterName`,
                params: {
                    id: this.id,
                    changeName: true
                }
            });
        }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
  }
}
</script>

<style scoped>
</style>