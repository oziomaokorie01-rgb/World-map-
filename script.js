
const map = L.map('map').setView([20, 0], 2);

// Dark basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Custom icons
const pastIcon = L.icon({
  iconUrl: 'images/past.png',
  iconSize: [30, 30]
});

const futureIcon = L.icon({
  iconUrl: 'images/future.png',
  iconSize: [30, 30]
});

const events = [
  {id:1,name:"Denver",coords:[39.7392,-104.9903],img:"images/denver.png",type:"past",desc:"Composability Day in Denver, an afternoon event where we discussed all things composability, absorb the latest research, and get alpha on the latest strategies teams are adopting."},
  {id:2,name:"San Francisco",coords:[37.7749,-122.4194],img:"images/san-francisco.png",type:"past",desc:"SF is BACK baby and so are our series of Espresso Brews. Brought to you by Espresso Systems and Electric Capital, we're ready to have a few drinks and catch up during the ETHSF week. See you at 4PM on Friday Mar 14 at your local favorite, Zeitgeist!"},
  {id:3,name:"New York",coords:[40.7128,-74.0060],img:"images/new-york.png",type:"past",desc:"Espresso CEO Benafisch will be speaking on mainnet in New York next week, sharing more about our upcoming release."},
  {id:4,name:"Cannes",coords:[43.5528,7.0174],img:"images/cannes.png",type:"past",desc:"Espresso will be in Cannes! We capped off our EthCC Cannes adventure with a lil pétanque tourney. While tossing the boules, we asked the Espresso community what we should do more of in crypto."},
  {id:5,name:"Bangkok",coords:[13.7563,100.5018],img:"images/bangkok.png",type:"past",desc:"At our Back to the Future event tonight in Bangkok, guests were able to use three appchains from the Cartesi ecosystem that are integrated with the Espresso Network, including a collaborative, NFT-focused drawing dapp."},
  {id:6,name:"Brussels",coords:[50.8503,4.3517],img:"images/brussels.png",type:"past",desc:"Cartesi and Espresso are doing it again, bringing everyone back to the future at EthCC in Brussels. Join us as we explore a modular future in blockchain, featuring innovative incentive structures, sequencer marketplaces, and interoperability between chains. You'll want to experience the unique blend of a Linux VM with a shot of Espresso. 🐧☕"},
  {id:7,name:"Berlin",coords:[52.5200,13.4050],img:"images/berlin.png",type:"past",desc:"Who is in Berlin? ☕️ Espresso Systems Product Manager will be at ETHBerlin participating as a judge! Give us a wave if you'll be around."},
  {id:8,name:"Seoul",coords:[37.5665,126.9780],img:"images/seoul.png",type:"future",desc:"Espresso Systems invites you to come enjoy an Espresso martini while discovering what we’re brewing in the Ethereum L2 space. Join us for a laid back happy hour to: Chat with our co-founders 🍸Hear the latest on Espresso’s visionEnjoy drinks (on us!) 🥂We’ll also have fresh new swag plus a special, top-secret drop we’re unveiling exclusively in Seoul 🤫 🇰🇷"},
  {id:9,name:"Buenos Aires",coords:[-34.6037,-58.3816],img:"images/buenos-aires.png",type:"future",desc:"We're still working on it, but we'll brew with you shortly"}
];

events.forEach(ev => {
  const marker = L.marker(ev.coords, { icon: ev.type === "past" ? pastIcon : futureIcon }).addTo(map);
  marker.bindPopup(`
    <div style="text-align:center;max-width:200px">
      <h3>${ev.name}</h3>
      <img src="${ev.img}" alt="${ev.name}" style="width:100%;border-radius:8px"/>
      <p>${ev.desc}</p>
    </div>
  `);
});
