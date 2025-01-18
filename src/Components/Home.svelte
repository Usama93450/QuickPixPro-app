<script>
  import { navigate } from "svelte-routing";

  let isModalOpen = false;
</script>

<style>
  /* General Styling */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* Hero Section */
  .hero {
    background-color: #f1f6fc;
    color: #0077b6;
    padding: 50px 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
    transition: background-color 0.3s ease-in-out;
  }

  .hero h1 {
    font-size: 48px;
    margin: 0;
    font-weight: 700;
  }

  .hero p {
    font-size: 20px;
    margin: 20px 0;
    line-height: 1.5;
  }

  .hero button {
    background-color: #0077b6;
    color: white;
    padding: 15px 30px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .hero button:hover {
    background-color: #005f8a;
  }

  /* Brands Section */
  .brands {
    width: 100%;
    background-color: #ffffff;
    padding: 50px 20px;
  }

  .brands h2 {
    font-size: 36px;
    margin-bottom: 30px;
    color: #0077b6;
  }

  .brands p {
    font-size: 18px;
    color: #0077b6;
    margin-bottom: 40px;
  }

  .brands-logos {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .brands-logo {
    max-width: 100px;
    margin: 10px;
    transition: transform 0.3s ease-in-out;
  }

  .brands-logo img {
    width: 100%;
    max-width: 100px;
  }

  .brands-logo:hover {
    transform: scale(1.1);
  }

  /* Teams Section */
  .teams {
    background-color: #f1f6fc;
    width: 100%;
    padding: 50px 20px;
    text-align: center;
  }

  .teams h2 {
    font-size: 36px;
    margin-bottom: 30px;
    color: #0077b6;
  }

  .teams p {
    font-size: 18px;
    color: #0077b6;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .teams button {
    background-color: #0077b6;
    color: white;
    padding: 15px 30px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .teams button:hover {
    background-color: #005f8a;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 32px;
    }

    .hero p {
      font-size: 18px;
    }

    .brands h2,
    .teams h2 {
      font-size: 28px;
    }

    .brands p,
    .teams p {
      font-size: 16px;
    }

    .brands-logo {
      max-width: 80px;
    }

    .hero button,
    .teams button {
      padding: 12px 25px;
      font-size: 14px;
    }
  }
</style>

<!-- Home UI Structure -->
<div class="container">
  <!-- Hero Section -->
  <section class="hero">
      <h1>Welcome to QuickPixPro</h1>
      <p>Create stunning, professional images with ease. Fast, simple, and powerful tools at your fingertips.</p>
      <button on:click={() => navigate('/login')}>Get Started</button>
  </section>

  <!-- Brands Section -->
  <section class="brands">
      <h2>Trusted by the Best</h2>
      <p>QuickPixPro is used by top brands around the world to elevate their visual content.</p>
      <div class="brands-logos">
          <div class="brands-logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7BdDltvHM_FR_eudml8AgukJ3XPYFxlkRog&s" alt="Brand 1"></div>
          <div class="brands-logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKWW0BdV2kJicYJ4i00_PY9QstjrlUlb9Sg&s" alt="Brand 2"></div>
          <div class="brands-logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjbPxlEBWWULnmSw9dl5vY7fzqxlP0pn4I1w&s" alt="Brand 3"></div>
          <div class="brands-logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZXKOB4g6HDIWyDvSsBeAUtHW8f3SLy6Z_A&s" alt="Brand 4"></div>
      </div>
  </section>

  <!-- Teams Section -->
  <section class="teams">
      <h2>QuickPixPro Teams</h2>
      <p>Collaborate with your team to create stunning images effortlessly. Work together in real-time, from anywhere.</p>
      <button on:click={() => navigate('/about')}>Learn More About Teams</button>
  </section>

  <!-- Modal (Optional for Image Upload or Action) -->
  
</div>
