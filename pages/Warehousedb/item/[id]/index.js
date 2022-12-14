import {useRouter} from "next/router";
import { useAuth } from "../../context/AuthUserContext";
import firebase from "../../context/Firebase";

// import { useCollection } from "react-firebase-hooks/firebase";

import LoggedIn from "../LoggedIn";

const article = () => {
    const router = useRouter()
    const {id} = router.query

  return (
    <LoggedIn>Item {id}</LoggedIn>
  )
}

export default article
