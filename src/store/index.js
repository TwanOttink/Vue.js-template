import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

export default new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem("token"),
        user: {},
        pending: false,
    },
    mutations: {
        [LOGIN](state) {
            state.pending = true;
        },
        [LOGIN_SUCCESS](state) {
            state.isLoggedIn = true;
            state.pending = false;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
        }
    },
    actions: {
        login({commit, state}, data) {
            console.log(data);
            commit(LOGIN);

            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            };
            return new Promise((resolve, reject) => {
                fetch("http://127.0.0.1:8000/api/auth/login", requestOptions)
                    .then(response => response.json())
                    .then(res => {
                        if (res.success === true) {
                            state.user = res.user;
                            console.log(state.user);
                            commit(LOGIN_SUCCESS);
                            resolve();
                            localStorage.setItem("token", res.user.access_token);
                        } else {
                            reject()
                        }
                        console.log(res);
                    }).catch((err) => {
                    console.log(err)
                    reject()
                });
            });
        },
        logout({commit}) {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            axios
                .post("http://127.0.0.1:8000/api/auth/logout", {}, config) /*door axios bug eerst {} dan config*/
                .then(() => {
                    localStorage.removeItem("token");
                    commit(LOGOUT);
                })
                .catch((err) => {
                    console.warn(err);
                });
        },
        getUser({commit, state}) {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            axios
                .get("http://127.0.0.1:8000/api/user", config)
                .then((res) => {
                    state.user = res.data;
                    commit(LOGIN_SUCCESS);
                })
                .catch((err) => {
                    console.warn(err);
                    localStorage.removeItem("token");
                    state.user = {};
                });
        }
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn
        }
    }
});