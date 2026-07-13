<script setup lang="ts">
definePageMeta({
  layout: 'admin'
});

// Mock data untuk demo - nanti bisa diganti dengan API call
const stats = ref({
  totalUsers: 1250,
  activeUsers: 890,
  totalWallets: 3400,
  totalTransactions: 15670,
  monthlyGrowth: 12.5,
  revenueThisMonth: 45000000
});

const recentActivities = ref([
  { id: 1, user: 'John Doe', action: 'Created new wallet', time: '2 minutes ago' },
  { id: 2, user: 'Jane Smith', action: 'Updated budget', time: '15 minutes ago' },
  { id: 3, user: 'Bob Wilson', action: 'Made transaction', time: '1 hour ago' },
  { id: 4, user: 'Alice Brown', action: 'Registered new account', time: '2 hours ago' },
]);

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  users: [65, 78, 90, 115, 145, 180],
  transactions: [1200, 1500, 1800, 2200, 2600, 3100]
});
</script>

<template>
  <div class="p-6 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
    
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
      <p class="text-gray-500 dark:text-gray-400">Overview sistem dan statistik penggunaan</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Users -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">people</span>
          </div>
          <span class="text-green-500 text-sm font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">trending_up</span>
            {{ stats.monthlyGrowth }}%
          </span>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.totalUsers.toLocaleString() }}</h3>
      </div>

      <!-- Active Users -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-green-600 dark:text-green-400">person_check</span>
          </div>
          <span class="text-green-500 text-sm font-semibold">Active</span>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Active Users</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.activeUsers.toLocaleString() }}</h3>
      </div>

      <!-- Total Wallets -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-purple-600 dark:text-purple-400">account_balance_wallet</span>
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Total Wallets</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.totalWallets.toLocaleString() }}</h3>
      </div>

      <!-- Total Transactions -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-orange-600 dark:text-orange-400">swap_horiz</span>
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Total Transactions</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.totalTransactions.toLocaleString() }}</h3>
      </div>
    </div>

    <!-- Charts and Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Usage Chart -->
      <div class="lg:col-span-2 bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Penggunaan Bulanan</h3>
        <div class="h-64 flex items-end justify-between gap-2">
          <div v-for="(month, index) in chartData.labels" :key="month" class="flex-1 flex flex-col items-center gap-2">
            <div class="w-full relative h-48 flex items-end gap-1">
              <div 
                class="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                :style="{ height: `${(chartData.users[index] / Math.max(...chartData.users)) * 100}%` }"
              ></div>
              <div 
                class="w-full bg-purple-500 rounded-t transition-all hover:bg-purple-600"
                :style="{ height: `${(chartData.transactions[index] / Math.max(...chartData.transactions)) * 100}%` }"
              ></div>
            </div>
            <span class="text-xs text-gray-500">{{ month }}</span>
          </div>
        </div>
        <div class="flex items-center justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded"></div>
            <span class="text-sm text-gray-500">Users (ratusan)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-purple-500 rounded"></div>
            <span class="text-sm text-gray-500">Transactions (ribuan)</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Aktivitas Terbaru</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
            <div class="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-sm text-gray-500">person</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ activity.user }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.action }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Aksi Cepat</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink to="/admin/wallets" class="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition">
          <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">business_center</span>
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">Kelola Master Wallet</p>
            <p class="text-xs text-gray-500">Tambah/Edit jenis wallet</p>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/admin/users" class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition">
          <span class="material-symbols-outlined text-green-600 dark:text-green-400">manage_accounts</span>
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">Manajemen User</p>
            <p class="text-xs text-gray-500">Lihat & kelola user</p>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/admin/usage" class="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition">
          <span class="material-symbols-outlined text-purple-600 dark:text-purple-400">bar_chart</span>
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">Statistik Penggunaan</p>
            <p class="text-xs text-gray-500">Analisis detail</p>
          </div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>
