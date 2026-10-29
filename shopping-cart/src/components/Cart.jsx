import { Card, ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import CartItem from "./CartItem";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Cart summary is derived from state, so it updates automatically.
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Card className="shadow-sm cart-panel" id="cart">
      <Card.Header className="d-flex justify-content-between align-items-center bg-white">
        <h2 className="h5 mb-0">Your cart</h2>
        {items.length > 0 && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </Button>
        )}
      </Card.Header>

      {items.length === 0 ? (
        <Card.Body className="text-center text-muted py-5">
          Your cart is empty. Add a product to get started.
        </Card.Body>
      ) : (
        <>
          <ListGroup variant="flush" className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ListGroup>
          <Card.Footer className="bg-white">
            <div className="d-flex justify-content-between mb-1">
              <span>Total items</span>
              <span className="fw-semibold">{totalItems}</span>
            </div>
            <div className="d-flex justify-content-between fs-5">
              <span>Total price</span>
              <span className="fw-bold">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </Card.Footer>
        </>
      )}
    </Card>
  );
}
