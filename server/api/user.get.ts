export default defineEventHandler((event) => {
  // Pastikan return value selalu terdefinisi, jangan undefined
  // Jika user null (belum login), kembalikan null
  return {
    user: event.context.user || null
  };
});