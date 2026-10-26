
import { useEffect, useState } from "react";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");
    setDeletingId(id);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      // Remove the selected student from the displayed list.
      setStudents((previousStudents) =>
        previousStudents.filter((student) => student.id !== id)
      );

      setMessage("Student deleted successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Management System</h1>
        <p>View and manage student records</p>
      </header>

      <main className="main-content">
        {message && (
          <p className="success-message">{message}</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {loading ? (
          <p className="loading">Loading students...</p>
        ) : (
          <StudentList
            students={students}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </main>
    </div>
  );
}

export default App;
