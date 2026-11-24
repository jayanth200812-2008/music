const songs=[
{title:'Midnight Drive',artist:'Nova Lane',album:'After Hours',time:'3:42',art:'linear-gradient(140deg,#9d8b59,#314c4a)',symbol:'☾'},
{title:'Golden Skies',artist:'The Sunrooms',album:'Open Roads',time:'3:18',art:'linear-gradient(140deg,#e5a84c,#a84d3c)',symbol:'☀'},
{title:'City Lights',artist:'Ari Vale',album:'Neon Dreams',time:'4:06',art:'linear-gradient(140deg,#8462b0,#243e70)',symbol:'✦'},
{title:'Ocean Between Us',artist:'Mira Sol',album:'Blue Notes',time:'3:56',art:'linear-gradient(140deg,#58a6b1,#244b71)',symbol:'≈'},
{title:'Slow Motion',artist:'Kai Rivers',album:'Soft Focus',time:'2:59',art:'linear-gradient(140deg,#bf7892,#68496b)',symbol:'♡'},
{title:'Electric Heart',artist:'The Frequency',album:'Voltage',time:'3:27',art:'linear-gradient(140deg,#b8d65d,#3a6d58)',symbol:'ϟ'}];
const playlists=[['Daily Mix','A little bit of everything','linear-gradient(135deg,#a2c85a,#36583b)'],['Chill Vibes','Take it slow and breathe','linear-gradient(135deg,#629bb4,#283c6b)'],['Feel Good','Only good energy','linear-gradient(135deg,#e7a64e,#bd5b48)'],['Late Night','For the after-hours mood','linear-gradient(135deg,#8e6bb1,#25294f)']];
const artists=[['Nova Lane','Indie pop','N','linear-gradient(145deg,#b2a16a,#41534b)'],['Mira Sol','Alternative','M','linear-gradient(145deg,#77b8c1,#34516a)'],['Ari Vale','Electronic','A','linear-gradient(145deg,#a98bd1,#433b75)'],['Kai Rivers','R&B','K','linear-gradient(145deg,#d08ba2,#65405d)'],['The Sunrooms','Pop band','S','linear-gradient(145deg,#e7b65d,#9b513a)']];
const albums=[['After Hours','Nova Lane',songs[0].art],['Open Roads','The Sunrooms',songs[1].art],['Neon Dreams','Ari Vale',songs[2].art],['Blue Notes','Mira Sol',songs[3].art]];
let current=0,playing=false,seconds=0,timer;
const $=id=>document.getElementById(id),timeSec=s=>{let a=s.split(':').map(Number);return a[0]*60+a[1]},fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
$('playlistCards').innerHTML=playlists.map((p,i)=>`<div class="playlist" style="--art:${p[2]}" data-song="${i}"><b>${p[0]}</b><span>${p[1]}</span></div>`).join('');
$('artistList').innerHTML=artists.map(a=>`<div class="artist"><div class="face" style="--art:${a[3]}">${a[2]}</div><b>${a[0]}</b><small>${a[1]}</small></div>`).join('');
$('albumList').innerHTML=albums.map(a=>`<div><div class="album" style="--art:${a[2]}">${a[0]}</div><b style="font-size:11px">${a[0]}</b><small>${a[1]} · Album</small></div>`).join('');
function renderTracks(){ $('trackList').innerHTML=songs.map((s,i)=>`<div class="track ${i===current?'active':''}" data-song="${i}"><span>${String(i+1).padStart(2,'0')}</span><div class="song"><div class="art" style="--art:${s.art}">${s.symbol}</div><div><b>${s.title}</b><small>${s.artist}</small></div></div><span>${s.album}</span><span>${s.time}</span></div>`).join('');document.querySelectorAll('.track').forEach(el=>el.onclick=()=>playSong(+el.dataset.song))}
function renderRecent(){ $('recentList').innerHTML=[2,0,3,1].map(i=>`<div class="song" data-song="${i}"><div class="art" style="--art:${songs[i].art}">${songs[i].symbol}</div><div><b>${songs[i].title}</b><small>${songs[i].artist}</small></div></div>`).join('');document.querySelectorAll('.recent .song').forEach(el=>el.onclick=()=>playSong(+el.dataset.song))}
function update(){let s=songs[current];$('nowTitle').textContent=s.title;$('nowArtist').textContent=s.artist;$('cover').textContent=s.symbol;$('cover').style.background=s.art;$('duration').textContent=s.time;$('elapsed').textContent=fmt(seconds);$('progress').value=seconds/timeSec(s.time)*100;$('play').textContent=playing?'Ⅱ':'▶'}
function playSong(i){current=(i+songs.length)%songs.length;seconds=0;playing=true;update();renderTracks();clearInterval(timer);timer=setInterval(()=>{if(!playing)return;seconds++;if(seconds>=timeSec(songs[current].time)){playSong(current+1);return}update()},1000)}
$('play').onclick=()=>{playing=!playing;update();if(playing&&!timer)playSong(current)};
$('next').onclick=()=>playSong(current+1);$('prev').onclick=()=>playSong(current-1);$('shuffle').onclick=()=>playSong(Math.floor(Math.random()*songs.length));$('repeat').onclick=e=>e.currentTarget.style.color='#c4f36b';
$('progress').oninput=e=>{seconds=Math.round(+e.target.value/100*timeSec(songs[current].time));update()};
$('like').onclick=e=>{e.currentTarget.textContent=e.currentTarget.textContent==='♡'?'♥':'♡';e.currentTarget.style.color='#c4f36b'};
document.querySelectorAll('.playlist').forEach(el=>el.onclick=()=>playSong(+el.dataset.song));
$('search').oninput=e=>{let q=e.target.value.toLowerCase();document.querySelectorAll('.track').forEach((el,i)=>el.style.display=(songs[i].title+' '+songs[i].artist+' '+songs[i].album).toLowerCase().includes(q)?'grid':'none')};
renderTracks();renderRecent();update();