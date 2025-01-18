<script>
    import { onMount } from 'svelte';
  import { Link, Route } from 'svelte-routing';
    
    // Statistics Data
    let stats = [
      { label: 'Images Processed', value: '10,000+' },
      { label: 'User Satisfaction', value: '99.9%' },
      { label: 'Processing Speed', value: '3x Faster' }
    ];
    
    // Features Data
    let features = [
      { title: 'Image Compression', description: 'Reduce file size without compromising on quality—quick and efficient.' },
      { title: 'Background Removal', description: 'AI-powered background removal, delivering a clean, professional look.' },
      { title: 'Custom Backgrounds', description: 'Transform your images by replacing backgrounds with unique, personalized designs.' },
      { title: 'Blur Backgrounds', description: 'Add depth and focus to your images with seamless background blur effects.' },
      { title: 'Image Resizing', description: 'Resize your images to the perfect dimensions with ease—ideal for any platform.' },
      { title: 'Batch Processing', description: 'Process multiple images simultaneously, saving time and enhancing productivity.' }
    ];
</script>
  
<style>
    /* General Styling */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  
    body {
      font-family: 'Arial', sans-serif;
      color: #333;
      background-color: aliceblue;
      margin-bottom: 3rem; /* Prevents overlap with footer */
    }
  
    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, #0057d8, #39b8ff);
      color: white;
      text-align: center;
      padding: 5rem 1rem;
      border-bottom: 3px solid cadetblue;
    }
  
    .hero h1 {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: transform 0.3s ease;
    }
  
    .hero h1:hover {
      transform: scale(1.1);
    }
  
    .hero p {
      font-size: 1.3rem;
      font-weight: 300;
      margin-bottom: 2rem;
    }
  
    /* Main Content Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background-color: aliceblue;
      border-radius: 8px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
      margin-top: -3rem;
    }
  
    .section-title {
      font-size: 2.2rem;
      font-weight: 600;
      color: cadetblue;
      text-align: center;
      margin-bottom: 1.8rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid cadetblue;
      text-transform: uppercase;
      transition: color 0.3s ease;
    }
  
    .section-title:hover {
      color: #0057d8;
    }
  
    /* Features Grid */
    .features-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  
    .feature-card {
      background-color: white;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
    }
  
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
  
    .feature-card h3 {
      font-size: 1.6rem; /* Reduced font size */
      color: cadetblue;
      font-weight: bold;
      margin-bottom: 0.5rem;
      transition: transform 0.3s ease;
    }
  
    .feature-card h3:hover {
      transform: scale(1.1);
    }
  
    .feature-card p {
      font-size: 1rem; /* Reduced font size */
      color: #666;
      line-height: 1.5;
    }
  
    /* Statistics Grid */
    .stats-grid {
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin: 3rem 0; /* Increased margin for more space */
    }
  
    .stat {
      text-align: center;
      padding: 1.5rem;
      border-radius: 8px;
      background-color: cadetblue;
      color: white;
      flex: 1;
      transition: transform 0.3s ease;
    }
  
    .stat:hover {
      transform: translateY(-5px);
    }
  
    .stat-value {
      font-size: 2.5rem;
      font-weight: bold;
    }
  
    .stat-label {
      font-size: 1.1rem;
      font-weight: 400;
      margin-top: 0.5rem;
    }
  
    /* Team Introduction */
    .team-intro {
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .team-intro img {
      border-radius: 50%;
      width: 180px;
      height: 180px;
      object-fit: cover;
      margin-bottom: 1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }
  
    .team-intro h3 {
      font-size: 1.8rem;
      color: cadetblue;
      font-weight: bold;
    }
  
    .team-intro p {
      font-size: 1.1rem;
      font-weight: 300;
      color: #555;
    }
  
    /* Contact Section */
    .contact-info {
      text-align: center;
      font-size: 1.2rem;
      margin-top: 3rem; /* More space */
    }
  
    .contact-info a {
      color: cadetblue;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }
  
    .contact-info a:hover {
      color: #0057d8;
      text-decoration: underline;
    }
  
    /* Responsive Design */
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
  
      .hero p {
        font-size: 1.1rem;
      }
  
      .section-title {
        font-size: 1.8rem;
      }
  
      .feature-card h3 {
        font-size: 1.5rem;
      }
  
      .stat-value {
        font-size: 2rem;
      }
  
      .stats-grid {
        flex-direction: column;
        gap: 1rem;
      }
  
      .container {
        padding: 1.5rem;
      }
    }
</style>
  
<!-- Hero Section -->
<section class="hero">
    <h1>About QuickPixPro</h1>
    <p>Empowering your creativity, one pixel at a time.</p>
</section>
  
<!-- Company Overview Section -->
<div class="container">
    <section>
        <h2 class="section-title">Company Overview</h2>
        <p>
            At QuickPixPro, we are driven by a passion for simplifying image processing. Our mission is to empower everyone with easy-to-use, high-quality image tools that are affordable and accessible to all.
        </p>
        <ul>
            <li><strong>All-in-One Solution</strong> for every image editing need.</li>
            <li><strong>Advanced Features</strong> provided for free, giving you premium results.</li>
            <li><strong>Blazing Fast Processing</strong> with unmatched speed.</li>
            <li><strong>Scalable and Secure</strong> for personal and professional use.</li>
        </ul>
    </section>
  
    <!-- Features Section -->
    <section>
        <h2 class="section-title">Features and Services</h2>
        <div class="features-grid">
            {#each features as feature}
                <div class="feature-card">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            {/each}
        </div>
    </section>
  
    <!-- Statistics Section -->
    <section>
        <h2 class="section-title">Statistics and Achievements</h2>
        <div class="stats-grid">
            {#each stats as stat}
                <div class="stat">
                    <div class="stat-value">{stat.value}</div>
                    <div class="stat-label">{stat.label}</div>
                </div>
            {/each}
        </div>
    </section>
  
    <!-- Team Introduction Section -->
    <section>
        <h2 class="section-title">Meet Our Team</h2>
        <div class="team-intro">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQH18THBGX06Ew/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677497657467?e=1742428800&v=beta&t=O2pJcbf8essEuQ2Ynyy65C3b38lO6Miu55KTYRFeTbI" alt="Team Member 1">
            <h3>Muhammad Usama Arshad</h3>
            <p>Founder & CEO</p>
        </div>
      
    </section>
  
    <!-- Contact Information Section -->
    <section>
        <h2 class="section-title">Get in Touch</h2>
        <div class="contact-info">
            <!-- svelte-ignore a11y-missing-attribute -->
            <p>Have any questions? Reach out to us via our <a href="https://www.linkedin.com/in/muhammad-usama-arshad-32508a24b/" target="_blank">LinkedIn profile</a>.</p>
    
        </div>
    </section>
</div>
