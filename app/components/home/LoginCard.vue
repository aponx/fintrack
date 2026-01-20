<script setup lang="ts">
// Terima props (fungsi) dari parent
defineProps<{
  onEmailLogin: () => void
}>()
</script>

<template>
  <div class="glass-card p-8 md:p-10 flex flex-col items-center animate-fade-in shadow-2xl shadow-blue-900/5">
    <div class="mb-6 flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-100 text-[#137fec]">
      <span class="material-symbols-outlined text-3xl">account_balance_wallet</span>
    </div>

    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
        Welcome to FinTrack
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">
        Manage your wallets, budgets, and transactions in one secure place.
      </p>
    </div>

    <a href="/login/google" class="btn-outline w-full mb-6 group">
      <svg class="h-5 w-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
        <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
        <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
        <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
      </svg>
      Sign in with Google
    </a>

    <div class="flex gap-4 text-xs text-gray-400">
      <a href="#" class="hover:text-gray-600 transition">Privacy Policy</a>
      <span>•</span>
      <a href="#" class="hover:text-gray-600 transition">Terms of Service</a>
    </div>
  </div>
</template>