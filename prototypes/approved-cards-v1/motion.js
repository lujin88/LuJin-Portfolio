/* Review-only renderer. Uses the four approved images without repainting them.
   No page integration, sound, network requests, filters or crossfades. */
(async () => {
  const params = new URLSearchParams(location.search);
  const scene = params.get('scene') === 'solar' ? 'solar' : 'dolphin';
  const capture = params.has('capture');
  const canvas = document.querySelector('canvas');
  const gl = canvas.getContext('webgl', {alpha:false, preserveDrawingBuffer:true});
  if (!gl) throw new Error('WebGL is required for this review renderer.');
  const shader = (type, source) => {
    const s = gl.createShader(type); gl.shaderSource(s,source); gl.compileShader(s);
    if (!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const program=gl.createProgram();
  gl.attachShader(program,shader(gl.VERTEX_SHADER,`
    attribute vec2 p; varying vec2 uv;
    void main(){uv=vec2((p.x+1.)*.5,(1.-p.y)*.5);gl_Position=vec4(p,0,1);}`));
  gl.attachShader(program,shader(gl.FRAGMENT_SHADER,`
    precision highp float;
    varying vec2 uv; uniform sampler2D art;
    uniform vec2 crop; uniform float time, amount, solar, pose;
    float inside(float x,float a,float b){return smoothstep(a,a+.004,x)*(1.-smoothstep(b-.004,b,x));}
    void main(){
      vec2 q=(uv-.5)*crop+.5;
      if(solar>.5){
        // Pool polygon is strictly inside the waterline; lake excludes trees and shore.
        float left=.263+(q.y-.833)*(-1.22);
        float right=.418+(q.y-.878)*(-3.9);
        float pool=inside(q.y,.767,.877)*inside(q.x,left,right);
        float lake=inside(q.y,.648,.704)*inside(q.x,.69,.994);
        q.x+=amount*(pool*.00125*sin(q.y*480.-time*2.1)+lake*.00065*sin(q.y*550.-time*1.3));
      } else {
        // Anchor the upper lip. Compress only the opening; stretch the lower white
        // muzzle back to its fixed boundary, keeping the nose and eyes untouched.
        float top=pose == 1. ? .462 : .438;
        float bottom=.515, boundary=.578;
        float weight=1.-smoothstep(.029,.062,abs(q.x-.485));
        float scale=1.-amount*weight;
        float jaw=top+(bottom-top)*scale;
        if(q.y>top && q.y<boundary){
          q.y=q.y<jaw ? top+(q.y-top)/scale : bottom+(q.y-jaw)*(boundary-bottom)/(boundary-jaw);
        }
      }
      gl_FragColor=texture2D(art,q);
    }`));
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const p=gl.getAttribLocation(program,'p'); gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);
  const uniforms=Object.fromEntries(['crop','time','amount','solar','pose'].map(n=>[n,gl.getUniformLocation(program,n)]));
  const names=scene==='solar'?['SOLAR']:['ZH','FR','DE'];
  const textures=await Promise.all(names.map(async name=>{
    const img=new Image(); img.src=`assets/${name}.png`; await img.decode();
    const texture=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
    return {texture,width:img.width,height:img.height};
  }));
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=true, elapsed=0, previous=null, speed=1, paused=capture;
  const duration=scene==='solar'?8:12;
  function render(seconds){
    const t=reduce.matches?0:((seconds%duration)+duration)%duration;
    // The original approved Chinese frame is restored at 10s and held through 12s.
    const pose=scene==='solar'?0:t<3?0:t<6?1:t<9?2:0;
    const local=t%3;
    const speech= t<9 && local>.35 && local<2.35;
    const syllable=speech ? Math.pow(Math.sin((local-.35)*Math.PI*3),2)*.54 : t>=9&&t<10 ? .3*Math.sin((t-9)*Math.PI)**2 : 0;
    const envelope=scene==='solar'&&t<6?Math.sin(Math.PI*t/6)**2:0;
    const tex=textures[pose];
    const width=Math.round(innerWidth*devicePixelRatio),height=Math.round(innerHeight*devicePixelRatio);
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
    gl.viewport(0,0,canvas.width,canvas.height);
    const target=canvas.width/canvas.height,source=tex.width/tex.height;
    gl.uniform2f(uniforms.crop,target<source?target/source:1,target>source?source/target:1);
    gl.uniform1f(uniforms.solar,scene==='solar'?1:0);gl.uniform1f(uniforms.pose,pose);
    gl.uniform1f(uniforms.time,t);gl.uniform1f(uniforms.amount,scene==='solar'?envelope:syllable);
    gl.bindTexture(gl.TEXTURE_2D,tex.texture);gl.drawArrays(gl.TRIANGLES,0,6);
    return {scene,time:t,pose:names[pose],amount:scene==='solar'?envelope:syllable,reduced:reduce.matches};
  }
  function tick(now){
    if(previous!==null&&!paused&&visible&&!document.hidden&&!reduce.matches){
      elapsed+=(now-previous)/1000*speed;render(elapsed);
    }
    previous=now;requestAnimationFrame(tick);
  }
  addEventListener('resize',()=>render(elapsed));
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;previous=null;}).observe(canvas);
  document.addEventListener('visibilitychange',()=>{previous=null;});
  reduce.addEventListener('change',()=>{elapsed=0;previous=null;render(0);});
  window.review={duration,scene,setTime(t){paused=true;elapsed=t;return render(t);},play(rate=1){speed=rate;paused=false;elapsed=0;previous=null;},pause(){paused=true;},state(){return render(elapsed);}};
  render(0);requestAnimationFrame(tick);
})().catch(error=>{const p=document.querySelector('#error');p.hidden=false;p.textContent=error.message;console.error(error);});
