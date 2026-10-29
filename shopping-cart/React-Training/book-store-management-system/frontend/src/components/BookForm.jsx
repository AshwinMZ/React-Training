import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EMPTY = { title: "", author: "", price: "", category: "", description: "", image: "", available: true };

export default function BookForm({ show, book, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  // Fill the form when editing, clear it when adding
  useEffect(() => {
    setForm(book ? { ...book } : EMPTY);
    setErrors({});
  }, [book, show]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.author.trim()) e.author = "Author is required.";
    if (form.price === "" || Number(form.price) <= 0) e.price = "Enter a price greater than 0.";
    if (!form.category.trim()) e.category = "Category is required.";
    if (form.description.trim().length < 10) e.description = "Description must be at least 10 characters.";
    if (form.image && !/^https?:\/\//.test(form.image)) e.image = "Image must be a valid http(s) URL.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) onSave({ ...form, price: Number(form.price) });
  };

  const field = (name, label, props = {}) => (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} value={form[name]} onChange={change} isInvalid={!!errors[name]} {...props} />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={submit} noValidate>
        <Modal.Header closeButton><Modal.Title>{book ? "Edit book" : "Add book"}</Modal.Title></Modal.Header>
        <Modal.Body>
          {field("title", "Title")}
          {field("author", "Author")}
          {field("price", "Price ($)", { type: "number", step: "0.01" })}
          {field("category", "Category")}
          {field("description", "Description", { as: "textarea", rows: 3 })}
          {field("image", "Cover image URL", { placeholder: "https://covers.openlibrary.org/b/isbn/ISBN-L.jpg" })}
          <Form.Check type="switch" name="available" label="Available in stock" checked={form.available} onChange={change} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">{book ? "Save changes" : "Add book"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
