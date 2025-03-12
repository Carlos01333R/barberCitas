import { Calendar, Clock, Scissors } from "lucide-react";

export default function AppointmentSection() {
  return (
    <section id="appointment" className="md:py-20 py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Reserva tu cita
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Programación fácil</h4>
                  <p className="text-gray-600">
                    Programación fácil Reserva tu cita online en cualquier
                    momento y en cualquier lugar
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Clock className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Sin tiempos de espera</h4>
                  <p className="text-gray-600">
                    Ven a la hora programada y recibe el servicio de inmediato.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Scissors className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Barberos expertos</h4>
                  <p className="text-gray-600">
                    Elija entre nuestro equipo de profesionales cualificados
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-bold">
                ¿Listo para una nueva apariencia?
              </h3>
              <p className="text-gray-600 mb-6">
                Seleccione un horario que funcione para usted
              </p>
              <a
                href="/appointment"
                className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Programe ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
