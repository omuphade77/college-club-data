import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://kauxpqsgcaqvgvnettyj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthdXhwcXNnY2Fxdmd2bmV0dHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTk1MjQsImV4cCI6MjA4NzI3NTUyNH0.oq0Y_SjkMzfVFI4XOi9puYjAGzzmEWUGrAKi4pGezHo",
);
