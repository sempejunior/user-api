const ObjectId = require("mongodb").ObjectID;

const { response } = require("express");


const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("user"))
    .catch(err => console.log(err))

function findInformation(callback) {
    global.conn.collection("information").find({}).toArray(callback);

}


function findOne(request, callback) {

    console.log("Este id " + request);

    var id = { "_id": new ObjectId(request) };

    return global.conn.collection("information").find(id).toArray(callback);
}

module.exports = { findInformation, findOne };