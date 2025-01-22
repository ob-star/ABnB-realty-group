import { getAuth, signOut } from "firebase/auth";
import { auth } from "../config/firebase_config";

export default function SignOut(){

return signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}