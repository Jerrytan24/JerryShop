import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex)
const actions = {
	user(context,value){
		context.commit('USER',value)
	},
	userId(context,value){
		context.commit('USERID',value)
	},
	setMask(context,value){
		context.commit('SETMASK',value);
	}
}
const mutations = {
	USERID(state,value){
		state.usernameId = value;
	},
	USER(state,value){
		state.username = value;
	},
	SETMASK(state,value){
		state.JerryMask = value;
	}
}
const state = {
	username:'',
	usernameId:0,
	JerryMask:false,
}
const store = new Vuex.Store({
	actions,
	mutations,
	state,
})

export default store;