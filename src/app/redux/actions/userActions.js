import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const updateProfile = user => async (
  dispatch,
  _getState,
  { getFirebase }
) => {
  try {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;

    await firebase.updateProfile(updatedUser);

    await dispatch(reset("rxUpdateProfileForm"));
    await dispatch(reset("rxUserProfileForm"));
    toastr.success("Success!", "Profile Updated Successfully!");
  } catch (error) {
    console.log(error);
  }
};
