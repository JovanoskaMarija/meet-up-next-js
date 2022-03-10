import { MongoClient } from "mongodb";
async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://Marija:test123@cluster0.fti0s.mongodb.net/meetusp?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    meetupsCollection.insertOne(data, function (r) {
      console.log("inside insertOne");
      console.log(r);
      client.close();
    });

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
