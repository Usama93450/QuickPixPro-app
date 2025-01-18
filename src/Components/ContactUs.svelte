<script>
    import axios from 'axios';

    let name = '';
    let email = '';
    let message = '';
    let isLoading = false;
    let errorMessage = '';

    async function handleSubmit() {
        errorMessage = ''; // Reset error message

        // Validate form inputs
        if (!name.trim()) {
            errorMessage = 'Name is required.';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            errorMessage = 'Please enter a valid email address.';
            return;
        }
        if (!message.trim()) {
            errorMessage = 'Message cannot be empty.';
            return;
        }

        // Prepare the payload
        const payload = { name: name.trim(), email: email.trim(), message: message.trim() };

        console.log("Payload being sent:", payload); // Debug log

        try {
            isLoading = true; // Indicate loading state

            // Send data to the backend
            const response = await axios.post('http://localhost:5000/contact', payload);

            if (response.status === 200 && response.data.success) {
                alert(response.data.message || 'Message sent successfully!');
                name = '';
                email = '';
                message = '';
            } else {
                throw new Error(response.data.message || 'Unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            errorMessage =
                error.response?.data?.message ||
                'An error occurred. Please check your connection and try again.';
        } finally {
            isLoading = false; // Reset loading state
        }
    }
</script>

<div class="contact-container">
    <form on:submit|preventDefault={handleSubmit}>
        <h1>Contact Us</h1>

        {#if errorMessage}
        <p class="error">{errorMessage}</p>
        {/if}

        <label>
            Name:
            <input type="text" bind:value={name} placeholder="Enter your name" required />
        </label>

        <label>
            Email:
            <input type="email" bind:value={email} placeholder="Enter your email" required />
        </label>

        <label>
            Message:
            <textarea
                bind:value={message}
                placeholder="Write your message here"
                rows="5"
                required
            ></textarea>
        </label>

        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
        </button>
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

    .contact-container {
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

    label {
        display: block;
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 5px;
        color: #333;
        font-family: 'Arial', sans-serif;
    }

    input, textarea {
        width: 100%;
        padding: 10px 12px;
        margin-bottom: 15px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-family: 'Arial', sans-serif;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus, textarea:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
        outline: none;
    }

    input::placeholder, textarea::placeholder {
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

    button:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }

    @media (max-width: 600px) {
        form {
            width: 100%;
            margin: 0 10px;
        }
    }
</style>
