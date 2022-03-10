import { MongoClient, ObjectId } from "mongodb";
import { IMeetup } from "..";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props: { meetupDetail: IMeetup }) => {
  return (
    <>
      <MeetupDetail
        image={props.meetupDetail.image}
        title={props.meetupDetail.title}
        id={props.meetupDetail.id}
        address={props.meetupDetail.address}
        description={props.meetupDetail.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Marija:test123@cluster0.fti0s.mongodb.net/meetusp?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup?._id?.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  const meetupId = context.params.meetupId;
  console.log("meetupId:", meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://Marija:test123@cluster0.fti0s.mongodb.net/meetusp?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  await client.close();

  return {
    props: {
      meetupDetail: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        image: selectedMeetup?.image,
        description: selectedMeetup?.description,
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;
