/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'
import questions from '../constant/quiz.json';
import { useRouter } from 'next/navigation';


function Page() {

  const router = useRouter();

  const data = JSON.parse(localStorage.getItem('data'));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const s = questions.reduce((score, item, id) => {

      return item.answer === data.ans[id] ? score + 1 : score;
    }, 0);
    setScore(s);
  }, [])

  return (
    <div className='font-serif w-full flex flex-col justify-center mt-4'>

      <div className='flex justify-center'>
        <h1 className='font-bold'>Score : </h1>
        <h1>{score}</h1>
      </div>

      <button className='bg-blue-300 w-fit relative left-[42%] mt-3 px-3 rounded-lg active:bg-blue-500 hover:bg-blue-400' onClick={() => router.push('./')}>Start Again</button>
    </div>
  )
}

export default Page