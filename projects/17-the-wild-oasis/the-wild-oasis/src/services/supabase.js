import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lwzavcshpmueatdisncx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3emF2Y3NocG11ZWF0ZGlzbmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MzAxNTQsImV4cCI6MjAyMDUwNjE1NH0.Icqms-WIlVq3mdvvES68O5CvFJfZqXcFJYXHlvoM-Ks";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
