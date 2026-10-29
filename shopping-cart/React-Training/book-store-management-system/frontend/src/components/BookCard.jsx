import { Card, Badge, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const PLACEHOLDER = "https://placehold.co/300x420?text=No+Cover";

export default function BookCard({ book, onEdit, onDelete, onToggle }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={book.image || PLACEHOLDER} alt={book.title}
        style={{ height: 320, objectFit: "contain", background: "#f1f1f1", padding: 8 }}
        onError={(e) => { e.currentTarget.src = PLACEHOLDER; }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{book.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{book.author}</Card.Subtitle>
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <Badge bg="secondary">{book.category}</Badge>
          <strong>${Number(book.price).toFixed(2)}</strong>
        </div>
        <Card.Text className="small flex-grow-1">{book.description}</Card.Text>
        <Badge bg={book.available ? "success" : "danger"} role="button" className="align-self-start mb-3"
          title="Click to toggle availability" onClick={() => onToggle(book)}>
          {book.available ? "In stock" : "Out of stock"}
        </Badge>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" className="flex-fill" onClick={() => onEdit(book)}>
            <FaEdit className="me-1" />Edit
          </Button>
          <Button variant="outline-danger" size="sm" className="flex-fill" onClick={() => onDelete(book)}>
            <FaTrash className="me-1" />Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
