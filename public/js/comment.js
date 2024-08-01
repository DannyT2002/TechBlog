document.addEventListener('DOMContentLoaded', () => {
  const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    const post_id = window.location.toString().split('/').pop();

    if (content) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };

  const commentForm = document.querySelector('.comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', commentFormHandler);
  }
});
