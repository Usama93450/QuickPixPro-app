<script>
  import CustomDropDown from './CustomDropDown.svelte';
  import { Router, Link } from 'svelte-routing';
  import { onMount } from 'svelte';
 
  let isMenuOpen = false;
  let windowWidth = window.innerWidth;
 
  const updateWindowWidth = () => {
     windowWidth = window.innerWidth;
     if (windowWidth > 768) {
        isMenuOpen = false; // Close menu on desktop
     }
  };
 
  onMount(() => {
     window.addEventListener('resize', updateWindowWidth);
     return () => {
        window.removeEventListener('resize', updateWindowWidth);
     };
  });
</script>

<header class="header">
  <!-- Mobile Menu Toggle -->
  <button class="menu-toggle" on:click={() => (isMenuOpen = !isMenuOpen)}>
     ☰
  </button>

  <!-- Desktop Navigation -->
  <Router>
     <nav class="nav">
        <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/about">About Us</Link></li>
           <li><Link to="/contact">Contact Us</Link></li>
           <li><Link to="/feature">Features</Link><CustomDropDown/></li>
        </ul>
     </nav>

     <nav class="nav-credentials">
        <ul>
           <li><Link to="/login">Log In</Link></li>
           <li class="signup"><Link to="/signup">Sign Up</Link></li>
        </ul>
     </nav>
  </Router>

  <!-- Mobile Navigation -->
  {#if isMenuOpen}
     <div class="mobile-nav show">
        <Router>
           <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/feature">Features</Link><CustomDropDown/></li>
              <li><Link to="/login">Log In</Link></li>
              <li class="signup"><Link to="/signup">Sign Up</Link></li>
           </ul>
        </Router>
        <button class="close-btn" on:click={() => (isMenuOpen = false)}>
           <span class="close-icon">&times;</span>
        </button>
     </div>
  {/if}
</header>

<style>
  /* Global Styles */
  * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
  }

 

  .header {
     background-color: #f0f8ff; /* AliceBlue */
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 1rem 2rem;
     position: relative;
     transition: background-color 0.3s ease;
  }

  .header:hover {
     background-color: #e0efff; /* Slightly darker AliceBlue */
  }

  /* Desktop Navigation */
  .nav ul,
  .nav-credentials ul {
     list-style: none;
     display: flex;
     gap: 2rem;
     margin: 0;
     padding: 0;
  }

  .nav ul li,
  .nav-credentials ul li {
     position: relative;
     text-decoration: none;
     font-size: 1rem;
     font-weight: 500;
  }

 

  /* Menu Toggle (Mobile) */
  .menu-toggle {
     display: none;
     background: none;
     border: none;
     font-size: 2rem;
     cursor: pointer;
     transition: transform 0.3s ease;
  }

  .menu-toggle:hover {
     transform: rotate(90deg);
  }

  /* Mobile Navigation */
  .mobile-nav {
     background-color: rgba(0, 0, 0, 0.8); /* Dark background for contrast */
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     gap: 2rem;
     opacity: 0;
     visibility: hidden;
     transition: opacity 0.3s ease, visibility 0.3s ease;
     z-index: 9999;
  }

  .mobile-nav.show {
     opacity: 1;
     visibility: visible;
  }

  .mobile-nav ul {
     list-style: none;
     display: flex;
     flex-direction: column;
     gap: 1rem;
     padding: 0;
     text-align: center;
  }


  /* Close Button Styling */
  .close-btn {
     position: absolute;
     top: 2rem;
     right: 2rem;
     background: none;
     border: none;
     font-size: 2rem;
     cursor: pointer;
     color: #fff;
     transition: transform 0.3s ease;
  }

  .close-btn:hover {
     transform: scale(1.2);
  }

  .close-icon {
     font-size: 2rem;
     color: #fff;
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
     .menu-toggle {
        display: block;
     }

     .nav,
     .nav-credentials {
        display: none;
     }

     .mobile-nav {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
     }

     .mobile-nav.show {
        opacity: 1;
        visibility: visible;
     }

     .nav ul li,
     .nav-credentials ul li {
        font-size: 1rem;
     }
  }

  /* Desktop Navigation Styling */
  @media (min-width: 769px) {

  }
</style>
