<template>
  <section class="layout">
    <LayoutHeader />

    <main>
      <LayoutSideBar />

      <div class="container">
        <LayoutBreadcrumbs />

        <RouterView v-slot="{ Component, route }">
          <transition name="fade-slide" mode="out-in">
            <div class="content">
              <component :is="Component" :key="route.path" />
            </div>
          </transition>
        </RouterView>
      </div>
    </main>
  </section>
</template>

<script lang="ts" setup>
import LayoutHeader from './Header/index.vue'
import LayoutSideBar from './SideBar/index.vue'
import LayoutBreadcrumbs from './Breadcrumbs/index.vue'
</script>
