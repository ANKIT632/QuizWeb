"use client"

import { setItem } from './utils/localStorage'
import { useRouter } from 'next/navigation';


export default function Home() {


  const data = { "ques": 0, "ans": [], "v": 0 };


  const navigationToQuizPage = () => {

    setItem('data', data);
    router.push('./quiz')

  }

  const router = useRouter();

  return (
    <main className='w-full h-[100vh] bg-blue-200'>

      <nav className="bg-black h-9 w-full sticky top-0 mb-0.5">
        <h4 className="text-white font-mono font-bold text-center text-[25px]">Quiz+</h4>
      </nav>



      {/* hero section */}



      <div className='w-full'>
        <h3 className='ml-4 font-extrabold text-[30px]' >- Instruction -</h3>

        <ul className='ml-4'>
          <li>1. There are a total of 10 multiple choice questions in the quiz.</li>


          <li>2. You can change your answer as many times as you want before submitting the quiz.</li>
          <li>3. Once you have selected your answers, click on the Submit button to submit your answers.</li>
          <li>4. Do not refresh the page as it will reset all your answers.</li>
          <li>5. You will get your score immediately after you submit the quiz.</li>

          <li>6. Do not switch another tab. </li>
          <li>7. TestTest has to be taken in full view mode. </li>

        </ul>

        <button className='bg-blue-500 active:bg-blue-600 hover:bg-blue-400 px-2 py-1 rounded ml-5 mt-5 text-white font-mono font-bold' onClick={navigationToQuizPage}>Take quiz</button>
      </div>

    </main>
  );
}