<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <main>
    <h1>ACCEDER</h1>
    <h2>INTRODUCE TU CORREO ELECTRÓNICO</h2>
    <label for="emailPhoneInput" class="TopMenu__item textoGruesoh1">
      INTRODUCE TU NÚMERO DE TELÉFONO O E-MAIL
    </label>
    <input
      v-model="mail"
      id="emailPhoneInput"
      name="emailPhoneInput"
      placeholder="Email/Número Móvil"
      type="text"
    />
    <input id="sigInButton" type="submit" class="nextButtonSubmit" />
  </main>
</template>
<script>
import WhiteHeader from "@/components/WhiteHeader.vue";

export default {
  name: "userNotLogged",
  components: { WhiteHeader },
};
</script>
<style lang="scss" scoped>
main {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
}
</style>
