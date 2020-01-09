import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl1dympNLayw6S5rlcpFbJHZnh6k4Y_mxuzqVrj4jBiRWx922r2A&s",
        firstName: "Omid",
        lastName: "Shafai",
        userName: "omidshafaiy@gmail.com",
        password: "123"
    },
    getters: {
        fullName: state => {
            return state.firstName + " " + state.lastName;
        }
    },
    mutations: {
        changeFirstName(state, value) {
            state.firstName = value;
        },
        changeLastName(state, value) {
            state.lastName = value;
        }
    },
    actions: {}
});