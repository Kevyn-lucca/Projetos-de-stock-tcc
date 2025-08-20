<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
const sidebarStatus = useSidebarStatus();
</script>

<template>
  <div class="flex">
    <nav
      :class="{ 'w-72': sidebarStatus, 'w-20': !sidebarStatus }"
      class="sticky top-0 h-screen transition-all duration-300"
    >
      <MainSidebar class="sticky" />
    </nav>
    <div class="flex-1">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
