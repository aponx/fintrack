export const useWalletLogic = async () => {
  // 1. Ambil data dari API
  // key: 'my-wallets' penting agar nuxt bisa cache/refresh data dengan benar
  const { data: wallets, refresh, status } = await useFetch<any[]>('/api/wallet-users', {
    key: 'my-wallets',
    headers: useRequestHeaders(['cookie']), // Wajib untuk Auth
    default: () => []
  });

  // 2. Computed Total Net Worth
  const totalNetWorth = computed(() => {
    return (wallets.value || []).reduce((acc: number, curr: any) => acc + curr.amount, 0);
  });

  // 3. Format Currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // 4. Create Wallet Function
  const createWallet = async (form: any) => {
    try {
        await $fetch('/api/wallet-users', {
            method: 'POST',
            body: form
        })
        await refresh() // Refresh list otomatis
        return { success: true }
    } catch (e: any) {
        return { success: false, error: e.data?.statusMessage || 'Error' }
    }
  }

  return {
    wallets,
    totalNetWorth,
    formatCurrency,
    createWallet,
    refresh,
    isLoading: computed(() => status.value === 'pending')
  };
};