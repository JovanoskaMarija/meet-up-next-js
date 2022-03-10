import Head from "next/head";
import { useRouter } from "next/router";
import { IMeetup } from "..";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  async function addMeetupHandler(dataEntered: IMeetup) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(dataEntered),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your meetups here and create an amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
