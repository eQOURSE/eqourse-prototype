// @ts-nocheck
import * as THREE from "three";

export const SCENES = {};

/* ---------- shared utils ---------- */
function fitCanvas(cv){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const r = cv.getBoundingClientRect();
  cv.width = Math.max(1, r.width * dpr);
  cv.height = Math.max(1, r.height * dpr);
  return {w:r.width, h:r.height, dpr};
}
function lerp(a,b,t){return a+(b-a)*t}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function smooth(t){ return t*t*(3-2*t); }
function hexA(hex,a){
  const n=parseInt(hex.slice(1),16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

/* =========================================================
   SCENE 1: AR OVERLAY DEMOS  (REDESIGNED)
   A real-feeling AR classroom moment: a desk surface (warm
   wood), an open chemistry textbook with the H₂O page visible.
   Above the page, an AR water molecule "lifts off" the page —
   3D ball-and-stick H₂O model, electron orbits, bond-angle arc,
   info cards anchored to atoms. Phone-style AR UI: focus square,
   "TRACKING" badge, "TAP TO PLACE" cursor that follows pointer.
   ========================================================= */
SCENES.ar = (() => {
  // ========================================================
  // CONCEPT: scanned textbook diagram pops out into AR.
  // The page shows a printed 2D butterfly diagram with labels.
  // A scan beam sweeps it. On every cycle the butterfly LIFTS
  // off the page as a flapping 3D object that follows the cursor.
  // After a beat, it settles back onto the page and re-scans.
  // ========================================================
  let W=0,H=0;
  let px=0.0, py=-0.1, pActive=false;
  let lastActive = 0;

  // animation phase: 0..1 over PHASE_LEN ms
  const PHASE_LEN = 9000;

  function lerp(a,b,t){ return a+(b-a)*t; }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function smooth(t){ return t*t*(3-2*t); }
  function hexA(hex,a){
    const n=parseInt(hex.slice(1),16);
    return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
  }
  function roundRect(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  }

  // smooth-following cursor target (for butterfly to chase)
  let fx=0.5, fy=0.5;

  function draw(t, ctx){
    if(pActive) lastActive = t;
    const interacting = (t - lastActive) < 1500;

    // map pointer (-1..1) -> normalized 0..1 inside canvas
    const tx = interacting ? (px*0.5+0.5) : 0.5 + Math.sin(t*0.0006)*0.18;
    const ty = interacting ? (py*0.5+0.5) : 0.45 + Math.sin(t*0.0009)*0.10;
    fx = lerp(fx, tx, 0.06);
    fy = lerp(fy, ty, 0.06);

    // phase progresses, with a brief pause at the top
    const phase = ((t % PHASE_LEN) / PHASE_LEN);
    // sub-phases:
    //   0.00-0.18  printed page only, scan beam starts
    //   0.18-0.32  scan completes, "DETECTED" flash
    //   0.32-0.55  butterfly LIFTS off (z rises), wings open
    //   0.55-0.85  butterfly flies (follows cursor), labels visible
    //   0.85-1.00  settles back onto page
    let lift = 0; // 0 = on page, 1 = floating
    if(phase < 0.18) lift = 0;
    else if(phase < 0.32) lift = smooth((phase-0.18)/0.14) * 0.25;
    else if(phase < 0.55) lift = 0.25 + smooth((phase-0.32)/0.23) * 0.75;
    else if(phase < 0.85) lift = 1;
    else lift = 1 - smooth((phase-0.85)/0.15);

    // scan progress 0..1 during scan window
    let scanT = -1;
    if(phase < 0.32) scanT = phase/0.32;

    drawDeskBackground(ctx, t);
    drawTextbookPage(ctx, t, lift, scanT, phase);
    drawArCorners(ctx);
    drawArTopBar(ctx, t, phase);

    if(scanT >= 0 && scanT <= 1){
      drawScanBeam(ctx, scanT, t);
    }

    // butterfly: starts as flat ink on the page, then lifts and flies
    drawButterfly(ctx, t, lift, phase);

    // AR info labels appear once airborne
    if(lift > 0.4){
      drawArLabels(ctx, t, lift, phase);
    }

    drawArBottomBar(ctx, t, interacting, phase);
  }

  // ---------------- background ----------------
  function drawDeskBackground(ctx, t){
    // warm wood desk through phone camera
    const desk = ctx.createLinearGradient(0,0,0,H);
    desk.addColorStop(0, '#3a2516');
    desk.addColorStop(.45,'#5a3a22');
    desk.addColorStop(1, '#2a180c');
    ctx.fillStyle=desk; ctx.fillRect(0,0,W,H);

    ctx.globalAlpha=0.18;
    for(let i=0;i<14;i++){
      const y = (i/14)*H + Math.sin(i*1.7)*8;
      ctx.strokeStyle = i%2 ? '#7a4a28' : '#2a1608';
      ctx.lineWidth = 0.8 + (i%3)*0.4;
      ctx.beginPath();
      for(let x=0;x<=W;x+=22){
        const yy = y + Math.sin(x*0.012 + i)*4;
        if(x===0) ctx.moveTo(x,yy); else ctx.lineTo(x,yy);
      }
      ctx.stroke();
    }
    ctx.globalAlpha=1;

    // warm light pool from top-left
    const lit = ctx.createRadialGradient(W*0.25, H*0.15, 20, W*0.5, H*0.5, Math.max(W,H)*0.85);
    lit.addColorStop(0,'rgba(255,220,170,0.35)');
    lit.addColorStop(.4,'rgba(255,200,140,0.08)');
    lit.addColorStop(1,'rgba(0,0,0,0.55)');
    ctx.fillStyle=lit; ctx.fillRect(0,0,W,H);
  }

  // ---------------- textbook page ----------------
  // exposes the page rect & target rect through closure
  let PAGE = null;     // {x,y,w,h}
  let TARGET = null;   // {cx,cy,r}  on-page printed butterfly center

  function drawTextbookPage(ctx, t, lift, scanT, phase){
    // page geometry — slight perspective tilt
    const bw = W*0.86, bh = H*0.62;
    const bx = W*0.5, by = H*0.62;
    PAGE = { bx, by, bw, bh };

    // page outer shadow
    ctx.save();
    ctx.shadowColor='rgba(0,0,0,0.5)';
    ctx.shadowBlur=24;ctx.shadowOffsetY=10;
    ctx.fillStyle='#f6efde';
    ctx.beginPath();
    ctx.moveTo(bx-bw/2 + 8, by-bh/2);
    ctx.lineTo(bx+bw/2 - 4, by-bh/2 - 4);
    ctx.lineTo(bx+bw/2 - 14, by+bh/2 + 8);
    ctx.lineTo(bx-bw/2 + 16, by+bh/2 + 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // spine fold
    ctx.save();
    const spine = ctx.createLinearGradient(bx-12,0,bx+12,0);
    spine.addColorStop(0,'rgba(0,0,0,0)');
    spine.addColorStop(.5,'rgba(0,0,0,.18)');
    spine.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=spine;
    ctx.fillRect(bx-12, by-bh/2, 24, bh);
    ctx.restore();

    // book header
    ctx.fillStyle='#3b2a14';
    ctx.font='700 11px Inter';
    ctx.textBaseline='top'; ctx.textAlign='left';
    ctx.fillText('CHAPTER 7  ·  LIFE SCIENCE', bx-bw/2 + 28, by-bh/2 + 14);
    ctx.fillStyle='#1a1208';
    ctx.font='800 16px Inter';
    ctx.fillText('Anatomy of a Butterfly', bx-bw/2 + 28, by-bh/2 + 30);

    // body text lines (left column)
    ctx.fillStyle='rgba(60,40,20,0.55)';
    for(let i=0;i<6;i++){
      const y = by-bh/2 + 62 + i*9;
      const w = (bw*0.36) - (i%2)*16;
      ctx.fillRect(bx-bw/2 + 28, y, w, 2.2);
    }

    // figure caption (under printed butterfly)
    const figCx = bx + bw*0.18;
    const figCy = by + bh*0.02;
    const figR  = bh*0.30;
    TARGET = { cx:figCx, cy:figCy, r:figR };

    // dashed AR target frame around the printed diagram
    ctx.save();
    ctx.translate(figCx, figCy);
    const flash = phase < 0.32 ? 0.85 : (phase < 0.55 ? 1 : 0.55);
    ctx.strokeStyle = phase < 0.32
      ? 'rgba(34,211,164,'+(0.55+0.35*Math.sin(t*0.012))+')'
      : 'rgba(34,211,164,'+flash+')';
    ctx.lineWidth=1.4;
    ctx.setLineDash([6,5]);
    ctx.strokeRect(-figR*1.05, -figR*0.85, figR*2.1, figR*1.7);
    ctx.setLineDash([]);
    // four small corner brackets on the dashed frame
    const c=8;
    ctx.lineWidth=2;
    ctx.strokeStyle='#22d3a4';
    [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy])=>{
      const x = sx*figR*1.05, y = sy*figR*0.85;
      ctx.beginPath();
      ctx.moveTo(x - sx*c, y); ctx.lineTo(x, y); ctx.lineTo(x, y - sy*c);
      ctx.stroke();
    });
    ctx.restore();

    // figure label
    ctx.fillStyle='#3b2a14';
    ctx.font='700 9px Inter';
    ctx.textAlign='center';
    ctx.fillText('FIG. 7.1  ·  PARTS OF A BUTTERFLY', figCx, figCy + figR*0.92);
    ctx.textAlign='left';

    // PRINTED butterfly diagram — INK on page (fades as it lifts off)
    const inkAlpha = clamp(1 - lift*1.6, 0, 1);
    if(inkAlpha > 0.02){
      drawPrintedButterfly(ctx, figCx, figCy, figR, inkAlpha);
    }
  }

  function drawPrintedButterfly(ctx, cx, cy, r, alpha){
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy);

    // simple ink-line butterfly: body + 4 wings
    ctx.strokeStyle='#1a1208';
    ctx.fillStyle='rgba(26,18,8,0.06)';
    ctx.lineWidth=1.4;
    ctx.lineJoin='round';

    // body (capsule)
    ctx.beginPath();
    ctx.ellipse(0, 0, r*0.06, r*0.45, 0, 0, Math.PI*2);
    ctx.stroke();
    ctx.fill();

    // head
    ctx.beginPath();
    ctx.arc(0, -r*0.5, r*0.07, 0, Math.PI*2);
    ctx.stroke();
    // antennae
    ctx.beginPath();
    ctx.moveTo(-r*0.02, -r*0.55);
    ctx.quadraticCurveTo(-r*0.18, -r*0.78, -r*0.28, -r*0.82);
    ctx.moveTo( r*0.02, -r*0.55);
    ctx.quadraticCurveTo( r*0.18, -r*0.78,  r*0.28, -r*0.82);
    ctx.stroke();

    // wings (left/right, upper/lower)
    function wing(side, upper){
      const s = side; // -1 left, 1 right
      const yShift = upper ? -r*0.18 : r*0.15;
      const wx = s*r*0.55, wy = upper ? -r*0.25 : r*0.30;
      ctx.beginPath();
      ctx.moveTo(0, yShift);
      ctx.bezierCurveTo(s*r*0.35, upper?-r*0.55:-r*0.05,
                        s*r*0.85, upper?-r*0.35:r*0.55,
                        wx, wy);
      ctx.bezierCurveTo(s*r*0.55, upper?r*0.05:r*0.45,
                        s*r*0.10, upper?-r*0.05:r*0.30,
                        0, yShift);
      ctx.closePath();
      ctx.stroke();

      // wing pattern: dots
      ctx.fillStyle='rgba(26,18,8,0.55)';
      const dots = upper ? [[0.45,-0.30],[0.62,-0.18],[0.35,-0.10]]
                         : [[0.40, 0.25],[0.55, 0.38]];
      dots.forEach(([dx,dy])=>{
        ctx.beginPath();
        ctx.arc(s*r*dx, r*dy, r*0.025, 0, Math.PI*2);
        ctx.fill();
      });
    }
    wing(-1, true); wing(1, true);
    wing(-1, false); wing(1, false);

    // dashed leader lines + tiny labels (printed)
    ctx.strokeStyle='rgba(26,18,8,0.55)';
    ctx.lineWidth=0.8;
    ctx.setLineDash([2,2]);
    const printLabels = [
      { x:-r*0.85, y:-r*0.55, text:'forewing' },
      { x: r*0.95, y: r*0.55, text:'hindwing' },
      { x: r*0.05, y:-r*0.95, text:'antenna' },
      { x:-r*0.95, y: r*0.05, text:'thorax' },
    ];
    ctx.fillStyle='rgba(26,18,8,0.7)';
    ctx.font='600 7.5px Inter';
    printLabels.forEach(l=>{
      ctx.beginPath();
      ctx.moveTo(l.x*0.55, l.y*0.55); ctx.lineTo(l.x, l.y);
      ctx.stroke();
      ctx.textAlign = l.x < 0 ? 'right' : 'left';
      ctx.fillText(l.text, l.x + (l.x<0?-2:2), l.y + 2);
    });
    ctx.setLineDash([]);
    ctx.textAlign='left';

    ctx.restore();
  }

  // ---------------- scan beam ----------------
  function drawScanBeam(ctx, scanT, t){
    if(!TARGET) return;
    const { cx, cy, r } = TARGET;
    // sweep horizontally across the target frame
    const left  = cx - r*1.1;
    const right = cx + r*1.1;
    const top   = cy - r*0.95;
    const bot   = cy + r*0.95;

    const x = lerp(left, right, scanT);

    // gradient bar
    ctx.save();
    ctx.beginPath();
    ctx.rect(left-2, top-2, (right-left)+4, (bot-top)+4);
    ctx.clip();

    const g = ctx.createLinearGradient(x-30, 0, x+30, 0);
    g.addColorStop(0, 'rgba(34,211,164,0)');
    g.addColorStop(.5,'rgba(34,211,164,0.55)');
    g.addColorStop(1, 'rgba(34,211,164,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x-30, top, 60, bot-top);

    // bright leading edge
    ctx.fillStyle='rgba(180,255,230,0.85)';
    ctx.fillRect(x-1, top, 2, bot-top);

    // scanning grid noise inside the beam
    ctx.strokeStyle='rgba(34,211,164,0.35)';
    ctx.lineWidth=0.5;
    for(let yy=top; yy<bot; yy+=4){
      ctx.beginPath();
      ctx.moveTo(x-28, yy); ctx.lineTo(x+28, yy);
      ctx.stroke();
    }
    ctx.restore();

    // small "ANALYZING" badge near beam
    ctx.save();
    ctx.fillStyle='rgba(10,18,28,0.85)';
    roundRect(ctx, x-46, top-22, 92, 18, 6); ctx.fill();
    ctx.strokeStyle='rgba(34,211,164,0.7)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='#22d3a4';
    ctx.font='800 9px JetBrains Mono';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('ANALYZING ' + Math.round(scanT*100) + '%', x, top-13);
    ctx.restore();
    ctx.textAlign='left'; ctx.textBaseline='top';
  }

  // ---------------- 3D butterfly ----------------
  function drawButterfly(ctx, t, lift, phase){
    if(!TARGET || !PAGE) return;
    const { cx, cy, r } = TARGET;

    // start position = on the page, at the diagram center
    // end position   = anywhere following cursor (within stage)
    // lift drives both Z (perspective scale) and movement freedom
    const e = smooth(lift);

    // target XY = printed center, blended with cursor as it lifts
    const cursorX = fx*W;
    const cursorY = fy*H * 0.85;  // bias up
    const flyX = lerp(cx, cursorX, e);
    const flyY = lerp(cy, cursorY, e) - 35*e; // hover slightly above

    // gentle sinusoidal drift while flying
    const drift = e * 8;
    const bx = flyX + Math.sin(t*0.0018)*drift;
    const by = flyY + Math.cos(t*0.0024)*drift*0.6 - Math.sin(t*0.005)*4*e;

    // perspective scale grows as it lifts toward camera
    const scale = (r*1.05) * (1 + e*0.55);

    // wing flap: faster while airborne
    const flapHz = e > 0.05 ? 8 : 0;
    const flap = Math.sin(t * flapHz * 0.001 * Math.PI*2);
    // wing open angle: 0 = flat (printed), 1 = up
    const wingOpen = e * (0.55 + 0.45*flap);  // 0..~1

    // contact shadow on page (separate from the airborne shadow)
    ctx.save();
    const shA = 0.45 * (1 - 0.55*e) + 0.18;
    ctx.globalAlpha = shA;
    const sg = ctx.createRadialGradient(cx, cy + 6, 4, cx, cy+6, scale*0.9);
    sg.addColorStop(0,'rgba(0,0,0,0.7)');
    sg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 6, scale*0.9 * (1+e*0.4), scale*0.32 * (1+e*0.2), 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();

    // tether glow line from page to butterfly while in flight (subtle)
    if(e > 0.05 && e < 0.95){
      ctx.save();
      ctx.strokeStyle='rgba(34,211,164,'+(0.35*(1-Math.abs(e-0.5)*1.4))+')';
      ctx.setLineDash([3,4]); ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by);
      ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();
    }

    // the butterfly itself
    ctx.save();
    ctx.translate(bx, by);

    // slight tilt with cursor
    const tilt = (px - 0) * 0.25 * e;
    ctx.rotate(tilt);

    // ----- wings -----
    // each wing is rendered as a vertical-foreshortened bezier shape.
    // wingOpen controls horizontal scale (1 = open, 0 = edge-on)
    drawWing(ctx, -1, true,  scale, wingOpen, e, t);
    drawWing(ctx,  1, true,  scale, wingOpen, e, t);
    drawWing(ctx, -1, false, scale, wingOpen, e, t);
    drawWing(ctx,  1, false, scale, wingOpen, e, t);

    // ----- body -----
    // body capsule
    const bodyL = scale*0.55, bodyW = scale*0.10;
    const bodyG = ctx.createLinearGradient(0,-bodyL/2, 0, bodyL/2);
    bodyG.addColorStop(0, '#2a1d10');
    bodyG.addColorStop(.5,'#0d0805');
    bodyG.addColorStop(1, '#2a1d10');
    ctx.fillStyle = bodyG;
    ctx.beginPath();
    ctx.ellipse(0, 0, bodyW, bodyL/2, 0, 0, Math.PI*2);
    ctx.fill();
    // body segments
    ctx.strokeStyle='rgba(255,200,150,0.18)';
    ctx.lineWidth=0.8;
    for(let i=-3;i<=3;i++){
      const yy = i*bodyL*0.12;
      ctx.beginPath();
      ctx.moveTo(-bodyW*0.9, yy); ctx.lineTo(bodyW*0.9, yy);
      ctx.stroke();
    }
    // head
    ctx.fillStyle='#1a1208';
    ctx.beginPath();
    ctx.arc(0, -bodyL/2 - bodyW*0.6, bodyW*1.05, 0, Math.PI*2);
    ctx.fill();
    // antennae
    ctx.strokeStyle='#1a1208';
    ctx.lineWidth=1.2;
    ctx.beginPath();
    ctx.moveTo(-bodyW*0.4, -bodyL/2 - bodyW*1.5);
    ctx.quadraticCurveTo(-scale*0.18, -bodyL/2 - scale*0.30, -scale*0.26, -bodyL/2 - scale*0.36);
    ctx.moveTo( bodyW*0.4, -bodyL/2 - bodyW*1.5);
    ctx.quadraticCurveTo( scale*0.18, -bodyL/2 - scale*0.30,  scale*0.26, -bodyL/2 - scale*0.36);
    ctx.stroke();
    // antennae tips
    ctx.fillStyle='#22d3a4';
    [[-1],[1]].forEach(([s])=>{
      ctx.beginPath();
      ctx.arc(s*scale*0.26, -bodyL/2 - scale*0.36, 1.8, 0, Math.PI*2);
      ctx.fill();
    });

    // wireframe overlay on top while emerging (looks like AR mesh)
    if(e > 0.05 && e < 0.85){
      const meshA = (e < 0.5 ? e*2 : (1-e)*2.5) * 0.55;
      ctx.globalAlpha = clamp(meshA, 0, 1);
      ctx.strokeStyle = '#22d3a4';
      ctx.lineWidth = 0.7;
      // crude wing mesh
      [[-1,true],[1,true],[-1,false],[1,false]].forEach(([s,up])=>{
        const yShift = up ? -scale*0.18 : scale*0.15;
        const wx = s*scale*0.55*wingOpen;
        const wy = up ? -scale*0.30 : scale*0.34;
        for(let k=1;k<=4;k++){
          const tk=k/5;
          ctx.beginPath();
          ctx.moveTo(0, yShift);
          ctx.lineTo(s*scale*0.55*wingOpen*tk, lerp(yShift, wy, tk));
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(s*scale*0.10*wingOpen, yShift);
        ctx.bezierCurveTo(s*scale*0.35*wingOpen, up?-scale*0.45:-scale*0.02,
                          s*scale*0.80*wingOpen, up?-scale*0.32:scale*0.50,
                          wx, wy);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  function drawWing(ctx, side, upper, scale, wingOpen, e, t){
    const s = side;
    const open = clamp(wingOpen, 0.05, 1);
    const yShift = upper ? -scale*0.18 : scale*0.15;
    const wx = s*scale*0.55*open;
    const wy = upper ? -scale*0.30 : scale*0.36;

    // wing fill: deep teal-blue gradient w/ orange edge (monarch-ish)
    const grad = ctx.createRadialGradient(s*scale*0.20*open, upper?-scale*0.10:scale*0.10, 2,
                                          wx, wy, scale*0.7*open);
    if(upper){
      grad.addColorStop(0, '#0a3a3c');
      grad.addColorStop(.4,'#0e6562');
      grad.addColorStop(.8,'#22d3a4');
      grad.addColorStop(1, '#ffb347');
    } else {
      grad.addColorStop(0, '#082a2c');
      grad.addColorStop(.4,'#0e5560');
      grad.addColorStop(.8,'#1aa288');
      grad.addColorStop(1, '#ff8c42');
    }

    ctx.save();
    ctx.fillStyle = grad;
    ctx.strokeStyle = 'rgba(8,8,12,0.85)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(0, yShift);
    ctx.bezierCurveTo(s*scale*0.30*open, upper?-scale*0.55:-scale*0.05,
                      s*scale*0.85*open, upper?-scale*0.35:scale*0.55,
                      wx, wy);
    ctx.bezierCurveTo(s*scale*0.55*open, upper?scale*0.05:scale*0.50,
                      s*scale*0.10*open, upper?-scale*0.05:scale*0.30,
                      0, yShift);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // veins
    ctx.strokeStyle='rgba(8,8,12,0.55)';
    ctx.lineWidth=0.7;
    for(let k=1;k<=4;k++){
      const tk=k/5;
      ctx.beginPath();
      ctx.moveTo(0, yShift);
      const ex = s*scale*0.55*open*tk + (k%2?5:-5)*0.02;
      const ey = lerp(yShift, wy, tk);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }

    // wing dots
    const dots = upper ? [[0.42,-0.32],[0.60,-0.18],[0.32,-0.08]]
                       : [[0.40, 0.20],[0.55, 0.36]];
    ctx.fillStyle='#fff';
    dots.forEach(([dx,dy])=>{
      ctx.beginPath();
      ctx.arc(s*scale*dx*open, scale*dy, scale*0.022, 0, Math.PI*2);
      ctx.fill();
    });
    // accent dot
    ctx.fillStyle = upper ? '#ffb347' : '#ff8c42';
    ctx.beginPath();
    ctx.arc(s*scale*0.50*open, upper? -scale*0.22: scale*0.30, scale*0.018, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
  }

  // ---------------- AR labels (only when airborne) ----------------
  function drawArLabels(ctx, t, lift, phase){
    if(!TARGET) return;
    // anchor labels relative to flying position — but use the same geometry
    // we used in drawButterfly, recomputed here for label endpoints.
    const e = smooth(lift);
    const cursorX = fx*W;
    const cursorY = fy*H * 0.85;
    const bx = lerp(TARGET.cx, cursorX, e) + Math.sin(t*0.0018)*8*e;
    const by = lerp(TARGET.cy, cursorY, e) - 35*e + Math.cos(t*0.0024)*5*e;
    const scale = (TARGET.r*1.05) * (1 + e*0.55);

    const fade = clamp((lift - 0.4) / 0.3, 0, 1);

    const labels = [
      { dx: -scale*0.95, dy: -scale*0.45, anchorX: -scale*0.45, anchorY: -scale*0.30,
        title:'FOREWING', sub:'Danaus plexippus', side:'left' },
      { dx:  scale*0.95, dy:  scale*0.50, anchorX:  scale*0.45, anchorY:  scale*0.30,
        title:'HINDWING', sub:'Scaled membrane', side:'right' },
      { dx:  scale*0.85, dy: -scale*0.85, anchorX:  scale*0.05, anchorY: -scale*0.55,
        title:'ANTENNA', sub:'Chemoreceptor', side:'right' },
    ];

    labels.forEach((L,i)=>{
      const t0 = clamp(fade - i*0.15, 0, 1);
      if(t0 <= 0) return;
      ctx.save();
      ctx.globalAlpha = t0;
      ctx.translate(bx, by);

      // anchor dot
      ctx.fillStyle='#22d3a4';
      ctx.beginPath();
      ctx.arc(L.anchorX, L.anchorY, 3, 0, Math.PI*2);
      ctx.fill();
      ctx.strokeStyle='rgba(34,211,164,0.4)';
      ctx.lineWidth=1.2;
      ctx.beginPath();
      ctx.arc(L.anchorX, L.anchorY, 7 + Math.sin(t*0.005+i)*2, 0, Math.PI*2);
      ctx.stroke();

      // leader line
      ctx.strokeStyle='rgba(34,211,164,0.8)';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(L.anchorX, L.anchorY);
      ctx.quadraticCurveTo((L.anchorX+L.dx)/2, L.dy, L.dx, L.dy);
      ctx.stroke();

      // card
      const cw=104, ch=34;
      const cx0 = L.side==='left' ? L.dx - cw : L.dx;
      const cy0 = L.dy - ch/2;
      ctx.fillStyle='rgba(10,18,28,0.85)';
      roundRect(ctx, cx0, cy0, cw, ch, 6); ctx.fill();
      ctx.strokeStyle='rgba(34,211,164,0.55)';
      ctx.lineWidth=1; ctx.stroke();

      ctx.fillStyle='#22d3a4';
      ctx.fillRect(cx0, cy0+5, 3, ch-10);

      ctx.fillStyle='#fff';
      ctx.font='800 10px Inter';
      ctx.textBaseline='top'; ctx.textAlign='left';
      ctx.fillText(L.title, cx0+10, cy0+6);
      ctx.fillStyle='rgba(180,210,240,0.85)';
      ctx.font='600 9px Inter';
      ctx.fillText(L.sub, cx0+10, cy0+19);

      ctx.restore();
    });
  }

  // ---------------- chrome ----------------
  function drawArCorners(ctx){
    const m=22, L=26;
    ctx.strokeStyle='rgba(255,255,255,0.85)';
    ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(m, m+L);ctx.lineTo(m,m);ctx.lineTo(m+L,m);ctx.stroke();
    ctx.beginPath();ctx.moveTo(W-m-L,m);ctx.lineTo(W-m,m);ctx.lineTo(W-m,m+L);ctx.stroke();
    ctx.beginPath();ctx.moveTo(m,H-m-L);ctx.lineTo(m,H-m);ctx.lineTo(m+L,H-m);ctx.stroke();
    ctx.beginPath();ctx.moveTo(W-m-L,H-m);ctx.lineTo(W-m,H-m);ctx.lineTo(W-m,H-m-L);ctx.stroke();
  }

  function drawArTopBar(ctx, t, phase){
    // status pill — changes by phase
    const x=20, y=20;
    let label = 'AR · SCANNING';
    let dotColor = '#ffb347';
    if(phase >= 0.18 && phase < 0.32){ label='AR · DETECTED'; dotColor='#22d3a4'; }
    else if(phase >= 0.32 && phase < 0.85){ label='AR · TRACKING'; dotColor='#22d3a4'; }
    else if(phase >= 0.85){ label='AR · RESET'; dotColor='#9cc8ff'; }

    ctx.fillStyle='rgba(10,18,28,0.7)';
    roundRect(ctx, x, y, 140, 26, 13); ctx.fill();
    const blink = 0.55 + Math.sin(t*0.006)*0.45;
    ctx.fillStyle=hexA(dotColor, blink);
    ctx.beginPath(); ctx.arc(x+12, y+13, 4, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle=hexA(dotColor, 0.5);
    ctx.lineWidth=1; ctx.beginPath(); ctx.arc(x+12, y+13, 7, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle='#fff';
    ctx.font='700 10px Inter'; ctx.textAlign='left'; ctx.textBaseline='middle';
    ctx.fillText(label, x+24, y+13);

    // top-right context badge
    const x2=W-150, y2=20;
    ctx.fillStyle='rgba(10,18,28,0.7)';
    roundRect(ctx, x2, y2, 130, 26, 13); ctx.fill();
    ctx.fillStyle='rgba(120,200,255,0.85)';
    ctx.font='700 10px Inter';
    ctx.fillText('BIOLOGY · GR.7', x2+12, y2+13);
  }

  function drawArBottomBar(ctx, t, interacting, phase){
    // step pills bottom-left
    const x=20, y=H-44;
    const steps=['Scan','Detect','Inspect','Quiz'];
    let active = 0;
    if(phase < 0.18) active = 0;
    else if(phase < 0.32) active = 1;
    else if(phase < 0.85) active = 2;
    else active = 0;

    steps.forEach((s,i)=>{
      const px2 = x + i*64;
      const isOn = i===active;
      ctx.fillStyle = isOn ? '#22d3a4' : 'rgba(10,18,28,0.65)';
      roundRect(ctx, px2, y, 58, 24, 12); ctx.fill();
      if(!isOn){
        ctx.strokeStyle='rgba(255,255,255,0.18)'; ctx.lineWidth=1; ctx.stroke();
      }
      ctx.fillStyle = isOn ? '#063a2e' : 'rgba(255,255,255,.85)';
      ctx.font='700 10px Inter';
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(s, px2+29, y+12);
    });

    // hint chip bottom-right
    const hint = phase < 0.32 ? 'Scanning page…'
               : phase < 0.85 ? 'Move cursor — butterfly follows'
               : 'Returning to page…';
    const hw = ctx.measureText(hint).width + 24;
    ctx.fillStyle='rgba(10,18,28,0.75)';
    roundRect(ctx, W-hw-20, H-40, hw, 24, 12); ctx.fill();
    ctx.strokeStyle='rgba(34,211,164,0.45)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='#22d3a4';
    ctx.font='700 9.5px Inter';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(hint, W-hw/2-20, H-28);

    // pointer follow ring (only when interacting)
    if(interacting){
      const cx = (px*0.5+0.5)*W;
      const cy = (py*0.5+0.5)*H;
      const r = 10 + Math.sin(t*0.012)*1.6;
      ctx.strokeStyle='rgba(34,211,164,0.95)';
      ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.arc(cx,cy, r, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx,cy, 2, 0, Math.PI*2); ctx.fillStyle='rgba(34,211,164,1)'; ctx.fill();
    }
  }

  return {
    label:'AR Overlay Demos',
    hint:'Scan textbook → diagram lifts off the page',
    init(){},
    onPointer(x,y,a){ px=x;py=y;pActive=a; },
    resize(d){ W=d.w; H=d.h; },
    draw,
  };
})();

/* =========================================================
   SCENE 2: VR ENVIRONMENT TOURS
   Parallax 360-feel scene of a VR lab/environment seen through
   a headset reticle. Layers move based on cursor (look-around).
   ========================================================= */
SCENES.vr = (() => {
  let W=0,H=0;
  let px=0,py=0,pActive=false;
  let lookX=0, lookY=0;

  // generate stars/particles once
  const stars = Array.from({length:80}, ()=>({
    x: Math.random(), y: Math.random()*0.7,
    s: Math.random()*1.6+0.3,
    tw: Math.random()*Math.PI*2
  }));
  const farMtns = makeRidge(0.55, 0.05, 1234);
  const midMtns = makeRidge(0.65, 0.09, 4242);
  const nearMtns= makeRidge(0.78, 0.13, 9999);

  function makeRidge(baseY, amp, seed){
    const pts=[];
    let s=seed;
    function r(){ s=(s*9301+49297)%233280; return s/233280; }
    let last = baseY;
    for(let i=0;i<=40;i++){
      last = baseY + (r()-0.5)*amp + Math.sin(i*0.4 + seed)*amp*0.4;
      pts.push({x:i/40, y:last});
    }
    return pts;
  }

  function draw(t, ctx){
    // smooth look
    const tx = pActive ? px*0.6 : Math.sin(t*0.0003)*0.2;
    const ty = pActive ? py*0.3 : Math.sin(t*0.00041)*0.06;
    lookX = lerp(lookX, tx, 0.06);
    lookY = lerp(lookY, ty, 0.06);

    // sky
    const sky = ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#0a0a2a');
    sky.addColorStop(.4,'#1a1855');
    sky.addColorStop(.7,'#5b3a8e');
    sky.addColorStop(1,'#ec6b9e');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

    // sun glow
    const sx = W*(0.7 - lookX*0.4);
    const sy = H*(0.55 + lookY*0.2);
    const sun = ctx.createRadialGradient(sx,sy,0,sx,sy,W*0.5);
    sun.addColorStop(0,'rgba(255,200,140,0.55)');
    sun.addColorStop(.25,'rgba(255,140,180,0.25)');
    sun.addColorStop(1,'rgba(255,140,180,0)');
    ctx.fillStyle=sun; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,230,200,0.95)';
    ctx.beginPath(); ctx.arc(sx,sy, Math.min(W,H)*0.06, 0, Math.PI*2); ctx.fill();

    // stars
    for(const s of stars){
      const x = ((s.x - lookX*0.05 + 1)%1)*W;
      const y = (s.y + lookY*0.05)*H;
      const a = 0.35 + Math.sin(t*0.003 + s.tw)*0.4;
      ctx.fillStyle=`rgba(255,255,255,${(a).toFixed(2)})`;
      ctx.fillRect(x, y, s.s, s.s);
    }

    // far mountains
    drawRidge(ctx, farMtns, lookX*0.06, '#2b2358', 0.55);
    // mid mountains
    drawRidge(ctx, midMtns, lookX*0.12, '#1f1a4a', 0.66);
    // near mountains
    drawRidge(ctx, nearMtns, lookX*0.22, '#0f0d2e', 0.82);

    // shooting star
    drawShootingStar(ctx, t);

    // distant birds (silhouettes)
    drawBirds(ctx, t, lookX);

    // hot-air balloon (drifts slowly)
    drawBalloon(ctx, 0.18 - lookX*0.18, 0.34 + lookY*0.05, 0.85, t, 0);
    drawBalloon(ctx, 0.74 - lookX*0.22, 0.42 + lookY*0.06, 0.62, t, 1);

    // atmospheric haze layer over mountains
    const haze = ctx.createLinearGradient(0,H*0.55,0,H*0.85);
    haze.addColorStop(0,'rgba(255,180,140,0.12)');
    haze.addColorStop(1,'rgba(255,180,140,0)');
    ctx.fillStyle=haze; ctx.fillRect(0,H*0.55,W,H*0.3);

    // foreground silhouette: hiker on a cliff, looking out
    drawHiker(ctx, lookX, lookY, t);

    // ground plane grid (perspective) - subtle
    drawGrid(ctx, t);

    // headset reticle vignette + crosshair
    drawHeadset(ctx);
  }

  function drawRidge(ctx, ridge, offset, color, baseY){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(0,H);
    for(const p of ridge){
      const x = (p.x + offset)*W;
      const y = p.y*H;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H);
    ctx.closePath(); ctx.fill();
  }

  function drawPlatform(ctx, nx, ny, size, color, t, idx){
    // (deprecated — replaced by realistic landscape elements)
  }

  function drawShootingStar(ctx, t){
    // shooting stars across the sky every ~6s
    const cycle = 6000;
    const phase = (t % cycle) / cycle;
    if(phase > 0.25) return;
    const p = phase / 0.25;
    const sx = W*0.1 + p*W*0.55;
    const sy = H*0.18 + p*H*0.08;
    const a = Math.sin(p*Math.PI);
    const grd = ctx.createLinearGradient(sx-60, sy-12, sx, sy);
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(1, `rgba(255,255,255,${a.toFixed(2)})`);
    ctx.strokeStyle = grd;
    ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(sx-60, sy-12); ctx.lineTo(sx, sy); ctx.stroke();
    ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`;
    ctx.beginPath(); ctx.arc(sx, sy, 1.6, 0, Math.PI*2); ctx.fill();
  }

  function drawBirds(ctx, t, lookX){
    const offset = -lookX*40;
    ctx.strokeStyle = 'rgba(20,15,40,0.55)';
    ctx.lineWidth = 1.2;
    for(let i=0;i<5;i++){
      const x = ((i*0.22 + (t*0.00004)) % 1) * W + offset + i*8;
      const y = H*0.28 + Math.sin(t*0.001 + i)*4 + i*6;
      const flap = Math.sin(t*0.012 + i*1.7);
      const w = 7 + Math.abs(flap)*2;
      ctx.beginPath();
      ctx.moveTo(x-w, y + flap*2);
      ctx.quadraticCurveTo(x, y - 2, x+w, y + flap*2);
      ctx.stroke();
    }
  }

  function drawBalloon(ctx, nx, ny, sc, t, idx){
    const x = nx*W;
    const y = ny*H + Math.sin(t*0.0008 + idx*1.7)*4;
    const r = 18*sc;
    // envelope
    const grd = ctx.createRadialGradient(x - r*0.35, y - r*0.4, r*0.1, x, y, r);
    grd.addColorStop(0, idx===0 ? '#ffd5a5' : '#ffb1c8');
    grd.addColorStop(.6, idx===0 ? '#e76f51' : '#c2185b');
    grd.addColorStop(1, idx===0 ? '#7a2e1a' : '#5a0d2e');
    ctx.fillStyle=grd;
    ctx.beginPath();
    ctx.ellipse(x, y, r*0.92, r*1.05, 0, 0, Math.PI*2);
    ctx.fill();
    // vertical seams
    ctx.strokeStyle='rgba(0,0,0,0.18)';
    ctx.lineWidth=0.8;
    for(let k=-2;k<=2;k++){
      ctx.beginPath();
      ctx.ellipse(x + k*r*0.18, y, r*0.05, r*1.05, 0, 0, Math.PI*2);
      ctx.stroke();
    }
    // ropes
    ctx.strokeStyle='rgba(20,15,40,0.6)';
    ctx.lineWidth=0.7;
    ctx.beginPath();
    ctx.moveTo(x-r*0.5, y+r*0.95); ctx.lineTo(x-r*0.25, y+r*1.45);
    ctx.moveTo(x+r*0.5, y+r*0.95); ctx.lineTo(x+r*0.25, y+r*1.45);
    ctx.stroke();
    // basket
    ctx.fillStyle='#3a2614';
    ctx.fillRect(x-r*0.28, y+r*1.4, r*0.56, r*0.32);
    ctx.fillStyle='rgba(0,0,0,0.25)';
    ctx.fillRect(x-r*0.28, y+r*1.55, r*0.56, r*0.05);
  }

  function drawHiker(ctx, lookX, lookY, t){
    // dark cliff/foreground silhouette anchored bottom
    ctx.fillStyle = '#050714';
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H*0.85);
    ctx.bezierCurveTo(W*0.18, H*0.78, W*0.32, H*0.92, W*0.45, H*0.86);
    ctx.bezierCurveTo(W*0.55, H*0.83, W*0.62, H*0.9, W*0.78, H*0.86);
    ctx.bezierCurveTo(W*0.88, H*0.83, W*0.95, H*0.9, W, H*0.88);
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    // hiker silhouette on the left ridge
    const hx = W*0.32 - lookX*8;
    const hy = H*0.84 + lookY*4;
    ctx.fillStyle='#020310';
    // body
    ctx.fillRect(hx-2, hy-14, 4, 12);
    // head
    ctx.beginPath(); ctx.arc(hx, hy-18, 3.2, 0, Math.PI*2); ctx.fill();
    // backpack
    ctx.fillRect(hx-5, hy-12, 3, 8);
    // legs
    ctx.fillRect(hx-3, hy-2, 2, 6);
    ctx.fillRect(hx+1, hy-2, 2, 6);
    // tiny lantern glow
    ctx.fillStyle='rgba(255,200,120,0.5)';
    ctx.beginPath(); ctx.arc(hx+5, hy-6, 4, 0, Math.PI*2); ctx.fill();
  }


  function drawGrid(ctx, t){
    // very subtle ground grid (was bright teal — toned down)
    const horizon = H*0.66;
    ctx.strokeStyle='rgba(120,180,220,0.06)';
    ctx.lineWidth=1;
    for(let i=0;i<6;i++){
      const f = i/5;
      const y = horizon + Math.pow(f,1.6)*(H-horizon);
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
    }
  }

  function drawHeadset(ctx){
    // soft vignette like through headset lenses
    const grd = ctx.createRadialGradient(W*0.5,H*0.5,Math.min(W,H)*0.25,W*0.5,H*0.5,Math.max(W,H)*0.7);
    grd.addColorStop(0,'rgba(0,0,0,0)');
    grd.addColorStop(.7,'rgba(0,0,0,0.45)');
    grd.addColorStop(1,'rgba(0,0,0,0.85)');
    ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);

    // reticle
    const cx=W*0.5, cy=H*0.5;
    ctx.strokeStyle='rgba(255,255,255,0.7)';
    ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.arc(cx,cy,16,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,3,0,Math.PI*2); ctx.stroke();
    // ticks
    [-1,1].forEach(d=>{
      ctx.beginPath();ctx.moveTo(cx+d*22,cy);ctx.lineTo(cx+d*30,cy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy+d*22);ctx.lineTo(cx,cy+d*30);ctx.stroke();
    });

    // headset mode badge
    ctx.fillStyle='rgba(0,0,0,0.5)';
    roundRect(ctx, W-110, H-58, 96, 28, 6); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.4)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(34,211,164,1)';
    ctx.beginPath(); ctx.arc(W-95, H-44, 3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff';
    ctx.font='700 10px Inter';
    ctx.textBaseline='middle';
    ctx.fillText('VR MODE · 6DOF', W-87, H-44);
  }

  return {
    label:'VR Environment Tours',
    hint:'Drag to look around the VR scene',
    init(){},
    onPointer(x,y,a){px=x;py=y;pActive=a},
    resize(d){W=d.w;H=d.h},
    draw,
  };
})();

/* =========================================================
   SCENE 3: 360° EXPERIENCES
   Cylindrical panorama you can drag to spin. Compass at top.
   Rendered as a long horizontal scene that wraps.
   ========================================================= */
SCENES.pano = (() => {
  let W=0,H=0;
  let px=0,py=0,pActive=false;
  let heading=0; // radians
  let target=0;

  // synthesize a panoramic skyline
  function draw(t, ctx){
    // auto-rotate when idle
    if(pActive){
      target = px*Math.PI; // -π..π
    } else {
      target += 0.0005;
    }
    heading = lerp(heading, target, 0.08);

    // sky band
    const sky = ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#102a4a');
    sky.addColorStop(.5,'#3b6df0');
    sky.addColorStop(.65,'#7fb6ff');
    sky.addColorStop(1,'#dbeeff');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*0.7);
    // sea/ground
    const sea = ctx.createLinearGradient(0,H*0.7,0,H);
    sea.addColorStop(0,'#0e1a32');
    sea.addColorStop(1,'#06101e');
    ctx.fillStyle=sea; ctx.fillRect(0,H*0.7,W,H*0.3);

    // sun position based on heading
    const sunWorldX = (-heading)/(Math.PI*2); // 0..1 looped
    const sunScreenX = (((sunWorldX + 0.5)%1) ) * W;
    // sun
    const sx = sunScreenX, sy = H*0.32;
    const sun = ctx.createRadialGradient(sx,sy,0,sx,sy,W*0.3);
    sun.addColorStop(0,'rgba(255,230,170,0.95)');
    sun.addColorStop(.2,'rgba(255,180,160,0.45)');
    sun.addColorStop(1,'rgba(255,180,160,0)');
    ctx.fillStyle=sun; ctx.fillRect(0,0,W,H*0.7);
    ctx.fillStyle='rgba(255,240,200,1)';
    ctx.beginPath();ctx.arc(sx,sy, 22, 0, Math.PI*2);ctx.fill();

    // cloud layer (parallax slow)
    drawClouds(ctx, heading, t);

    // skyline buildings — many of them, looped by heading
    drawSkyline(ctx, heading, 0.75, '#1a2748', 0.55, 1.0);
    drawSkyline(ctx, heading*1.4, 0.78, '#0e1a32', 0.85, 1.4);

    // boats
    drawBoats(ctx, heading, t);

    // reflection sparkle
    for(let i=0;i<40;i++){
      const x = ((i/40 + (t*0.0001))%1)*W;
      const y = H*0.78 + (i%3)*5;
      const a = 0.2+Math.sin(t*0.005+i)*0.2;
      ctx.fillStyle=`rgba(255,230,200,${Math.max(0,a).toFixed(2)})`;
      ctx.fillRect(x,y,2,1);
    }

    // compass overlay at top
    drawCompass(ctx, heading);

    // drag handles bottom
    drawDragHint(ctx, t);
  }

  function drawClouds(ctx, heading, t){
    const offset = -heading*W*0.15;
    for(let i=0;i<8;i++){
      const cx = ((i*0.18 + offset/W + 1)%1)*W;
      const cy = H*0.18 + (i%3)*22;
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.ellipse(cx,cy, 50, 14, 0, 0, Math.PI*2);
      ctx.ellipse(cx+30,cy-6, 30, 12, 0, 0, Math.PI*2);
      ctx.ellipse(cx-25,cy+2, 36, 10, 0, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function drawSkyline(ctx, heading, baseY, color, alpha, freq){
    ctx.fillStyle=color;
    ctx.globalAlpha=alpha;
    ctx.beginPath(); ctx.moveTo(0,H);
    const N=80;
    for(let i=0;i<=N;i++){
      const u = i/N;
      // pseudo-random heights based on world position
      const wx = u + (-heading/(Math.PI*2))*freq;
      const seed = Math.sin(wx*47.3)*1000;
      const hh = (Math.abs(Math.sin(wx*15.7 + seed))*0.18 + 0.04 + Math.abs(Math.sin(wx*7.1))*0.1) ;
      const y = baseY*H - hh*H;
      ctx.lineTo(u*W, y);
      // little notches for buildings
      if(i<N){
        ctx.lineTo(u*W + (W/N)*0.5, y);
      }
    }
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    ctx.globalAlpha=1;

    // window lights
    if(alpha>0.7){
      for(let i=0;i<60;i++){
        const wx = i/60 + (-heading/(Math.PI*2))*freq*1;
        const x = ((wx*W) % W + W) % W;
        const y = baseY*H + 4 + (i%6)*4;
        const flick = Math.sin(i*1.7 + Date.now()*0.001)>0.2 ? 1 : 0.4;
        ctx.fillStyle=`rgba(255,210,120,${flick*0.8})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  function drawBoats(ctx, heading, t){
    for(let i=0;i<3;i++){
      const wx = (i*0.33 + (-heading/(Math.PI*2))*1.1);
      const x = ((wx%1+1)%1)*W;
      const y = H*0.82 + Math.sin(t*0.002+i)*3;
      ctx.fillStyle='#0b1428';
      ctx.beginPath();
      ctx.moveTo(x-12,y);ctx.lineTo(x+12,y);ctx.lineTo(x+8,y+5);ctx.lineTo(x-8,y+5);ctx.closePath();ctx.fill();
      // sail
      ctx.fillStyle='rgba(255,255,255,0.7)';
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-14);ctx.lineTo(x+8,y);ctx.closePath();ctx.fill();
    }
  }

  function drawCompass(ctx, heading){
    const cx=W*0.5, cy=24;
    ctx.fillStyle='rgba(0,0,0,0.45)';
    roundRect(ctx, cx-90, 10, 180, 28, 14); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=1; ctx.stroke();

    const dirs = ['N','E','S','W'];
    for(let i=0;i<4;i++){
      const a = (i*Math.PI/2) - heading;
      // map angle to x within compass; π → outside
      const norm = Math.atan2(Math.sin(a), Math.cos(a)) / Math.PI; // -1..1
      if(Math.abs(norm)>0.55) continue;
      const x = cx + norm*80;
      ctx.fillStyle = dirs[i]==='N' ? '#ec6b9e' : '#fff';
      ctx.font='700 12px Inter';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(dirs[i], x, cy);
    }
    // ticks
    for(let k=-8;k<=8;k++){
      const x = cx + k*10;
      ctx.strokeStyle='rgba(255,255,255,0.4)';
      ctx.beginPath();ctx.moveTo(x,cy+10);ctx.lineTo(x,cy+13);ctx.stroke();
    }
    // center marker
    ctx.fillStyle='#22d3a4';
    ctx.beginPath();
    ctx.moveTo(cx,cy-12);ctx.lineTo(cx-5,cy-4);ctx.lineTo(cx+5,cy-4);
    ctx.closePath();ctx.fill();
  }

  function drawDragHint(ctx, t){
    // ← 360° → indicator near bottom
    const cx=W*0.5, cy=H-26;
    const a = 0.5 + Math.sin(t*0.004)*0.3;
    ctx.globalAlpha=a;
    ctx.fillStyle='rgba(0,0,0,0.45)';
    roundRect(ctx, cx-70, cy-12, 140, 24, 12); ctx.fill();
    ctx.fillStyle='#fff';
    ctx.font='600 11px Inter';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('◀  drag to spin 360°  ▶', cx, cy);
    ctx.globalAlpha=1;
  }

  return {
    label:'360° Experiences',
    hint:'Drag horizontally to spin the panorama',
    init(){},
    onPointer(x,y,a){px=x;py=y;pActive=a},
    resize(d){W=d.w;H=d.h},
    draw,
  };
})();

/* =========================================================
   SCENE 4: INTERACTIVE 3D MODELS
   A real 3D wireframe model (DNA double helix) you can grab and
   spin with the mouse. Pure Canvas 3D projection.
   ========================================================= */
SCENES.model = (() => {
  let W=0,H=0;
  let px=0,py=0,pActive=false;
  let yaw=0, pitch=0, ryaw=0, rpitch=0;

  // build double helix
  const helix = []; // {p:[x,y,z], strand:0|1}
  const rungs = []; // pairs
  const N = 64;
  const turns = 3.2;
  for(let i=0;i<N;i++){
    const u = i/(N-1);
    const a = u*turns*Math.PI*2;
    const y = (u-0.5)*2.4;
    const r = 0.7;
    helix.push({p:[Math.cos(a)*r, y, Math.sin(a)*r], s:0, idx:i});
    helix.push({p:[Math.cos(a+Math.PI)*r, y, Math.sin(a+Math.PI)*r], s:1, idx:i});
    if(i%2===0) rungs.push(i);
  }

  function project(v, cx, cy, scale){
    const cyaw=Math.cos(yaw), syaw=Math.sin(yaw);
    const cpit=Math.cos(pitch), spit=Math.sin(pitch);
    let [x,y,z]=v;
    let x1 = x*cyaw + z*syaw;
    let z1 = -x*syaw + z*cyaw;
    let y1 = y*cpit - z1*spit;
    let z2 = y*spit + z1*cpit;
    const persp = 1/(3.0 - z2*0.7);
    return {x: cx + x1*scale*persp, y: cy + y1*scale*persp, z: z2, s: persp};
  }

  function draw(t, ctx){
    // smooth rotation
    const tgtYaw = pActive ? px*Math.PI : t*0.0008;
    const tgtPit = pActive ? -py*Math.PI*0.4 : Math.sin(t*0.0006)*0.2;
    yaw = lerp(yaw, tgtYaw, 0.1);
    pitch = lerp(pitch, tgtPit, 0.1);

    // background — studio
    const g = ctx.createRadialGradient(W*0.5, H*0.4, 0, W*0.5, H*0.5, Math.max(W,H)*0.7);
    g.addColorStop(0,'#243152');
    g.addColorStop(.6,'#0e1730');
    g.addColorStop(1,'#040814');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

    // floor reflection band
    const floor = ctx.createLinearGradient(0,H*0.62,0,H);
    floor.addColorStop(0,'rgba(255,255,255,0.04)');
    floor.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=floor; ctx.fillRect(0,H*0.62,W,H*0.38);

    // grid floor with perspective
    drawFloorGrid(ctx);

    const cx=W*0.5, cy=H*0.5;
    const scale=Math.min(W,H)*0.32;

    // project all
    const proj = helix.map(v=>({...v, pp:project(v.p,cx,cy,scale)}));

    // sort rungs by depth and draw
    const rungData = rungs.map(i=>{
      const a = proj[i*2].pp;
      const b = proj[i*2+1].pp;
      return {a,b,z:(a.z+b.z)*0.5,i};
    }).sort((p,q)=>p.z-q.z);

    rungData.forEach(({a,b,z,i})=>{
      const alpha = clamp((z+1)*0.5,0,1);
      const hue = (i*8) % 360;
      ctx.strokeStyle = `hsla(${180+i*4},80%,${50+alpha*15}%,${(0.4+alpha*0.5).toFixed(2)})`;
      ctx.lineWidth = 1 + alpha*1.6;
      ctx.beginPath();
      ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
      ctx.stroke();
    });

    // draw strand backbones (split by depth)
    drawStrand(ctx, proj.filter(v=>v.s===0));
    drawStrand(ctx, proj.filter(v=>v.s===1));

    // base spheres
    proj.sort((a,b)=>a.pp.z-b.pp.z).forEach((v)=>{
      const p=v.pp;
      const r = 3 + p.s*4;
      const a = clamp((p.z+0.6),0,1);
      const col = v.s===0 ? `hsl(190, 90%, ${50+a*15}%)` : `hsl(330, 80%, ${55+a*15}%)`;
      // glow
      const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*2.4);
      grd.addColorStop(0, col);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle=grd;
      ctx.beginPath(); ctx.arc(p.x,p.y,r*2.4,0,Math.PI*2); ctx.fill();
      // core
      ctx.fillStyle=col;
      ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fill();
      // highlight
      ctx.fillStyle='rgba(255,255,255,0.7)';
      ctx.beginPath(); ctx.arc(p.x-r*0.35,p.y-r*0.35,r*0.3,0,Math.PI*2); ctx.fill();
    });

    // model label
    drawLabel(ctx, t);

    // gizmo bottom-right
    drawGizmo(ctx);
  }

  function drawStrand(ctx, list){
    list.sort((a,b)=>a.idx-b.idx);
    ctx.lineWidth=2.2;
    ctx.strokeStyle = list[0].s===0 ? 'rgba(80,200,255,0.85)' : 'rgba(255,120,180,0.85)';
    ctx.beginPath();
    list.forEach((v,i)=>{
      const p=v.pp;
      if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
    });
    ctx.stroke();
  }

  function drawFloorGrid(ctx){
    const horizon = H*0.6;
    for(let i=0;i<10;i++){
      const f=i/9;
      const y = horizon + Math.pow(f,1.6)*(H-horizon);
      ctx.strokeStyle=`rgba(120,170,255,${(0.2 - f*0.16).toFixed(2)})`;
      ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
    }
    const vp = W*0.5;
    for(let k=-9;k<=9;k++){
      const xb = vp + k*W*0.12;
      ctx.strokeStyle='rgba(120,170,255,0.18)';
      ctx.beginPath();ctx.moveTo(vp,horizon);ctx.lineTo(xb,H+10);ctx.stroke();
    }
  }

  function drawLabel(ctx, t){
    // floating tag
    const x = 20, y = H-58;
    ctx.fillStyle='rgba(0,0,0,0.5)';
    roundRect(ctx, x, y, 152, 38, 8); ctx.fill();
    ctx.strokeStyle='rgba(120,200,255,0.4)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(120,200,255,0.85)';
    ctx.font='700 9px JetBrains Mono';
    ctx.textBaseline='top';
    ctx.fillText('MODEL · DNA_HELIX_v3', x+12, y+8);
    ctx.fillStyle='#fff';
    ctx.font='700 12px Inter';
    ctx.fillText('Drag to rotate · 64 base pairs', x+12, y+20);
  }

  function drawGizmo(ctx){
    const x=W-50, y=H-50;
    const len=22;
    const cyaw=Math.cos(yaw), syaw=Math.sin(yaw);
    const cpit=Math.cos(pitch), spit=Math.sin(pitch);
    const proj=(v)=>{
      let [a,b,c]=v;
      let x1 = a*cyaw + c*syaw;
      let z1 = -a*syaw + c*cyaw;
      let y1 = b*cpit - z1*spit;
      return {x: x + x1*len, y: y + y1*len};
    };
    const o={x,y};
    const ax=proj([1,0,0]), ay=proj([0,1,0]), az=proj([0,0,1]);
    [['#ff6b6b',ax,'X'],['#22d3a4',ay,'Y'],['#3b6df0',az,'Z']].forEach(([c,p,l])=>{
      ctx.strokeStyle=c; ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.lineTo(p.x,p.y);ctx.stroke();
      ctx.fillStyle=c; ctx.font='700 10px Inter';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(l, p.x + (p.x-o.x)*0.25, p.y + (p.y-o.y)*0.25);
    });
  }

  return {
    label:'Interactive 3D Models',
    hint:'Click & drag to rotate the model',
    init(){},
    onPointer(x,y,a){px=x;py=y;pActive=a},
    resize(d){W=d.w;H=d.h},
    draw,
  };
})();



export function init3DEngine(container) {
            
            // 1. Core Engine Setup
            const scene = new THREE.Scene();
            scene.background = null; 

            const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
            camera.position.set(0, 0, 14);

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            container.appendChild(renderer.domElement);

            const mainGroup = new THREE.Group();
            scene.add(mainGroup);
            let activeAnimators = []; 
            let time = 0;

            // 3. Shared Premium Materials
            const matBlue = new THREE.MeshPhysicalMaterial({ color: 0x3b82f6, metalness: 0.1, roughness: 0.2, clearcoat: 1.0 });
            const matTeal = new THREE.MeshPhysicalMaterial({ color: 0x1abc9c, metalness: 0.2, roughness: 0.2, clearcoat: 0.8 });
            const matGlass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.1, transmission: 0.9, transparent: true, opacity: 1, thickness: 1.5 });
            const matDark = new THREE.MeshPhysicalMaterial({ color: 0x1f2937, metalness: 0.7, roughness: 0.3 });
            const matGlow = new THREE.MeshBasicMaterial({ color: 0x1abc9c });

            // 4. Studio Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
            dirLight.position.set(5, 10, 7);
            dirLight.castShadow = true;
            dirLight.shadow.mapSize.width = 1024;
            dirLight.shadow.mapSize.height = 1024;
            scene.add(dirLight);

            const blueLight = new THREE.PointLight(0x3b82f6, 2, 20);
            blueLight.position.set(-5, -2, 4);
            scene.add(blueLight);

            const tealLight = new THREE.PointLight(0x1abc9c, 2, 20);
            tealLight.position.set(5, 5, -4);
            scene.add(tealLight);

            // ==========================================
            // DRAG-TO-ROTATE INTERACTION LOGIC
            // ==========================================
            let isDragging = false;
            let previousMousePosition = { x: 0, y: 0 };
            
            // Auto rotation speeds
            let targetRotationX = 0;
            let targetRotationY = 0;
            let autoRotateSpeed = 0.005;

            container.addEventListener('mousedown', (e) => {
                isDragging = true;
                container.style.cursor = 'grabbing';
            });

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (isDragging) {
                    const deltaMove = {
                        x: e.offsetX - previousMousePosition.x,
                        y: e.offsetY - previousMousePosition.y
                    };

                    targetRotationY += deltaMove.x * 0.01;
                    targetRotationX += deltaMove.y * 0.01;
                }
                
                previousMousePosition = { x: e.offsetX, y: e.offsetY };
            });

            container.addEventListener('mouseup', () => {
                isDragging = false;
                container.style.cursor = 'grab';
            });
            container.addEventListener('mouseleave', () => {
                isDragging = false;
                container.style.cursor = 'grab';
            });

            // Touch support for mobile
            container.addEventListener('touchstart', (e) => {
                isDragging = true;
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }, {passive: true});

            container.addEventListener('touchmove', (e) => {
                if (isDragging) {
                    const deltaMove = {
                        x: e.touches[0].clientX - previousMousePosition.x,
                        y: e.touches[0].clientY - previousMousePosition.y
                    };
                    targetRotationY += deltaMove.x * 0.01;
                    targetRotationX += deltaMove.y * 0.01;
                    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                }
            }, {passive: true});

            container.addEventListener('touchend', () => { isDragging = false; });


            // ==========================================
            // ADVANCED AR/VR SCENE BUILDERS
            // ==========================================
            function clearScene() {
                while(mainGroup.children.length > 0){ 
                    mainGroup.remove(mainGroup.children[0]); 
                }
                activeAnimators = [];
                // Reset rotations
                targetRotationX = 0;
                targetRotationY = 0;
                mainGroup.rotation.set(0,0,0);
                mainGroup.position.set(0,0,0);
                autoRotateSpeed = 0.005; 
            }

            // SCENE 1: AR Overlay Demo (Educational Tablet Projection)
            function buildARScene() {
                clearScene();
                autoRotateSpeed = 0.004;

                const arGroup = new THREE.Group();
                arGroup.rotation.x = Math.PI / 5;

                const tabletGroup = new THREE.Group();
                const tabletBody = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.2, 3.2), matDark);
                const screen = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.9), new THREE.MeshBasicMaterial({ color: 0x1e3a8a }));
                screen.rotation.x = -Math.PI / 2;
                screen.position.y = 0.11;
                const screenGrid = new THREE.GridHelper(4.2, 8, 0x3b82f6, 0x3b82f6);
                screenGrid.position.y = 0.12;
                screenGrid.material.opacity = 0.3;
                screenGrid.material.transparent = true;
                tabletGroup.add(tabletBody, screen, screenGrid);
                arGroup.add(tabletGroup);

                const beamGeo = new THREE.CylinderGeometry(1.8, 0.1, 3.5, 32, 1, true);
                const beamMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
                const beam = new THREE.Mesh(beamGeo, beamMat);
                beam.position.y = 1.75;
                beam.rotation.x = Math.PI; 
                arGroup.add(beam);

                const hologramGroup = new THREE.Group();
                hologramGroup.position.y = 2.8;
                const nucleusGroup = new THREE.Group();
                for(let i=0; i<8; i++) {
                    const particle = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), i%2===0 ? matBlue : matTeal);
                    particle.position.set((Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3);
                    nucleusGroup.add(particle);
                }
                hologramGroup.add(nucleusGroup);

                const orbits = [];
                for(let i=0; i<3; i++) {
                    const orbitGroup = new THREE.Group();
                    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.02, 16, 64), new THREE.MeshBasicMaterial({ color: 0x1abc9c, transparent: true, opacity: 0.6 }));
                    const electron = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
                    electron.position.x = 1.2;
                    orbitGroup.add(ring, electron);
                    orbitGroup.rotation.x = (Math.PI / 3) * i;
                    orbitGroup.rotation.y = (Math.PI / 4) * i;
                    hologramGroup.add(orbitGroup);
                    orbits.push(orbitGroup);
                }

                arGroup.add(hologramGroup);
                mainGroup.add(arGroup);

                activeAnimators.push(() => {
                    hologramGroup.position.y = 2.8 + Math.sin(time * 2) * 0.1;
                    nucleusGroup.rotation.y += 0.01;
                    nucleusGroup.rotation.x += 0.005;
                    nucleusGroup.scale.setScalar(1 + Math.sin(time * 5) * 0.05);
                    orbits.forEach((orbit, index) => {
                        orbit.rotation.z -= 0.03 * (index + 1);
                    });
                    beamMat.opacity = 0.12 + Math.abs(Math.sin(time * 8)) * 0.05;
                });
            }

            // SCENE 2: VR Environment Tours (Isometric Virtual Lab)
            function buildVRScene() {
                clearScene();
                autoRotateSpeed = 0.004;

                const vrGroup = new THREE.Group();
                vrGroup.rotation.x = Math.PI / 8;
                vrGroup.rotation.y = -Math.PI / 6;
                vrGroup.position.y = -1;

                const floorGeo = new THREE.BoxGeometry(6, 0.2, 6);
                const floor = new THREE.Mesh(floorGeo, matDark);
                const grid = new THREE.GridHelper(6, 12, 0x3b82f6, 0x1abc9c);
                grid.position.y = 0.11;
                grid.material.opacity = 0.5;
                grid.material.transparent = true;
                vrGroup.add(floor, grid);

                const wallMat = new THREE.MeshPhysicalMaterial({ 
                    color: 0x3b82f6, metalness: 0.1, roughness: 0.1, transmission: 0.8, transparent: true, opacity: 0.3, side: THREE.DoubleSide
                });
                const wall1 = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), wallMat);
                wall1.position.set(0, 2, -3);
                const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), wallMat);
                wall2.rotation.y = Math.PI / 2;
                wall2.position.set(-3, 2, 0);

                const edgeMat = new THREE.MeshBasicMaterial({ color: 0x1abc9c });
                const edge1 = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.1, 0.1), edgeMat);
                edge1.position.set(0, 4, -3);
                const edge2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 6.2), edgeMat);
                edge2.position.set(-3, 4, 0);
                const edgeCorner = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4, 0.1), edgeMat);
                edgeCorner.position.set(-3, 2, -3);
                vrGroup.add(wall1, wall2, edge1, edge2, edgeCorner);

                const podium = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 0.5, 32), matDark);
                podium.position.y = 0.35;
                const podiumGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.55, 32), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
                podiumGlow.position.y = 0.35;
                vrGroup.add(podium, podiumGlow);

                const artifact = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), matTeal);
                artifact.position.y = 1.5;
                const artifactWire = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
                artifactWire.position.y = 1.5;
                vrGroup.add(artifact, artifactWire);

                const uiGroup = new THREE.Group();
                uiGroup.position.y = 1.5;
                for(let i=0; i<3; i++) {
                    const screenGeo = new THREE.CylinderGeometry(1.8, 1.8, 1, 16, 1, true, (Math.PI*2/3)*i, 1);
                    const screenMat = new THREE.MeshBasicMaterial({ color: 0x1e3a8a, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
                    const uiScreen = new THREE.Mesh(screenGeo, screenMat);
                    const lineGeo = new THREE.CylinderGeometry(1.81, 1.81, 0.05, 16, 1, true, (Math.PI*2/3)*i + 0.1, 0.5);
                    const uiLine = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: 0x1abc9c }));
                    uiLine.position.y = 0.2;
                    const uiLine2 = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
                    uiLine2.position.y = -0.2;
                    uiLine2.rotation.y = 0.2;
                    uiScreen.add(uiLine, uiLine2);
                    uiGroup.add(uiScreen);
                }
                vrGroup.add(uiGroup);
                mainGroup.add(vrGroup);

                activeAnimators.push(() => {
                    artifact.rotation.y += 0.01;
                    artifact.rotation.x += 0.005;
                    artifactWire.rotation.y -= 0.008;
                    artifactWire.rotation.x -= 0.01;
                    const hoverOffset = Math.sin(time * 2.5) * 0.1;
                    artifact.position.y = 1.5 + hoverOffset;
                    artifactWire.position.y = 1.5 + hoverOffset;
                    uiGroup.rotation.y += 0.005;
                    uiGroup.position.y = 1.5 + Math.sin(time * 1.5) * 0.05;
                });
            }

            // SCENE 3: 360-Degree Experiences
            function build360Scene() {
                clearScene();
                autoRotateSpeed = 0.002;

                const domeGroup = new THREE.Group();
                const particlesGeo = new THREE.BufferGeometry();
                const particleCount = 150;
                const positions = new Float32Array(particleCount * 3);
                for(let i=0; i < particleCount * 3; i+=3) {
                    const u = Math.random();
                    const v = Math.random();
                    const theta = u * 2.0 * Math.PI;
                    const phi = Math.acos(2.0 * v - 1.0);
                    const r = 5;
                    positions[i] = r * Math.sin(phi) * Math.cos(theta);
                    positions[i+1] = r * Math.sin(phi) * Math.sin(theta);
                    positions[i+2] = r * Math.cos(phi);
                }
                particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                const particleMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.15 });
                const particles = new THREE.Points(particlesGeo, particleMat);
                domeGroup.add(particles);

                const globeGeo = new THREE.SphereGeometry(4.8, 16, 16);
                const globeMat = new THREE.MeshBasicMaterial({ color: 0x1abc9c, wireframe: true, transparent: true, opacity: 0.2 });
                const globe = new THREE.Mesh(globeGeo, globeMat);
                domeGroup.add(globe);

                const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16), matGlass);
                lens.rotation.x = Math.PI / 2;
                domeGroup.add(lens);
                mainGroup.add(domeGroup);

                activeAnimators.push(() => {
                    lens.scale.setScalar(1 + Math.sin(time * 4) * 0.1);
                    domeGroup.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03);
                });
            }

            // SCENE 4: Interactive 3D Models (DNA Helix)
            function build3DModelScene() {
                clearScene();
                autoRotateSpeed = 0.008;

                const dnaGroup = new THREE.Group();
                const basePairs = 12;
                for(let i=0; i<basePairs; i++) {
                    const pairGroup = new THREE.Group();
                    const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), matBlue);
                    s1.position.x = -1.5;
                    const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), matTeal);
                    s2.position.x = 1.5;
                    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3, 8), matGlass);
                    bridge.rotation.z = Math.PI / 2;
                    pairGroup.add(s1, s2, bridge);
                    pairGroup.position.y = (i - basePairs/2) * 0.8;
                    pairGroup.rotation.y = i * 0.5;
                    dnaGroup.add(pairGroup);
                }
                dnaGroup.rotation.z = Math.PI / 6;
                mainGroup.add(dnaGroup);

                activeAnimators.push(() => {
                    // The DNA naturally rotates slowly via autoRotateSpeed
                });
            }

            // Switch scenes
            const switch3DScene = function(tabId) {
                if(tabId === 'ar') buildARScene();
                if(tabId === 'vr') buildVRScene();
                if(tabId === '360') build360Scene();
                if(tabId === '3d') build3DModelScene();
            };

            // ==========================================
            // RENDER LOOP
            // ==========================================
            let animId;
            function animate() {
                animId = requestAnimationFrame(animate);
                time += 0.01;

                if (!isDragging) {
                    targetRotationY += autoRotateSpeed; 
                }

                mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.1;
                mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.1;
                mainGroup.position.y = Math.sin(time) * 0.2;

                activeAnimators.forEach(animFn => animFn());
                renderer.render(scene, camera);
            }
            animate();

            // Responsive Resize
            const onResize = () => {
                if(container.clientWidth > 0) {
                    camera.aspect = container.clientWidth / container.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.clientWidth, container.clientHeight);
                }
            };
            window.addEventListener('resize', onResize);

            return {
                switch3DScene,
                cleanup: () => {
                    cancelAnimationFrame(animId);
                    window.removeEventListener('resize', onResize);
                    renderer.dispose();
                    if (renderer.domElement.parentNode) {
                        renderer.domElement.parentNode.removeChild(renderer.domElement);
                    }
                }
            };
        }