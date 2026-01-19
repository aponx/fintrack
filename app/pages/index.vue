<script setup lang="ts">
// 1. Ambil data user (cek session)
const { data: user, refresh } = await useFetch('/api/user', {
  // Opsi ini memberitahu Nuxt: "Tidak apa-apa jika return-nya null, jangan warning"
  default: () => null 
});

// 2. Setup Font & Judul
useHead({
  title: 'Welcome to FinTrack',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ],
  bodyAttrs: {
    class: 'bg-[#f0f4f8] dark:bg-[#101922] font-manrope text-[#0d141b] dark:text-white'
  }
});

// 3. Handle Logout
async function handleLogout() {
  await $fetch('/api/logout', { method: 'POST' });
  await refresh();
}

// 4. Placeholder untuk tombol Email (karena backend belum dibuat)
function handleEmailLogin() {
  alert("Fitur login email akan segera hadir. Silakan gunakan Google Sign In.");
}
</script>

<template>
  <div class="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
    
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] dark:bg-blue-900/20"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px] dark:bg-blue-800/20"></div>
      
      <div class="absolute inset-0 bg-pattern opacity-[0.4]"></div>
    </div>

    <div class="relative z-10 w-full max-w-[480px]">
      
      <div v-if="user" class="glass-card p-8 text-center animate-fade-in">
        <div class="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
           <img :src="user.avatarUrl || ''" class="w-full h-full rounded-full object-cover border-4 border-white shadow-sm" alt="Avatar">
        </div>
        <h1 class="text-2xl font-bold mb-1">Welcome, {{ user.name }}!</h1>
        <p class="text-gray-500 mb-6 text-sm">{{ user.email }}</p>
        
        <button @click="handleLogout" class="w-full py-3 px-4 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition">
          Sign Out
        </button>
      </div>

      <div v-else class="glass-card p-8 md:p-10 flex flex-col items-center animate-fade-in shadow-2xl shadow-blue-900/5">
        
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
    </div>

  </div>
</template>

<style scoped>

/* FONT SETUP */
.font-manrope {
  font-family: 'Manrope', sans-serif;
}

/* CUSTOM COMPONENTS */
.glass-card {
  @apply bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 dark:bg-[#151f2e]/90 dark:border-gray-800;
}

.btn-outline {
  @apply flex items-center justify-center h-12 px-6 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-[15px] hover:bg-gray-50 transition-all shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700;
}

.btn-primary {
  @apply flex items-center justify-center h-12 px-6 rounded-lg bg-[#137fec] text-white font-bold text-[15px] hover:bg-[#106dd0] transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98];
}

/* BACKGROUND PATTERN */
.bg-pattern {
  background-image: linear-gradient(rgba(19, 127, 236, 0.05) 1px, transparent 1px),
    linear-gradient(to right, rgba(19, 127, 236, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

/* ANIMATION */
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>