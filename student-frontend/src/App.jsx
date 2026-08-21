import { Routes, Route } from "react-router-dom";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import Signup from "./Signup";
import Login from "./Login";
import LandingPage from "./LandingPage";

function App() {
    return (
        <div className="container"> 

            <Routes>


                   <Route path="/" element={<LandingPage />} />

                {/* Student List */}
                <Route path="/students" element={<StudentList />} />

                {/* Add Student */}
                <Route path="/students/add" element={<AddStudent />} />

                {/* Edit Student */}
                <Route path="/students/edit/:id" element={<EditStudent />} />

                <Route path="/signup" element={<Signup />}/>
                <Route
                path="/login"
                element={<Login />}
            />

             
 
            </Routes>
        </div>
    );
}

export default App;