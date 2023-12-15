module.exports = [
  'strapi::errors',
  'strapi::security',
  // 'strapi::cors',
   {
     name: 'strapi::cors',
     config: {
       enabled: true,
       headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
       origin: ['*'],
       methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  //     keepHeaderOnError: true,
     }
   },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
