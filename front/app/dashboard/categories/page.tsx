'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';


export default function Page() {
  
  const router=useRouter();
  
  const [categories, setCategories]=useState([]);
  const [user, setUser] = useState(null);
  
  useEffect(()=>{	
    const token = localStorage.getItem('token');
	if(token==null){
		router.push('/');
	}
	
	fetch('http://localhost:8000/api/users/current', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => response.json())
	  .then((data)=>{
		  fetch('http://localhost:8000/api/categories/', {
			  headers:{
				  'Authorization': `Bearer ${token}`
			  }
		  }).then(response => response.json())
		  .then((data)=>{
			 setCategories(data); 
		  });
		  
		  setUser(data.username);
		  
	  }).catch((error) => {
		  router.push('/');
		  
	  });
  
  },[]);
 

  const handlerdel=async(id)=>{
		  const token = localStorage.getItem('token');
	if(token==null){
		Router.push('/');
	}
	 
	 try {
      const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'DELETE',
		headers:{
			 'Authorization': `Bearer ${token}`
		}
      });
	  

      if (response.ok) {
        const response = await fetch('http://localhost:8000/api/categories',{
			headers:{
			 'Authorization': `Bearer ${token}`
		}
		});
      const data = await response.json();
      setCategories(data);
		
      } else {
        console.log(`Failed to delete item with ID ${id}`)
      }
    } catch (error) {
      console.error(error)
    }
	}


 if(user!=null){ 
  return (
   <>
     <Link className="btn btn-dark my-2" href="/dashboard">Back</Link>
      <h1 className="py-2 text-center">Categories</h1>
	  <Link href="/dashboard/categories/create" className="my-2 btn btn-dark">Create Category</Link>
	  
	  <table className="table my-3 align-middle">
  <thead>
    <tr>
      <th scope="col">Name</th>
	  <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  
  {categories.map((item)=>{
	  return(
	  <tr key={item._id}>
      <td>{item.name}</td>
      <td className="d-flex align-items-center">
	     <Link href={`/dashboard/categories/update/${item._id}`} className="btn btn-dark me-2"><i className="bi bi-pencil-square fs-641"></i></Link>
         <button className="btn btn-danger" onClick={()=>handlerdel(item._id)}><i className="fs-6 bi bi-trash3-fill"></i></button>	 
	 </td>
	  
    </tr>
	  )
  })}
   
   
  </tbody>
</table>
	  	
   </>   
  );
 }
}