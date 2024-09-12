<script setup>
const {$cookies} = useNuxtApp()

const cookieValue = $cookies.get('cookieName')

const setupCookie = () => {
  $cookies.set('cookieName', 'cookieValue')
}

</script>

<template>
  <div>
    <h1>Cookie Value: {{ cookieValue || "Doesn't exists"}}</h1>
    <button @click="setupCookie">Create cookie</button>
  </div>
</template>
