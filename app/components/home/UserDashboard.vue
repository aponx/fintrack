<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  user: any,
  onLogout: () => void
}>()

// --- MOCK DATA (Data Dummy untuk Tampilan) ---
// Nanti ini bisa diganti dengan data dari API / Prisma

const transactions = [
  { id: 1, title: 'Whole Foods Market', date: 'Oct 24, 2023', time: 'Today, 9:41 AM', category: 'Groceries', amount: -240.50, status: 'Completed', icon: 'shopping_cart', color: 'bg-orange-100 text-orange-600' },
  { id: 2, title: 'Monthly Salary', date: 'Oct 20, 2023', time: 'Yesterday, 5:00 PM', category: 'Income', amount: 8500.00, status: 'Completed', icon: 'account_balance_wallet', color: 'bg-blue-100 text-blue-600' },
  { id: 3, title: 'Netflix Subscription', date: 'Oct 18, 2023', time: 'Oct 24', category: 'Entertainment', amount: -15.99, status: 'Pending', icon: 'movie', color: 'bg-purple-100 text-purple-600' },
  { id: 4, title: 'Shell Gas Station', date: 'Oct 15, 2023', time: 'Oct 22', category: 'Transport', amount: -62.00, status: 'Completed', icon: 'local_gas_station', color: 'bg-green-100 text-green-600' },
  { id: 5, title: 'Apple Store', date: 'Oct 12, 2023', time: 'Oct 20', category: 'Shopping', amount: -999.00, status: 'Completed', icon: 'smartphone', color: 'bg-gray-100 text-gray-800' },
];

const menuItems = [
  { name: 'Dashboard', icon: 'grid_view', active: true },
  { name: 'Wallets', icon: 'account_balance_wallet', active: false },
  { name: 'Budgets', icon: 'pie_chart', active: false },
  { name: 'Transactions', icon: 'receipt_long', active: false },
  { name: 'Reports', icon: 'bar_chart', active: false },
  { name: 'Settings', icon: 'settings', active: false },
];

const bottomNavItems = [
  { name: 'Home', icon: 'home', active: true },
  { name: 'Wallet', icon: 'account_balance_wallet', active: false },
  { name: 'Budget', icon: 'pie_chart', active: false },
  { name: 'Profile', icon: 'person', active: false },
];

// Helper untuk format currency
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(val));
}
</script>

<template>
  <div class="hidden md:flex h-screen overflow-hidden">

      <main class="flex-1 overflow-y-auto">

        <div class="p-8 max-w-7xl mx-auto space-y-6">
          
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 lg:col-span-4 bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
               <div class="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
               <p class="text-blue-100 text-xs font-semibold tracking-wider mb-1">MAIN BALANCE</p>
               <h2 class="text-3xl font-bold mb-6">$45,250.00</h2>
               <div class="flex items-center justify-between mt-auto">
                  <span class="font-mono text-blue-200 tracking-widest">**** 4290</span>
                  <span class="material-symbols-outlined text-3xl">credit_card</span>
               </div>
            </div>

            <div class="col-span-12 lg:col-span-8 bg-white dark:bg-[#151f2e] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
              <div class="flex justify-between items-start mb-6">
                <div>
                   <p class="text-gray-500 text-sm">Overall Net Worth</p>
                   <h2 class="text-3xl font-bold text-gray-900 dark:text-white">$128,430.22</h2>
                </div>
                <div class="flex items-center text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded">
                   <span class="material-symbols-outlined text-base mr-1">trending_up</span>
                   +2.5%
                </div>
              </div>
              <div class="flex gap-4">
                 <button class="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
                    <span class="material-symbols-outlined text-sm">add</span> Add Expense
                 </button>
                 <button class="flex items-center gap-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition">
                    <span class="material-symbols-outlined text-sm">upload</span> Export
                 </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="bg-white dark:bg-[#151f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div class="flex justify-between mb-6">
                   <div>
                      <h3 class="font-bold text-lg">Weekly Spending</h3>
                      <p class="text-sm text-gray-500">Cash outflow tracking</p>
                   </div>
                   <div class="text-right">
                      <p class="font-bold text-lg">$1,240.00</p>
                      <p class="text-xs text-red-500">-12.5% vs last week</p>
                   </div>
                </div>
                <div class="h-48 w-full flex items-end justify-between gap-1 relative">
                   <svg class="absolute inset-0 w-full h-full text-blue-500" preserveAspectRatio="none">
                      <path d="M0,100 C20,50 40,80 60,40 S100,100 120,60 S160,20 200,80 S240,120 280,40 S320,0 360,50 L360,150 L0,150 Z" fill="rgba(59, 130, 246, 0.1)" />
                      <path d="M0,100 C20,50 40,80 60,40 S100,100 120,60 S160,20 200,80 S240,120 280,40 S320,0 360,50" fill="none" stroke="currentColor" stroke-width="3" />
                   </svg>
                   <div class="w-full flex justify-between absolute bottom-0 text-[10px] text-gray-400 font-bold uppercase pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                   </div>
                </div>
             </div>

             <div class="bg-white dark:bg-[#151f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div class="flex justify-between mb-6">
                   <div>
                      <h3 class="font-bold text-lg">Expense Categories</h3>
                      <p class="text-sm text-gray-500">Breakdown by type</p>
                   </div>
                   <div class="text-right">
                      <p class="font-bold text-lg">$3,500.20</p>
                      <p class="text-xs text-green-500">Within budget</p>
                   </div>
                </div>
                <div class="h-48 flex items-end justify-between gap-3 pb-6 relative">
                   <div v-for="h in ['40%', '80%', '20%', '60%', '90%', '50%']" :key="h" class="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-md relative group">
                      <div class="absolute bottom-0 w-full bg-blue-600 rounded-t-md transition-all duration-500 hover:bg-blue-500" :style="{ height: h }"></div>
                   </div>
                   <div class="w-full flex justify-between absolute bottom-0 text-[10px] text-gray-400 font-bold uppercase border-t border-gray-100 dark:border-gray-700 pt-1 w-full left-0">
                      <span>Food</span><span>Rent</span><span>Util</span><span>Trans</span><span>Ent</span><span>Other</span>
                   </div>
                </div>
             </div>
          </div>

          <div class="bg-white dark:bg-[#151f2e] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
             <div class="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                <h3 class="font-bold text-lg">Recent Transactions</h3>
                <button class="text-sm text-blue-600 font-bold hover:underline">View All</button>
             </div>
             <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 dark:bg-gray-800 text-gray-500 font-semibold uppercase text-xs">
                   <tr>
                      <th class="px-6 py-4">Transaction</th>
                      <th class="px-6 py-4">Date</th>
                      <th class="px-6 py-4">Category</th>
                      <th class="px-6 py-4">Status</th>
                      <th class="px-6 py-4 text-right">Amount</th>
                   </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                   <tr v-for="t in transactions" :key="t.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td class="px-6 py-4 font-bold flex items-center gap-3">
                         <div :class="`w-10 h-10 rounded-full flex items-center justify-center ${t.color}`">
                            <span class="material-symbols-outlined text-xl">{{ t.icon }}</span>
                         </div>
                         {{ t.title }}
                      </td>
                      <td class="px-6 py-4 text-gray-500">{{ t.date }}</td>
                      <td class="px-6 py-4">
                         <span class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold">{{ t.category }}</span>
                      </td>
                      <td class="px-6 py-4">
                         <div class="flex items-center gap-2 text-xs font-bold" :class="t.status === 'Completed' ? 'text-green-600' : 'text-orange-500'">
                            <span class="w-2 h-2 rounded-full" :class="t.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'"></span>
                            {{ t.status }}
                         </div>
                      </td>
                      <td class="px-6 py-4 text-right font-bold" :class="t.amount > 0 ? 'text-green-600' : 'text-red-500'">
                         {{ t.amount > 0 ? '+' : '' }}{{ formatCurrency(t.amount) }}
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>

        </div>
      </main>
    </div>

    <div class="md:hidden flex flex-col min-h-screen pb-24">
      

       <div class="overflow-x-auto px-6 pb-6 scrollbar-hide flex gap-4 snap-x">
          <div class="min-w-[300px] bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30 snap-center relative overflow-hidden">
             <div class="absolute right-6 top-6 italic text-2xl font-bold opacity-80">VISA</div>
             <div class="mt-2">
                <p class="text-blue-200 text-xs uppercase tracking-wider mb-1">Total Balance</p>
                <h2 class="text-3xl font-bold">$12,450.00</h2>
             </div>
             <div class="mt-8 flex justify-between items-end">
                <div class="font-mono tracking-widest text-lg">•••• 4242</div>
                <div class="text-right">
                   <p class="text-[10px] text-blue-200 uppercase">Expires</p>
                   <p class="text-sm font-bold">12/25</p>
                </div>
             </div>
             <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
             <div class="absolute top-10 -left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          </div>

          <div class="min-w-[300px] bg-[#1a1a1a] rounded-2xl p-6 text-white snap-center relative">
              <div class="absolute right-6 top-6 italic text-2xl font-bold opacity-80">Mastercard</div>
              <div class="mt-2">
                <p class="text-gray-400 text-xs uppercase tracking-wider mb-1">Savings</p>
                <h2 class="text-3xl font-bold">$3,100.50</h2>
             </div>
             <div class="mt-8">
                <div class="font-mono tracking-widest text-lg">•••• 8899</div>
             </div>
          </div>
       </div>

       <div class="px-6 grid grid-cols-4 gap-4 text-center">
          <button class="group flex flex-col items-center gap-2">
             <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-blue-600 group-active:scale-95 transition">
                <span class="material-symbols-outlined text-2xl -rotate-45">send</span>
             </div>
             <span class="text-xs font-semibold text-gray-600 dark:text-gray-400">Send</span>
          </button>
          <button class="group flex flex-col items-center gap-2">
             <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-blue-600 group-active:scale-95 transition">
                <span class="material-symbols-outlined text-2xl">request_quote</span>
             </div>
             <span class="text-xs font-semibold text-gray-600 dark:text-gray-400">Request</span>
          </button>
          <button class="group flex flex-col items-center gap-2">
             <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-blue-600 group-active:scale-95 transition">
                <span class="material-symbols-outlined text-2xl">receipt_long</span>
             </div>
             <span class="text-xs font-semibold text-gray-600 dark:text-gray-400">Pay Bill</span>
          </button>
          <button class="group flex flex-col items-center gap-2">
             <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-blue-600 group-active:scale-95 transition">
                <span class="material-symbols-outlined text-2xl">more_horiz</span>
             </div>
             <span class="text-xs font-semibold text-gray-600 dark:text-gray-400">More</span>
          </button>
       </div>

       <div class="px-6 mt-8">
          <div class="flex justify-between items-center mb-4">
             <h3 class="font-bold text-lg">Recent Activity</h3>
             <button class="text-sm text-blue-600 font-bold">See All</button>
          </div>

          <div class="space-y-4">
             <div v-for="t in transactions" :key="t.id" class="flex items-center justify-between p-4 bg-white dark:bg-[#151f2e] rounded-2xl shadow-sm">
                <div class="flex items-center gap-4">
                   <div :class="`w-12 h-12 rounded-full flex items-center justify-center ${t.color}`">
                      <span class="material-symbols-outlined">{{ t.icon }}</span>
                   </div>
                   <div>
                      <h4 class="font-bold text-sm">{{ t.title }}</h4>
                      <p class="text-xs text-gray-500">{{ t.time }}</p>
                   </div>
                </div>
                <div class="text-right">
                   <p class="font-bold text-sm" :class="t.amount > 0 ? 'text-green-600' : 'text-[#0d141b] dark:text-white'">
                      {{ t.amount > 0 ? '+' : '' }}{{ formatCurrency(t.amount) }}
                   </p>
                </div>
             </div>
          </div>
       </div>

       <button class="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/40 flex items-center justify-center active:scale-90 transition z-30">
          <span class="material-symbols-outlined text-2xl">add</span>
       </button>
    </div>
</template>

<style scoped>
/* Utility untuk menyembunyikan scrollbar di carousel mobile */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>