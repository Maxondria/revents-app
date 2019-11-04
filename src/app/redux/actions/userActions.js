import { toastr } from "react-redux-toastr";

export const updateProfile = user => async (
  dispatch,
  _getState,
  { getFirebase }
) => {
  try {
    const firebase = getFirebase();
    await firebase.updateProfile(user);
    toastr.success("Success!", "Profile Updated Successfully!");
  } catch (error) {
    console.log(error);
  }
};
