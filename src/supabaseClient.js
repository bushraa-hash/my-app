import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jeybqcpzgdtpjsfamews.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleWJxY3B6Z2R0cGpzZmFtZXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDg0MDcsImV4cCI6MjA4OTA4NDQwN30.ooTrd17WqpgqsueUp7J3ueZJDWZnkSQhFJ3VXeQebeQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
