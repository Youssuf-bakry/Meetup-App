import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Yosef Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const { res } = context;

//   //fetch data from api

//   return {
//     props: {
//       meetups: Dummy_Meetups,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://yosef:hgfhpe1220@cluster0.9ebucuw.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((m) => ({
        id: m._id.toString(),
        title: m.title,
        image: m.image,
      })),
    },
  };
}

export default HomePage;
