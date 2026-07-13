// Middleware untuk proteksi halaman berdasarkan autentikasi dan role

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware untuk halaman login dan home
  if (to.path === '/' || to.path === '/login' || to.path === '/admin/login') {
    return;
  }

  // Ambil data user dari API
  const { data: user } = await useFetch('/api/user', {
    headers: useRequestHeaders(['cookie']),
    lazy: false,
    server: true,
    immediate: true
  });

  // Cek apakah user sudah login
  const isLoggedIn = !!user.value;

  // Cek apakah halaman admin
  const isAdminPage = to.path.startsWith('/admin');

  // Jika belum login, redirect ke halaman login yang sesuai
  if (!isLoggedIn) {
    if (isAdminPage) {
      return navigateTo('/admin/login');
    } else {
      return navigateTo('/');
    }
  }

  // Jika sudah login tapi akses halaman admin, cek role
  if (isLoggedIn && isAdminPage) {
    // Cek apakah user memiliki role ADMIN
    if (user.value?.role !== 'ADMIN') {
      // Bukan admin, redirect ke home
      return navigateTo('/');
    }
  }

  // Jika user adalah admin tapi mencoba akses halaman customer (non-admin)
  // Optional: Bisa diizinkan atau diblokir tergantung kebutuhan
  // Saat ini kita izinkan admin mengakses halaman customer juga
});
