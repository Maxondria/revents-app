import { events } from "../../../playground/test-data/events";

export const initialState = {
  events,
  modal: null,
  auth: {
    authenticated: false,
    currentUser: null
  },
  async: { loading: false, elementName: null }
};
