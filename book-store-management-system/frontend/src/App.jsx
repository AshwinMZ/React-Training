import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner, Form, Modal, Navbar, InputGroup } from "react-bootstrap";
import { FaPlus, FaBookOpen, FaSearch } from "react-icons/fa";
import * as api from "./api";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const notify = (variant, text) => {
    setMsg({ variant, text });
    setTimeout(() => setMsg(null), 3000);
  };

  // GET - runs once when the page loads
  useEffect(() => {
    api.getBooks()
      .then((res) => setBooks(res.data))
      .catch(() => notify("danger", "Could not load books. Is JSON Server running on port 3001?"))
      .finally(() => setLoading(false));
  }, []);

  // POST or PUT depending on whether we are adding or editing
  const handleSave = async (data) => {
    try {
      if (editing) {
        const res = await api.updateBook(editing.id, data);
        setBooks(books.map((b) => (b.id === editing.id ? res.data : b)));
        notify("success", `"${res.data.title}" was updated.`);
      } else {
        const res = await api.addBook(data);
        setBooks([...books, res.data]);
        notify("success", `"${res.data.title}" was added.`);
      }
      setShowForm(false);
    } catch {
      notify("danger", "Could not save the book. Please try again.");
    }
  };

  // PATCH - only changes the 'available' field
  const handleToggle = async (book) => {
    try {
      const res = await api.setAvailability(book.id, !book.available);
      setBooks(books.map((b) => (b.id === book.id ? res.data : b)));
      notify("success", `"${book.title}" marked ${res.data.available ? "in stock" : "out of stock"}.`);
    } catch {
      notify("danger", "Could not update availability.");
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      await api.deleteBook(toDelete.id);
      setBooks(books.filter((b) => b.id !== toDelete.id));
      notify("success", `"${toDelete.title}" was deleted.`);
    } catch {
      notify("danger", "Could not delete the book.");
    }
    setToDelete(null);
  };

  const openAdd = () => { setEditing(null); setShowForm(true); };
  const openEdit = (book) => { setEditing(book); setShowForm(true); };

  const q = search.toLowerCase();
  const visible = books.filter((b) =>
    [b.title, b.author, b.category].some((f) => f.toLowerCase().includes(q))
  );

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <FaBookOpen /> Book Store Management
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="pb-5">
        {msg && <Alert variant={msg.variant} dismissible onClose={() => setMsg(null)}>{msg.text}</Alert>}

        <Row className="g-2 mb-4">
          <Col xs={12} md={8}>
            <InputGroup>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control placeholder="Search by title, author or category" value={search}
                onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
          </Col>
          <Col xs={12} md={4} className="text-md-end">
            <Button variant="success" onClick={openAdd}><FaPlus className="me-2" />Add book</Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5"><Spinner animation="border" /></div>
        ) : visible.length === 0 ? (
          <p className="text-center text-muted py-5">No books found. Add one to get started.</p>
        ) : (
          <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
            {visible.map((book) => (
              <Col key={book.id}>
                <BookCard book={book} onEdit={openEdit} onDelete={setToDelete} onToggle={handleToggle} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <BookForm show={showForm} book={editing} onSave={handleSave} onClose={() => setShowForm(false)} />

      <Modal show={!!toDelete} onHide={() => setToDelete(null)} centered>
        <Modal.Header closeButton><Modal.Title>Delete book</Modal.Title></Modal.Header>
        <Modal.Body>Delete "{toDelete?.title}"? This cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setToDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
