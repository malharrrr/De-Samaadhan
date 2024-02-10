'use client'

import styles from '../css/loginsignup.css'
import { UserAuth } from "../context/AuthContext";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function signup(){

    const Router = useRouter();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { user, googleSignIn, LogOut, Register } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [brId , setBrId] = useState();

    const handleSignIn = async () => {
        try {
        await googleSignIn(role);
        window.location.href='/';
        } catch (error) {
        console.log(error);
        }
    };
    async function regi(e){
    e.preventDefault();
        try{
            await Register(email,password);
            window.location.href='/login';            
        }catch(error){
          
            console.log(error);
        }
    }
        useEffect(() => {
        const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLoading(false);
        };
        checkAuthentication();
        if(loading == false){
            Router.push('/');
        }
    }, [user]);

    return(<>

            <div className="animatedgif">
                <Player
                   autoplay
                   speed={1.5}
                   loop
                   src="https://lottie.host/d4c38973-aa8b-4df2-a10e-0a426c6be263/sNshsuUZPw.json"
                   style={{ backgroundColor: '#000',
                   backgroundSize: 'cover',
                   backgroundRepeat: 'no-repeat',
                   width: '100vw',
                   height: '100vh',
                   margin: '0px',
                   padding: '0px',
                   //float: 'right',
                   //zIndex: '0',
                    position: 'relative',  // Use 'fixed' to keep it fixed relative to the viewport
                //    top: '0',
                right: '-25vw',  
            }}
                                 /> 
               </div>       
      
        <div className={styles.registercontainer} id="register">
           <div className='flex justify-center py-3 text-sm'>
               <span>Have an account? <a href="/login">Login</a></span>                
           </div>
           <header className='text-center text-5xl pb-5'>Sign Up</header>
           <div className='flex gap-5 justify-center py-5'>
               <div className={styles.inputbox}>
                   <input type="text" class="input-field" placeholder="Firstname"/>
                   <i class="bx bx-user"></i>
               </div>
               <div className={styles.inputbox}>
                   <input type="text" class="input-field" placeholder="Lastname"/>
                   <i class="bx bx-user"></i>
               </div>
           </div>
           <div className='pb-5'>
               <div className='pb-5'>
                   <input type="text" class="input-field" required value={email} onChange={(event) => setEmail(event.currentTarget.value)} placeholder="Email"/>
                   <i class="bx bx-envelope"></i>
               </div>
               <div className={styles.inputbox}>
                   <input type="password" class="input-field" required value={password} onChange={(event) => setPassword(event.currentTarget.value)} placeholder="Password"/>
                   <i class="bx bx-lock-alt"></i>
               </div>
              

           </div>          

           <div className={styles.inputbox}>               
               <input type="submit" class="submit" onClick={regi} onSubmit={regi} value="Register"/>   
           </div>
           <div className='flex justify-between'>
               <div className={styles.one}>
                   <input type="checkbox" id="register-check"/>
                   <label for="register-check"> Remember Me</label>
               </div>
               <div className={styles.two}>
                   <label><a href="#">Terms & conditions</a></label>
               </div>
           </div>
       </div>    
   </>);
}