module.exports = {
    app: {
      name: 'Poly do',
      apiURL: `${process.env.BASE_API_URL}`,
      serverURL: process.env.BASE_SERVER_URL,
      clientURL: process.env.BASE_CLIENT_URL
    },
    port: process.env.PORT || 5000,
    database: {
      url: 'mongodb+srv://rinaadili:rinarina98@nodetuts.mlmat.mongodb.net/node-auth?retryWrites=true&w=majority'
    },
};
