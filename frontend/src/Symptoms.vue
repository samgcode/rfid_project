<template>
    <div id="home" class="main">
        <div class="display-4 text-secondary">
        Welcome, {{user}}
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
        <router-link :to="{ name: 'Home' }" class="btn btn-success"><h4>I do not have any of these symptoms</h4></router-link>
        <!-- <button type="button" class="btn btn-success" @click="submit()">
            <h4>Reviews</h4>
        </button> -->
    </div>
</template>

<script>
export default {
  name: 'Symptoms',
  data() {
    return {
        user: 'admin',
        info: {
            user: "",
            timeIn: "",
            timeOut: "",
            checkedSymptoms: false
        }
    }
  },
  methods: {
    submit: function() {
        this.info.user = this.user;
        // this.info.tineIn = 
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