import axios from 'axios';
import { useState, useEffect } from 'react';

import Blog from './components/Blog';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

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
    } catch (error) {
      console.log('wrong credentials');
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

  const handleSubmitBlog = async (ev) => {
    ev.preventDefault();
    try {
      const res = await blogService.create(newBlog);
      console.log(res);
      setBlogs(blogs.concat(res));
      setNewBlog({ title: '', author: '', url: '' });
    } catch (error) {
      console.log({ error });
    }
  };

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmitBlog}>
        <div>
          <label htmlFor="">title</label>
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                title: target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="">author</label>
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                author: target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="">url</label>
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                url: target.value,
              })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('blogUser');
    setUser(null);
  };

  return (
    <div>
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
          {blogForm()}
          <hr />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
