import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/((?!unauthorized).*)', 
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); 

    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (role !== 'admin') {
      // Redirigimos a la pantalla de error
      return NextResponse.redirect(new URL('/unauthorized', req.url)); 
    }
  }
});

// Configuración obligatoria de Next.js para que el middleware funcione
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};