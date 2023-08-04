import { createClient } from "@supabase/supabase-js";

const SUPABASE_APP_URL = process.env.REACT_APP_SUPABASE_APP_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
// const jwt = process.env.REACT_APP_JWT;

export const supabase = createClient(SUPABASE_APP_URL, SUPABASE_KEY, {
  global: {
    headers: {
      // Authorization: `Bearer ${jwt}`,
    },
  },
});
