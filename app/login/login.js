'use client'
import React, { createContext, useContext} from 'react';
import styles from '../css/loginsignup.css'
import { UserAuth } from "../context/AuthContext";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useMyContext } from '../MyContext.js';




export default function Login(){

    const Router = useRouter();

    const [aadharNumber,setAadharNumber] = useState();   
    const { user, googleSignIn, LogOut, Login} = UserAuth();
    const [loading, setLoading] = useState(true);
    const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const { encryptAadhars } = useMyContext();
  

    const handleSignIn = async () => {
        try {
        await googleSignIn();
        } catch (error) {
        console.log(error);
        }
    };

    

    
    

    const logIn = async(e) =>{
        e.preventDefault();
        try{
           const response = await Login(email,password);
           console.log(response);          
           if(response == "client"){                
                window.location.href = '/grievanceportal';
           }else if(response == "officer"){
                window.location.href = '/officerdashboard';
           }
        }catch(error){        
            console.log(error);
        }        
    }

     function encryptAadhar(aadhar, key1, key2) {
        return aadhar.split('').map(char => {
          const digit = parseInt(char, 10);
          if (!isNaN(digit)) { // Check if the character is a digit
            return ((digit * key1 + key2) % 10).toString();
          }
          return char; // Non-digit characters remain unchanged
        }).join('');
      }

    const handleAadharSubmit = async () => {
        encryptAadhars(parseInt(await encryptAadhar(aadharNumber, 2, 5), 10));
        console.log(encryptAadhars(parseInt(await encryptAadhar(aadharNumber, 2, 5), 10)));
        setShowOtpField(true);   
    
    };

    const handleOtpSubmit = () => {
        if (otp == 9752){            
            window.location.href = '/grievanceportal';
        }
    };

    

    useEffect(() => {
        const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLoading(false);
        };
        checkAuthentication();
        // if(loading == false){
        //     window.location.href='/';
        // }
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
                        float: 'right',
                        //zIndex: '0',
                            position: 'relative',  // Use 'fixed' to keep it fixed relative to the viewport
                        //    top: '0',
                        right: '-25vw',  
                    }}
                                        /> 
                    </div>

 
    <Toaster style= {
      {overflow: 'hidden',
      height: '30px',}
    }/>
   
        <div className={styles.logincontainer} id="login">
            <div className='flex justify-center py-3 text-sm'>
                <span>Don't have an account? <Link href="/signup">Sign Up</Link></span>                
            </div>
          
            <header className=' text-center text-5xl pb-5'>Login</header>
            {!showOtpField && (<div className={styles.inputbox}>{/* USE E-KYC */}
                <input type="text" class="input-field" required value={aadharNumber} onChange={(event) => setAadharNumber(event.currentTarget.value)}  placeholder="Your Aadhar Number"/>
                <i class="bx bx-user"></i>
                <div className={styles.inputbox}>                
                    <input type="submit" class="submit" onClick={handleAadharSubmit} value="Submit"/>
                </div>
            </div>)}

            {showOtpField && (<>
                <div className="py-2">
                <span>OTP sent to Phone Number (842xxxxx54)</span>
                </div>
                <div className={styles.inputbox}>
                    <input type="password" class="input-field" required value={otp} onChange={(event) => setOtp(event.currentTarget.value)}  placeholder="OTP"/>
                    <i class="bx bx-lock-alt"></i>
                </div>
                <div className="py-2"></div>            
                <div className={styles.inputbox}>                
                    <input type="submit" class="submit" onClick={handleOtpSubmit} value="Sign In"/>
                </div>
                <div className="flex justify-between text-xs">
                    <div class="one">
                        <input type="checkbox" id="login-check"/>
                        <label for="login-check"> Remember Me</label>
                    </div>
                    <div class="two">
                        <label><a href="#"><p>Forgot password?</p></a></label>
                    </div>
                </div>
            </>)}
            
            
        </div>
    
    </>);
}
