import { useEffect, useState } from "react";

function App() {
 
   
   const [students, setStudents] = useState([]);

    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/students")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            });

    }, []);

   return (
        <div>
            <h1>Student Management</h1>

            <h2>Students</h2>

            {students.map(student => (
                <div key={student.id}>
                    <p>
                        {student.first_name} {student.last_name}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default App;