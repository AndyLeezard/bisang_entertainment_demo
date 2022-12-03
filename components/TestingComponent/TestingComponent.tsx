import React, { useState } from "react"
import { useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../lib/firebase"
//import styles from "./TestingComponent.module.css"

type Props = {}

const TestingComponent = (props: Props) => {
  //const [signal, setSignal] = useState(null)
  useEffect(() => {
    const docRef = doc(firestore, "env", "vars")
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log(`Document data : ${data}`)
          if (data.signal) {
            //setSignal(data.signal)
            console.log(`Firestore Signal : ${data.signal}`)
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!")
        }
      })
      .catch((e) => {
        console.error(e.message)
      })
  }, [])

  return <></>
  /* return (
    <div id={styles.wrapper}>
      {
        <div style={{ textAlign: "center" }}>
          {signal
            ? `Firestore signal OK : ${JSON.stringify(signal)}`
            : "Fetching firestore signal..."}
        </div>
      }
    </div>
  ) */
}

export default TestingComponent
