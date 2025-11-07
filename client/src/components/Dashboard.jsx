import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from './Navbar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', getAuthHeaders());
      setTasks(response.data);
    } catch (err) {
      toast.error('Failed to fetch tasks');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/tasks/${editingId}`, formData, getAuthHeaders());
        toast.success('Task updated successfully!');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/tasks', formData, getAuthHeaders());
        toast.success('Task created successfully!');
      }

      setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save task');
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
    });
    setEditingId(task._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, getAuthHeaders());
        toast.success('Task deleted successfully!');
        fetchTasks();
      } catch (err) {
        toast.error('Failed to delete task');
        console.error(err);
      }
    }
  };

  const exportToCSV = () => {
    if (filteredTasks.length === 0) {
      toast.error('No tasks to export');
      return;
    }

    const csvContent = [
      ['Title', 'Description', 'Status', 'Priority', 'Created At'],
      ...filteredTasks.map(task => [
        task.title,
        task.description || '',
        task.status,
        task.priority,
        new Date(task.createdAt).toLocaleDateString(),
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Tasks exported successfully!');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) 
    : 0;

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Task Dashboard</h2>
          <p>Manage your tasks efficiently</p>
        </div>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-card stat-total">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{tasks.length}</h3>
              <p>Total Tasks</p>
            </div>
          </div>
          
          <div className="stat-card stat-pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{tasks.filter(t => t.status === 'pending').length}</h3>
              <p>Pending</p>
            </div>
          </div>
          
          <div className="stat-card stat-progress">
            <div className="stat-icon">🚧</div>
            <div className="stat-info">
              <h3>{tasks.filter(t => t.status === 'in-progress').length}</h3>
              <p>In Progress</p>
            </div>
          </div>
          
          <div className="stat-card stat-completed">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{tasks.filter(t => t.status === 'completed').length}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <h3>Overall Completion</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${completionRate}%` }}>
              {completionRate}%
            </div>
          </div>
        </div>

        {/* Task Form */}
        <div className="task-form">
          <h3>{editingId ? 'Edit Task' : 'Add New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Task title"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Task description"
                />
              </div>

              <div className="form-group">
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Add Task'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn btn-secondary"
                    style={{ marginTop: '5px' }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Tasks List */}
        <div className="tasks-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
            <h3 style={{ margin: 0 }}>Tasks List ({filteredTasks.length})</h3>
            <button onClick={exportToCSV} className="btn btn-success btn-sm">
              📥 Export CSV
            </button>
          </div>

          <div className="task-filters">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="tasks-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <p>📋 No tasks found</p>
                <span>
                  {tasks.length === 0 
                    ? 'Create your first task to get started!' 
                    : 'Try adjusting your search or filters'}
                </span>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className={`task-item ${task.status}`}>
                  <div className="task-header">
                    <div>
                      <div className="task-title">{task.title}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <span className={`task-status ${task.status}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className={`task-priority ${task.priority}`}>
                          {task.priority === 'high' && '🔴 '}
                          {task.priority === 'medium' && '🟡 '}
                          {task.priority === 'low' && '🟢 '}
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)} className="btn btn-secondary btn-sm">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="btn btn-danger btn-sm">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
