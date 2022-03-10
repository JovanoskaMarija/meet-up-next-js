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
  return {
    fallback: true,
    paths: [
      {
        params: {
          meetupId: "622a104481a06cf445aa0ff1",
        },
      },
    ],
  };
}

export async function getStaticProps(context: any) {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupDetail: {
        id: meetupId,
        title: "A first meeting",
        image:
          "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/e6/6b/3a.jpg",
        address: "First address",
        description: "This is the first meetup",
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;
