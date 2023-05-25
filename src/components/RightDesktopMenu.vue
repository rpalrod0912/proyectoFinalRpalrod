<template>
  <div class="userOrderMenu">
    <div class="cabeceraMenu">
      <h1 class="TopMenu__item textoGruesoh1">
        HOLA {{ userData.nombre.toUpperCase() }}
        {{ userData.apellidos.toUpperCase() }}
      </h1>
    </div>
    <div class="separadorBlack"></div>
    <div class="menuOptions">
      <div class="parentElement">
        <div class="subElement" id="firstOption">
          <h2>Mis Compras</h2>
          <img src="../assets/Caja.png" />
        </div>
        <div class="subElement" id="secondOption">
          <h2>Datos Personales</h2>
          <img src="../assets/huella.png" />
        </div>
        <div class="subElement" id="thirdOption">
          <h2>Métodos de pago</h2>
          <img src="../assets/tarjeta.png" />
        </div>
        <div class="subElement" id="fourthOption">
          <h2>Política de Privacidad</h2>
          <img src="../assets/alertaPng.png" />
        </div>
      </div>
      <div class="separadorBlack"></div>

      <input
        @click="logOut"
        class="nextButtonSubmit"
        type="button"
        value="CERRAR SESIÓN"
      />
    </div>
  </div>
</template>
<script>
/*eslint-disable */
export default {
  name: "RightDesktopMenu",
  mounted() {
    if (this.selectedOption !== null) {
      console.log(this.selectedOption);
      document.getElementById(this.selectedOption).classList.add("usOption");
    }
    console.log(this.userData);
  },
  data() {
    return {};
  },
  props: {
    userData: Object,
    selectedOption: String,
  },
};
</script>
<style lang="scss">
.userOrderMenu {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #f9f9f9;
  width: 30%;
  height: 100%;
  right: 0rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .cabeceraMenu {
    box-shadow: none;
  }
  .separadorBlack {
    width: 70%;
    margin: 0 auto;
    margin-top: 1.3rem;
    margin-bottom: 1.3rem;
  }
}
.menuOptions .parentElement {
  list-style: none;
}
.menuOptions {
  img {
    padding-left: 1.5rem;
    width: 2.8rem;
    height: 2.3rem;
  }
}
.menuOptions .subElement {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menuOptions .usOption h2 {
  color: #242424;
}
.menuOptions .parentElement .subElement h2 {
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;

  color: #949494;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 900px) and (max-width: 1400px) {
  .userOrderMenu {
    width: 35%;
    font-size: 0.8rem;

    .menuOptions ul {
      left: -4rem;
    }
    .menuOptions li img {
      left: 18rem;
    }
    .nextButtonSubmit {
      width: 16rem;
    }
  }
}

@media (min-width: 686px) and (max-width: 899px) {
  .userOrderMenu {
    display: none;
  }
}

@media (min-width: 580px) and (max-width: 685px) {
  .userOrderMenu {
    display: none;
  }
}

@media (max-width: 579px) {
  .userOrderMenu {
    display: none;
  }
}
</style>
