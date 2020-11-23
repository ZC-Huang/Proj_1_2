const { MongoClient, ObjectId } = require("mongodb");

function myDB() {
  const myDB = {};
  const dbName = "apartment";
  const colTenant = "tenant";
  const colAmenity = "amenityReservation";
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

  myDB.getTenant = async function () {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colTenant);
      const query = {};

      return await col
        .find(query)
        // sort in descending order by creation
        .sort({ _id: -1 })
        .limit(20)
        .toArray();
    } finally {
      client.close();
    }
  };

  myDB.createTenant = async function (tenant) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colTenant);

      return await col.insertOne(tenant);
    } finally {
      client.close();
    }
  };

  myDB.deleteTenant = async function (tenant) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colTenant);

      return await col.deleteOne({ _id: ObjectId(tenant._id) });
    } finally {
      client.close();
    }
  };

  myDB.updateTenant = async function (tenant) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colTenant);

      return await col.updateOne(
        { _id: ObjectId(tenant._id) },
        {
          $set: {
            firstName: tenant.firstName,
            lastName: tenant.lastName,
          },
        }
      );
    } finally {
      client.close();
    }
  };

  myDB.getAmenity = async function () {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colAmenity);
      const query = {};

      return await col
        .find(query)
        // sort in descending order by creation
        .sort({ _id: -1 })
        .limit(10)
        .toArray();
    } finally {
      client.close();
    }
  };

  myDB.createReservation = async function (amenityReservation) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colAmenity);

      return await col.insertOne(amenityReservation);
    } finally {
      client.close();
    }
  };

  myDB.deleteReservation = async function (amenityReservation) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colAmenity);

      return await col.deleteOne({ _id: ObjectId(amenityReservation._id) });
    } finally {
      client.close();
    }
  };

  myDB.updateReservation = async function (amenityReservation) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colAmenity);

      return await col.updateOne(
        { _id: ObjectId(amenityReservation._id) },
        {
          $set: {
            dateTime: amenityReservation.dateTime,
            amenityID: amenityReservation.amenityID,
            tenantID: amenityReservation.tenantID,
            durationHrs: amenityReservation.durationHrs,
          },
        }
      );
    } finally {
      client.close();
    }
  };


  return myDB;
}

module.exports = myDB();
