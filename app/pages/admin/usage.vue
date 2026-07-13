<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

// Cek user dan role di client side juga untuk keamanan tambahan
const { data: user } = await useFetch('/api/user', {
  headers: useRequestHeaders(['cookie']),
  lazy: false,
  server: true,
  immediate: true
});

// Redirect jika tidak login atau bukan admin
if (!user.value || user.value.role !== 'ADMIN') {
  await navigateTo('/');
}

// Mock data untuk usage statistics
const usageStats = ref({
  totalApiCalls: 125430,
  avgResponseTime: 145,
  errorRate: 0.02,
  peakConcurrentUsers: 342,
});

const dailyUsage = ref([
  { date: '2024-06-01', apiCalls: 3200, activeUsers: 180, errors: 2 },
  { date: '2024-06-02', apiCalls: 3500, activeUsers: 195, errors: 1 },
  { date: '2024-06-03', apiCalls: 2900, activeUsers: 165, errors: 3 },
  { date: '2024-06-04', apiCalls: 4100, activeUsers: 220, errors: 0 },
  { date: '2024-06-05', apiCalls: 3800, activeUsers: 205, errors: 1 },
  { date: '2024-06-06', apiCalls: 4500, activeUsers: 245, errors: 2 },
  { date: '2024-06-07', apiCalls: 4200, activeUsers: 230, errors: 1 },
]);

const topEndpoints = ref([
  { endpoint: '/api/wallet-users', calls: 45230, avgTime: '120ms' },
  { endpoint: '/api/transactions', calls: 38450, avgTime: '185ms' },
  { endpoint: '/api/budgets', calls: 22100, avgTime: '95ms' },
  { endpoint: '/api/user', calls: 15670, avgTime: '78ms' },
  { endpoint: '/api/wallets', calls: 3980, avgTime: '145ms' },
]);

const recentErrors = ref([
  { id: 1, endpoint: '/api/transactions', error: 'Timeout', timestamp: '2024-06-07 14:32:15' },
  { id: 2, endpoint: '/api/wallet-users', error: 'Database connection failed', timestamp: '2024-06-07 12:15:42' },
  { id: 3, endpoint: '/api/budgets', error: 'Invalid request body', timestamp: '2024-06-06 18:45:30' },
]);
</script>

<template>
  <div class="p-6 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
    
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Usage Statistics</h1>
      <p class="text-gray-500 dark:text-gray-400">Analisis detail penggunaan sistem dan performa API</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">api</span>
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Total API Calls</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ usageStats.totalApiCalls.toLocaleString() }}</h3>
        <p class="text-xs text-green-500 mt-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-xs">trending_up</span>
          +15% from last week
        </p>
      </div>

      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-green-600 dark:text-green-400">speed</span>
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Avg Response Time</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ usageStats.avgResponseTime }}ms</h3>
        <p class="text-xs text-green-500 mt-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-xs">trending_down</span>
          -8ms from last week
        </p>
      </div>

      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Error Rate</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ (usageStats.errorRate * 100).toFixed(2) }}%</h3>
        <p class="text-xs text-green-500 mt-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-xs">check_circle</span>
          Within threshold
        </p>
      </div>

      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-purple-600 dark:text-purple-400">people_outline</span>
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Peak Concurrent Users</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ usageStats.peakConcurrentUsers }}</h3>
        <p class="text-xs text-gray-500 mt-2">Today at 2:30 PM</p>
      </div>
    </div>

    <!-- Charts and Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Daily Usage Chart -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Daily API Calls</h3>
        <div class="h-64 flex items-end justify-between gap-2">
          <div v-for="day in dailyUsage" :key="day.date" class="flex-1 flex flex-col items-center gap-2">
            <div class="w-full relative h-48">
              <div 
                class="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-700 hover:to-blue-500"
                :style="{ height: `${(day.apiCalls / Math.max(...dailyUsage.map(d => d.apiCalls))) * 100}%` }"
              ></div>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-500">{{ day.date.split('-')[2] }}</p>
              <p class="text-[10px] text-gray-400">{{ (day.apiCalls / 1000).toFixed(1) }}k</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Users Chart -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Daily Active Users</h3>
        <div class="h-64 flex items-end justify-between gap-2">
          <div v-for="day in dailyUsage" :key="day.date" class="flex-1 flex flex-col items-center gap-2">
            <div class="w-full relative h-48">
              <div 
                class="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all hover:from-green-700 hover:to-green-500"
                :style="{ height: `${(day.activeUsers / Math.max(...dailyUsage.map(d => d.activeUsers))) * 100}%` }"
              ></div>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-500">{{ day.date.split('-')[2] }}</p>
              <p class="text-[10px] text-gray-400">{{ day.activeUsers }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Endpoints and Errors -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Endpoints -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Top API Endpoints</h3>
        <div class="space-y-3">
          <div v-for="(endpoint, index) in topEndpoints" :key="endpoint.endpoint" class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ endpoint.endpoint }}</p>
              <p class="text-xs text-gray-500">{{ endpoint.calls.toLocaleString() }} calls</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-mono text-gray-700 dark:text-gray-300">{{ endpoint.avgTime }}</p>
              <p class="text-xs text-gray-400">avg</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Errors -->
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Errors</h3>
        <div class="space-y-3">
          <div v-for="error in recentErrors" :key="error.id" class="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
            <span class="material-symbols-outlined text-red-600 dark:text-red-400 text-sm">error</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-red-700 dark:text-red-400 truncate">{{ error.error }}</p>
              <p class="text-xs text-red-600 dark:text-red-500">{{ error.endpoint }}</p>
              <p class="text-xs text-red-400 mt-1">{{ error.timestamp }}</p>
            </div>
          </div>
          
          <div v-if="recentErrors.length === 0" class="text-center py-8">
            <span class="material-symbols-outlined text-4xl text-green-500 mb-2">check_circle</span>
            <p class="text-sm text-gray-500">No recent errors</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
