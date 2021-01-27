<template>
    <div>
        <span id="title">{{title}}</span>
    </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="scss" scoped>
    div{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        z-index: 98;
        background-color: white;
        #title{
            font-size: 17px;
            color: #191a1b;
            z-index: 99;
        }
    }
</style>
