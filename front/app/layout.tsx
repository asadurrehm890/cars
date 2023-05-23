import Link from 'next/link';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../public/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
	  <header>
	       <nav className=" navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container">
    <Link className="navbar-brand text-white" href="/">Asad</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" href="/">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" href="/register">Registeration</Link>
        </li>
       
      </ul>
    
    </div>
  </div>
</nav>
	  </header>
	  <main className="my-5">
	    <div className="container">
	       {children}
	     </div>
	  </main>
	  <footer className="bg-dark py-4">
	     <div className="conatiner">
		    <p className="text-white mb-0 text-center">Source code avaliable <a href="https://github.com/asadurrehm890" className="text-warning">here</a></p>
		 </div>
	  </footer>
	  </body>
    </html>
  );
}