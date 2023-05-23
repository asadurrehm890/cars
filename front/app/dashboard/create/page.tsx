'use client';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Create(){
	
	const Router=useRouter();
	
	const [name, setName]=useState('');
	const [color, setColor]=useState('');
	const [model, setModel]=useState('');
	const [maker, setMaker]=useState('');
	const [reg, setReg]=useState('');
	const [selectcategory, setSelectcategory]=useState('');
	
	const [categories, setCategories]=useState([]);
	
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
			  
			  
	 fetch('http://localhost:8000/api/categories/',  {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response=>response.json())
	  .then((data)=>{
		  
		  setCategories(data);
	  })
			  
			    
		  })
      .catch((error) => {
		  
		  Router.push('/');
	  });
	
	},[])
	

	const handleSubmit=async(e)=>{
		
		
		
		e.preventDefault();
	
	
	  await fetch('http://localhost:8000/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,color,model,maker,reg,category:selectcategory
       
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        
		Router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
        
      });
	
	}
	if(user!=null){
	return(
	 <>
    <Link href="/dashboard" className="btn btn-dark my-2">Back</Link>	 
	 <h1 className="py-2 text-center">Create Car</h1>
	   <form onSubmit={handleSubmit}>
	      <label className="mb-4 w-100 form-label">
		     Name
			 <input className="mt-2 form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
		  </label>
		  <label className="mb-4 w-100 form-label">
		     Color
			 <input className="mt-2 form-control" type="text" value={color} onChange={(e)=>setColor(e.target.value)} />
		  </label>
		   <label className="mb-4 w-100 form-label">
		     Model
			 <input className="mt-2 form-control" type="text" value={model} onChange={(e)=>setModel(e.target.value)} />
		  </label>
		   <label className="mb-4 w-100 form-label">
		     Maker
			 <input className="mt-2 form-control" type="text" value={maker} onChange={(e)=>setMaker(e.target.value)} />
		  </label>
		  <label className="mb-4 w-100 form-label">
		     reg
			 <input className="mt-2 form-control" type="text" value={reg} onChange={(e)=>setReg(e.target.value)} />
		  </label> 
		  <label className="mb-4 w-100 form-label">
		     Category
			 <select value={selectcategory} onChange={(e)=>setSelectcategory(e.target.value)} className="form-select" aria-label="Default select example">
			 
			  <option selected>No category selected</option>
			  {categories.map((item)=>{
				  return(
				   <option value={item._id}>{item.name}</option>
				   
				  )
			  })}
			 
			 
			  
			</select>
		  </label>
		  
		  
		  <button type="submit" className="btn btn-dark">Create</button>
	   </form>
	 
	   
	 </>
	)
	}
	
}

