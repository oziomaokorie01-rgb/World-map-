
Espresso Systems World Map - README
----------------------------------

Files:
- index.html      -> Main HTML page. Edit title here if needed.
- style.css       -> Styling and responsive layout.
- script.js       -> JavaScript: event list, markers, popups, and card behavior.
- images/         -> Contains placeholder images and logo.
   - past.png     -> Replace with your dark-brown past event marker icon (PNG).
   - future.png   -> Replace with your golden future event marker icon (PNG).
   - denver.png, san-francisco.png, new-york.png, cannes.png, bangkok.png, brussels.png, berlin.png, seoul.png, buenos-aires.png
                  -> Replace these placeholder images with your real event images (keep filenames or update script.js accordingly).
   - logo.png     -> Header logo (espresso cup). Replace with your logo if you have one.

How to edit events:
- Open script.js in a text editor.
- The 'events' array lists all events in the order shown on the site.
  Example event entry:
    {id:1,name:"Denver",coords:[39.7392,-104.9903],img:"images/denver.png",type:"past",desc:""}
- To change a city's description, edit the 'desc' field.
- To add/remove events, edit the events array (keep 'coords' and 'img' correct).

Uploading to InfinityFree:
1. Zip this folder or upload files to your account's htdocs/ directory.
2. Ensure index.html is placed directly inside htdocs/.
3. Visit your site URL (e.g., http://yourdomain.epizy.com/) to view the map.

Notes:
- All placeholder images are PNGs. You can replace them with JPG/PNG but update filenames in script.js if names change.
- The "See Details" button in popups is a placeholder (alert). You can replace with a link to a details page.
