import { Routes, Route } from "react-router-dom";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";

function App() {
    return (
        <div className="container">
            <h1>Student Management</h1>

            <Routes>
                {/* Student List */}
                <Route path="/" element={<StudentList />} />

                {/* Add Student */}
                <Route path="/students/add" element={<AddStudent />} />

                {/* Edit Student */}
                <Route path="/students/edit/:id" element={<EditStudent />} />
            </Routes>
        </div>
    );
}

export default App;