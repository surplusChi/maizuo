<template>
    <div>
        <ul>
            <router-link to="/film/nowplaying" tag="li" active-class="fimlactive">
                正在热映
            </router-link>
            <router-link to="/film/comingsoon" tag="li" active-class="fimlactive">
                即将上映
            </router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    div{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        ul{
          display: flex;
          li{
            flex: 1;
          }
    }
    }
    .fimlactive{
        color: orange;
        border-bottom: 2px solid orange;
    }
</style>
