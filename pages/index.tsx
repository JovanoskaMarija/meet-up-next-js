import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

export interface IMeetup {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}

function Home(props: any) {
  return (
    <div>
      <Head>
        <title>Next.js Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of hihgly active React/Next.js meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </div>
  );
}
// export async function getServerSideProps(context: any) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: { meetups: dummyMeetups },
//   };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Marija:test123@cluster0.fti0s.mongodb.net/meetusp?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        desription: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default Home;
