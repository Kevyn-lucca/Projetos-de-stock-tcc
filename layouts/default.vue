<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex">
    <nav class="sticky top-0 h-screen w-72">
      <MainSidebar class="sticky" />
    </nav>
    <div class="flex-1">
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>
