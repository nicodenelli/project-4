import { Image, Grid, Segment } from "semantic-ui-react";

import './ProfileBio.css'
// ^ If you want your custom css 
// convention of the class name is component-name + element or class idea you want
// .profile-bio-span
// .profile-bio-flx-ctr

export default function ProfileBio({ user }) {
  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${
              user.photoSrc
                ? user.photoSrc
                : "https://i.imgur.com/sP26kFn.png"
            } `}
            avatar
            size="small"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Segment vertical>
            <h3>{user.username}</h3>
          </Segment>
          <Segment>
            <span className="profile-bio-span"> Profile Bio: {user.description}</span>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
