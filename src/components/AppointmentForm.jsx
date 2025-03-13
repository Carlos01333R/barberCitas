"use client";

import { useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../lib/supabaseClient";
import { getCurrentColombiaTime, isToday } from "../lib/timeUtils";

// Custom calendar component
function SimpleCalendar({ value, onChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onChange(newDate);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        value &&
        date.getDate() === value.getDate() &&
        date.getMonth() === value.getMonth() &&
        date.getFullYear() === value.getFullYear();

      const isTodayDate = new Date().toDateString() === date.toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      days.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => handleDateClick(day)}
          className={`h-10 w-10 rounded-full flex items-center justify-center ${
            isSelected
              ? "bg-blue-600 text-white"
              : isTodayDate
              ? "bg-blue-100 text-blue-600"
              : isPast
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h3 className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        <div className="text-sm font-medium text-gray-500">Do</div>
        <div className="text-sm font-medium text-gray-500">Lu</div>
        <div className="text-sm font-medium text-gray-500">Ma</div>
        <div className="text-sm font-medium text-gray-500">Mi</div>
        <div className="text-sm font-medium text-gray-500">Ju</div>
        <div className="text-sm font-medium text-gray-500">Vi</div>
        <div className="text-sm font-medium text-gray-500">Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
    </div>
  );
}

export default function AppointmentForm() {
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Cargar el usuario al montar el componente
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      // Si el usuario está logueado, autocompletar el correo
      if (currentUser) {
        setCustomerInfo((prev) => ({
          ...prev,
          email: currentUser.email,
        }));
      }
    };

    loadUser();
  }, []);

  // Fetch available time slots for the selected date
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoading(true);
      try {
        // Format date for API call
        const formattedDate = date.toISOString().split("T")[0];

        // Get all possible time slots
        const allTimeSlots = generateTimeSlots();

        // Get booked appointments for the selected date
        const { data: bookedAppointments, error } = await supabase
          .from("appointments")
          .select("time_slot")
          .eq("appointment_date", formattedDate);

        if (error) throw error;

        // Filter out booked slots
        const bookedTimes = bookedAppointments.map((app) => app.time_slot);

        // Filter out past time slots for today
        let available = allTimeSlots;

        if (isToday(date)) {
          // Obtener la hora actual en Colombia
          const colombiaTime = getCurrentColombiaTime();

          console.log(
            `Hora Colombia: ${colombiaTime.hours}:${colombiaTime.minutes}`
          );

          // Filtrar las horas que ya han pasado
          available = allTimeSlots.filter((slot) => {
            const [slotHour, slotMinute] = slot.value.split(":").map(Number);

            // Si la hora es mayor, está disponible
            if (slotHour > colombiaTime.hours) return true;

            // Si es la misma hora, verificar los minutos
            if (slotHour === colombiaTime.hours) {
              return slotMinute > colombiaTime.minutes;
            }

            // Si la hora es menor, no está disponible
            return false;
          });
        }

        // Filtrar las horas ya reservadas
        available = available.filter(
          (slot) => !bookedTimes.includes(slot.value)
        );

        setAvailableSlots(available);
      } catch (error) {
        console.error("Error fetching available slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [date]);

  // Fetch barbers when a time slot is selected
  useEffect(() => {
    if (selectedTime) {
      const fetchBarbers = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase.from("barbers").select("*");

          if (error) throw error;

          // In a real app, you would filter barbers based on availability
          setBarbers(data);
        } catch (error) {
          console.error("Error fetching barbers:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBarbers();
    }
  }, [selectedTime]);

  // Generate time slots with 20-minute intervals from 9 AM to 6 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 20) {
        // Skip 6:20 PM and 6:40 PM
        if (hour === 18 && minute > 0) continue;

        const formattedHour = hour % 12 || 12;
        const amPm = hour < 12 ? "AM" : "PM";
        const formattedMinute = minute.toString().padStart(2, "0");

        slots.push({
          label: `${formattedHour}:${formattedMinute} ${amPm}`,
          value: `${hour}:${formattedMinute}`,
        });
      }
    }
    return slots;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    if (!selectedTime || !selectedBarber || !customerInfo.name) {
      alert("Por favor, completa todos los campos requeridos");
      return;
    }

    setLoading(true);
    try {
      const formattedDate = date.toISOString().split("T")[0];

      // Crear objeto de cita
      const appointmentData = {
        appointment_date: formattedDate,
        time_slot: selectedTime,
        barber_id: selectedBarber,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
      };

      // Si el usuario está logueado, agregar su ID a la cita
      if (user) {
        appointmentData.user_id = user.id;
      }

      const { error } = await supabase
        .from("appointments")
        .insert([appointmentData]);

      if (error) throw error;

      setBookingSuccess(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(
        "Hubo un error al reservar tu cita. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-4">
          ¡Reserva Exitosa!
        </h3>
        <p className="mb-6">Tu cita ha sido confirmada.</p>
        {user ? (
          <div className="flex flex-col space-y-4">
            <a
              href="/my-appointments"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Ver Mis Reservas
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-gray-200 px-6 py-3 text-base font-medium text-gray-800 hover:bg-gray-300 transition-colors"
            >
              Volver al Inicio
            </a>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión para Gestionar tus Citas
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-gray-200 px-6 py-3 text-base font-medium text-gray-800 hover:bg-gray-300 transition-colors"
            >
              Volver al Inicio
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
        <h3 className="text-xl font-bold mb-4">Selecciona una Fecha</h3>
        <SimpleCalendar value={date} onChange={setDate} />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {availableSlots.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
              <h3 className="text-xl font-bold mb-4">Horarios Disponibles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.value}
                    className={`py-2 px-4 rounded-md border ${
                      selectedTime === slot.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-gray-50 border-gray-300"
                    }`}
                    onClick={() => setSelectedTime(slot.value)}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg mb-8 p-6 text-center">
              <p className="text-gray-600">
                No hay horarios disponibles para la fecha seleccionada.
              </p>
            </div>
          )}

          {selectedTime && barbers.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
              <h3 className="text-xl font-bold mb-4">Selecciona un Barbero</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {barbers.map((barber) => (
                  <div
                    key={barber.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedBarber === barber.id
                        ? "border-2 border-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedBarber(barber.id)}
                  >
                    <div className="text-center">
                      <img
                        src={
                          barber.avatar ||
                          "/placeholder.svg?height=100&width=100"
                        }
                        alt={barber.name}
                        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                      />
                      <h4 className="font-semibold">{barber.name}</h4>
                      <p className="text-sm text-gray-500">
                        {barber.specialization}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTime && selectedBarber && (
            <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
              <h3 className="text-xl font-bold mb-4">Tus Datos</h3>
              <form onSubmit={handleBookAppointment}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      readOnly={user !== null} // Si el usuario está logueado, el campo es de solo lectura
                    />
                    {!user && (
                      <p className="mt-1 text-xs text-gray-500">
                        <a
                          href="/login"
                          className="text-blue-600 hover:underline"
                        >
                          Inicia sesión
                        </a>{" "}
                        para gestionar tus citas
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin inline-block h-4 w-4 border-t-2 border-white rounded-full mr-2"></span>
                          Procesando...
                        </>
                      ) : (
                        "Confirmar Reserva"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
