const newCommentHandler = async (event) => {
    event.preventDefault();
  

    const text = document.querySelector('#comment-text').value.trim();

  
    if ( text ) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/viewblog');
      } else {
        alert('Failed to create ');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api//${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/viewblog');
      } else {
        alert('Failed to delete ');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);
  
  document
    .querySelector('.-list')
    .addEventListener('click', delButtonHandler);
  