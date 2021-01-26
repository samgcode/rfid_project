<template>
    <div class="container">
        <div class="alert alert-danger error">
            <h6><strong>ERROR: {{ message }}</strong></h6>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                required: true
            },
            dissmisable: { 
                type: Boolean,
                default: false 
            }
        }
    }
</script>