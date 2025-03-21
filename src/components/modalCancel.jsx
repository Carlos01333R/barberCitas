import { formatTimeSlot } from "../lib/timeUtils";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  appointment,
  formatDate,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">
          ¿Estás seguro de que deseas cancelar la cita del dia{" "}
          {formatDate(appointment.appointment_date)} con{" "}
          {appointment.barbers.name} a las{" "}
          {formatTimeSlot(appointment.time_slot)}?
        </h3>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
