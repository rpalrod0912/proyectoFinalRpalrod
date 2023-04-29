<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <AppFooter></AppFooter>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";
export default {
  name: "ComprasApp",
  components: {
    WhiteHeader,
    AppFooter,
  },
};
</script>
<style lang="scss"></style>
