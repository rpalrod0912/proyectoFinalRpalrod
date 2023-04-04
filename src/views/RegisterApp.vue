import WhiteHeader from '@/components/WhiteHeader.vue';

<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <main>
    <RegisterComponent></RegisterComponent>
  </main>
</template>
<script>
import RegisterComponent from "@/components/RegisterComponent";
import WhiteHeader from "@/components/WhiteHeader";
export default {
  name: "RegisterApp",
  components: { WhiteHeader, RegisterComponent },
};
</script>
<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
