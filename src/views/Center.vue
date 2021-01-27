<template>
    <div>
        center
    </div>
</template>

<script>
export default {
  // 局部路由拦截，局部导航守卫 组件内部的路由拦截
  beforeRouteEnter (to, from, next) {
    // ...
    if (!localStorage.getItem('token')) {
      next('./login') // 如果满足通过条件，就路由到login去
    } else {
      next()
    }
  }
}
</script>
