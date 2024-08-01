document.addEventListener('DOMContentLoaded', () => {
  // Function to handle login form submission
  const loginFormHandler = async (event) => {
    event.preventDefault();

    // Get form data
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Validate form data
    if (username && password) {
      try {
        // Send login request
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        // Check response status
        if (response.ok) {
          // Redirect to homepage
          document.location.replace('/');
        } else {
          // Parse and display error message
          const errorData = await response.json();
          alert('Login failed: ' + (errorData.message || response.statusText));
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    } else {
      alert('Please enter both username and password.');
    }
  };

  // Attach event listener to login form if present
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }
});
