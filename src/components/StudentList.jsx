
import "./StudentList.css";

function StudentList({ students, onDelete, deletingId }) {
  return (
    <section className="student-container">
      <div className="list-header">
        <h2>Student List</h2>
        <span className="student-count">
          Total Students: {students.length}
        </span>
      </div>

      {students.length === 0 ? (
        <p className="empty-message">
          No student records available.
        </p>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.address.city}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => onDelete(student.id)}
                      disabled={deletingId === student.id}
                    >
                      {deletingId === student.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default StudentList;
