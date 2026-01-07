import React, { useContext, useState } from 'react';
import { AuthContext } from "../../../context/AuthProvider.jsx";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (!taskTitle || !assignTo || !taskDate) {
      alert('Please fill all required fields');
      return;
    }

    const task = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const updatedData = userData.map((emp) => {
      if (emp.email.toLowerCase() === assignTo.trim().toLowerCase()) {
        return {
          ...emp,
          tasks: [...(emp.tasks || []), task],
          taskCounts: {
            ...emp.taskCounts,
            newTask: (emp.taskCounts?.newTask || 0) + 1,
          },
        };
      }
      return emp;
    });

    setUserData(updatedData);

    // reset form
    setTaskTitle('');
    setCategory('');
    setAssignTo('');
    setTaskDate('');
    setTaskDescription('');
  };

  return (
    <div className='p-5 bg-[#053987] mt-5 rounded-2xl shadow-[10px_8px_20px_rgba(0,0,0,0.25)]'>
      <form
        onSubmit={submitHandler}
        className='flex flex-wrap w-full items-start justify-between'
      >
        <div className='w-1/2 gap-3'>
          <div>
            <h3 className='text-lg text-gray-300 mb-2'>Task Title:</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className='text-medium py-1 px-2 w-4/5 rounded bg-transparent border'
              type='text'
            />
          </div>
          <div>
            <h3 className='text-lg text-gray-300 mb-2'>Date:</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className='text-medium py-1 px-2 w-4/5 rounded bg-transparent border'
              type='date'
            />
          </div>
          <div>
            <h3 className='text-lg text-gray-300 mb-2'>Assign to (email):</h3>
            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className='text-medium py-1 px-2 w-4/5 rounded bg-transparent border'
              type='text'
            />
          </div>
          <div>
            <h3 className='text-lg text-gray-300 mb-2'>Category:</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='text-medium py-1 px-2 w-4/5 rounded bg-transparent border'
              type='text'
            />
          </div>
        </div>

        <div className='w-2/5'>
          <h3 className='text-lg text-gray-300 mb-2'>Description:</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className='w-full h-44 text-sm p-2 rounded bg-transparent border'
          />
          <button
            type='submit'
            className='bg-blue-400 mt-4 w-full py-2 rounded'
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
