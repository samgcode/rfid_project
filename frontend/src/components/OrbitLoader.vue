<template>
    <div :class="{ 'd-none': !loading }">
        <clip-loader :size="'50px'"/>
        <h2>Waiting for backend</h2>
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