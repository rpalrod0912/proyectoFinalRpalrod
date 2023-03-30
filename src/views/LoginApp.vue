<template>
  <WhiteHeader tipo="Dark"> </WhiteHeader>
  <main>
    <LoginComponent></LoginComponent>
  </main>
</template>
<script>
import LoginComponent from "@/components/LoginComponent.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";

export default {
  name: "LoginApp",
  components: { WhiteHeader, LoginComponent },
};
</script>
<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
