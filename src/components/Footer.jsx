import {
  Scissors,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex justify-center  md:justify-start items-center mb-4">
              <Scissors className="mr-2" />
              <span className="font-bold text-xl">Peluquería</span>
            </div>
            <p className="text-gray-400 mb-4 text-center md:text-start">
              Servicios de barbería premium con enfoque en la calidad y
              satisfacción del cliente.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Twitter />
              </a>
            </div>
          </div>

          <div className="">
            <h3 className="font-bold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  servicios
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Galeria
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Reseñas
                </a>
              </li>
              <li>
                <a
                  href="/appointment"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Reservar cita
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cortes de pelo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Recortes de barba
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Afeitado con toalla caliente
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Peinado del cabello
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cortes de pelo para niños
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contáctenoss</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 shrink-0 mt-1" size={18} />
                <span className="text-gray-400">
                  123 Barber Street, Ciudad, Campo
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 shrink-0" size={18} />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Clock className="mr-2 shrink-0 mt-1" size={18} />
                <div className="text-gray-400">
                  <div>Lunes a viernes: 9:00 a 20:00 horas</div>
                  <div>Sábado: 9:00 a 18:00 horas</div>
                  <div>Domingo: 10:00 a 16:00 horas</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} BarberShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
