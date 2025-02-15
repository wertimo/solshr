import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Retrieve form field values. Adjust according to your state management logic.
  const name = e.target.elements.name.value;
  const email = e.target.elements.email.value;
  const comment = e.target.elements.comment.value; // New comment field
  
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

export default handleSubmit; 