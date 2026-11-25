// Shared approved clock, inherited motion envelopes. No body or camera motion.
const detailRenderers=[];let detailReady=false;
function pulse(local,start,duration){const x=(local-start)/duration;return x<=0||x>=1?0:ease(x<.5?x*2:(1-x)*2)}
function drawDetails(t){if(!detailReady)return;const index=Math.floor(t/4600),local=t%4600,next=(index+1)%4;
 document.querySelectorAll('.season').forEach(s=>{const i=+s.dataset.season,amount=i===index?pulse(local,800,800):0;s.querySelectorAll('.girl-blink').forEach(g=>{g.setAttribute('opacity',amount>0?'1':'0');const x=+g.dataset.x,y=+g.dataset.y;g.querySelector('.closed-lid').setAttribute('opacity',amount);g.querySelector('.eye-pixels').setAttribute('transform',`translate(${x} ${y}) scale(1 ${1-.92*amount}) translate(${-x} ${-y})`)});});
 for(const r of detailRenderers)if(r.season===index||r.season===next)r.render(t,r.season===index?local:0);
}
const vertex='attribute vec2 position;varying vec2 uv;void main(){uv=(position+1.0)*.5;gl_Position=vec4(position.x,-position.y,0.,1.);}';
function createSurface(canvas,texture,fragment){const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,preserveDrawingBuffer:true});if(!gl)throw Error('WebGL unavailable; motion precheck cannot run');
 const shader=(type,code)=>{const s=gl.createShader(type);gl.shaderSource(s,code);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s};
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
 const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,texture);
 const phase=gl.getUniformLocation(program,'phase'),motion=gl.getUniformLocation(program,'localMotion');let previous=null;
 return (t,local)=>{const r=canvas.getBoundingClientRect(),dpr=devicePixelRatio||1,w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);previous=null}const key=t+':'+local;if(previous===key)return;previous=key;gl.uniform1f(phase,(t%4600)/4600);gl.uniform1f(motion,pulse(local,1000,2200));gl.drawArrays(gl.TRIANGLES,0,6);};
}
function envFragment(winter){return `precision highp float;varying vec2 uv;uniform sampler2D art;uniform float phase;uniform float localMotion;
float band(float v,float a,float b,float f){return smoothstep(a,a+f,v)*(1.-smoothstep(b-f,b,v));}
void main(){vec2 p=uv;float wave=6.28318530718*phase;
float crown=max(band(p.x,-.02,.345,.025)*band(p.y,-.02,.10,.025),band(p.x,-.02,.145,.025)*band(p.y,.02,.26,.035));
vec2 shift=vec2(.0018*sin(wave),.00065*sin(wave))*crown;
float lake=band(p.x,.69,1.02,.025)*band(p.y,.445,.62,.025);
float front=band(p.x,.80,1.02,.025)*band(p.y,.755,.81,.014);
float water=${winter?'0.':'max(lake,front)'};
shift.x+=water*.0012*(sin(p.y*290.+wave)-sin(p.y*290.));
shift.y+=water*.00035*(sin(p.x*170.+wave)-sin(p.x*170.));
vec3 color=texture2D(art,p+shift).rgb;
float glint=water*.018*(sin(p.y*450.+p.x*31.+wave)-sin(p.y*450.+p.x*31.));
gl_FragColor=vec4(clamp(color+glint,0.,1.),1.);}`}
function earFragment(i,w,h){const pairs=[[[12,19,8,17],[24,31,7,16]],[[10,18,10,19],[22,29,10,18]],[[12,19,5,16],[22,29,5,15]],[[19,28,9,22],[34,42,9,21]]][i];const vals=pairs.map(([a,b,c,d])=>[a/w,b/w,c/h,d/h].map(x=>x.toFixed(6)));
return `precision highp float;varying vec2 uv;uniform sampler2D art;uniform float phase;uniform float localMotion;
float band(float v,float a,float b,float f){return smoothstep(a,a+f,v)*(1.-smoothstep(b-f,b,v));}
void main(){vec2 p=uv;
// Fold each ear toward its own fixed root. Inverse-map only pixels above
// that root; muzzle, cheek, body and paw coordinates are untouched.
float left=band(p.x,${vals[0][0]},${vals[0][1]},.018);
float right=band(p.x,${vals[1][0]},${vals[1][1]},.018);
float rootL=${vals[0][3]},rootR=${vals[1][3]};
float foldL=.78*left*localMotion,foldR=.65*right*localMotion;
p.y+=min(uv.y-rootL,0.)*(1./(1.-foldL)-1.);
p.y+=min(uv.y-rootR,0.)*(1./(1.-foldR)-1.);
gl_FragColor=p.y<0.?vec4(0.):texture2D(art,p);}`}
async function initDetails(){
 document.querySelectorAll('.girl-blink').forEach(g=>{
  const x=+g.dataset.x,y=+g.dataset.y;
  const lid=document.createElementNS('http://www.w3.org/2000/svg','path');
  lid.setAttribute('class','closed-lid');lid.setAttribute('d',`M ${x-2.5} ${y} Q ${x} ${y+1.5} ${x+2.5} ${y}`);
  lid.setAttribute('fill','none');lid.setAttribute('stroke','#573d32');lid.setAttribute('stroke-width','1.6');lid.setAttribute('stroke-linecap','round');lid.setAttribute('opacity','0');g.append(lid);
 });
 document.querySelectorAll('canvas.texture').forEach((texture,i)=>{const canvas=document.createElement('canvas');canvas.className='motion-texture';texture.after(canvas);detailRenderers.push({season:i,render:createSurface(canvas,texture,envFragment(i===3))});});
 const source=new Image();source.src='approved.webp';await source.decode();const data=document.createElement('canvas');data.width=source.width;data.height=source.height;data.getContext('2d').drawImage(source,0,0);const sourceUri=data.toDataURL();
 for(const actor of document.querySelectorAll('.actor.cat')){const i=+actor.closest('.season').dataset.season,[,,w,h]=actor.getAttribute('viewBox').split(' ').map(Number);const clone=actor.cloneNode(true);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('width','256');clone.setAttribute('height',String(256*h/w));clone.removeAttribute('class');clone.querySelectorAll('.contact-shadow').forEach(x=>x.remove());clone.querySelectorAll('image').forEach(x=>x.setAttribute('href',sourceUri));const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml'});const url=URL.createObjectURL(blob);const img=new Image();img.src=url;await img.decode();
 const foreign=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');foreign.setAttribute('x','0');foreign.setAttribute('y','0');foreign.setAttribute('width',String(w));foreign.setAttribute('height',String(h));const canvas=document.createElement('canvas');canvas.className='ear-surface';foreign.append(canvas);actor.append(foreign);const render=createSurface(canvas,img,earFragment(i,w,h));detailRenderers.push({season:i,render});actor.querySelector('g[mask]').style.visibility='hidden';URL.revokeObjectURL(url);
 }
 detailReady=true;drawDetails(0);
}
