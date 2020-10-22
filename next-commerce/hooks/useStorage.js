import { useState, useEffect } from "react";
import fetchJson from '../utils/fetchJson'
import {
  projectStorage,
  projectFirestore,
  timestamp
} from "../firebase/config";
import {Task} from '../utils/types'


function useStorage({file,name,price,stock_total,description,category}) {
    
    const storageRef = projectStorage.ref(file.name);
return Task((rej,res) => {
  storageRef.put(file).on(
    "state_changed",
    snap => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      console.log(percentage);
    },
    err => {
      console.log(err);
    },
    async () => {
      storageRef.getDownloadURL()
      .then(url => {
        return fetch('/api/uploadProduct', {
          method: 'POST',
          body: JSON.stringify({name,price,stock_total,description,category,url}),
          headers: {
            'Content-Type': "application/json"
          }
        })
      })
      .then(data => data.json())
      .then(data => {
        console.log(data)
        res(data)
      })
      .catch(err => rej(err))
    }
  );

})

};

export default useStorage;
