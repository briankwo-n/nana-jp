/* Supabase connection.
   Fill these two in from your Supabase dashboard:
   Project Settings -> API -> Project URL, and the "anon public" key.

   The anon key is designed to be sent to browsers, so it is not a secret in the
   usual sense. It is still worth keeping this repo PRIVATE, because anyone who
   finds these values can read and write the trip data. Do not put anything
   sensitive in the receipt notes.
*/
window.TRIP_CONFIG = {
  SUPABASE_URL: "https://qcimktmonxvnwxfbrxnf.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaW1rdG1vbnh2bnd4ZmJyeG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5Mjg4NDAsImV4cCI6MjEwMjUwNDg0MH0.Tlzqy2aU8SH7V0HpQAMVxwcDjK7MjFEObDXMLCevkII",

  // Storage bucket name. Must match the bucket created in schema.sql.
  BUCKET: "trip-media",

  /* Free tier: leave this false.
     Only compressed thumbnails (~150 KB) get uploaded, which keeps you well
     inside the 1 GB storage and 5 GB egress allowances.

     Set to true after upgrading to Pro. Full-resolution originals then upload
     alongside each thumbnail, and tapping a photo loads the original. */
  UPLOAD_ORIGINALS: false,

  // Skip originals larger than this. Free tier hard-caps at 50 MB per file.
  MAX_FILE_BYTES: 50 * 1024 * 1024,

  /* Access passwords for the sign-in screen.

     EDIT_PASSWORD  you and Nana. Full access: edit the itinerary, upload and
                    move photos, see hotel details and receipts.
     VIEW_PASSWORD  family. View only: the day-by-day plan, the leg dates, and
                    the photos. Hotel names, confirmation numbers, check-out
                    times, receipts, and hotel links are hidden.

     Passwords are case-insensitive and ignore surrounding spaces, so "Pineapple"
     and "pineapple " both work. Pick two that differ by more than just case.

     Leave both empty ("") to disable the sign-in screen entirely — the app
     then opens straight into full edit mode, the way it did before.

     This is a soft gate, not real security. Like the anon key above, these
     ship to the browser, so anyone who opens the page source could read them.
     It keeps casual viewers out; it does not stop a determined one. Keep the
     repo private and don't share the edit password with viewers. */
  EDIT_PASSWORD: "NANABRIAN",
  VIEW_PASSWORD: "0000"
};
