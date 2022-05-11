import { useState } from 'react';
import PropTypes from 'prop-types'
const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [hide, setHide] = useState(false);
  const blogStyle = {
    paddingLeft: 22,
    paddingBottom: 5,
    border: 'solid black 1px',
    marginBottom: 5,
  };

  const handleClickLike = () => {
    handleLikes(blog.id, { ...blog, likes: blog.likes + 1 });
  };

  const handleClickDelete = () => {
    if (window.confirm(`sure u wanna delete ${blog.title}?`) == true) {
      console.log('You pressed OK!');
      console.log(blog);
      handleDelete(blog.id, blog);
    }
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
          <button onClick={handleClickLike}>like</button>
        </p>
        <button onClick={handleClickDelete}>delete</button>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}


export default Blog;
