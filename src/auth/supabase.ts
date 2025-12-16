import { createClient } from "@supabase/supabase-js";
import { config } from "../config/index.js";

export const supabaseAdmin = createClient(
  config.supabase.url,
  config.supabase.serviceKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
