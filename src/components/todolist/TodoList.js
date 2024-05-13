import React, { useState, useEffect } from 'react';
import { List, Input, Button, Card, Modal } from 'antd';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    const addTask = () => {
        if (title.trim() === '' || description.trim() === '') return;
        const newTasks = [...tasks, { title: title, description: description, completed: false }];
        setTasks(newTasks);
        setTitle('');
        setDescription('');
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const clearAll = () => {
        setTasks([]);
        localStorage.removeItem('tasks');
    };

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const toggleTaskCompleted = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const viewTaskDetails = (task) => {
        setSelectedTask(task);
    };

    const closeTaskDetails = () => {
        setSelectedTask(null);
    };

    return (
        <Card
            title="Todo List"
            bordered={true}
            style={{
                width: 550,
                margin: '0 auto',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="todo-app">
                <div className="input-container">
                    <Input
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <Button type="primary" onClick={addTask}>
                    Add Task
                </Button>
                <Button type="primary" style={{ marginLeft: '5px' }} onClick={clearAll}>
                    Clear all
                </Button>
                <List
                    bordered
                    dataSource={tasks}
                    style={{ marginTop: '15px' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Button
                                    type="primary"
                                    style={{ marginTop: '-5px' }}
                                    danger
                                    onClick={() => removeTask(index)}
                                >
                                    Delete
                                </Button>,
                                <Button
                                    type="primary"
                                    style={{ marginTop: '-5px' }}
                                    onClick={() => toggleTaskCompleted(index)}
                                >
                                    {item.completed ? 'Undo' : 'Check Done'}
                                </Button>,
                                <Button
                                    type="primary"
                                    style={{ marginTop: '-5px' }}
                                    onClick={() => viewTaskDetails(item)}
                                >
                                    View Details
                                </Button>,
                            ]}
                        >
                            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                                {index + 1}. {item.title} - {item.description}
                            </span>
                        </List.Item>
                    )}
                />
            </div>
            <Modal
                title="Task Details"
                visible={selectedTask !== null}
                onCancel={closeTaskDetails}
                footer={null}
            >
                {selectedTask && (
                    <div>
                        <p><strong>Title:</strong> {selectedTask.title}</p>
                        <p><strong>Description:</strong> {selectedTask.description}</p>
                    </div>
                )}
            </Modal>
        </Card>
    );
}

export default ToDoList;
