import { Helmet } from 'react-helmet-async';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Download, ArrowLeft, ExternalLink } from 'lucide-react';
import { events, getEventBySlug } from '@/components/events/eventsData';
const EventBrochure = () => {
  const { slug } = useParams();
  const event = slug ? getEventBySlug(slug) : events[0];
  if (!event?.brochure) return <Navigate to="/events" replace/>;
  const pdf = event.brochure;
  return <div className="min-h-screen flex flex-col bg-background"><Helmet><title>eQOURSE Company & Services Brochure</title><meta name="description" content="Open and share eQOURSE’s company and services brochure for AI data, multilingual datasets, learning solutions and content services."/><link rel="canonical" href="https://www.eqourse.com/events/brochure"/></Helmet><header className="sticky top-0 z-50 border-b bg-card"><div className="container px-4 py-3 flex items-center gap-3 flex-wrap"><Link to={slug?`/events/${slug}`:'/events'} aria-label="Back to events" className="inline-flex gap-2 items-center text-sm"><ArrowLeft size={17}/>Events</Link><h1 className="text-sm font-semibold flex-1">eQOURSE Company Brochure</h1><a href={pdf.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-2 border rounded-md"><ExternalLink size={16}/>Open PDF</a><a href={pdf.url} download={pdf.filename} aria-label="Download company brochure PDF" className="inline-flex items-center gap-2 text-sm px-3 py-2 bg-primary text-primary-foreground rounded-md"><Download size={16}/>Download</a></div></header><main className="flex-1 flex flex-col"><iframe src={`${pdf.url}#toolbar=1&navpanes=0`} title="eQOURSE company and services brochure" className="w-full flex-1 border-0" style={{minHeight:'calc(100dvh - 90px)'}}/><p className="p-3 text-center text-xs text-muted-foreground">If the preview is unavailable on your device, use Open PDF or Download above.</p></main></div>;
};
export default EventBrochure;
