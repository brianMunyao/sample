import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import TodoItem from '../components/TodoItem';
import '../styles/MiniToDoApp.css';

const MiniToDoApp = () => {
	const [newTodo, setNewTodo] = useState('');
	const [inputActive, setInputActive] = useState(false);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const tempTodos = JSON.parse(localStorage.getItem('todos'));
		if (tempTodos === null) return setTodos([]);
		setTodos(tempTodos);
	}, []);

	//add new methods
	const addNewTodo = (e) => {
		if (e.key === 'Enter' && newTodo.trim() !== '') {
			const tempTodos = [...todos];
			tempTodos.reverse().push({
				id: tempTodos.length,
				done: false,
				task: newTodo.trim(),
			});
			setNewTodo('');
			saveTodos(tempTodos);
		}
	};
	const saveTodos = (arr) => {
		arr.reverse();
		setTodos(arr);
		localStorage.setItem('todos', JSON.stringify(arr));
	};

	const handleNewTodoChange = (e) => {
		setNewTodo(e.target.value);
	};
	const inputFocus = () => setInputActive(true);
	const inputBlur = () => setInputActive(false);

	//to-do methods
	const deleteTodo = (id) => {
		let tempTodos = todos.filter((todo) => todo.id !== id);
		tempTodos.reverse();
		for (let i = 0; i < tempTodos.length; i++) {
			tempTodos[i].id = i;
		}
		saveTodos(tempTodos);
	};
	const checkTodo = (id) => {
		const tempTodos = [...todos];
		tempTodos.reverse();
		let tempIndex = tempTodos.findIndex((obj) => obj.id === id);
		tempTodos[tempIndex].done = !tempTodos[tempIndex].done;
		saveTodos(tempTodos);
	};

	const inputStyle = !inputActive
		? { border: '2px solid rgb(230, 230, 230)' }
		: { border: '2px solid #004d80c5' };

	const plusIcon = !inputActive
		? { color: 'rgb(168, 168, 168)' }
		: { color: '#004d80c5' };

	return (
		<div className="todo-container">
			<div className="todo-inner">
				<p className="todo-logo"> TODOZONE </p>
				<div className="todo-input-container" style={inputStyle}>
					<FaPlus style={plusIcon} />
					<input
						type="text"
						value={newTodo}
						onFocus={inputFocus}
						onBlur={inputBlur}
						onChange={handleNewTodoChange}
						onKeyPress={addNewTodo}
						placeholder="Add new Todo"
					/>
				</div>
				<div className="todo-list">
					{todos.map((item) => (
						<TodoItem
							item={item}
							key={item.id}
							deleteTodo={deleteTodo}
							checkTodo={checkTodo}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default MiniToDoApp;
