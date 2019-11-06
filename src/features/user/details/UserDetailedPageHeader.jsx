import React from "react";
import { Grid, Segment, Item, Header } from "semantic-ui-react";
import differenceInYears from "date-fns/differenceInCalendarYears";

const UserDetailedPageHeader = ({ profile }) => {
  const age =
    (profile.dateOfBirth &&
      differenceInYears(Date.now(), profile.dateOfBirth.toDate())) ||
    "Undisclosed";

  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image avatar size='small' src={profile.photoURL} />
            <Item.Content verticalAlign='bottom'>
              <Header as='h1'>{profile.displayName}</Header>
              <br />
              <Header as='h3'>{profile.occupation}</Header>
              <br />
              <Header as='h3'>
                {age}, Lives in {profile.city}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedPageHeader;
