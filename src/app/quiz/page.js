"use client"

import React, { useState, useEffect } from 'react';
import questions from '../constant/quiz.json';
import { useRouter } from 'next/navigation';


export default function Page() {

  const router = useRouter();
  let localData = JSON.parse(localStorage.getItem('data'));


  const [questionNumber, setQuestionNumber] = useState(localData.q || 0);
  const [answer,setAnswers]=useState("");


  const addUserAnswer = (e) => {

    e.preventDefault();
    const arr = [...localData.ans];
    arr[questionNumber] = e.target.innerText;
    localData.ans = arr;
    localStorage.setItem('data', JSON.stringify(localData));
    setAnswers(e.target.innerText);

  }

  const nextQuestionHandller = (e) => {
    e.preventDefault();

    localData.q = questionNumber + 1;
    localStorage.setItem('data', JSON.stringify(localData));
    if (questionNumber != 10)
      setQuestionNumber(questionNumber + 1);

  }

  const previousQuestionHandller = (e) => {
    e.preventDefault();
    if (questionNumber != 0)
      setQuestionNumber(questionNumber - 1);

  }


  const [switchCount, setSwitchCount] = useState(localData.v || 0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFullScreenPopup, setShowFullScreenPopup] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {

        localData.v = switchCount + 1;
        localStorage.setItem('data', JSON.stringify(localData));
        setSwitchCount((prevCount) => prevCount + 1);

      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const enterFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error('Error attempting to enable full-screen mode:', err));
    }
  };

  useEffect(() => {
    if (!isFullScreen) {
      setShowFullScreenPopup(true);
    } else {
      setShowFullScreenPopup(false);
    }
  }, [isFullScreen]);




  return (
    <div className=' w-full flex-col justify-center '>

<div className='flex flex-col ml-4'>
      <p className='font-mono text-red-500  '>violation Count: {switchCount}</p>
      {showFullScreenPopup && (
        <div className='flex-row '>
          <p className='font-mono font-semibold text-red-500 pb-3'>Message : Please take the test in full-screen mode and use Desktop or laptop.</p>
          <button onClick={enterFullScreen} className='bg-green-400 px-2 rounded-md hover:bg-green-500 text-white font-bold'>Enter Full Screen</button>
        </div>
      )}

      </div>  
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
