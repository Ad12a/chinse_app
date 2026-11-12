// ===== App logic (data comes from data.js) =====
(function(){
var synth=window.speechSynthesis,$=function(i){return document.getElementById(i)};
var voices=[],stars=0,ctx=null,lullTimer=null;

function fill(sel,arr,val){arr.forEach(function(a){var o=document.createElement("option");o.value=a[0];o.textContent=a[1];sel.appendChild(o)});if(val)sel.value=val}
fill($("blang"),L.filter(function(l){return ["en","es","fr","zh","ja","hi","ms","ar"].indexOf(l[0].slice(0,2))>-1}),"en-US");
var al=[["auto","Auto-detect"]].concat(L);fill($("lang"),al,"auto");

function loadV(){try{voices=synth.getVoices()||[]}catch(e){voices=[]}fillV()}
function fillV(){var s=$("voice"),l=$("lang").value;s.innerHTML="";var d=document.createElement("option");d.value="";d.textContent="Default voice";s.appendChild(d);
voices.forEach(function(v,i){if(l==="auto"||v.lang.toLowerCase().indexOf(l.slice(0,2).toLowerCase())===0){var o=document.createElement("option");o.value=i;o.textContent=v.name+" ("+v.lang+")";s.appendChild(o)}})}
function detect(t){var m=[[/[\u3040-\u30ff]/,"ja-JP"],[/[\uac00-\ud7af]/,"ko-KR"],[/[\u4e00-\u9fff]/,"zh-CN"],[/[\u0900-\u097f]/,"hi-IN"],[/[\u0b80-\u0bff]/,"ta-IN"],[/[\u0e00-\u0e7f]/,"th-TH"],[/[\u0600-\u06ff]/,"ar-SA"],[/[\u0400-\u04ff]/,"ru-RU"]];
for(var i=0;i<m.length;i++)if(m[i][0].test(t))return m[i][1];return ""}

function audio(){if(!ctx){var C=window.AudioContext||window.webkitAudioContext;if(C)ctx=new C()}if(ctx&&ctx.state==="suspended")ctx.resume();return ctx}
function blip(f){var a=audio();if(!a)return;var o=a.createOscillator(),g=a.createGain();o.type="triangle";o.frequency.setValueAtTime(f,a.currentTime);o.frequency.exponentialRampToValueAtTime(f*1.5,a.currentTime+.15);g.gain.setValueAtTime(.25,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.3);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.32)}

function say(text,lang,o,cb){if(!synth){$("msg").textContent="Speech is not supported in this browser. Try Chrome, Edge or Safari.";return}
synth.cancel();var u=new SpeechSynthesisUtterance(text);if(lang)u.lang=lang;o=o||{};if(o.voice){u.voice=o.voice;u.lang=o.voice.lang}
u.rate=o.rate||1;u.pitch=o.pitch||1;if(o.boundary)u.onboundary=o.boundary;u.onend=u.onerror=function(){if(cb)cb()};synth.speak(u)}

function burst(x,y,e){for(var i=0;i<5;i++){var s=document.createElement("span");s.className="fly";s.textContent=e;s.style.left=(x-16+Math.random()*30)+"px";s.style.top=(y-16)+"px";s.style.setProperty("--dx",(Math.random()*120-60)+"px");document.body.appendChild(s);setTimeout(function(n){return function(){n.remove()}}(s),1150)}}
function addStar(){stars++;$("stars").textContent="⭐ "+stars+(stars%10===0?" 🎉 Great job!":"")}
function emptyHist(){var h=$("hist");h.innerHTML="";var s=document.createElement("span");s.style.color="var(--muted)";s.textContent="Nothing yet.";h.appendChild(s)}
$("clearHist").onclick=function(){emptyHist();if(synth)synth.cancel()};
function addHist(t){var h=$("hist");if(h.firstChild&&h.firstChild.tagName==="SPAN")h.innerHTML="";var b=document.createElement("button");b.className="chip";b.textContent=t.length>28?t.slice(0,28)+"…":t;b.onclick=function(){$("txt").value=t;$("speak").click()};h.insertBefore(b,h.firstChild);while(h.children.length>6)h.removeChild(h.lastChild)}

function tapCard(c,el,ev){var lang=$("blang").value,k=lang.slice(0,2),name=c.n[k]||c.n.en;
audio();blip(c.f);var r=el.getBoundingClientRect();burst(ev&&ev.clientX?ev.clientX:r.left+r.width/2,ev&&ev.clientY?ev.clientY:r.top,c.e);
el.classList.add("pop");setTimeout(function(){el.classList.remove("pop")},160);
say(name,lang,{pitch:+$("bvoice").value,rate:.85});addStar();addHist(name);if(navigator.vibrate)try{navigator.vibrate(20)}catch(e){}}
cards.forEach(function(c){var b=document.createElement("button");b.className="card";b.innerHTML='<span class="e">'+c.e+'</span><span class="nm"></span>';b.setAttribute("aria-label",c.n.en);b.onclick=function(ev){tapCard(c,b,ev)};$("grid").appendChild(b)});
function names(){var k=$("blang").value.slice(0,2);var n=document.querySelectorAll(".nm");cards.forEach(function(c,i){n[i].textContent=c.n[k]||c.n.en})}
$("blang").onchange=names;names();
$("rand").onclick=function(){var i=Math.floor(Math.random()*cards.length);document.querySelectorAll(".card")[i].click()};

var tune=[262,262,392,392,440,440,392,349,349,330,330,294,294,262];
$("lull").onclick=function(){if(lullTimer){clearInterval(lullTimer);lullTimer=null;$("lull").textContent="🎵 Play lullaby";return}
audio();var i=0;$("lull").textContent="■ Stop lullaby";
function next(){if(i>=tune.length){clearInterval(lullTimer);lullTimer=null;$("lull").textContent="🎵 Play lullaby";return}blip(tune[i]*(i===6||i===13?1:1));i++}
next();lullTimer=setInterval(next,520)};

chips.forEach(function(t){var b=document.createElement("button");b.className="chip";b.textContent=t;b.onclick=function(){$("txt").value=t};$("chips").appendChild(b)});

function show(t,s,e){var r=$("reader");r.textContent="";r.appendChild(document.createTextNode(t.slice(0,s)));if(e>s){var m=document.createElement("mark");m.textContent=t.slice(s,e);r.appendChild(m)}r.appendChild(document.createTextNode(t.slice(e)))}
$("speak").onclick=function(){var t=$("txt").value.trim();if(!t){$("msg").textContent="Type some text first.";return}
var lang=$("lang").value==="auto"?detect(t):$("lang").value,v=$("voice").value!==""?voices[+$("voice").value]:null;$("msg").textContent="";
if(lang&&voices.length&&!v&&!voices.some(function(x){return x.lang.toLowerCase().indexOf(lang.slice(0,2).toLowerCase())===0}))$("msg").textContent="No voice for this language is installed on your device.";
show(t,0,0);say(t,lang,{voice:v,rate:+$("rate").value,pitch:+$("pitch").value,boundary:function(ev){if(ev.name&&ev.name!=="word")return;var s=ev.charIndex,m=/^\S+/.exec(t.slice(s));show(t,s,s+(m?m[0].length:1))}},function(){show(t,0,0)});
addStar();addHist(t)};
$("clearTxt").onclick=function(){if(synth)synth.cancel();$("txt").value="";$("msg").textContent="";$("reader").textContent="Words light up here while they are spoken.";$("txt").focus()};
$("stop").onclick=function(){if(synth)synth.cancel();if(lullTimer){clearInterval(lullTimer);lullTimer=null;$("lull").textContent="🎵 Play lullaby"}};
$("lang").onchange=fillV;
if(synth){loadV();synth.onvoiceschanged=loadV}else $("msg").textContent="Speech is not supported in this browser.";

// ===== HSK Chinese words: click a word to see and hear its English meaning =====
var HS=window.HSK||{},words=[],shown=[],cur=null;
Object.keys(HS).sort().forEach(function(l){HS[l].trim().split("\n").forEach(function(r){var a=r.split("|");if(a.length>=3)words.push({h:a[0],p:a[1],e:a[2],l:+l})});var o=document.createElement("option");o.value=l;o.textContent="HSK "+l;$("wlevel").appendChild(o)});
function plain(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
function speakWord(w,m){var en=function(){say(w.e.replace(/\(.*?\)/g,""),"en-US",{rate:.9})};
if(m==="en")en();else if(m==="zh")say(w.h,"zh-CN",{rate:.7});else say(w.h,"zh-CN",{rate:.7},en)}
function pickWord(w){cur=w;$("wh").textContent=w.h;$("wp").textContent=w.p;$("we").textContent=w.e;$("wlv").textContent="HSK "+w.l;
audio();blip(300+(w.h.charCodeAt(0)%7)*70);addStar();speakWord(w,$("wmode").value)}
var PAGE=10,page=0; // PAGE = how many word buttons per group
function renderWords(keep){var q=plain($("wsearch").value.trim()),lv=$("wlevel").value,f=document.createDocumentFragment();
shown=words.filter(function(w){return(lv==="all"||w.l===+lv)&&(!q||plain(w.h+" "+w.p+" "+w.e).indexOf(q)>=0)});
if(!keep)page=0;var pages=Math.max(1,Math.ceil(shown.length/PAGE));if(page>=pages)page=pages-1;
shown.slice(page*PAGE,page*PAGE+PAGE).forEach(function(w){var b=document.createElement("button");b.type="button";b.className="w";b.innerHTML='<span class="h"></span><span class="py"></span>';
b.firstChild.textContent=w.h;b.lastChild.textContent=w.p;b.onclick=function(){pickWord(w)};f.appendChild(b)});
$("wgrid").innerHTML="";$("wgrid").appendChild(f);
$("wcount").textContent=shown.length?"Words "+(page*PAGE+1)+"–"+Math.min(shown.length,(page+1)*PAGE)+" of "+shown.length:"No words found";
$("wpage").textContent="Page "+(page+1)+" of "+pages;$("wprev").disabled=page===0;$("wnext").disabled=page>=pages-1}
$("wlevel").onchange=function(){renderWords()};$("wsearch").oninput=function(){renderWords()};
$("wprev").onclick=function(){if(page>0){page--;renderWords(true)}};
$("wnext").onclick=function(){page++;renderWords(true)};
$("wzh").onclick=function(){if(cur)speakWord(cur,"zh")};$("wen").onclick=function(){if(cur)speakWord(cur,"en")};
$("wrand").onclick=function(){if(!shown.length)return;var i=Math.floor(Math.random()*shown.length);page=Math.floor(i/PAGE);renderWords(true);pickWord(shown[i])};
renderWords();
})();
