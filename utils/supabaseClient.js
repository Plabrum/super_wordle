import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(
  "https://xasebxwqfptgqjektoik.supabase.co",
  supabaseKey
);

export default supabase;
