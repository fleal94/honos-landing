const https = require('https');
const auth = Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64');
const options = {
  hostname: 'api.cloudinary.com',
  path: '/v1_1/' + process.env.CLOUDINARY_CLOUD_NAME + '/resources/image?max_results=200&type=upload&prefix=Honos',
  headers: { 'Authorization': 'Basic ' + auth }
};
https.get(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const all = JSON.parse(data).resources;
    all.forEach(r => console.log(r.public_id + ' -> ' + r.secure_url));
  });
});
