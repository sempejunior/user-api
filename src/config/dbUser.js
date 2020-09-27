const ObjectId = require("mongodb").ObjectID;

const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("users"))
    .catch(err => console.log(err))

function findUsers(callback) {
    try {
      return global.conn.collection("users").find({}).toArray(callback);

    } catch (error) {
        return error;
    }

    

}

function findOne(request, callback) {
    console.log("Este id " + request);

    var id = { "_id": new ObjectId(request) };

    console.log("Teste id " + id);
    return global.conn.collection("users").find(id).toArray(callback);
}


function insertUser(request, callback){
   return global.conn.collection("users").insertOne(request, callback);
}
function updateUser(id, user, callback){
    return  global.conn.collection("users").updateOne({_id: new ObjectId(id)}, {$set: user}, callback);
}

function deleteUser(id, callback){
    return  global.conn.collection("users").deleteOne({_id: new ObjectId(id)}, callback);
}


module.exports = { findUsers, findOne, insertUser, updateUser, deleteUser };