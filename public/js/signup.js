document.addEventListener('DOMContentLoaded', () => {
    // Function to handle signup form submission
    const signupFormHandler = async (event) => {
      event.preventDefault();
  
      const username = document.querySelector('#username-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
  
      if (username && password) {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Signup failed: ' + response.statusText);
        }
      }
    };
  
    // Attach event listener if form is present
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', signupFormHandler);
    }
  });
  