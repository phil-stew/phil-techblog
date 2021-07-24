const createPost = async (event) => {
    console.log("fired")
    console.log(event)
    console.log('createPost')
    event.preventDefault();
  
    const newTitle = document.querySelector('#post-title').value;
    const newPost = document.querySelector('#contentNew').value;
    if (newTitle && newPost) {
      const response = await fetch('/api/blog/create', {
  
        method: 'POST',
        body: JSON.stringify({
          title: newTitle,
          content: newPost
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/blog')
  
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector('#createBtn')
    .addEventListener('click', createPost)