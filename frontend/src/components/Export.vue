<template>
    <div class="main">
        <div class="display-1 text-secondary">
            Export data
        </div>
        <div class="center">
            <div class="row">
                <datepicker 
                    v-model="startDate" 
                    :format="'MMMM dd yyyy'" 
                    :placeholder="'select date'"
                    class="col-md-2"
                >select date</datepicker>
                <div class="col-sm-3 text-secondary"><h3>to</h3></div>
                <datepicker 
                    v-model="endDate"
                    :format="'MMMM dd yyyy'"
                    :placeholder="'select date'"
                ></datepicker>
            </div>
        </div>
        <button type="button" class="btn btn-success" @click="submit()">
            <h4>Export</h4>
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

.btn {
    padding-top: 0.8rem;
}
</style>