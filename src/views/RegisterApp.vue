<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <main>
    <RegisterComponent></RegisterComponent>
  </main>
</template>
<script>
import RegisterComponent from "@/components/RegisterComponent";
import WhiteHeader from "@/components/WhiteHeader";
import { scrollTop } from "@/helpers/basicHelpers";
export default {
  name: "RegisterApp",
  created() {
    scrollTop();
  },
  components: { WhiteHeader, RegisterComponent },
};
</script>
<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
