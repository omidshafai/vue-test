<template>
    <infinite-scroll
        class="container"
        :threshold="50"
        :busy="showLoading"
        :callback="this.onScrollEnd"
    >
        <div class="flex-auto search-wrapper">
            <input
                class="search"
                placeholder="جستجو کنید ..."
                v-model="searchText"
                @keyup="search('hello')"
            />
        </div>
        <div class="flex-auto list">
            <div class="list-item-wrapper" v-for="(item, index) in list" :key="item.id">
                <div class="list-item">
                    <img class="list-item__image" :src="item.image + '?random=' + index" />
                    <div class="list-item__column">
                        <span class="list-item__title">{{item.title}}</span>
                        <span class="list-item__subtitle">{{item.description}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="loader-wrapper flex-auto">
            <div v-if="showLoading" class="loader"></div>
        </div>
    </infinite-scroll>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            searchText: "",
            list: [],
            page: 1,
            hasMoreData: true,
            showLoading: false
        };
    },
    methods: {
        onScrollEnd() {
            this.getList();
        },
        search(message) {
            console.log(message)

            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
                this.searchTimer = null;
            }
            this.searchTimer = setTimeout(() => {
                this.page = 1;
                this.list = [];
                this.hasMoreData = true;
                this.getList();
            }, 1000);
        },
        getList() {
            if (this.hasMoreData) {
                this.showLoading = true;
                axios
                    .get(
                        "http://my-json-server.typicode.com/omidshafai/test/posts" +
                            this.page
                    )
                    .then(response => {
                        this.list.push(...response.data);

                        this.page = this.page + 1;

                        this.hasMoreData = response.data.length == 10;
                    })
                    .finally(() => {
                        this.showLoading = false;
                    });
            }
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang="scss" scoped>
.flex-auto {
    flex: 0 0 auto;
}
.container {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.search-wrapper {
    padding: 24px;
}
.search {
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 24px;
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;
}
.loader-wrapper {
    display: flex;
    justify-content: center;
    margin: 24px 0;
    min-height: 96px;
}
.list {
    flex-flow: row wrap;
    display: flex;
    flex-direction: row;
}

.list-item-wrapper {
    padding: 16px;
    flex: 0 0 33%;
}

.list-item {
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-right: 16px;
    }

    &__title {
        font-weight: bold;
        font-size: 15px;
    }

    &__subtitle {
        margin-top: 8px;
        font-weight: 200;
        font-size: 12px;
        color: #777;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__image {
        border-radius: 16px;
        width: 80px;
        height: 80px;
        min-width: 80px;
        min-height: 80px;
    }
}
</style>