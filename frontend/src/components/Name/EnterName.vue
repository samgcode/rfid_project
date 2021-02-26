<template>
    <div id="home" class="main">
        <div :class="{'d-none': changeName}">
            <div class="text-secondary">
                <h3>New UID detected</h3>  
            </div>
            <div class="text-secondary">
                <h6>Please enter your name</h6>
            </div>
        </div>

        <div :class="{'d-none': !changeName}">
            <div class="text-secondary">
                <h3>Please enter new name</h3>  
            </div>
        </div>

        <div class="container">
            <form @submit.prevent="submit()">
                <div class="form-row row justify-content-center">
                    <div class="form-group w-50">
                        <input 
                            @focus="$event.target.select()"
                            ref="nameInput"
                            type="text" 
                            name="name" 
                            id="nameInput" 
                            class="form-control"
                            :class="{'border-danger': !isValid}"
                            placeholder="Enter your name"
                            v-model="name" 
                        >
                    </div>
                </div>
            </form>
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

const userService = serviceLocator.services.userService;
const symptomScanTimeService = serviceLocator.services.symptomScanTimeService;

export default {
  components: { SyncLoader, ErrorDisplay },
  name: 'EnterName',
  data() {
    return {
        uid: '',
        name: '',
        changeName: false,
        isValid: true,
        loading: false,
        error: false,
        btnText: 'Continue',
        errorMessage: "backend not responding, if it isn't resolved in a minute try restarting the raspberry pi"
    }
  },
  watch: {
      $route() {
        this.uid = this.$route.params.id;
      }
  },
  methods: {
    submit: async function() {
        if(this.valid()) {
            this.error = false;
            this.loading = true;
            this.timeOut();
            if(this.changeName) {
                await userService.updateUser(this.uid, this.name);
            } else {
                await userService.addUser(this.uid, this.name);
                await symptomScanTimeService.addSymptomScanTime(this.uid);
            }
            
            this.$router.push({
                name: `Symptoms`,
                params: {
                    id: this.uid,
                    name: this.name    
                }
            });
        }
    },
    timeOut: function() {
        setTimeout(() => {
            this.btnText = 'Try again'
            this.error = true;
            this.loading = false;
        }, 10000);
    },
    valid: function() {
        if(this.name === '') {
            this.isValid = false;
            return false;
        }
        this.isValid = true;
        return true;
    }
  },
  mounted() {
    this.uid = this.$route.params.id;
    this.changeName = this.$route.params.changeName;
    this.$refs.nameInput.focus();
  }
}
</script>

<style scoped>
.border-danger::placeholder {
    color: #de0000;
}
</style>