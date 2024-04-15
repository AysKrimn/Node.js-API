import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserProvider } from '../Context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';







function SiteNavBar() {

    const { user, setUser } = useContext(UserProvider)

    const logout = () => {

        localStorage.removeItem('token')
        setUser(null)
    }

    const navbar_layout = () => {

        return ( 
        
                <>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
            
                        <div className='ms-auto'>

                                { 
                                
                                
                                    user && user !== null 
                                    ?
                                            <NavDropdown title={user.username} id="basic-nav-dropdown" className='ms-auto'>
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Another action
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">
                                                <Link onClick={logout} to="/" className='nav-link text-danger'>Çıkış Yap</Link>
                                            </NavDropdown.Item>
                                             </NavDropdown>
                                    :
                                        <Link to="/login" className='nav-link'>Giriş Yap</Link>
                                }
                        </div>
                </>
    
    
        )
    }
    

  return (
    <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">

                {navbar_layout()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNavBar;