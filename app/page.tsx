'use client'
import React from "react";
import { useState, useEffect } from "react";
import { UserAuth } from "./context/AuthContext.js";
import './landing.css'
import Image from "next/image.js";
import lander from '../public/unsplash.jpg'
import Footer from "./Footer.js";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Typewriter from 'typewriter-effect';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRouter } from "next/navigation.js";


export default function Home() {

  const Router = useRouter();

  const {  user, LogOut, upload, fetchDocumentId } = UserAuth();

  const handleSignOut = async () => {
    try {
    await LogOut();
    } catch (error) {
    console.log(error);
    }
};

const printUser = ()=>{
  fetchDocumentId();
}

const testUpload = () =>{
  const res = upload();
  if(res){
    console.log("Data Sent");
  }
}

/*
* Created with https://www.css-gradient.com
* Gradient link: https://www.css-gradient.com/?c1=46e821&c2=25af4f&gt=l&gd=dtl
*/




  return (
    <main className="p-4">
      
        
      <div className='landingpage'>
       <header>
            <a className="logo" href="/">De-Samadhan</a>
            <nav>
                <ul className="nav__links">
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </nav>
            {!(user)?
            (<a className="btn1" href="/login">Log in</a>):(<a className="btn1" onClick={handleSignOut}>Sign Out</a>)}
        </header>
        <div className='bannersection'>
            <div className='slogan'>
              <div className='mainslogan'>               
              <Typewriter
  options={{              
    autoStart: true,
    loop: true,
  }}
  onInit={(typewriter) => {
    typewriter.typeString(
      '<span style="color: #46E821; background: -webkit-linear-gradient(135deg, #46E821, #25AF4F); background-clip: text; typingSpeed: 150; -webkit-background-clip: text; text-align: center; text-fill-color: transparent; -webkit-text-fill-color: transparent"></span>')
      .callFunction(() => {
        console.log('String typed out!');
      })
      .pauseFor(200)
      .deleteAll()
      .pauseFor(150)
      .typeString('Raise your voice.')
      .pauseFor(250)
      .deleteAll()
      .pauseFor(150)
      .typeString('Express yourself.')
      .pauseFor(250)
      .deleteAll()
      .pauseFor(150)
      .typeString('Make differenrce')
      .pauseFor(250)
      .deleteAll()
      .pauseFor(150)
      .start();
  }}
/>
                 
              </div>
              <div className='subslogan'>
              Raise your voice anonymously. Get the support you need.Staying silent is not an option.
              </div>
              <div className="flex gap-4">
               <button className='btn1'>
               Sign in as Client
              </button>
              <button className='btn1'>
               Sign in as admin
              </button>
              </div>
            </div>
            <div className='sideimg'>
                <div className="animatedgif">
                <Player
                   autoplay
                   speed={0.7}
                   loop
                   src="https://lottie.host/d574cc6a-04d0-4926-83fe-eb8f7b2a3ad1/OPzSOGrRZj.json"
                   style={{ height: "500px", width: "500px" }}
                                 /> 
               </div>
            </div>

        </div>
        <div className="clienttype">
          <div className="title flex justify-between"><p>What makes
Insured+ accessible</p><p className="subtitle">We believe that insurance should provide you with peace of mind, knowing that you're covered in case of an unexpected event.</p>
</div>
    <div className="landcards">
      <div className="landcard">
        <h5>Healthcare in your fingertips</h5>
        <p>That's why we offer personalised support and guidance throughout the insurance process, </p>
        
      </div>

      <div className="landcard">
      <h5>Healthcare in your fingertips</h5>
        <p>That's why we offer personalised support and guidance throughout the insurance process, </p> 
      </div>
      <div className="landcard">
      <h5>Healthcare in your fingertips</h5>
        <p>That's why we offer personalised support and guidance throughout the insurance process, </p>

      </div>
      </div>
        </div>
        <div className="testimonial">
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><div className="card">
          <h5>20+</h5>
          <span>Insurance Partner Companies</span>          
         </div></SwiperSlide>
         <SwiperSlide><div className="card">
          <h5>AI</h5>
          <span>Tools Leveraged</span>          
         </div></SwiperSlide>
         <SwiperSlide><div className="card">
          <h5>150+</h5>
          <span>Employees Insured</span>          
         </div></SwiperSlide>
         <SwiperSlide><div className="card">
          <h5>28</h5>
          <span>Team of Reliable Brokers</span>          
         </div></SwiperSlide>
         
         

      
      </Swiper>
        <div className="testimonialtext">
          <p>
          That's why we offer personalised support and guidance throughout the insurance process,
          </p>
        </div>
        </div>
        <Footer/>
    </div>
   

<noscript>You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a></noscript>
    </main>
  )
}
