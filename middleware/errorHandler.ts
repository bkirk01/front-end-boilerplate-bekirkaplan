export default defineNuxtRouteMiddleware((to, from) => {
  try {
    console.log(`Navigating to ${to.fullPath}`);
  } catch (error) {
    console.error(`Navigation error: ${error}`);
  }
});
