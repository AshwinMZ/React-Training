import { Button, Image, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="py-3">
      <div className="d-flex gap-3">
        <Image
          src={item.image}
          alt={item.name}
          rounded
          className="cart-thumb"
        />
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <div className="fw-semibold">{item.name}</div>
            <Button
              variant="link"
              size="sm"
              className="text-danger p-0"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </Button>
          </div>
          <div className="text-muted small">
            ₹{item.price.toLocaleString("en-IN")} each
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                aria-label={`Decrease quantity of ${item.name}`}
                disabled={item.quantity <= 1}
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                −
              </Button>
              <span className="px-1 fw-semibold">{item.quantity}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                aria-label={`Increase quantity of ${item.name}`}
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </Button>
            </div>
            <div className="fw-bold">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
}
