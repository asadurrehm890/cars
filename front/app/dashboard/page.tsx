'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';


export default function Page() {
  
  const router=useRouter();
  
  const [cars, setCars]=useState([]);
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
		  fetch('http://localhost:8000/api/cars/', {
			  headers:{
				  'Authorization': `Bearer ${token}`
			  }
		  }).then(response => response.json())
		  .then((data)=>{
			 setCars(data); 
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
      const response = await fetch(`http://localhost:8000/api/cars/${id}`, {
        method: 'DELETE',
		headers:{
			 'Authorization': `Bearer ${token}`
		}
      });
	  

      if (response.ok) {
        const response = await fetch('http://localhost:8000/api/cars',{
			headers:{
			 'Authorization': `Bearer ${token}`
		}
		});
      const data = await response.json();
      setCars(data);
		
      } else {
        console.log(`Failed to delete item with ID ${id}`)
      }
    } catch (error) {
      console.error(error)
    }
	}

 const latest=async()=>{
	 	  const token = localStorage.getItem('token');
	if(token==null){
		Router.push('/');
	}
		 const response=await fetch('http://localhost:8000/api/cars/desc',{
			 headers:{
			 'Authorization': `Bearer ${token}`
		}
		 }
		 
		 );
		 const data = await response.json();
		 console.log(data);
		 setCars(data);   
  } 
  const oldest=async()=>{
	  	  const token = localStorage.getItem('token');
	if(token==null){
		Router.push('/');
	}
		 const response=await fetch('http://localhost:8000/api/cars/aese', {
			 headers:{
			 'Authorization': `Bearer ${token}`
		}
		 });
		 const data = await response.json();
		 console.log(data);
		 setCars(data);   
  } 


 if(user!=null){ 
  return (
   <>
      <h1 className="text-center">Dashboard</h1>
	  
	  <div className="my-3 d-flex align-items-center justify-content-center flex-wrap">
	   
	     <Link className="btn btn-dark mx-2" href="/dashboard/create">Add New Car</Link>
		 <Link className="btn btn-dark mx-2" href="/dashboard/categories">Categories</Link>
	     
		 <button onClick={latest}  className="btn btn-dark mx-2">Latest</button>
		 <button onClick={oldest}  className="btn btn-dark mx-2">Oldest</button>
	  
	  </div>
	  
	  <table className="table my-3 align-middle">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Color</th>
      <th scope="col">Model</th>
      <th scope="col">Maker</th>
      <th scope="col">Registeration no.</th>
      <th scope="col">Category</th>
	  <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  
  {cars.map((item)=>{
	  return(
	  <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.color}</td>
      <td>{item.model}</td>
      <td>{item.maker}</td>
      <td>{item.reg}</td>
      <td>{item.category}</td>
      <td className="d-flex align-items-center">
	     <Link href={`/dashboard/update/${item._id}`} className="btn btn-dark me-2"><i className="bi bi-pencil-square fs-641"></i></Link>
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