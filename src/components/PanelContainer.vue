<template>
    <div class="container">
        <div class="sidebar">
            <div class="sidebar__user-details">
                <img class="sidebar__user-image" :src="userImage" />

                <span class="sidebar__user-name">{{userName}}</span>

                <span class="sidebar__fullname">{{fullName}}</span>
            </div>
            <ul class="sidebar__menu-items">
                <router-link
                    :class="['sidebar__menu-item', {'sidebar__menu-item--active' : $route.name === 'dashboard'}]"
                    to="/panel">
                    <span class="mdi mdi-view-dashboard"></span>
                    <span class="sidebar__menu-item-text">داشبورد</span>
                </router-link>
                <router-link
                    :class="['sidebar__menu-item', {'sidebar__menu-item--active' : $route.name === 'posts'}]"
                    to="/panel/posts">
                    <span class="mdi mdi-format-list-text"></span>
                    <span class="sidebar__menu-item-text">پست ها</span>
                </router-link>
                <a class="sidebar__menu-item" @click="logout()">
                    <span class="mdi mdi-logout"></span>
                    <span class="sidebar__menu-item-text">خروج</span>
                </a>
            </ul>
        </div>
        <div class="children-root">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    computed: {
        userImage(){
            return this.$store.state.userImage;
        },
        fullName() {
            return this.$store.getters.fullName;
        },
        userName() {
            return this.$store.state.userName;
        }
    },
    methods: {
        logout() {
            localStorage.auth_token = "";
            this.$router.push("/");
        }
    },
    mounted () {
        if (!localStorage.auth_token) {
            this.$router.push("/");
        }
    }
};
</script>

<style lang="scss" scoped>
* {
    color: #333;
}

.container {
    direction: rtl;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}

.sidebar {
    overflow-y: auto;
    flex: 1 1 20%;
    max-width: 240px;
    border-left: 1px solid #ccc;
    display: flex;
    flex-direction: column;

    &__user-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        border-bottom: 1px solid #ccc;
    }
    &__user-image {
        border-radius: 200px;
        width: 100px;
        height: 100px;
    }
    &__user-name {
        margin-top: 24px;
        font-size: 18px;
    }
    &__fullname {
        margin-top: 4px;
        font-size: 14px;
        font-weight: 100;
        color: #777;
    }
    &__menu-items {
        list-style: none;
        padding: 0;
    }
    &__menu-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        padding: 16px 32px;
        transition: 0.3s;
        text-decoration: none;

        &--active {
            background-color: #ddd !important;
        }

        &:hover {
            background-color: #eee;
        }
    }
    &__menu-item-text {
        margin-right: 16px;
    }
}
.children-root {
    flex: 1 1 80%;
    background-color: #fafafa;
}
</style>