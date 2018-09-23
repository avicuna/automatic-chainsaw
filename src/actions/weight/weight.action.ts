import { weightTypes } from "./weight.types";
import { updateErrorMessage } from "../misc/misc.actions";

export const changeWeight = (newWeight: number) => {
  return {
    payload: {
      weight: newWeight
    },
    type: weightTypes.CHANGE_WEIGHT
  };
};
export const submitWeight = (userId: number, newWeight: number) => (
  dispatch: any
) => {
  const req = {
    id: userId,
    weight: newWeight
  };
  fetch("http://localhost:6969/users", {
    body: JSON.stringify(req),
    headers: { "Content-Type": "application/json" },
    method: "PATCH"
  })
    .then((resp: any) => {
      if (resp.status === 202) {
        alert("Successfully changed weight.");
        return resp;
      }
      dispatch(updateErrorMessage("Unable to update information"));
    })
    .catch((err: any) => {
      dispatch(updateErrorMessage("Something went terribly wrong"));
    });
};
