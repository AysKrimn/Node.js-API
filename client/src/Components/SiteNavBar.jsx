import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserProvider } from '../Context/UserContext';
import { Link } from 'react-router-dom';


function SiteNavBar() {
  const { user } = useContext(UserProvider)

  function updateLayout() {

        if (user !== null) {

            return (
            
            <NavDropdown title={user.name} id="basic-nav-dropdown" className='ms-auto'>
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                    Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                    Separated link
                    </NavDropdown.Item>
            </NavDropdown>            
            )

        } else {

            return <Link className='nav-link ms-auto' to="/login">Giriş Yap</Link>
        }

  }

  return (
    <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='w-100'>
            <Nav.Link href="/create-todo">Todo Oluştur</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>

            {updateLayout()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNavBar;