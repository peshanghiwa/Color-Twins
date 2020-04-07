<template>
  <div id="app">
    <!-- <header-comp v-on:gameGenerator="test('$event')"></header-comp>
    <game-body v-on:gameGenerator="test('$event')"></game-body>-->
    <router-view></router-view>
  </div>
</template>

<script>
import header from "./components/header.vue";
import gameBody from "./components/game-body.vue";
export default {
  name: "app",
  components: {
    "header-comp": header,
    "game-body": gameBody
  },
  methods: {
    test(event) {
      console.log(event);
    }
  }
};
</script>
