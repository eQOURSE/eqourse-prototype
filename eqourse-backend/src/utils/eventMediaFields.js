const { randomUUID } = require('crypto');
const catalog = [
  {slug:'china-tour-2026',country:'China',label:'China 2026'},
  {slug:'taiwan-tour-2026',country:'Taiwan',label:'Taiwan 2026'},
  {slug:'japan-tour-2026',country:'Japan',label:'Japan 2026'},
  {slug:'south-korea-tour-2026',country:'South Korea',label:'South Korea 2026'},
  {slug:'singapore-tour-2026',country:'Singapore',label:'Singapore 2026'},
  {slug:'singapore-tour-2024',country:'Singapore',label:'Singapore 2024'},
  {slug:'china-tour-2024',country:'China',label:'China 2024'},
  {slug:'china-tour-july-2026',country:'China',label:'China July 2026'},
  {slug:'ksa-tour-2024',country:'Saudi Arabia',label:'Saudi Arabia (KSA) 2024'},
  {slug:'uae-tour-2024',country:'United Arab Emirates',label:'UAE 2024'},
];
const allowedTypes = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'};
const MAX_BYTES = 10 * 1024 * 1024;
const plain = value => String(value || '').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const clip = (value, length) => value.length <= length ? value : value.slice(0,length-1).replace(/\s+\S*$/,'')+'…';
function countryEvent(slug) { const event = catalog.find(e => e.slug === slug); if(!event) throw Object.assign(new Error('Choose a valid country tour.'),{status:400}); return event; }
function fields(input) {
  const event = countryEvent(input.eventSlug); const title = plain(input.title); const description = plain(input.description);
  if(title.length < 3 || title.length > 140 || description.length < 10 || description.length > 3000) throw Object.assign(new Error('Use a title of 3–140 characters and a description of 10–3000 characters.'),{status:400});
  if(input.status && !['draft','published'].includes(input.status)) throw Object.assign(new Error('Invalid publication status.'),{status:400});
  return {eventSlug:event.slug,title,description,imageAlt:clip(`${title} — ${event.label}. ${description}`,200),imageTitle:title,
    seo:{title:clip(`${title} | eQOURSE ${event.label}`,60),description:clip(description,160)},status:input.status || 'draft'};
}
function objectKey(eventSlug,title,mimeType) {countryEvent(eventSlug);if(!allowedTypes[mimeType]) throw Object.assign(new Error('Use a JPG, PNG, WebP or AVIF image.'),{status:400});const stem=plain(title).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,65)||'event-photo';return `events/${eventSlug}/gallery/${stem}-${randomUUID()}.${allowedTypes[mimeType]}`;}
module.exports={fields,objectKey,countryEvent,catalog,allowedTypes,MAX_BYTES};
