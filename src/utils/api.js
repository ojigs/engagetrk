import { createClient } from "@supabase/supabase-js";

// const SUPABASE_APP_URL = process.env.SUPABASE_APP_URL;
// const SUPABASE_KEY = process.env.SUPABASE_KEY;

// console.log("SUPABASE: ", SUPABASE_KEY);

export const supabase = createClient(
  "https://ezntnwotmdkbkoyimjjw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bnRud290bWRrYmtveWltamp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNTE1NDcsImV4cCI6MTk5MDkyNzU0N30.KYGavrNhIiUrUkMtPT5osxtwgZt03tBis0DxhSMMTFw"
);
