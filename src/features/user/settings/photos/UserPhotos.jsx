import React from "react";
import { Header, Card, Image, Button } from "semantic-ui-react";

const UserPhotos = ({ photos, profile }) => {
  const filteredPhotos =
    photos && photos.filter(photo => photo.url !== profile.photoURL);

  return (
    <>
      <Header sub color='teal' content='All Photos' />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL} />
          <Button positive>Main Photo</Button>
        </Card>

        {filteredPhotos &&
          filteredPhotos.map(photo => (
            <Card key={photo.id}>
              <Image src={photo.url} />
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Main
                </Button>
                <Button basic icon='trash' color='red' />
              </div>
            </Card>
          ))}
      </Card.Group>
    </>
  );
};

export default UserPhotos;
