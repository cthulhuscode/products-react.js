// Types
import { SHOW_ALERT, HIDE_ALERT } from "../types";

/* Show Alert */
export function showAlertAction(alert) {
  return (dispatch) => {
    dispatch(showAlert(alert));
  };
}
// actions
const showAlert = (alert) => ({
  type: SHOW_ALERT,
  payload: alert,
});

/* Hide Alert */
export function hideAlertAction() {
  return (dispatch) => {
    dispatch(hideAlert());
  };
}
// actions
const hideAlert = () => ({
  type: HIDE_ALERT,
});
