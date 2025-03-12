import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ttpgxfimkkafkbbrudzx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cGd4Zmlta2thZmtiYnJ1ZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDYxNjcsImV4cCI6MjA1NjQyMjE2N30.UKrqZjtWdj9pfKcrbdYAEe7YVpPifdfB915eehrhSeg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// Función para obtener el usuario actual
export const getCurrentUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
  
    if (error) {
      console.error("Error al obtener la sesión:", error)
      return null
    }
  
    if (!session) {
      return null
    }
  
    return session.user
  }