"use client";

import { useState, useEffect } from "react";
import { Scissors, User, LogOut } from "lucide-react";
import { supabase, getCurrentUser } from "../lib/supabaseClient";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    // Cargar el usuario al montar el componente
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    loadUser();

    // Suscribirse a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      // Limpiar suscripción
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsUserMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center">
            <Scissors className="h-6 w-6 mr-2" />
            <span className="font-bold text-xl">Peluquería</span>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              servicios
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Galeria
            </a>
            <a
              href="#reviews"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Reseñas
            </a>
            <a
              href="/appointment"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Reservar cita
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span className="max-w-[100px] truncate">{user.email}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a
                      href="/my-appointments"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mis Reservas
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Iniciar Sesión
              </a>
            )}
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t">
            <nav className="flex flex-col space-y-3">
              <a
                href="/"
                className="text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded"
              >
                servicios
              </a>
              <a
                href="#gallery"
                className="text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded"
              >
                Galeria
              </a>
              <a
                href="#reviews"
                className="text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded"
              >
                Reseñas
              </a>
              <a
                href="/appointment"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Reservar cita
              </a>

              {user ? (
                <>
                  <a
                    href="/my-appointments"
                    className="text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    Mis Reservas
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded"
                >
                  Iniciar Sesión
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
