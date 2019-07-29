<template>
  <div>
    <h3 class="title">Name: {{player.name}}</h3>
    <h2 class="subtitle">Light Years Traveled: {{player.score}}</h2>
    <h2>{{message}}</h2>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  props: ["player", "message"]
};
</script>
