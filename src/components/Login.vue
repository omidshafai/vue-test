<template>
    <div class="container">
        <div class="box">
            <ValidationObserver v-slot="{ invalid }">
                <ValidationProvider
                    rules="email|required"
                    v-slot="{ failedRules }"
                    style="width: 100%"
                >
                    <input type="text" v-model="userName" placeholder="Username" />
                    <span
                        class="box__error"
                        v-if="failedRules.email"
                    >Please enter a valid email address!</span>
                    <span class="box__error" v-if="failedRules.required">This field is required!</span>
                </ValidationProvider>

                <ValidationProvider rules="required" v-slot="{ failedRules }" style="width: 100%">
                    <input type="password" v-model="password" placeholder="Password" />
                    <span class="box__error" v-if="failedRules.required">This field is required!</span>
                </ValidationProvider>

                <input type="submit" :disabled="invalid" @click="authenticate" value="LOGIN" />
            </ValidationObserver>

            <span v-if="error" class="box__error">{{error}}</span>
        </div>
    </div>
</template>

<script>
import { extend } from "vee-validate";

extend("odd", value => {
    return value % 2 !== 0;
});

export default {
    data() {
        return {
            userName: "",
            password: "",
            error: ""
        };
    },
    methods: {
        authenticate() {
            if (
                this.userName === this.$store.state.userName &&
                this.password === this.$store.state.password
            ) {
                localStorage.auth_token =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
                this.$router.push("/panel");
            } else {
                this.error = "Invalid username or password!"
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    background: url("../assets/background.jpg") no-repeat;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box {
    flex-direction: column;
    width: 400px;
    height: auto;
    max-width: 90%;
    background-color: #ffffffcc;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px 36px;

    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        background-color: #ffffffdd;
        border-radius: 16px;
    }

    &__error {
        color: #ff4747;
        font-size: 11px;
        padding: 0 8px;
    }
}

input[type="text"],
input[type="password"] {
    outline: none;
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
}

input[type="submit"] {
    outline: none;
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 14px 20px;
    margin: 36px 0 8px 0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    font-weight: bold;

    &:hover {
        background-color: #45a049;
    }

    &[disabled="disabled"] {
        background-color: #888;
    }
}
</style>