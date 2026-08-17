# Japan Trip

A mobile-first trip app for Japan, Dec 25 2026 to Jan 11 2027. Six legs, each with
hotel details, a day-by-day plan, a photo gallery, and shared food receipts.

Single static page. No build step, no dependencies to install.

## Deploy

1. Push this repo to GitHub.
2. On Vercel, **Add New → Project**, import the repo.
3. Framework preset: **Other**. Leave build command and output directory empty.
4. Deploy.

Vercel redeploys automatically on every push to the default branch.

## Use it on a phone

Open the deployed URL, then **Share → Add to Home Screen**. It launches
full screen without browser chrome.

## Supabase setup (do this once)

1. Create a free project at supabase.com. Pick a region near you; Toronto or
   US East is fine, the trip does not change this.
2. **SQL Editor -> New query**, paste all of `schema.sql`, Run. This creates the
   `docs` table, opens up access, turns on realtime, and makes the `trip-media`
   storage bucket.
3. **Project Settings -> API**. Copy the Project URL and the `anon public` key
   into `config.js`.
4. Commit and push. Vercel redeploys, and the app connects on next load.

A small pill next to the title shows Saving / Synced / Offline so you can tell
whether an edit actually landed.

### Free tier, and when to upgrade

Leave `UPLOAD_ORIGINALS: false` in `config.js` while on the free plan. Only the
compressed thumbnail (~150 KB) uploads, which keeps a whole trip well inside the
1 GB storage and 5 GB egress allowances.

Before the trip, if you want full-resolution photos, upgrade to Pro ($25/month,
100 GB storage, 250 GB egress) and flip `UPLOAD_ORIGINALS` to `true`. Grid
thumbnails stay small either way; tapping a photo then loads the original.
Downgrade after the trip.

**Free projects pause after 7 days with no requests.** Resume it from the
dashboard a few days before you fly and confirm an upload works. Pro projects
never auto-pause, so upgrading also removes this problem.

### Video

Video uploads only a poster frame, not the file. Free tier caps uploads at 50 MB
per file, which is roughly 45 seconds of 1080p, so full clips are not practical.
Use a shared iCloud or Google Photos album for video.

## How storage worked before Supabase

Earlier versions kept everything in the browser on a single device. That is gone.
State now lives in Supabase and syncs between phones within about a second.

Treat this as a shared journal, not a backup. Keep the originals in your camera roll.

## Photo sorting

Dropped photos are read for EXIF `DateTimeOriginal` and GPS coordinates, then filed
into the matching leg. Date is checked first, GPS breaks ties between legs in the
same city.

Photos taken on a transition day (Dec 29, Jan 3, Jan 5, Jan 7, Jan 9) match two legs,
so they land in the unsorted tray at the bottom of the screen for manual assignment.
Same for photos with EXIF stripped, which is common for screenshots and anything
sent through a messaging app.

## Editing the trip data

All six legs are defined in the `LEGS` array near the top of the `<script>` block in
`index.html`. Dates, hotel details, GPS bounding boxes, and the default day plans all
live there. Edits made in the running app override these defaults and are stored per
device; the array is only the starting state for a fresh device.

## Access and passwords

Set two passwords in `config.js` to put a sign-in screen in front of the app:

- `EDIT_PASSWORD` — you and Nana. Full access: edit the itinerary, upload and
  move photos, and see hotel details and receipts.
- `VIEW_PASSWORD` — family. View only: the day-by-day plan, the leg dates, and
  the photos. Hotel names, confirmation numbers, check-out times, receipts, and
  hotel links are hidden and never rendered into the page.

Leave both empty (`""`) to disable the screen — the app then opens straight into
full edit mode, the way it did before. The chosen mode is remembered on the
device; the **Lock** button at the bottom of the page returns to the sign-in
screen so you can switch or hand the phone to someone else.

This is a soft, convenience gate, not real security. Like the Supabase anon key,
these passwords ship to the browser, so anyone who opens the page source could
read them. It keeps casual viewers away from the hotel and receipt details; it
does not stop a determined, technical person. Keep the repo private and don't
share the edit password with viewers.

## Moving a photo to another leg

If a photo lands in the wrong leg (or you assigned it by hand and changed your
mind), tap it to open it full screen and use the **Move to** menu in the top-left
to send it to a different leg.

## Notes

- There is no build step, so Vercel environment variables do **not** work here.
  Keys go in `config.js`, which ships to the browser. Keep the repo private.
- The storage bucket is public, meaning photo URLs are unguessable but not
  access-controlled. Anyone handed a URL can view that photo.
- Writes are last-one-wins. If you both edit the same receipt in the same second,
  one overwrites the other. Rare with two people.
- Incoming updates pause while a field is focused, so a sync will not yank text
  out from under you mid-edit.

## Files

```
index.html      the entire app
config.js       Supabase URL and key, and the originals toggle
schema.sql      run once in the Supabase SQL editor
manifest.json   home screen icon and name
```
