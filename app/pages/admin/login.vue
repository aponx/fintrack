<script setup lang="ts">
definePageMeta({
  layout: false
});

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = '';
  isLoading.value = true;
  
  try {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    });
    
    if (response.success) {
      // Force refresh user data setelah login berhasil dengan navigate ke admin index
      await navigateTo('/admin/index', { replace: true });
    } else {
      error.value = response.message || 'Invalid credentials';
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Login failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
    <div class="w-full max-w-md">
      <!-- Logo & Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/30">
          <span class="material-symbols-outlined text-3xl">admin_panel_settings</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h1>
        <p class="text-gray-500 dark:text-gray-400">Sign in to access the admin dashboard</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Admin Email
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="admin@fintrack.com"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition"
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-red-500 text-sm">error</span>
            <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
          >
            <span v-if="isLoading" class="material-symbols-outlined animate-spin">progress_activity</span>
            <span v-else class="material-symbols-outlined">login</span>
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Back to Home Link -->
        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            Back to Customer Login
          </NuxtLink>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Admin access only. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
