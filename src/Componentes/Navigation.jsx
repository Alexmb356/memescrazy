import React from 'react';


import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';





function Navigation ({user}) {
	
 
    


	  

  return (
    <>
			<header className='header col'>
				
			<Navbar    data-bs-theme="dark">
				<Container fluid> 
					<Navbar.Brand href="/" className='logo'>

						<img
							src="../crazymeme.png"
							width="80"
							height="80"
							className="d-inline-block align-top"
							alt="Memecrazy Logo"
						/>


					</Navbar.Brand>
					
      			</Container>


			</Navbar>
			
			
          
  
			</header>

			
		</>
	);
}

export default Navigation;
