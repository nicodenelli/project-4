
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Segment,
  } from "semantic-ui-react";

  import { useNavigate } from "react-router-dom";
  
  import { useState } from "react";
  import userService from "../../utils/userService";
  import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

//   import { useNavigate } from "react-router-dom";
  // this is a hook that allows us to programatically navigate to a different route

//   const navigate = useNavigate()
  
  export default function Signup({handleSignUpOrLogin}) {
  
    const [state, setState] = useState({
      username: "",
      email: "",
      password: "",
      passwordConf: "",
      description: "",
    });
  
    
    const [selectedFile, setSelectedFile] = useState('')
  
    const [error, setError] = useState("");

    const navigate = useNavigate();
  
    function handleChange(e) {
      setState({
          ...state,
         
          [e.target.name]: e.target.value
      })
    }
  
    function handleFileInput(e) {
      console.log(e.target.files)
      setSelectedFile(e.target.files[0]);
    }
  
    async function handleSubmit(e){
      e.preventDefault();
      // ===================================================================
      // I am SENDING over a photo/file
      // I have to turn the data into formdata, otherwise it would be JSON
      const formData = new FormData(); // <- this is from the browser, allows me to create key value pairs
      // photo is the key, the value is the stuff from my state
      formData.append('photo', selectedFile);
  
      for (let fieldName in state){
          formData.append(fieldName, state[fieldName])
      }
      console.log(formData.forEach((item) => console.log(item)));
      // ===================================================================
  
  
      try {
  
          await userService.signup(formData);
      handleSignUpOrLogin(); // this updates the state in the app with the correct token from localstorage
      navigate('/'); // this programmatically navigates the client to the home page
  
      } catch(err){
          console.log(err.message, ' this is the error singnup up')
          setError('Check your terminal, there was an error signing up!')
      }
  
  
    }
  
    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="purple" textAlign="center">
            <Image src="https://i.imgur.com/sP26kFn.png" /> Sign Up
          </Header>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="username"
                placeholder="username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />
              <Form.TextArea
                label="bio"
                name="bio"
                value={state.bio}
                placeholder="Tell us something about your relationship with Hockey!"
                onChange={handleChange}
              />
              <Form.Field>
                <Form.Input
                  type="file"
                  name="photo"
                  placeholder="upload image"
                  onChange={handleFileInput}
                />
              </Form.Field>
              <Button type="submit" className="btn">
                Signup
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
  