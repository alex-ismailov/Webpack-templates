<template>
    <section id="promo" style="text-align:center;">
        <div class="container">
            <h1>Vue message: {{ message }}</h1>
            <!-- Правильное подключение картинок -->
            <img src="/assets/img/webpack.jpg" alt=""> 
        </div>
    </section>
</template>


<script>
//import example from '~/components/Example.vue' // https://youtu.be/jWdcw7qkqT0?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=818
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