import Head from "next/head";
import supabase from "../utils/supabaseClient";

interface EntryType {
  name: string;
  time_string: string;
}

type Props = {
  leaderboard: EntryType[];
};

export default function leaderboard({ leaderboard }: Props) {
  return (
    <div>
      <Head>
        <title>Super Wordle Demo</title>
        <meta name="description" content="Wordle Demo" />
      </Head>
      <div
        className="lg:w-1/2 w-full mx-auto text-center py-4 mt-2
      mb-6 font-mono  items-center justify-center"
      >
        <h1 className=" text-gray-700 md:text-3xl text-xl whitespace-nowrap justify-self-center font-bold">
          Super Wordle Leaderboard
        </h1>
      </div>

      <table className="w-1/3 min-w-[350px] mx-auto  text-lg text-center">
        <thead>
          <tr className="font-bold mb-4 border-b-2 ">
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(({ name, time_string }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{time_string}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export async function getServerSideProps() {
  let { data: leaderboard, error } = await supabase
    .from("leaderboard")
    .select("name, time_string")
    .order("time", { ascending: false });

  //   let { data, error } = await supabase.from("leaderboard").select();
  console.log("leaderboard", leaderboard, "error", error);
  return {
    props: {
      leaderboard: leaderboard,
    },
  };
}
