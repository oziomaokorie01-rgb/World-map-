\
/* script.js - final Espresso Systems World Map (flat, reliable) */
const map = L.map('map', { preferCanvas: true }).setView([20,0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);


// small icons
const pastIcon = L.icon({ iconUrl: 'images/past.png', iconSize: [20,26], iconAnchor:[10,26], popupAnchor:[0,-24] });
const futureIcon = L.icon({ iconUrl: 'images/future.png', iconSize: [20,26], iconAnchor:[10,26], popupAnchor:[0,-24] });

const events = [
  {id:1,name:"Denver",coords:[39.7392,-104.9903],img:"images/denver.png",type:"past",desc:`Composability Day in Denver, an afternoon event where we discussed all things composability, absorb the latest research, and get alpha on the latest strategies teams are adopting.`},
  {id:2,name:"San Francisco",coords:[37.7749,-122.4194],img:"images/san-francisco.png",type:"past",desc:`SF is BACK baby and so are our series of Espresso Brews. Brought to you by Espresso Systems and Electric Capital, we're ready to have a few drinks and catch up during the ETHSF week. See you at 4PM on Friday Mar 14 at your local favorite, Zeitgeist!`},
  {id:3,name:"New York",coords:[40.7128,-74.0060],img:"images/new-york.png",type:"past",desc:`Espresso CEO Benafisch will be speaking on mainnet in New York next week, sharing more about our upcoming release.`},
  {id:4,name:"Cannes",coords:[43.5528,7.0174],img:"images/cannes.png",type:"past",desc:`Espresso will be in Cannes! We capped off our EthCC Cannes adventure with a lil pétanque tourney. While tossing the boules, we asked the Espresso community what we should do more of in crypto.`},
  {id:5,name:"Bangkok",coords:[13.7563,100.5018],img:"images/bangkok.png",type:"past",desc:`At our Back to the Future event tonight in Bangkok, guests were able to use three appchains from the Cartesi ecosystem that are integrated with the Espresso Network, including a collaborative, NFT-focused drawing dapp.`},
  {id:6,name:"Brussels",coords:[50.8503,4.3517],img:"images/brussels.png",type:"past",desc:`Cartesi and Espresso are doing it again, bringing everyone back to the future at EthCC in Brussels. Join us as we explore a modular future in blockchain, featuring innovative incentive structures, sequencer marketplaces, and interoperability between chains. You'll want to experience the unique blend of a Linux VM with a shot of Espresso. 🐧☕`},
  {id:7,name:"Berlin",coords:[52.5200,13.4050],img:"images/berlin.png",type:"past",desc:`Who is in Berlin? ☕️
Espresso Systems Product Manager will be at ETHBerlin participating as a judge! Give us a wave if you'll be around.`},
  {id:8,name:"Seoul",coords:[37.5665,126.9780],img:"images/seoul.png",type:"future",desc:`Espresso Systems invites you to come enjoy an Espresso martini while discovering what we’re brewing in the Ethereum L2 space. Join us for a laid back happy hour to: Chat with our co-founders 🍸Hear the latest on Espresso’s visionEnjoy drinks (on us!) 🥂We’ll also have fresh new swag plus a special, top-secret drop we’re unveiling exclusively in Seoul 🤫 🇰🇷`},
  {id:9,name:"Buenos Aires",coords:[-34.6037,-58.3816],img:"images/buenos-aires.png",type:"future",desc:`We're still working on it, but we'll brew with you shortly`}
];

const markers = [];

// create markers and cards
events.forEach(ev => {
  const icon = ev.type === 'past' ? pastIcon : futureIcon;
  const marker = L.marker(ev.coords, { icon }).addTo(map);

  const popup = `
    <div style="max-width:300px">
      <h3 style="margin:0 0 6px;color:#f3c79b">${ev.name}</h3>
      <div style="font-size:13px;color:#d0d0d0;margin-bottom:8px"><strong>${ev.type === 'past' ? 'Past Event' : 'Future Event'}</strong></div>
      <img src="${ev.img}" style="width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:8px" />
      <p style="color:#d0d0d0;margin:0 0 8px;white-space:pre-wrap">${ev.desc}</p>
      <div style="text-align:right"><button onclick="alert('See Details')">See Details</button></div>
    </div>
  `;

  marker.bindPopup(popup, { minWidth: 260 });
  markers.push(marker);

  // create card
  const card = document.createElement('div');
  card.className = 'event-card';
  card.innerHTML = `<img src="${ev.img}" alt="${ev.name}"><h3>${ev.name}</h3><p>${ev.desc.substring(0,110)}${ev.desc.length>110?'...':''}</p>`;
  card.onclick = () => { map.setView(ev.coords, 5); marker.openPopup(); };

  if (ev.type === 'past') document.getElementById('past-cards').appendChild(card);
  else document.getElementById('future-cards').appendChild(card);
});

// fit to markers
const group = L.featureGroup(markers);
map.fitBounds(group.getBounds(), { padding: [60,60] });

// legend
const legend = L.control({ position: 'bottomright' });
legend.onAdd = function() {
  const div = L.DomUtil.create('div', 'legend-box');
  div.innerHTML = '<div style="font-weight:700;color:#fff;margin-bottom:6px">Legend</div>' +
                  '<div style="display:flex;align-items:center;gap:8px"><img src=\"images/past.png\" width=\"18\"> Past Events</div>' +
                  '<div style="display:flex;align-items:center;gap:8px;margin-top:6px"><img src=\"images/future.png\" width=\"18\"> Future Events</div>';
  div.style.background = 'rgba(18,18,18,0.9)';
  div.style.padding = '8px';
  div.style.borderRadius = '8px';
  div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.6)';
  return div;
};
legend.addTo(map);

// simple filter toggle (All / Future Only)
let futureOnly = false;
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Show Future Only';
toggleBtn.style.position = 'absolute';
toggleBtn.style.top = '20px';
toggleBtn.style.right = '20px';
toggleBtn.style.zIndex = 1000;
toggleBtn.style.padding = '8px 10px';
toggleBtn.style.borderRadius = '8px';
toggleBtn.style.background = '#3f2a22';
toggleBtn.style.color = '#fff';
toggleBtn.style.border = 'none';
toggleBtn.style.cursor = 'pointer';
document.body.appendChild(toggleBtn);

toggleBtn.onclick = () => {
  futureOnly = !futureOnly;
  // remove all markers
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;
  // re-add markers per filter
  events.forEach(ev => {
    if (futureOnly && ev.type !== 'future') return;
    const icon = ev.type === 'past' ? pastIcon : futureIcon;
    const m = L.marker(ev.coords, { icon }).addTo(map);
    m.bindPopup(`
      <div style="max-width:300px">
        <h3 style="margin:0 0 6px;color:#f3c79b">${ev.name}</h3>
        <div style="font-size:13px;color:#d0d0d0;margin-bottom:8px"><strong>${ev.type === 'past' ? 'Past Event' : 'Future Event'}</strong></div>
        <img src="${ev.img}" style="width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:8px" />
        <p style="color:#d0d0d0;margin:0 0 8px;white-space:pre-wrap">${ev.desc}</p>
        <div style="text-align:right"><button onclick="alert('See Details')">See Details</button></div>
      </div>
    `, { minWidth: 260 });
    markers.push(m);
  });
  // update button label
  toggleBtn.textContent = futureOnly ? 'Show All Events' : 'Show Future Only';
  // fit to visible markers
  const group = L.featureGroup(markers);
  if (markers.length) map.fitBounds(group.getBounds(), { padding: [60,60] });
};
