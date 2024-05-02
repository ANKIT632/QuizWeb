/* eslint-disable react-hooks/exhaustive-deps */
"use client"
//react-hooks/exhaustive-deps
import { setItem, getItem } from '../utils/localStorage'
import React, { useState, useEffect } from 'react';
import questions from '../constant/quiz.json';
import { useRouter } from 'next/navigation';


export default function Page() {

  const router = useRouter();
  let localData = getItem('data');

  

  const [questionNumber, setQuestionNumber] = useState(localData?.ques || 0);
  const [answer, setAnswers] = useState("");
  const [switchCount, setSwitchCount] = useState(localData?.v || 0);


  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    function handleFullScreenChange() {
      setIsFullScreen(document.fullscreenElement != null);
    }

    function handleKeyDown(event) {
      if (event.key === "F11") {
        event.preventDefault();
        if (!document.fullscreenElement) {
          enterFullScreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen(); 
        }
      }
    }
   
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullScreenChange);
    };
  }, []);

  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };


  const addUserAnswer = (e) => {

    e.preventDefault();
    const arr = localData.ans;
    arr[questionNumber] = e.target.innerText;
    localData.ans = arr;
    setItem('data',localData);
    setAnswers(e.target.innerText);

  }


  const nextQuestionHandller = (e) => {
    e.preventDefault();

    localData.ques = questionNumber + 1;

    setItem('data',localData);

    if (questionNumber != 10)
      setQuestionNumber(questionNumber + 1);

  }

  const previousQuestionHandller = (e) => {
    e.preventDefault();
    if (questionNumber != 0)
      setQuestionNumber(questionNumber - 1);

  }





  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {

       localData.v = switchCount + 1;

        setItem('data',localData);
        
        setSwitchCount((prevCount) => prevCount + 1);

      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);



 




  return (
    <div className=' w-full flex-col justify-center '>

      <div className='flex flex-col ml-4'>
        <p className='font-mono text-red-500  '>violation Count: {switchCount}</p>
  
      </div>

      {!isFullScreen && (
        <button onClick={enterFullScreen} className='p-1.5 bg-blue-400 rounded-lg ml-5'>Click Full Screen</button>
      )}


      {isFullScreen && <div className='mx-3 mt-6 w-fit flex-row justify-center'>

                
        <h4 className='mb-3 font-serif font-bold'>{"Q"}{questionNumber + 1 + ". " + questions[questionNumber].question}</h4>
        {

          questions[questionNumber].options.map((option, id) => (
            <div key={id} className='mx-2'>
              <button key={id} className={`bg-blue-100 mb-2 px-5 rounded-[6px] font-mono ${option === localData.ans[questionNumber] ? 'bg-blue-400' : ''
                }`} onClick={addUserAnswer}> {option}</button>
              <br />
            </div>
          ))
        }
        <div className='relative'>
          <button className='bg-blue-600 px-4 rounded-lg text-white hover:bg-blue-500  mt-3 font-serif font-semibold p-[2px]  ' onClick={previousQuestionHandller}>previous</button>

          {(questionNumber != 9) ?
            <button className='bg-blue-600 px-4 rounded-lg text-white hover:bg-blue-500  mt-3 font-serif font-semibold p-[2px] absolute right-0' onClick={nextQuestionHandller}>Next</button> : <button className='bg-green-600 px-4 rounded-lg text-white hover:bg-green-500  mt-3 font-serif font-semibold p-[2px] absolute right-0' onClick={() => router.push('./score')}>submit</button>
          }

        </div>
      </div>}
    </div>

  )
}
