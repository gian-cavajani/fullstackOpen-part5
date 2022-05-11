import { useState } from 'react';
const Blog = ({ blog, handleLikes }) => {
  const [hide, setHide] = useState(false);
  const blogStyle = {
    paddingLeft: 22,
    border: 'solid black 1px',
    marginBottom: 5,
  };

  const handleClick = () => {
    handleLikes(blog.id, { ...blog, likes: blog.likes + 1 });
  };

  if (hide) {
    blogStyle.border = 'dashed red 1px';
    return (
      <div style={blogStyle}>
        <p>
          <strong>{blog.title}</strong>
          <button onClick={() => setHide(false)}>close</button>
        </p>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>
          likes:
          {blog.likes}
          <button onClick={handleClick}>like</button>
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
