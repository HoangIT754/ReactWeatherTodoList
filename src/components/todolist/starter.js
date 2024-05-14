import React, { useState, useEffect } from 'react';
import { List, Input, Button, Card, Modal } from 'antd';

function ToDoList() {
    // State variables
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    // Load tasks from local storage on component mount
    useEffect(() => {

    }, []);

    // Add a new task
    const addTask = () => {

    };

    // Clear all tasks
    const clearAll = () => {

    };

    // Remove a task by index
    const removeTask = (index) => {

    };

    // Toggle task completion status
    const toggleTaskCompleted = (index) => {

    };

    // View task details
    const viewTaskDetails = (task) => {
        setSelectedTask(task);
    };

    // Close task details modal
    const closeTaskDetails = () => {
        setSelectedTask(null);
    };

    // Render component
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
                {/* Input fields for title and description */}
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
                {/* Buttons for adding a task and clearing all tasks */}
                <Button type="primary" onClick={addTask}>
                    Add Task
                </Button>
                <Button type="primary" style={{ marginLeft: '5px' }} onClick={clearAll}>
                    Clear all
                </Button>
                {/* List of tasks */}
                <List
                    bordered
                    dataSource={tasks}
                    style={{ marginTop: '15px' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                // Buttons for deleting, toggling completion, and viewing details of a task
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
                            {/* Task display */}
                            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                                {index + 1}. {item.title} - {item.description}
                            </span>
                        </List.Item>
                    )}
                />
            </div>
            {/* Modal for displaying task details */}
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
