// Función para obtener la hora actual en Colombia (UTC-5)
export function getCurrentColombiaTime() {
    // Crear una nueva fecha en UTC
    const now = new Date()
  
    // Obtener la hora y minutos en UTC
    const utcHours = now.getUTCHours()
    const utcMinutes = now.getUTCMinutes()
  
    // Ajustar a hora Colombia (UTC-5)
    let colombiaHours = utcHours - 5
  
    // Ajustar si las horas son negativas (día anterior)
    if (colombiaHours < 0) {
      colombiaHours += 24
    }
  
    return {
      hours: colombiaHours,
      minutes: utcMinutes,
    }
  }
  
  // Función para formatear un slot de tiempo
  export function formatTimeSlot(timeSlot) {
    const [hour, minute = "00"] = timeSlot.split(":")
    const hourNum = Number.parseInt(hour, 10)
    const amPm = hourNum >= 12 ? "PM" : "AM"
    const formattedHour = hourNum % 12 || 12
    return `${formattedHour}:${minute} ${amPm}`
  }
  
  // Función para comprobar si una fecha es hoy
  export function isToday(date) {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  
  