import { useParams } from 'react-router-dom';
import items from '../data/studentsList.json';

const ViewStudent = () => {
  const { id } = useParams();
  const student = items.find(student => student.id === parseInt(id));

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div className="student-detail">
      <h2>Student Detail</h2>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Name:</strong> {student.title}</p>
      <p><strong>Age:</strong> {student.age}</p>
    </div>
  );
};

export default ViewStudent;