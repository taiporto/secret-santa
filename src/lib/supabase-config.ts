import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://yhxpmeglgfsmxrcoxwqv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeHBtZWdsZ2ZzbXhyY294d3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNTcyODQsImV4cCI6MjAxNDYzMzI4NH0.-nvWX7up0rUft8_RBGDSdJdHB0MSFs-PkipBCtN3O54"
);
