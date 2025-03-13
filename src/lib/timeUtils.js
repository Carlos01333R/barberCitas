// Función para obtener la hora actual en Colombia (UTC-5)
export function getCurrentColombiaTime() {
    // Crear una nueva fecha en UTC
    const now = new Date()
  
    // Obtener la hora y minutos en UTC
    const utcHours = now.getUTCHours()
    const utcMinutes = now.getUTCHours()
  
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
  
  // Función para convertir una fecha a la zona horaria de Colombia (UTC-5)
  export function getColombiaDate(date) {
    // Crear una copia de la fecha
    const colombiaDate = new Date(date)
  
    // Ajustar a la zona horaria de Colombia (UTC-5)
    // Primero obtenemos la diferencia entre la zona horaria local y UTC en minutos
    const localTimezoneOffset = date.getTimezoneOffset()
  
    // Luego ajustamos a UTC-5 (Colombia), que es UTC-300 minutos
    const colombiaTimezoneOffset = 300 // 5 horas * 60 minutos
  
    // Calculamos la diferencia total en minutos
    const totalOffsetMinutes = colombiaTimezoneOffset - localTimezoneOffset
  
    // Ajustamos la fecha
    colombiaDate.setMinutes(colombiaDate.getMinutes() - totalOffsetMinutes)
  
    return colombiaDate
  }
  
  // Función para formatear una fecha en formato ISO para Colombia
  export function formatColombiaDateISO(date) {
    const colombiaDate = getColombiaDate(date)
    return colombiaDate.toISOString().split("T")[0]
  }
  
  