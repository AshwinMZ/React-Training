import { Navbar, Container, Row, Col, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
        <Container>
          <Navbar.Brand href="#">ShopEasy</Navbar.Brand>
          <Navbar.Text as="a" href="#cart" className="text-white text-decoration-none">
            Cart{" "}
            <Badge bg="warning" text="dark" pill>
              {totalItems}
            </Badge>
          </Navbar.Text>
        </Container>
      </Navbar>

      <Container className="pb-5">
        <Row className="g-4">
          <Col lg={8}>
            <ProductList />
          </Col>
          <Col lg={4}>
            <Cart />
          </Col>
        </Row>
      </Container>
    </>
  );
}
