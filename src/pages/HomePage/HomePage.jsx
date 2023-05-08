import PageHeader from "../../components/Header/Header";
import PostDisplay from "../../components/PostDisplay/PostDisplay";

import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

// this will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";


export default function FeedPage({loggedUser, handleLogout}) {
  const [posts, setPosts] = useState([]); /// array of objects, the posts contain the likes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // (C)RUD Create
  // we will call this function in our AddPuppyForm handleSubmit,
  // this way when we get a response from the server, we can update our state



  // C(R)UD Read
  async function getPosts() {
    try {
      // make an api call
      // Then I want to update state!
      const response = await postsApi.getAll();
      console.log(response, " data");
      // then we update state
      setPosts(response.posts);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error in getPosts");
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (error) {
    return (
      <>
        <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
      </>
    );
  }
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostDisplay
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
			loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
