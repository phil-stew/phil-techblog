const newBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const text = document.querySelector('#blog-text').value.trim();

  
    if (title && text ) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert('Failed to create ');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert('Failed to delete ');
      }
    }
  };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newBlogHandler);
  
  document
    .querySelector('.-list')
    .addEventListener('click', delButtonHandler);
  