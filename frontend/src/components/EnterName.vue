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

        <button type="button" class="btn btn-success" @click="submit()">
            <h6>Continue</h6>
        </button>
    </div>
</template>

<script>
import serviceLocator from '../services/serviceLocator';

const userService = serviceLocator.services.userService;

export default {
  name: 'EnterName',
  data() {
    return {
        uid: '',
        name: '',
        isValid: true,
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
            userService.addUser(this.uid, this.name);
            this.$router.push({
                name: `Symptoms`,
                params: {
                    id: this.uid,
                    name: this.name    
                }
            });
        }
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