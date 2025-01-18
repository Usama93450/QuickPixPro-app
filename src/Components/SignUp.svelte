<script>
  import { Link, navigate } from "svelte-routing";
  import axios from "axios";

  let name = '';
  let email = '';
  let password = '';
  let repeatPassword = '';

  async function handleSubmit() {
    // Validate input fields
    if (!name.trim()) {
      alert('Name is required.');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password !== repeatPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      // Send registration data to the backend
      const response = await axios.post('http://localhost:5000/register_user', {
        name,
        email,
        password
      });

      if (response.status === 201 && response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        // Handle specific error messages from the backend
        alert(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        console.error(error);
        alert('An unexpected error occurred.');
      }
    }
  }
</script>

<div class="signup-container">
  <form on:submit|preventDefault={handleSubmit}>
    <h1>Sign Up</h1>

    <label>
      Name:
      <input type="text" bind:value={name} placeholder="Enter your name" />
    </label>

    <label>
      Email:
      <input type="email" bind:value={email} placeholder="Enter your email" />
    </label>

    <label>
      Password:
      <input type="password" bind:value={password} placeholder="Enter your password" />
    </label>

    <label>
      Repeat Password:
      <input type="password" bind:value={repeatPassword} placeholder="Repeat your password" />
    </label>

    <button type="submit">Sign Up</button>
    <p class="divider">OR</p>
    <div class="social-buttons">
      <!-- <button type="button" class="google-btn">Continue with Google</button> -->
    </div>

   

    <p class="login-link">
      Already a member?
      <Link to="/login">Log In</Link>
    </p>
  </form>
</div>
<style>
  h1 {
    text-align: center;
    font-size: 2rem;
    font-family: 'Arial', sans-serif;
    color: #333;
    margin-bottom: 20px;
    position: relative;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  h1::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #007bff;
    margin: 10px auto 0 auto;
    border-radius: 2px;
  }

  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: aliceblue;
    padding: 20px;
  }
  .social-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  

  form {
    max-width: 600px;
    width: 100%;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  h1 {
    text-align: center;
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
    font-family: 'Arial', sans-serif;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 15px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: 'Arial', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    outline: none;
  }

  input::placeholder {
    color: #aaa;
    font-style: italic;
  }

  button {
    width: 100%;
    padding: 12px;
    margin-top: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  button:active {
    transform: translateY(0);
  }

  .divider {
    text-align: center;
    margin: 15px 0;
    font-size: 0.9rem;
    color: #aaa;
  }

  .login-link {
    text-align: center;
    margin-top: 15px;
    font-size: 0.9rem;
    color: #555;
  }

  @media (max-width: 600px) {
    form {
      width: 100%;
      margin: 0 10px;
    }
  }
</style>
