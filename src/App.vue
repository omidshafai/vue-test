<template>
    <router-view />
</template>

<script>
export default {
    name: "app",
    components: {}
};
</script>

<style>
@font-face {
    font-family: "Vazir";
    src: url("assets/fonts/Vazir-FD.eot"); /* IE9 Compat Modes */
    src: url("assets/fonts/Vazir-FD.eot?#iefix") format("embedded-opentype"),
        /* IE6-IE8 */ url("assets/fonts/Vazir-FD.woff2") format("woff2"),
        /* Super Modern Browsers */ url("assets/fonts/Vazir-FD.woff")
            format("woff"),
        /* Pretty Modern Browsers */ url("assets/fonts/Vazir-FD.ttf")
            format("truetype"); /* Safari, Android, iOS */
}

html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
}

* {
    box-sizing: border-box;
    font-family: Vazir;
}

.loader {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #4caf50;
    border-bottom: 4px solid #4caf50;
    width: 96px;
    height: 96px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 600ms cubic-bezier(0, 0, 0.2, 1) infinite;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>