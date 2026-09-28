import * as client from './apiClient';
export interface EventPhoto {
  id:string; eventSlug:string; slug:string; title:string; description:string; imageUrl:string;
  imageAlt:string; imageTitle:string; width?:number; height?:number; status:'draft'|'published';
  seo:{title:string;description:string;ogImageUrl:string}; publishedAt?:string;
}
export interface PhotoFields {eventSlug:string;title:string;description:string;status:'draft'|'published'}
export const eventMediaApi={
  config:()=>client.get<{configured:boolean;missing:string[]}>('/api/admin/event-media/config'),
  list:(slug:string)=>client.get<{items:EventPhoto[]}>(`/api/admin/events/${encodeURIComponent(slug)}/media`),
  update:(id:string,fields:PhotoFields)=>client.patch<EventPhoto>(`/api/admin/event-media/${id}`,fields),
  async upload(file:File,fields:PhotoFields,onProgress:(percent:number)=>void){
    const ticket=await client.post<{transport:'origin';uploadToken:string}>('/api/admin/event-media/upload',{...fields,size:file.size,mimeType:file.type});
    onProgress(10);
    await client.uploadFile('/api/admin/event-media/file',file,'file',{uploadToken:ticket.uploadToken});
    onProgress(90);
    let width:number|undefined,height:number|undefined;
    try{const image=await createImageBitmap(file);width=image.width;height=image.height;image.close();}catch{/* Dimensions are optional. */}
    const saved=await client.post<EventPhoto>('/api/admin/event-media',{...fields,uploadToken:ticket.uploadToken,width,height});onProgress(100);return saved;
  }
};
const base=()=>import.meta.env.VITE_API_BASE_URL||'';
export async function fetchEventPhotos(eventSlug:string):Promise<EventPhoto[]>{
  const response=await fetch(`${base()}/api/events/${encodeURIComponent(eventSlug)}/media`);
  if(!response.ok)throw new Error('Event gallery is temporarily unavailable.');const body=await response.json();if(!body.success)throw new Error('Could not load event gallery.');return body.data.items;
}
export async function fetchEventPhoto(eventSlug:string,imageSlug:string):Promise<EventPhoto>{
  const response=await fetch(`${base()}/api/events/${encodeURIComponent(eventSlug)}/media/${encodeURIComponent(imageSlug)}`);
  if(!response.ok)throw new Error('This highlight is unavailable.');const body=await response.json();if(!body.success)throw new Error('This highlight is unavailable.');return body.data;
}
