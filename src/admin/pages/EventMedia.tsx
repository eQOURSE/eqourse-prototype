import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ImagePlus, ExternalLink, Loader2, CheckCircle2, FileImage } from 'lucide-react';
import { countryTours, eventYear } from '@/components/events/eventsData';
import { eventMediaApi, type EventPhoto } from '../lib/eventMediaApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
const plain=(value:string)=>value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const clip=(value:string,n:number)=>value.length<=n?value:value.slice(0,n-1).replace(/\s+\S*$/,'')+'…';
export default function EventMedia(){
  const [country,setCountry]=useState(countryTours[0].slug);
  const [title,setTitle]=useState(''),[description,setDescription]=useState('');
  const [status,setStatus]=useState<'draft'|'published'>('draft');
  const [file,setFile]=useState<File|null>(null),[preview,setPreview]=useState('');
  const [editing,setEditing]=useState<EventPhoto|null>(null),[busy,setBusy]=useState(false),[progress,setProgress]=useState(0);
  const [error,setError]=useState(''),[notice,setNotice]=useState('');
  const fileRef=useRef<HTMLInputElement>(null);
  const cache=useQueryClient();
  const configuration=useQuery({queryKey:['event-storage-config'],queryFn:eventMediaApi.config,retry:false});
  const photos=useQuery({queryKey:['admin-event-photos',country],queryFn:()=>eventMediaApi.list(country),retry:false});
  const event=countryTours.find(e=>e.slug===country)!;
  const seoPlace = event.slug === 'china-tour-july-2026' ? 'China July 2026' : event.slug === 'ksa-tour-2024' ? 'Saudi Arabia (KSA) 2024' : event.slug === 'uae-tour-2024' ? 'UAE 2024' : `${event.country} ${eventYear(event)}`;
  useEffect(()=>{if(!file){setPreview('');return;}const url=URL.createObjectURL(file);setPreview(url);return()=>URL.revokeObjectURL(url);},[file]);
  const reset=()=>{if(fileRef.current)fileRef.current.value='';setEditing(null);setFile(null);setTitle('');setDescription('');setStatus('draft');setError('');setProgress(0);};
  const pick=(photo:EventPhoto)=>{setEditing(photo);setFile(null);setTitle(photo.title);setDescription(photo.description);setStatus(photo.status);setError('');setNotice('');};
  const save=async(e:React.FormEvent)=>{e.preventDefault();setBusy(true);setError('');setNotice('');setProgress(0);try{
    const fields={eventSlug:country,title,description,status};
    if(editing)await eventMediaApi.update(editing.id,fields);else{if(!file)throw new Error('Choose a photo first.');await eventMediaApi.upload(file,fields,setProgress);}
    reset();setNotice(status==='published'?'Photo published with automatic SEO.':'Photo saved as a draft.');await cache.invalidateQueries({queryKey:['admin-event-photos',country]});await cache.invalidateQueries({queryKey:['event-photos',country]});
  }catch(err){setError(err instanceof Error?err.message:'Could not save the photo.');await cache.invalidateQueries({queryKey:['admin-event-photos',country]});}finally{setBusy(false);}};
  return <div className="max-w-6xl mx-auto space-y-7"><header><p className="text-xs uppercase tracking-widest text-primary mb-2">Global engagements</p><h1 className="text-3xl font-bold">Event Photos</h1><p className="text-muted-foreground mt-2">Publish photos and stories to each country tour. Titles and descriptions generate image SEO automatically.</p></header>
    <div className="flex gap-3 flex-wrap" aria-label="Choose event tour">{countryTours.map(e=><Button key={e.slug} disabled={busy} variant={country===e.slug?'default':'outline'} onClick={()=>{setCountry(e.slug);reset();setNotice('');}}>{e.title}</Button>)}</div>
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4"><div><p className="font-semibold">{event.title}</p><p className="text-xs text-muted-foreground">Tour page for LinkedIn posts and client sharing</p></div><Link to={`/events/${country}`} target="_blank" className="inline-flex gap-2 items-center text-sm text-primary">Open tour page <ExternalLink size={16}/></Link></div>
    {(configuration.isError||photos.isError)&&<div role="alert" className="border border-destructive/30 bg-destructive/5 rounded-lg p-4 text-sm">The event API could not be reached. Deploy the event backend endpoints and check VITE_API_BASE_URL. {configuration.error?.message||photos.error?.message}</div>}
    {configuration.data&&!configuration.data.configured&&<div role="status" className="border border-amber-200 bg-amber-50 text-amber-900 rounded-lg p-4 text-sm">Photo upload is awaiting storage configuration. Your administrator needs to configure: {configuration.data.missing.join(', ')}. You can prepare titles, descriptions and previews below.</div>}
    <div className="grid lg:grid-cols-[1.05fr_1fr] gap-7"><form onSubmit={save} className="rounded-xl border bg-card p-6 space-y-5"><div className="flex justify-between items-center"><h2 className="font-semibold text-xl">{editing?'Edit photo story':'Add an event photo'}</h2>{editing&&<Button type="button" variant="ghost" disabled={busy} onClick={reset}>New photo</Button>}</div>
      {!editing&&<div><Label htmlFor="event-photo-file">Photo (JPG, PNG, WebP or AVIF · up to 10 MB)</Label><Input ref={fileRef} key={country} className="mt-2" id="event-photo-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={e=>{const image=e.target.files?.[0];setError('');if(!image)return;if(image.size>10*1024*1024||!['image/jpeg','image/png','image/webp','image/avif'].includes(image.type)){setError('Choose a JPG, PNG, WebP or AVIF image no larger than 10 MB.');e.target.value='';return;}setFile(image);}}/></div>}
      {(preview||editing?.imageUrl)&&<img src={preview||editing?.imageUrl} alt="Selected event photo preview" className="w-full max-h-64 object-contain rounded-lg bg-muted"/>}
      <div><Label htmlFor="photo-title">Photo title</Label><Input id="photo-title" className="mt-2" required minLength={3} maxLength={140} value={title} disabled={busy} onChange={e=>setTitle(e.target.value)} placeholder="eQOURSE team meeting in Tokyo"/></div>
      <div><Label htmlFor="photo-description">Description</Label><Textarea id="photo-description" className="mt-2 min-h-32" required minLength={10} maxLength={3000} value={description} disabled={busy} onChange={e=>setDescription(e.target.value)} placeholder="Describe the meeting, people, topics or moment shown in this photo."/><p className="text-xs text-muted-foreground mt-2">Describe what the photo actually shows. This becomes its caption and generates accessible alt text and search metadata.</p></div>
      <div><Label htmlFor="photo-status">Visibility</Label><select id="photo-status" value={status} disabled={busy} onChange={e=>setStatus(e.target.value as 'draft'|'published')} className="mt-2 block w-full border rounded-md p-2 bg-background"><option value="draft">Draft — visible only in admin</option><option value="published">Published — visible on the country page</option></select></div>
      {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}{notice&&<p role="status" className="text-sm text-primary flex gap-2 items-center"><CheckCircle2 size={16}/>{notice}</p>}
      {busy&&<div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Photo upload progress" className="h-2 rounded bg-muted overflow-hidden"><div className="h-full bg-primary transition-all" style={{width:`${Math.max(5,progress)}%`}}/></div>}
      <Button type="submit" disabled={busy||(!editing&&(!configuration.data?.configured||!file))}>{busy?<Loader2 className="animate-spin mr-2" size={16}/>:<ImagePlus className="mr-2" size={16}/>} {busy?'Saving…':status==='published'?'Publish photo':'Save draft'}</Button>
    </form><div className="space-y-6"><section className="rounded-xl border bg-card p-6"><h2 className="text-lg font-semibold mb-4">Automatic SEO preview</h2><p className="text-primary font-medium">{clip(`${plain(title)||'Your photo title'} | eQOURSE ${seoPlace}`,60)}</p><p className="text-xs text-muted-foreground my-2">eqourse.com/events/{country}/highlights/…</p><p className="text-sm">{clip(plain(description)||'Your description will appear here.',160)}</p><dl className="mt-5 space-y-3 text-sm border-t pt-5"><div><dt className="text-xs text-muted-foreground">Image alt text</dt><dd>{clip(`${plain(title)} — ${seoPlace}. ${plain(description)}`,200)}</dd></div><div><dt className="text-xs text-muted-foreground">Image title</dt><dd>{plain(title)||'Add a title'}</dd></div></dl></section><section><h2 className="font-semibold mb-4">{event.title} photo library</h2>{photos.isLoading?<p className="text-sm text-muted-foreground">Loading photos…</p>:!photos.data?.items.length?<div className="border border-dashed rounded-xl p-8 text-center text-muted-foreground"><FileImage size={28} className="mx-auto mb-3"/><p className="text-sm">This tour’s photos will appear here.</p></div>:<div className="grid sm:grid-cols-2 gap-4">{photos.data.items.map(photo=><button key={photo.id} type="button" disabled={busy} onClick={()=>pick(photo)} className="rounded-lg border bg-card overflow-hidden text-left hover:border-primary transition"><img src={photo.imageUrl} alt={photo.imageAlt} loading="lazy" className="h-36 w-full object-cover"/><div className="p-3"><span className="text-xs text-primary">{photo.status}</span><p className="text-sm font-semibold mt-1">{photo.title}</p><p className="text-xs text-muted-foreground mt-2">Edit story or change visibility</p></div></button>)}</div>}</section></div></div>
  </div>;
}
