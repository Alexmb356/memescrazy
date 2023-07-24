import React from 'react';


import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';





function Navigation ({user}) {
	
 
    


	  

  return (
    <>
			<header className='header col'>
				
			<Navbar collapseOnSelect expand="md"  data-bs-theme="dark">
				<Container fluid>
					<Navbar.Brand href="/" className='logo'>

						<img
							src="../Memecrazy.png"
							width="100"
							height="100"
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
