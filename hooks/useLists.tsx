import { collection, DocumentData, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { Movie } from "../typings"

 const useLists = (uid: string | undefined) => {
    const [list, setList] = useState<Movie[] | DocumentData>([])

    useEffect(() => {
        if (!uid) return

        return onSnapshot(
            collection(db, "customer", uid, "myList"),
            (snapshot) => {
                setList(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                )
            }
        )
    },[db, uid])

   return list
 }
 
 export default useLists