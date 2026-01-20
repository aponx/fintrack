export const useHomeLogic = async () => {
  // 1. Setup Head (Meta tags & Fonts)
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

  // 2. Ambil data user
  const { data: user, refresh } = await useFetch('/api/user', {
    // 1. Kirim Cookie browser ke server saat SSR (PENTING UNTUK AUTH)
    headers: useRequestHeaders(['cookie']), 
    
    // 2. Jika server return null, anggap itu nilai valid
    default: () => null 
  });

  // 3. Handle Logout
  const handleLogout = async () => {
    await $fetch('/api/logout', { method: 'POST' });
    await refresh();
  };

  // 4. Handle Email Login (Placeholder)
  const handleEmailLogin = () => {
    alert("Fitur login email akan segera hadir. Silakan gunakan Google Sign In.");
  };

  // Return semua variable/fungsi yang dibutuhkan component
  return {
    user,
    handleLogout,
    handleEmailLogin
  };
};