<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">

@import './sass/bootstrap';
@import './sass/variables';

body{
  overflow: scroll;
}
#app {
  font-family: $font, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
}


</style>
