"use client";

import { useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../lib/supabaseClient";
import { Calendar, Clock } from "lucide-react";
import ConfirmationModal from "./modalCancel";

export default function MyAppointmentsComponent() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);
      fetchAppointments(currentUser.id);
    };

    checkAuth();
  }, []);

  const fetchAppointments = async (userId) => {
    try {
      setLoading(true);

      // Obtener las citas del usuario
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          *,
          barbers:barber_id (
            id,
            name,
            specialization,
            avatar
          )
        `
        )
        .eq("user_id", userId)
        .order("appointment_date", { ascending: false });

      if (error) throw error;

      setAppointments(data || []);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
      setError(
        "No se pudieron cargar tus citas. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", selectedAppointment.id);

      if (error) throw error;

      // Actualizar la lista de citas
      setAppointments(
        appointments.filter((app) => app.id !== selectedAppointment.id)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
      setError(
        "No se pudo cancelar la cita. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatTimeSlot = (timeSlot) => {
    const [hour] = timeSlot.split(":");
    const hourNum = Number.parseInt(hour, 10);
    const amPm = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:00 ${amPm}`;
  };

  if (loading && !appointments.length) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">
          No tienes citas programadas
        </h3>
        <p className="mb-6 text-gray-600">
          Reserva tu primera cita ahora mismo
        </p>
        <a
          href="/appointment"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Reservar Cita
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">
                    Cita con {appointment.barbers?.name || "Barbero"}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(appointment.appointment_date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatTimeSlot(appointment.time_slot)}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end">
                  {appointment.barbers && (
                    <div className="flex items-center mb-4">
                      <img
                        src={
                          appointment.barbers.avatar ||
                          "/placeholder.svg?height=100&width=100"
                        }
                        alt={appointment.barbers.name}
                        className="w-10 h-10 rounded-full object-cover mr-2"
                      />
                      <div>
                        <p className="font-medium">
                          {appointment.barbers.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.barbers.specialization}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setIsModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Cancelar Cita
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelAppointment}
        appointment={selectedAppointment}
      />
    </div>
  );
}
