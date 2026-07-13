<script setup lang="ts">
// Admin layout - similar to dashboard but with admin-specific branding
const { user, handleLogout } = await useHomeLogic();
</script>

<template>
  <div class="w-full min-h-screen bg-[#f6f7f9] dark:bg-[#101922] text-[#0d141b] dark:text-white font-manrope flex">
    
    <!-- Desktop Sidebar -->
    <div class="hidden md:block">
      <LayoutAdminSidebar :on-logout="handleLogout" />
    </div>

    <main class="flex-1 flex flex-col h-screen overflow-hidden relative">
      
      <!-- Header -->
      <header class="bg-white dark:bg-[#151f2e] border-b border-gray-200 dark:border-gray-800 px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20 shrink-0">
        
        <div class="w-full flex items-center justify-between">
            <!-- Mobile Menu Toggle -->
            <div class="md:hidden">
              <p class="text-gray-500 text-sm font-semibold">Admin Panel</p>
              <h1 v-if="user" class="text-xl font-bold text-indigo-600">Admin</h1>
            </div>

            <!-- Search Bar (Desktop) -->
            <div class="hidden md:block relative w-96">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
              <input type="text" placeholder="Search analytics..." class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none">
            </div>

            <!-- User Info -->
            <div class="flex items-center gap-4 md:gap-6">
              <div v-if="user" class="hidden md:flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-700">
                <div class="text-right">
                  <p class="text-sm font-bold leading-tight">{{ user.name }}</p>
                  <p class="text-xs text-indigo-500 font-semibold">Administrator</p>
                </div>
                <img :src="user.avatarUrl || ''" class="w-10 h-10 rounded-full border border-gray-200" alt="Avatar">
              </div>
            </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto pb-24 md:pb-0">
        <slot />
      </div>

    </main>

    <!-- Mobile Bottom Navigation -->
    <div class="md:hidden">
      <LayoutAdminBottomNav />
    </div>

  </div>
</template>
