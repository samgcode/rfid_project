  
<template>
    <div :class="{ 'd-none': !loading }">
        <sync-loader :size="'13px'"/>
        <h2>Please wait</h2>
    </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
export default {
    props: ['loading'],
    components: {
        SyncLoader
    },
}
</script>