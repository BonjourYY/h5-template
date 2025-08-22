<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </Suspense>
  </router-view>
</template>
