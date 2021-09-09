<template>
  <div class="hello">
    <div class="hello__item"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<style scoped lang="scss">
  .hello {
    width: 500px;
    height: 500px;
    background-color: aquamarine;
    display: flex;
    align-items: center;
    justify-content: center;

    &__item {
      width: 200px;
      height: 200px;
      background-color: aqua;
    }
  }
</style>
