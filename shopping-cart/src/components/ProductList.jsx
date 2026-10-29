import { useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { products, categories } from "../data/products";

export default function ProductList() {
  // Local UI state only: filtering never touches the cart in Redux.
  const [category, setCategory] = useState("All");

  const visible =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h2 className="h4 mb-0">Products</h2>
        <ButtonGroup aria-label="Filter by category" size="sm">
          {categories.map((c) => (
            <Button
              key={c}
              variant={category === c ? "dark" : "outline-dark"}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <Row xs={1} sm={2} xl={3} className="g-3">
        {visible.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
