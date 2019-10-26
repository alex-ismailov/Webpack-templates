<template>
    <section id="promo" style="text-align:center;">
        <div class="container">
            <h1>Webpack message: {{ message }}</h1>
            <!-- Правильное подключение картинок -->
            <img src="/assets/img/webpack.jpg" alt=""> 
        </div>
    </section>
</template>


<script>
export default {
    data () {
        return {
            message: null 
        }
    },
    created () {
        this.message = this.$store.getters.getMessage
    }
}
</script>

<style lang="scss" scoped>
    h1 {
        color: red
    }
</style>