
const events = [
  {id:1,name:"Denver",coords:[39.7392,-104.9903],img:"images/denver.png",type:"past",desc:""},
  {id:2,name:"San Francisco",coords:[37.7749,-122.4194],img:"images/san-francisco.png",type:"past",desc:""},
  {id:3,name:"New York",coords:[40.7128,-74.0060],img:"images/new-york.png",type:"past",desc:""},
  {id:4,name:"Cannes",coords:[43.5528,7.0174],img:"images/cannes.png",type:"past",desc:""},
  {id:5,name:"Bangkok",coords:[13.7563,100.5018],img:"images/bangkok.png",type:"past",desc:""},
  {id:6,name:"Brussels",coords:[50.8503,4.3517],img:"images/brussels.png",type:"past",desc:""},
  {id:7,name:"Berlin",coords:[52.5200,13.4050],img:"images/berlin.png",type:"past",desc:""},
  {id:8,name:"Seoul",coords:[37.5665,126.9780],img:"images/seoul.png",type:"future",desc:""},
  {id:9,name:"Buenos Aires",coords:[-34.6037,-58.3816],img:"images/buenos-aires.png",type:"future",desc:""}
];

const map = L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains: 'abcd', maxZoom:19
}).addTo(map);

const pastIcon = L.icon({iconUrl:'images/past.png',iconSize:[30,38],iconAnchor:[15,38],popupAnchor:[0,-34]});
const futureIcon = L.icon({iconUrl:'images/future.png',iconSize:[30,38],iconAnchor:[15,38],popupAnchor:[0,-34]});

const markers = [];
events.forEach((ev, idx)=>{
  const icon = (ev.type==='past')? pastIcon : futureIcon;
  const m = L.marker(ev.coords,{icon}).addTo(map);
  m.bindPopup(renderPopup(ev));
  markers.push(m);
});

const group = L.featureGroup(markers);
map.fitBounds(group.getBounds().pad(0.2));

const legend = L.control({position:'bottomright'});
legend.onAdd = function(){
  const div = L.DomUtil.create('div','legend');
  div.innerHTML = '<strong>Legend</strong><br><img src="images/past.png" width="18" style="vertical-align:middle"> Past Events<br>' +
                  '<img src="images/future.png" width="18" style="vertical-align:middle"> Future Events';
  return div;
};
legend.addTo(map);

function renderPopup(ev){
  return `<div style="width:220px"><h3 style="margin:0;color:#6b3e2e">${ev.name}</h3><p style="margin:6px 0;color:#666">📅  <span>${ev.desc||''}</span></p><img src="${ev.img}" style="width:100%;border-radius:8px;margin-top:6px"><div style="text-align:right;margin-top:8px"><button onclick="alert('See Details for ${ev.name}')">See Details</button></div></div>`;
}

function buildCards(){
  const pastContainer = document.getElementById('pastList');
  const futureContainer = document.getElementById('futureList');
  events.forEach((ev, i)=>{
    const card = document.createElement('div');
    card.className='card';
    card.dataset.index = i;
    card.innerHTML = `<img src="${ev.img}" alt="${ev.name}"><div class="info"><h4>${ev.name}</h4><p>${ev.desc||''}</p></div>`;
    card.onclick = ()=>{ map.setView(ev.coords,5); markers[i].openPopup(); };
    if(ev.type==='past') pastContainer.appendChild(card); else futureContainer.appendChild(card);
  });
}

buildCards();
