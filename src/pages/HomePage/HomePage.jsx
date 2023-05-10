import PageHeader from "../../components/Header/Header";
import PageFooter from "../../components/Footer/Footer";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import HockeyForm from "../../components/HockeyForm/HockeyForm";

import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

// this will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";
import * as favoritesApi from '../../utils/favoritesApi';


export default function HomePage({loggedUser, handleLogout}) {
  const [posts, setPosts] = useState([]); /// array of objects, the posts contain the favorites
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // (C)RUD Create
  // we will call this function in our HockeyForm handleSubmit,
  // this way when we get a response from the server, we can update our state
  async function handleAddPost(post) {
    // post is the formData from HockeyForm
    try {
      setLoading(true);
      const responseData = await postsApi.create(post); // this is calling our create function in the postsApi utils folder
      console.log(responseData, " response from the server");
      setPosts([responseData.data, ...posts]); // spread operator to keep all the posts that are already in state!
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, " error in addPost");
      setError("Error creating a post, please try again");
    }
  }


  // C(R)UD Read
  async function getPosts() {
    try {
      // make an api call
      // Then I want to update state!
      const response = await postsApi.getAll();
      console.log(response, " data");
      // then we update state
      setPosts(response.posts);
    //   const favoritesPosts = response.posts.filter(post =>
    //     post.favorites.every(favorite => 
    //         favorite.userId===loggedUser._id
    //         )
    //     )
            console.log(favoritesPosts, "favoritesPost")
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error in getPosts");
      setLoading(false);
    }
  }

  async function addFavorite(postId){
	// postId will be passed in when we click on a heart in Card component!
	try {
		const data = await favoritesApi.create(postId);
		// after we create a favorite
		// lets fetch all the posts again, to get the updated posts with the favorite 
		// embedded, and getPosts, will update the posts state so our ui will rerender
		// and we will see the heart change to red
		getPosts()


	} catch(err){
		console.log(err, ' error in addFavorite')
	}
  }

  async function removeFavorite(favoriteId){
	try {
		// favoriteId will be passed in when we click on heart that is red in the 
		// Card component
		const data = await favoritesApi.removeFavorite(favoriteId);
		// then we will call getPosts to refresh the data, and have an updated post without the favorite
		getPosts()

	} catch(err){
		console.log(err, ' err in removeFavorite')
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
        <Grid.Column style={{ maxWidth: 600 }}>
          <HockeyForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 1250 }}>
          <PostDisplay
            posts={posts}
            numPhotosCol={5}
            isProfile={false}
			loggedUser={loggedUser}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid>
      <Grid.Row>
        <Grid.Column>
            <br />
          <PageFooter  />
        </Grid.Column>
      </Grid.Row>
      </Grid>
    </Grid>
  );
}
