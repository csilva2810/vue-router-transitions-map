import Vue from "vue";
import VueRouter from "vue-router";

import "./styles.scss";

Vue.use(VueRouter);

Vue.component("app-view", {
  name: "AppView",
  props: ["leftButton", "title", "rightButton"],
  template: `
  	<div class="view">
    	<header class="header">
      	<router-link
        	tag="button"
          :to="leftButton"
          v-if="leftButton"
          class="left-button"
				><i class="fas fa-angle-left" /></router-link>
        
        {{ title }}
        
        <router-link
        	tag="button"
          :to="rightButton"
          v-if="rightButton"
          class="right-button"
				>ENVIAR</router-link>
      </header>
      
      <section class="content">
      	<slot></slot>
      </section>
    </div>
  `
});

const Home = {
  template: `
		<app-view title="Home">
			<div slot="default">
				<router-link to="/list-patient">Prescrever</router-link>
			</div>
		</app-view>
		`
};
const ListPatient = {
  template: `
		<app-view title="Listar Pacientes" left-button="/">
			<div slot="default">
				<router-link to="/create-patient">Criar Novo</router-link>
			</div>
		</app-view>
		`
};
const CreatePatient = {
  template: `
		<app-view title="Criar Paciente" left-button="/list-patient">
			<div slot="default">
				<router-link to="/prescription">Criar e Prescrever</router-link>
			</div>
		</app-view>
		`
};
const Prescription = {
  template: `
		<app-view title="Prescrever" left-button="/" right-button="/print">
			<div slot="default">
      	<input type="text" />
				<router-link class="add" to="/add-drug"><i class="fas fa-plus"></i></router-link>
			</div>
		</app-view>
		`
};
const AddDrug = {
  template: `
		<app-view title="Adicionar" left-button="/prescription">
			<div slot="default">
				<router-link to="/prescription">Amoxicilina</router-link>
			</div>
		</app-view>
		`
};
const Print = {
  template: `
		<app-view title="Enviar e Imprimir">
			<div slot="default">
				<router-link to="/">Enviar</router-link>
			</div>
		</app-view>
		`
};

new Vue({
  router: new VueRouter({
    routes: [
      { path: "/", name: "home", component: Home },
      { path: "/list-patient", name: "list-patient", component: ListPatient },
      {
        path: "/create-patient",
        name: "create-patient",
        component: CreatePatient
      },
      { path: "/prescription", name: "prescription", component: Prescription },
      { path: "/add-drug", name: "add-drug", component: AddDrug },
      { path: "/print", name: "print", component: Print }
    ]
  }),
  data: function() {
    return {
      leaveTransition: "",
      enterTransition: "",
      transitionsMap: {
        "home > list-patient": {
          leave: "",
          enter: "fadeInUp"
        },
        "list-patient > home": {
          leave: "fadeOutDown slow",
          enter: "fadeIn"
        },
        "list-patient > create-patient": {
          leave: "fadeOutLeft",
          enter: "fadeInRight"
        },
        "create-patient > list-patient": {
          leave: "fadeOutRight",
          enter: "fadeInLeft"
        },
        "create-patient > prescription": {
          leave: "fadeOutDown slow",
          enter: "fadeIn"
        },
        "prescription > home": {
          leave: "fadeOutRight",
          enter: "fadeInLeft"
        },
        "prescription > add-drug": {
          leave: "fadeOut",
          enter: "fadeInUp"
        },
        "add-drug > prescription": {
          leave: "fadeOutDown slow",
          enter: "fadeIn"
        },
        "prescription > print": {
          leave: "fadeOutLeft",
          enter: "fadeInRight"
        },
        "print > home": {
          leave: "fadeOutDown slow",
          enter: "fadeIn"
        }
      }
    };
  },
  watch: {
    $route(to, from) {
      const map = this.transitionsMap[`${from.name} > ${to.name}`] || {
        leave: "fadeOut",
        enter: "fadeIn"
      };
      const { leave, enter } = map;

      this.leaveTransition = `animated ${leave}`;
      this.enterTransition = `animated ${enter}`;
    }
  },
  template: `
  	<div class="app">
    	<transition
        :leave-active-class="leaveTransition"
        :enter-active-class="enterTransition"
      >
      	<router-view />
      </transition>
    </div>
  `
}).$mount("#app");
