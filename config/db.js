const crypto = require('crypto');
// crypto.randomBytes(256).toString('hex');
// console.log(crypto);

const buf = crypto.randomBytes(256);
const mainSecret = buf.toString('hex');
// console.log(mainSecret);

// uri: "mongodb://tech-academy-user:techuser@cluster0-shard-00-00-341ff.mongodb.net:27017,cluster0-shard-00-01-341ff.mongodb.net:27017,cluster0-shard-00-02-341ff.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
module.exports = ({

    uri: "mongodb://localhost:27017/tech-academy",
    secret: mainSecret,
    database: "Ghost Database"
});