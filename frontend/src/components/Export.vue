<template>
    <div class="main">
        <div class="text-secondary">
            <h2>Export data</h2>
        </div>
        <div class="">
            <div class="row">
                <datepicker 
                    v-model="startDate" 
                    :format="'MMMM dd yyyy'" 
                    :placeholder="'select date'"
                    class="col-sm-2 date"
                >select date</datepicker>
                <div class="col-sm-2 text-secondary"><h5>to</h5></div>
                <datepicker 
                    v-model="endDate"
                    :format="'MMMM dd yyyy'"
                    :placeholder="'select date'"
                ></datepicker>
            </div>
        </div>
        <button type="button" class="btn btn-success" @click="submit()">
            <h6>Export</h6>
        </button>
    </div>    
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import serviceLocator from '../services/serviceLocator';

const exportService = serviceLocator.services.exportService;


export default {
    name: 'Export',
    components: {
        Datepicker        
    },
    data() {
        return {
            startDate: null,
            endDate: null
        }
    },
    methods: {
        submit: async function() {
            if(this.startDate === null || this.endDate === null) {
                await exportService.export();
            } else {
                await exportService.exportByDate(this.startDate, this.endDate);
            }
            this.$router.push({name: 'Home'});
        }
    }
}
</script>

<style scoped>
.center {
    margin-left: 32%;
    margin-right: 5%;
}

.date {
    margin-left: 15%;
    margin-right: 10%;
}

.btn {
    padding-top: 0.8rem;
}
</style>