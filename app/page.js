'use client'
import HomePage from "@/components/HomePage";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const roboto = Roboto({
  weight:'900',
  subsets:['latin'],
  display:"swap"
})
const roboto2 = Roboto({
  weight:'300',
  subsets:['latin'],
  display:"swap"
})
export default function Home() {
     const router = useRouter()
  useEffect(()=>{
    if(!localStorage.getItem('tid')){
        router.push('/login')
    }
  },[])
  
  return (
    <>
      <HomePage roboto={roboto} roboto2={roboto2}/>
    </>
  )
}
