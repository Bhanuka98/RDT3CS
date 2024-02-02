// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://reqres.in/api/users';

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}?page=1`);
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users View</h1>
      {users.map((user) => (
        <Link to={`/user/${user.id}`} key={user.id}>
          <div>
            <img src={user.avatar} alt={`User ${user.id} Avatar`} />
            <p>{user.first_name} {user.last_name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const UserInfoView = ({ match }) => {
  const userId = match.params.id;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div>
      <h1>User Information View</h1>
      {userInfo && (
        <div>
          <img src={userInfo.avatar} alt={`User ${userInfo.id} Avatar`} />
          <p>{userInfo.first_name} {userInfo.last_name}</p>
          <p>Email: {userInfo.email}</p>
          <Link to="/">Back</Link>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UsersView} />
        <Route path="/user/:id" component={UserInfoView} />
      </Switch>
    </Router>
  );
};

export default App;
