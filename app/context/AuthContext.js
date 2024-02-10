'use client'
import { useContext, createContext, useState, useEffect } from "react";
import {  signInWithPopup,  signOut,  onAuthStateChanged,  GoogleAuthProvider,  createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth } from "../firebase.js";
import { db } from "../firebase.js";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    
    async function Register(email,password){
        let uid = '';
        try {
            const res = await createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
                const user = userCredential.user;
                uid = user.uid;
            });
    
            console.log("User Registered Succesfully---- adding user id to database");
            // await setDoc(doc(db,"Users",uid),{
            //     username: userName
            // });
            // console.log("pushed to database");
        } catch (error) {
            console.log(error);
        }
    }

    const Login = async(email,password)=>{
        let uid = '';        
        try{ 
            await signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
            const user = userCredential.user;
            uid = user.uid;
          });
        }catch (error){
            console.log(error);
        }
    }

    const LogOut = () => {
        signOut(auth);
    };

    const googleSignIn = async(username) => {
        let uid = '';
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                uid= user.uid;                               
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

          try {
            console.log("User Registered Succesfully---- adding user id to database");
            await setDoc(doc(db,"Users",uid),{
                username: username
            });            
          } catch (error) {
            console.log(error);
          }


    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    
        // The return function will be called when the component unmounts or when the dependency array changes.
        return () => {
            unsubscribe();
        };
    }, []); 
    
    
    return (
        <AuthContext.Provider value={{ user, googleSignIn, LogOut,Register,Login }}>
          {children}
        </AuthContext.Provider>
      );
    
};
export const UserAuth = () => {
    return useContext(AuthContext);
}


