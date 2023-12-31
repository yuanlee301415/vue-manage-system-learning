<template></template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { path, ...query } = route.query
// console.log('redirect>:', { path, query })
router.replace({ path: (path ?? '/') as string, query })
</script>
