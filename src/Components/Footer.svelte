<script>
  // No specific script for static content
</script>

<style>
  /* Add a dark AliceBlue line above the footer */
  .footer-line {
    width: 100%;
    height: 5px;
    background-color: rgb(227, 242, 255); /* Dark AliceBlue color */
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: aliceblue;
    color: #333;
    font-family: Arial, sans-serif;
    text-align: center;
  }

  .footer-section {
    width: 100%;
    margin-bottom: 30px;
  }

  /* Social Icons Section */
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 25px;
  }

  .social-icon {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 18px;
    transition: color 0.3s ease;
  }

  .social-icon:hover {
    color: #0073e6;
  }

  /* Footer Links Section */
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }

  .footer-link {
    text-decoration: none;
    color: #333;
    font-size: 14px;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #0073e6;
  }

  /* Footer Brand Info */
  .footer-brand {
    font-size: 14px;
    color: #666;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .footer-section {
      width: 100%;
      margin-bottom: 15px;
    }

    .social-icons {
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .footer-links {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .social-icon,
    .footer-link {
      font-size: 14px;
    }
  }
</style>

<!-- Dark AliceBlue Line -->
<div class="footer-line"></div>

<!-- Footer Content -->
<div class="footer">
  <!-- Section 1: Brand Info -->
  <div class="footer-section footer-brand">
    <p>© quickpixpro.com, a Pakistan LHR Brand</p>
  </div>

  <!-- Section 2: Social Icons -->
  <div class="footer-section">
    <div class="social-icons">
      <a href="https://www.facebook.com/groups/605067042334456" target="_blank" class="social-icon">Facebook</a>
      <a href="https://x.com/MuhammadUs15920" target="_blank" class="social-icon">X</a>
      <a href="https://www.pinterest.com/UsamaArshad00/" target="_blank" class="social-icon">Pinterest</a>
      <a href="https://www.linkedin.com/in/muhammad-usama-arshad-32508a24b/" target="_blank" class="social-icon">LinkedIn</a>
    </div>
  </div>

  <!-- Section 3: Footer Links -->
  <!-- <div class="footer-section">
    <div class="footer-links">
      <a href="/terms-of-service" class="footer-link">Terms of Service</a>
      <a href="/general-terms" class="footer-link">General Terms and Conditions</a>
      <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
      <a href="/cookie-policy" class="footer-link">Cookie Policy</a>
      <a href="/imprint" class="footer-link">Imprint</a>
    </div>
  </div> -->
</div>
