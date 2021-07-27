const newCommentHandler = async (event) => {
    event.preventDefault();
  

    const text = document.querySelector('#comment-text').value.trim();

  
    if ( text ) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ text }),
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
  
  const delHandler = async (event) => {
    if (event.target.hasAttribute('com-id')) {
      const id = event.target.getAttribute('com-id');
  
      const response = await fetch(`/api/comment/${id}`, {
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
  
  // document
  //   .querySelector('.com-list')
  //   .addEventListener('click', delHandler);
  