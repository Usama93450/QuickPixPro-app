<script>
    import { isLoggedIn } from "./store";
  import { navigate, Link } from "svelte-routing";
  import axios from "axios";

  let name = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit() {
    try {
        const response = await axios.post("http://127.0.0.1:5000/login_user", {
            username: name,
            password: password,
        });

        if (response.status === 200 && response.data.success) {
          isLoggedIn.set(true); // Mark user as logged in
          navigate("/backremover"); // Redirect to homepage
        } else {
            alert(response.data.message || "Invalid username or password");
        }
    } catch (error) {
        if (error.response) {
            // Handle specific status codes
            alert(error.response.data.message || "An error occurred during login!");
        } else {
            alert("Network error. Please try again!");
        }
    }
}
</script>

<div class="signup-container">
  <form on:submit|preventDefault={handleSubmit}>
    <h1>Log In</h1>

    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}

    <label>
      Email:
      <input type="text" bind:value={name} placeholder="Enter your Email" />
    </label>

    <label>
      Password:
      <input
        type="password"
        bind:value={password}
        placeholder="Enter your password"
      />
    </label>

    <button type="submit">Log In</button>

    <p class="divider">OR</p>

   
    <p class="login-link">
      Not a Member? <Link to="/signup">Sign Up</Link>
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
