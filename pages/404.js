import Link from 'next/link';
import { useEffect  } from 'react';
import {useRouter} from 'next/router';
export default function NotFound() {
    const router = useRouter();

  useEffect(() =>{
    setTimeout(() =>{
      // router.go(-1);
      router.push('/');
    }, 3000)
  },[router])
  return (
    
        <div className="mx-auto text-white text-3xl lg:6xl md:5xl flex flex-col justify-center items-center bg-black h-screen">
            <h1>404</h1>
            <h2>Oops! That page cannot be found!</h2>
            <p>Redirecting to <Link href="/">Homepage</Link></p>
        </div>

  )
}
