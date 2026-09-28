import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '@/components/shared/PageLayout';
import SEOHead from '@/components/ai-data-services/shared/SEOHead';
import { fetchEventPhoto } from '@/admin/lib/eventMediaApi';
import { getEventBySlug } from '@/components/events/eventsData';
import './events.css';
export default function EventHighlight(){
 const {slug='',imageSlug=''}=useParams();const event=getEventBySlug(slug);
 const {data:photo,isLoading,error}=useQuery({queryKey:['event-photo',slug,imageSlug],queryFn:()=>fetchEventPhoto(slug,imageSlug),enabled:!!event,retry:false});
 const url=`https://www.eqourse.com/events/${slug}/highlights/${imageSlug}`;
 return <PageLayout breadcrumbs={[{label:'Events',href:'/events'},{label:event?.title||'Country tour',href:event?`/events/${slug}`:'/events'},{label:photo?.title||'Highlight'}]}><main className="events-page"><section className="events-section events-shell">{photo?<><SEOHead title={photo.seo.title} description={photo.seo.description} canonical={url} ogImage={photo.imageUrl}/><Helmet><script type="application/ld+json">{JSON.stringify({'@context':'https://schema.org','@type':'ImageObject',name:photo.title,description:photo.description,caption:photo.imageAlt,contentUrl:photo.imageUrl,url,width:photo.width,height:photo.height,datePublished:photo.publishedAt,creator:{'@type':'Organization',name:'eQOURSE'}}).replace(/</g,'\\u003c')}</script></Helmet><p className="events-eyebrow">eQOURSE / {event?.country} / EVENT HIGHLIGHTS</p><h1 className="text-3xl md:text-5xl font-semibold mb-8">{photo.title}</h1><figure><img className="event-highlight-image" src={photo.imageUrl} alt={photo.imageAlt} title={photo.imageTitle} width={photo.width} height={photo.height} {...{fetchpriority:'high'}}/><figcaption className="mt-6 max-w-3xl text-slate-600 leading-relaxed">{photo.description}</figcaption></figure><Link to={`/events/${slug}`} className="events-text-link mt-7">Back to {event?.country} tour ↗</Link></>:<><Helmet><title>Event Highlight | eQOURSE</title><meta name="robots" content="noindex,follow"/></Helmet><h1 className="text-3xl font-semibold">{isLoading?'Loading event highlight…':'Highlight unavailable'}</h1>{error&&<p className="mt-4">This photo may be unpublished or temporarily unavailable.</p>}<Link to="/events" className="events-text-link mt-6">Explore country tours ↗</Link></>}</section></main></PageLayout>;
}
