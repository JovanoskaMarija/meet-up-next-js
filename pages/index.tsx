import MeetupList from "../components/meetups/MeetupList";

export interface IMeetup {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}

const dummyMeetups = [
  {
    id: "m1",
    title: "A first meeting",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/e6/6b/3a.jpg",
    address: "First address",
    description: "This is the first meetup",
  },
  {
    id: "m2",
    title: "A second meeting",
    image: "https://cdn.mos.cms.futurecdn.net/xbELjBNkaox36YPsoBakF-768-80.jpg",
    address: "Second address",
    description: "This is the second meetup",
  },
];

function Home(props: any) {
  console.log("props: ", props);
  return (
    <div>
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
  return {
    props: { meetups: dummyMeetups },
    revalidate: 10,
  };
}

export default Home;
