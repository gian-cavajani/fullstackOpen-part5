import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';
import loginService from './services/login';
import axios from 'axios';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ code: null, message: null });
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sendMessage = (p1, p2) => {
    if (p1 === 'ok') {
      setMessage({ code: 'ok', message: p2 });
    } else {
      setMessage({ code: 'error', message: p2 });
    }
    setTimeout(() => {
      setMessage({ code: null, message: null });
    }, 3000);
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      console.log(user);
      window.localStorage.setItem('blogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
      sendMessage('ok', 'login succesful');
    } catch (error) {
      sendMessage('error', error.response.data.error);
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to app</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="">username: </label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="">password: </label>
          <input
            type="password"
            value={password}
            name="Username"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const handleSubmitBlog = async (newBlog) => {
    try {
      const res = await blogService.create(newBlog);
      setBlogs(blogs.concat(res));
      sendMessage(
        'ok',
        `a new blog ${newBlog.title} by ${newBlog.author} created`
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
      sendMessage('error', error.response.data.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('blogUser');
    setUser(null);
  };

  const handleLikes = async (id, obj) => {
    try {
      const res = await blogService.modify(id, obj);
      setBlogs(blogs.map((b) => (b.id !== id ? b : res)));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  blogs.sort((a, b) => {
    return a.likes > b.likes ? -1 : 1;
  });
  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            user logged in:{' '}
            <strong>
              {user.username}{' '}
              <button onClick={() => handleLogout()}>logout</button>
            </strong>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleNewBlog={handleSubmitBlog} />
          </Togglable>
          <hr />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
