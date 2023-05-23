'use client';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Create(){
	
	const Router=useRouter();
	
	const [name, setName]=useState('');
	

	const [user, setUser]=useState();
	
	const token = localStorage.getItem('token');
	if(token==null){
		Router.push('/');
	}
	
	useEffect(()=>{
	
	
	 
      // Make authenticated request to backend API to get user data
      fetch('http://localhost:8000/api/users/current', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then((data) =>{
		
			  setUser(data.username);
			 
			  
			    
		  })
      .catch((error) => {
		  
		  Router.push('/');
	  });
	
	},[])
	

	const handleSubmit=async(e)=>{
		
		
		
		e.preventDefault();
	
	
	  await fetch('http://localhost:8000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
       
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        
		Router.push('/dashboard/categories');
      })
      .catch((error) => {
        console.error('Error:', error);
        
      });
	
	}
	if(user!=null){
	return(
	 <>
    <Link href="/dashboard" className="btn btn-dark my-2">Back</Link>	 
	 <h1 className="py-2 text-center">Create Category</h1>
	   <form onSubmit={handleSubmit} className="mx800">
	      <label className="mb-4 w-100 form-label">
		     Name
			 <input className="mt-2 form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
		  </label>
  		  
		  <button type="submit" className="btn btn-dark">Create</button>
	   </form>
	 
	   
	 </>
	)
	}
	
}

