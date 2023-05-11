
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid } from "semantic-ui-react";

import PostDisplay from "../../components/PostDisplay/PostDisplay";
import PageHeader from "../../components/Header/Header";
import PageFooter from "../../components/Footer/Footer";
// we import this in order to call the getProfile function
// that makes the api call to the backend (express app) in order to get the users
// information
import * as favoritesApi from '../../utils/favoritesApi';

export default function FavoritesPage({loggedUser, handleLogout}) {
  const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true); // the page is loading when the component loads
//   const [error, setError] = useState("");

  // This is accessing the param in the url, using react router
  //      <Route path="/:username" element={<FavoritesPage />} />
  // username comes from whatever the params name is in the route
//   const { username } = useParams();
//   console.log(username, " <- Username from params");

  useEffect(() => {
 
    getFavorites();
  }, []);
async function getFavorites(){
    try {
        const data = await favoritesApi.getFavorites();
        console.log(data)
        setPosts(data.posts);
    }catch (err){
        console.log(err)
    }
}


  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader loggedUser={loggedUser} handleLogout={handleLogout}  />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
		<PostDisplay
            posts={posts}
            numPhotosCol={3}
			      loggedUser={loggedUser}
            isProfile={false}
			/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <PageFooter  />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}