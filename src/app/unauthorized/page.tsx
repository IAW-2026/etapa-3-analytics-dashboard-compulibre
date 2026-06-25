import { SignOutButton } from "@clerk/nextjs";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">

        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          🔒
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h1>
        
        <p className="text-gray-500 mb-6">
          Tu cuenta no tiene los permisos de administrador necesarios para ver el panel de métricas.
        </p>

        <SignOutButton>
          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
            Cerrar sesión y volver
          </button>
        </SignOutButton>

      </div>
    </div>
  );
}