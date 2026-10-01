import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Minus, Plus, RotateCcw } from 'lucide-react';
import paths from './worldPaths.json';
import { upcomingTours, eventYear } from './eventsData';
export default function GlobalEventsMap() {
    const [selected, setSelected] = useState(upcomingTours[1]);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const drag = useRef<{
        x: number;
        y: number;
        startX: number;
        startY: number;
    } | null>(null);
    const selectTour = (event: typeof selected) => { setSelected(event); };
    return <div className="events-map-layout">
    <div className="events-map-canvas" aria-label="Interactive world map of planned eQOURSE tour destinations" onPointerDown={e => { if ((e.target as Element).closest('button,a'))
        return; drag.current = { x: e.clientX, y: e.clientY, startX: pan.x, startY: pan.y }; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={e => { if (drag.current)
        setPan({ x: Math.max(-350, Math.min(350, drag.current.startX + e.clientX - drag.current.x)), y: Math.max(-180, Math.min(180, drag.current.startY + e.clientY - drag.current.y)) }); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      <div className="events-map-grid"/>
      <div className="events-map-world" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
        <svg viewBox="0 0 1000 500" aria-hidden="true">
          {paths.map(p => <path key={p.name} d={p.path} className={upcomingTours.some(e => e.countryCode === p.code) ? 'map-country map-destination' : 'map-country'}/>)}
          {upcomingTours.map(e => { const [lng, lat] = e.coordinates!; const x = (lng + 180) / 360 * 1000, y = (90 - lat) / 180 * 500; return <path key={e.slug} d={`M 710 180 Q ${(710 + x) / 2} ${Math.min(180, y) - 70} ${x} ${y}`} className="map-route"/>; })}
        </svg>
        {upcomingTours.map(e => { const [lng, lat] = e.coordinates!; return <button key={e.slug} className={`map-pin ${selected.slug === e.slug ? 'is-selected' : ''}`} style={{ left: `${(lng + 180) / 360 * 100}%`, top: `${(90 - lat) / 180 * 100}%` }} onClick={() => selectTour(e)} aria-label={`Explore ${e.country} tour`} aria-pressed={selected.slug === e.slug}><span className="pin-core"/><span className="pin-label">{e.country}</span></button>; })}
      </div>
      <div className="map-caption"><span className="events-live-dot"/> Planned 2026 destinations <small>Drag to explore · select a destination</small></div>
      <div className="map-controls"><button onClick={() => setZoom(z => Math.min(3, z + .5))} disabled={zoom >= 3} aria-label="Zoom in"><Plus size={18}/></button><button onClick={() => setZoom(z => Math.max(1, z - .5))} disabled={zoom <= 1} aria-label="Zoom out"><Minus size={18}/></button><button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} aria-label="Reset map"><RotateCcw size={16}/></button></div>
      <a className="map-attribution" href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth</a>
    </div>
    <div className="map-destination-panel">
      <p className="events-eyebrow">CHOOSE YOUR DESTINATION</p>
      <div className="map-destination-tabs">{upcomingTours.map((e, i) => <button key={e.slug} onClick={() => selectTour(e)} aria-pressed={selected.slug === e.slug} className={selected.slug === e.slug ? 'active' : ''}><span>0{i + 1}</span>{e.country}<ArrowUpRight size={17}/></button>)}</div>
      <div className="map-selected" aria-live="polite"><p className="events-eyebrow">ON THE HORIZON / {eventYear(selected)}</p><h3>{selected.location}</h3><p>{selected.subtitle}</p><p className="map-note">Planned destination. Meeting dates and venues will be announced.</p><Link className="events-text-link" to={`/events/${selected.slug}`}>Explore this tour <ArrowUpRight size={17}/></Link></div>
    </div>
  </div>;
}
