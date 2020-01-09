<template>
    <div class="container">
        <div class="box">
            <div class="box__inner user">
                <div class="user__image">
                    <img :src="userImage" />
                </div>
                <div class="user__details">
                    <span class="user__input-label">نام کاربری</span>
                    <input
                        class="user__input"
                        type="text"
                        disabled="disabled"
                        v-model="userName"
                    />
                    <span class="user__input-label">نام</span>
                    <input class="user__input" type="text" v-model="firstName" />
                    <span class="user__input-label">نام خانوادگی</span>
                    <input class="user__input" type="text" v-model="lastName" />
                </div>
            </div>
        </div>

        <div class="box" style="margin-right: 16px">
            <div class="box__inner weather">
                <div class="weather__details" v-if="!showWeatherLoading && weather">
                    <span>{{weather.request[0].query}}</span>
                    <span>{{weather.current_condition[0].temp_C}} درجه سیلسیوس</span>
                    <span>رطوبت {{weather.current_condition[0].humidity}} درصد</span>
                    <span>سرعت باد {{weather.current_condition[0].windspeedKmph}} کیلومتر بر ساعت</span>
                </div>
                <div class="weather__status" v-if="!showWeatherLoading && weather">
                    <img :src="weather.current_condition[0].weatherIconUrl[0].value" />
                    <span>{{weather.current_condition[0].weatherDesc[0].value}}</span>
                </div>
                <div v-if="showWeatherLoading" class="loader"></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            weather: null,
            showWeatherLoading: false,
        };
    },
    methods: {},
    computed: {
        userImage() {
            return this.$store.state.userImage;
        },
        firstName: {
            get() {
                return this.$store.state.firstName
            },
            set(value) {
                this.$store.commit('changeFirstName', value)
            }
        },
        lastName: {
            get() {
                return this.$store.state.lastName
            },
            set(value) {
                this.$store.commit('changeLastName', value)
            }
        },
        userName() {
            return this.$store.state.userName
        }
    },
    mounted() {
        this.showWeatherLoading = true;
        axios
            .get(
                "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=f70c54226c6b45a191b92421193112&q=mashhad&format=json&num_of_days=1&date=today"
            )
            .then(response => {
                this.weather = response.data.data;
            })
            .finally(() => {
                this.showWeatherLoading = false;
            });
    }
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    overflow-y: auto;
}

.box {
    flex: 1 1 50%;
    padding: 24px;

    &__inner {
        background-color: white;
        min-height: 250px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
}

.weather {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 32px;

    &__details {
        display: flex;
        flex-direction: column;
        flex: 1 1 50%;

        > span:nth-child(1) {
            font-size: 26px;
            margin: 16px 0;
            font-weight: bold;
        }
        > span:nth-child(2) {
            font-size: 16px;
            margin: 4px 0;
        }
        > span:nth-child(3),
        span:nth-child(4) {
            font-size: 11px;
            font-weight: 100;
        }
    }

    &__status {
        display: flex;
        flex-direction: column;
        flex: 1 1 50%;
        align-items: center;

        > img {
            width: 72px;
            height: 72px;
            border-radius: 16px;
        }

        > span {
            margin-top: 16px;
        }
    }
}

.user {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;

    &__details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    &__image {
        flex: 1 1 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
            width: 128px;
            height: 128px;
            border-radius: 40px;
        }
    }
    &__input-label {
        font-size: 11px;
        color: #555;
        font-weight: 100;
        margin: 8px 4px;
    }
    &__input {
        padding: 8px 12px;
        color: #333;
        outline: none;
        border: none;
        font-size: 14px;
        background: #f5f5f5;
        border-radius: 8px;

        &[disabled]{
            cursor: not-allowed;
        }
    }
    &__details {
        flex: 1 1 50%;
        margin-right: 24px;
    }
}
</style>