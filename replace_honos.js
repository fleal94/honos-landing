const fs = require('fs');

const base64Map = {
  1: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_1_v3ftvj.jpg',
  2: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_2_zm8esj.jpg',
  3: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_3_qkxech.jpg',
  4: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_4_mde0yn.jpg',
  5: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_5_nhn18a.jpg',
  6: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_6_ronmnp.jpg',
  7: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_7_lr58tj.jpg',
  8: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_8_zhusa0.jpg',
  9: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_9_d9jx41.jpg',
  10: 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_10_yshulk.jpg',
};

const imgMap = {
  'FotoBernardoPozas.png': 'https://res.cloudinary.com/dtcg6xpnc/image/upload/extracted_2_zm8esj.jpg',
  'FotoMapaUbicacion_Honos.png': 'https://res.cloudinary.com/dtcg6xpnc/image/upload/FotoMapaUbicacion_Honos_a2prcj.png',
  'PrototipoUnidad_A.png': 'https://res.cloudinary.com/dtcg6xpnc/image/upload/PrototipoUnidad_A_ana3m6.png',
  'PrototipoUnidad_B.png': 'https://res.cloudinary.com/dtcg6xpnc/image/upload/PrototipoUnidad_B_k36ilm.png',
  'PrototipoUnidad_PH.png': 'https://res.cloudinary.com/dtcg6xpnc/image/upload/PrototipoUnidad_PH_xzhruo.png',
  'RenderFachada1.png': 'https://res.cloudinary.com/dtcg6xpnc/image/upload/RenderFachada1_znohnc.png',
};

let html = fs.readFileSync('index.html', 'utf8');

for (const [original, cloudUrl] of Object.entries(imgMap)) {
  const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  html = html.replace(new RegExp(escaped, 'g'), cloudUrl);
}

const regex = /data:image\/(jpeg|png|gif|webp);base64,([^"')\s]+)/g;
let i = 0;
html = html.replace(regex, (match) => {
  i++;
  return base64Map[i] || match;
});

fs.writeFileSync('index.html', html);
console.log('Listo! ' + i + ' imagenes base64 reemplazadas.');
