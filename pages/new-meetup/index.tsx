import { IMeetup } from "..";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  function addMeetupHandler(data: IMeetup) {
    console.log("data: ", data);
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
