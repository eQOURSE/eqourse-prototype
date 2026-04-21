const fs = require('fs');
const file = 'src/components/case-studies/caseStudyData.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('image?: string;')) {
  code = code.replace('relatedLinks: CaseStudyInternalLink[];', 'relatedLinks: CaseStudyInternalLink[];\n  image?: string;');
}

const images = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1513258496099-481620d4ce8d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
];

let imgIndex = 0;
code = code.replace(/id: \"[^\"]+\",/g, match => {
  const imgStr = match + '\n    image: "' + images[imgIndex % images.length] + '",';
  imgIndex++;
  return imgStr;
});

fs.writeFileSync(file, code);
console.log('Done!');
