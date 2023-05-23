'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';


export default function Register() {
    const router=useRouter();
  
    const [email, setEmail]=useState(''); 
	
	const [username, setUsername]=useState(''); 

    const [message, setMessage]=useState('');	
	
	const handleSubmit=(e)=>{
        e.preventDefault();		
		
		 fetch("http://localhost:8000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
		username,  
        email,
      }),
    })
      .then((response) => response.json())
      .then(() => {
		 setMessage(`Thanks, Password is send to your email, Please check your email ${email}`);
	  })
      .catch((error) => {
		 setMessage(`sorry not registered, please try again`); 
	  });
	}
	
  return (
   <>
      <h1 className="text-center">Registeration</h1>
	  <span className="badge text-bg-success text-center w-100 p-2">{message}</span>
	  <form onSubmit={handleSubmit} className="mx800">
	      <label className="mb-4 w-100 form-label">
		     User Name
			 <input className="mt-2 form-control" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
		  </label>
		  <label className="mb-4 w-100 form-label">
		     Email
			 <input className="mt-2 form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
		  </label>
		  
		  <button type="submit" className="btn btn-dark">Regsiter</button>
	   </form>
	 
	   <p className="text-center my-4">If already register, login <Link href="/">here</Link></p>
	
	  
   </>   
  );
}