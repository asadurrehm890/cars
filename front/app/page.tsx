'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';


export default function Page() {
  
  const router=useRouter();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  
  	const handleSubmit=(event)=>{
		event.preventDefault();
		
		console.log(password);
		fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
		  localStorage.setItem('token', data.accessToken);
		  router.push('/dashboard');
	  })
      .catch((error) => console.error(error));
		
	}
  
  return (
   <>
      <h1 className="text-center">LOGIN</h1>
	  
	   <form onSubmit={handleSubmit} className="mb-4 mx800">
	   <label className="form-label mb-4 w-100">
	     Email
		 <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
	   </label>
	   <label className="form-label mb-4 w-100">
	     Password
		 <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
	   </label>
	   <button className="btn btn-dark">Login</button>
	</form>
	 
	   <p className="text-center my-4">If not register, login <Link href="/register">here</Link></p>
	
   </>   
  );
}