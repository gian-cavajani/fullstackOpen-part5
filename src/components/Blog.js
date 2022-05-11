import { useState } from 'react';
const Blog = ({ blog }) => {
  const [hide, setHide] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  // const showWhenVisible = { display: visible ? '' : 'none' };

  if (hide) {
    return (
      <div style={blogStyle}>
        <strong>{blog.title}</strong>
        <button onClick={() => setHide(false)}>close</button>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>
          likes:
          {blog.likes}
          <button>like</button>
        </p>
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      <p>
        <strong>{blog.title}</strong>{' '}
        <button onClick={() => setHide(true)}>show</button>
      </p>
    </div>
  );
};

export default Blog;
