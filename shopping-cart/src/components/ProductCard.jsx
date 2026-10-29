import { Card, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        className="product-img"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = `https://placehold.co/480x360?text=${encodeURIComponent(product.name)}`;
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">
          {product.category}
        </Badge>
        <Card.Title className="fs-6">{product.name}</Card.Title>
        <Card.Text className="fw-bold fs-5 mb-3">
          ₹{product.price.toLocaleString("en-IN")}
        </Card.Text>
        <Button
          variant="primary"
          className="mt-auto"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}
