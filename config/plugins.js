module.exports = ({ env }) => ({
    // ..
    "vercel-deploy": {
      enabled: true,
      config: {
        deployHook:
          "https://api.vercel.com/v1/integrations/deploy/prj_060mjQEmO8vBj082WWUE0LVQGcvH/6QlYaz4oHK",
        apiToken: "MaQVvmf18pab06UrXmQ3NsRZ",
        appFilter: "back-chappy.vercel.app",
        roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
   'transformer': {
      enabled: true,
      config: {
        responseTransforms: {
          removeAttributesKey: true,
          removeDataKey: true,
        },
        requestTransforms : {
          wrapBodyWithDataKey: true
        },
        hooks: {
          preResponseTransform : (ctx) => console.log('hello from the preResponseTransform hook!'),
          postResponseTransform : (ctx) => console.log('hello from the postResponseTransform hook!')
        },
        contentTypeFilter: {
          mode: 'allow',
        },
        plugins: {
          ids: {
            'slugify': true,
          }
        }
      }
    },
    'users-permissions' : {
      config: {
        jwt: {
          expiresIn: '1d',
        },
      },
    },
    // ..
  });