import { Routes, Route } from "react-router-dom";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import Signup from "./Signup";
import Login from "./Login";
import LandingPage from "./LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import AddCourse from "./AddCourse";

function App() {
    return (
        <div className="container"> 

            <Routes>


                   <Route path="/" element={<LandingPage />} />

              

                <Route path="/signup" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
                
                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <StudentList />
                        </ProtectedRoute>
                    }
                />
                 <Route
                    path="/courses/add"
                    element={
                        <ProtectedRoute>
                            <AddCourse  />
                        </ProtectedRoute>
                    }
                />

             <Route
                    path="/students/add"
                    element={
                        <ProtectedRoute>
                            <AddStudent />
                        </ProtectedRoute>
                    }
                />


                 <Route
                    path="/students/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditStudent />
                        </ProtectedRoute>
                    }
                />

 
            </Routes>
        </div>
    );
}

export default App;