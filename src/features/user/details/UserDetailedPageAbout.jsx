import React from "react";
import { Grid, Segment, Header, List, Item, Icon } from "semantic-ui-react";
import { format } from "date-fns";

const UserDetailedPageAbout = ({ profile }) => {
  const capitalizeFirstLetter = string =>
    string.replace(/^\w/, c => c.toUpperCase());

  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon='smile' content={`About ${profile.displayName}`} />
            <p>
              I am a: <strong>{profile.occupation || "Undisclosed"}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin || "Undisclosed"}</strong>
            </p>
            <p>
              Member Since:{" "}
              <strong>
                {(profile.createdAt &&
                  format(profile.createdAt.toDate(), "EEEE do LLL, YYY")) ||
                  "Unknown"}
              </strong>
            </p>
            <p>{profile.about}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon='heart outline' content='Interests' />

            {profile.interests && profile.interests.length > 0 ? (
              <List>
                {profile.interests.map((interest, i) => (
                  <Item key={i}>
                    <Icon name='heart' />
                    <Item.Content>
                      {capitalizeFirstLetter(interest)}
                    </Item.Content>
                  </Item>
                ))}
              </List>
            ) : (
              <Item>
                <Item>
                  <Item.Content>No Interests</Item.Content>
                </Item>
              </Item>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedPageAbout;
