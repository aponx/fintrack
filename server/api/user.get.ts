export default defineEventHandler((event) => {
  // Mengembalikan data user yang sudah divalidasi oleh middleware auth.ts
  return event.context.user;
});