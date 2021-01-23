<template>
    <div id="home" class="main">
        <div class="text-secondary">
            <h3>New UID detected</h3>  
        </div>
        <div class="text-secondary">
            <h6>Please enter your name</h6>
        </div>

        <form @submit.prevent="submit()" class="form">
            <div class="form-row row">
                <div class="form-group  col-md-12">
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
        
        <sync-loader :loading="loading"/>
        <error-display :message="errorMessage" :class="{'d-none': !error}"/>

        <button type="button" class="btn btn-success" @click="submit()" :class="{'d-none': loading}">
            <h6>{{ btnText }}</h6>
        </button>
    </div>
</template>

<script>
import serviceLocator from '../services/serviceLocator';
import ErrorDisplay from './ErrorDisplay.vue';
import SyncLoader from './SyncLoader.vue';

const userService = serviceLocator.services.userService;

export default {
  components: { SyncLoader, ErrorDisplay },
  name: 'EnterName',
  data() {
    return {
        uid: '',
        name: '',
        isValid: true,
        loading: false,
        error: false,
        btnText: 'Continue',
        errorMessage: "backend not responding, if it isn't resolved in a minute try restating the raspberry pi"
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
            await userService.addUser(this.uid, this.name);
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
    this.$refs.nameInput.focus();
  }
}
</script>

<style scoped>
hr {
    padding-top: 0%;
}

.btn {
    margin-top: 10px;
    padding-bottom: 0.05rem;
}

.border-danger::placeholder {
    color: #de0000;
}

.form {
    margin: 0 auto;
    width: 40%;
}
</style>