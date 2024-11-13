import { useQuery, gql } from "@apollo/client";
import "./App.css";

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

type LaunchType = {
  id: string;
  launch_date_utc: string;
};

function App() {
	const { loading, error, data } = useQuery(GET_LAUNCHES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
    
	return (
		<div className="App">
			{data.launches.map((launch: LaunchType) => (
				<li key={launch.id}>{launch.launch_date_utc}</li>
			))}
		</div>
	);
}

export default App;
