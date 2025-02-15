import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      name: name,         // your form state for name
      email: email,       // your form state for email
      comment: comment,   // added comment field
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}; 