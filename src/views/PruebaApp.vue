<template>HOLA</template>
<script>
/*eslint-disable */
import axios from "axios";
const token =
  "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiaG9sYWphdmlAZ21haWwuY29tIiwiZXhwIjoxNjgxMjA2MDMyLCJpYXQiOjE2ODEyMDI0MzIsInNjb3BlIjoiIn0.GIVHN8wILi486YKQYmott6guw6ytbm4A7yDHU4NFhCzSu-z1f0Ma_TbYCktmZR3JxWoI28bu0zXt4cwJT0xWReLEAhyJZPwUEK24rqqDAaV9OfQgYzHrrmQnY_NB2uE7IuWuNS44sKG2KFk_mES08qsip2UYJ3NmhrDtfY0KrbjyrhdxZlT3jYR1_R1QywUo6MjRutQIgisljezapWZC4CLxoQLlOxXRg8p2apDYRHHVRse_W5kTPF_UZXmPcRxndF-GlTiOPSUyAkCHMFgjJ9m-wEqHgudq6bptwGi-j-aHiq7cW0aXNsAdvJvTy5jP3SlkHVqs__bhVKtVm573mg";
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
export default {
  async created() {
    debugger;
    await this.getToken();
    await this.getUsers();
  },
  data() {
    return {
      token: null,
    };
  },
  name: "PruebasApp",
  methods: {
    async getUsers() {
      const data = await axios
        .get("http://localhost:8080/users")
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => error);
      debugger;
      console.log(data);
    },
    async getToken() {
      debugger;
      const data = await axios
        .post(
          "http://localhost:8080/token",
          {},
          {
            auth: {
              username: "holajavi@gmail.com",
              password: "suspenso_01",
            },
          }
        )
        .then((res) => {
          debugger;
          this.token = res.data;
        });
      console.log(data);
      console.log(this.token);
    },
  },
};
</script>
<style></style>
