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

// Mock data untuk user management
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', googleId: 'google_123', isActive: true, createdAt: '2024-01-15', transactions: 45, wallets: 3 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', googleId: 'google_456', isActive: true, createdAt: '2024-01-20', transactions: 28, wallets: 2 },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', googleId: 'google_789', isActive: false, createdAt: '2024-02-01', transactions: 12, wallets: 1 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', googleId: 'google_012', isActive: true, createdAt: '2024-02-10', transactions: 67, wallets: 5 },
]);

const searchQuery = ref('');
const showModal = ref(false);
const selectedUser = ref<any>(null);

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
});

const viewUser = (user: any) => {
  selectedUser.value = user;
  showModal.value = true;
};

const toggleUserStatus = (id: number) => {
  const user = users.value.find(u => u.id === id);
  if (user) {
    user.isActive = !user.isActive;
    // TODO: Implement API call to update user status
    console.log(`User ${user.name} status changed to ${user.isActive ? 'active' : 'inactive'}`);
  }
};

const deleteUser = (id: number) => {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    // TODO: Implement API call to delete user
    users.value = users.value.filter(u => u.id !== id);
    console.log('User deleted:', id);
  }
};
</script>

<template>
  <div class="p-6 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
    
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Management</h1>
      <p class="text-gray-500 dark:text-gray-400">Kelola dan pantau aktivitas user di sistem</p>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative max-w-md">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name or email..."
          class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#151f2e] border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white">{{ users.length }}</h3>
      </div>
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Active Users</p>
        <h3 class="text-3xl font-bold text-green-600">{{ users.filter(u => u.isActive).length }}</h3>
      </div>
      <div class="bg-white dark:bg-[#151f2e] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Inactive Users</p>
        <h3 class="text-3xl font-bold text-red-600">{{ users.filter(u => !u.isActive).length }}</h3>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-[#151f2e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Transactions</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Wallets</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ user.name }}</p>
                    <p class="text-xs text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium', 
                  user.isActive 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400']">
                  <span class="material-symbols-outlined text-xs">{{ user.isActive ? 'check_circle' : 'cancel' }}</span>
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">{{ user.transactions }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">{{ user.wallets }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.createdAt }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="viewUser(user)"
                    class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                    title="View Details"
                  >
                    <span class="material-symbols-outlined text-sm">visibility</span>
                  </button>
                  <button 
                    @click="toggleUserStatus(user.id)"
                    :class="['p-2 rounded-lg transition', 
                      user.isActive 
                        ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20' 
                        : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20']"
                    :title="user.isActive ? 'Deactivate' : 'Activate'"
                  >
                    <span class="material-symbols-outlined text-sm">{{ user.isActive ? 'pause_circle' : 'play_circle' }}</span>
                  </button>
                  <button 
                    @click="deleteUser(user.id)"
                    class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    title="Delete User"
                  >
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="p-12 text-center">
        <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">person_search</span>
        <p class="text-gray-500 dark:text-gray-400">No users found matching your search</p>
      </div>
    </div>

    <!-- User Detail Modal -->
    <div v-if="showModal && selectedUser" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white dark:bg-[#151f2e] rounded-xl w-full max-w-lg shadow-2xl">
        <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">User Details</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {{ selectedUser.name.charAt(0) }}
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedUser.name }}</h4>
              <p class="text-gray-500">{{ selectedUser.email }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <p class="text-xs text-gray-500 mb-1">Google ID</p>
              <p class="text-sm font-mono text-gray-900 dark:text-white truncate">{{ selectedUser.googleId }}</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <p class="text-xs text-gray-500 mb-1">Joined Date</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ selectedUser.createdAt }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p class="text-xs text-blue-600 dark:text-blue-400 mb-1">Total Transactions</p>
              <p class="text-2xl font-bold text-blue-700 dark:text-blue-400">{{ selectedUser.transactions }}</p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p class="text-xs text-purple-600 dark:text-purple-400 mb-1">Total Wallets</p>
              <p class="text-2xl font-bold text-purple-700 dark:text-purple-400">{{ selectedUser.wallets }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <span class="material-symbols-outlined" :class="selectedUser.isActive ? 'text-green-600' : 'text-red-600'">
              {{ selectedUser.isActive ? 'check_circle' : 'cancel' }}
            </span>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Account Status: {{ selectedUser.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 dark:border-gray-800 flex gap-3 justify-end">
          <button 
            @click="showModal = false"
            class="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
