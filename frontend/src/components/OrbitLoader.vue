<template>
    <div :class="{ 'd-none': !loading }">
        <h2>Waiting for backend</h2>
        <clip-loader :size="'50px'"/>
    </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
export default {
    props: ['loading'],
    components: {
        ClipLoader
    },
}
</script>