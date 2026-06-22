import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protegemos TODAS las rutas por defecto, excepto el inicio de sesión
const isProtectedRoute = createRouteMatcher([
  '/((?!sign-in|sign-up).*)', 
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // <-- Cambio clave: await auth.protect()
  }
});

// Configuración obligatoria de Next.js para que el middleware funcione
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};