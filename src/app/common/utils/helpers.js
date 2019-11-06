export const createNewEvent = (user, photoURL, event) => ({
  ...event,
  hostUid: user.uid,
  hostedBy: user.displayName,
  hostPhotoURL: photoURL || "/assets/user.png",
  created: new Date(),
  attendees: {
    [user.uid]: {
      going: true,
      joinDate: new Date(),
      photoURL: photoURL || "/assets/user.png",
      displayName: user.displayName,
      host: true
    }
  }
});

export const ObjectToArray = object =>
  object
    ? Object.entries(object).map(([key, val]) =>
        Object.assign({}, { id: key }, val)
      )
    : null;
