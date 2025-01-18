<script>
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { isLoggedIn } from "./store";

  let isOpen = false;
  let menuRef;

  // Toggle menu open/close on click
  function toggleMenu() {
    isOpen = !isOpen;
  }

  // Open menu on hover (desktop only)
  function openMenu() {
    isOpen = true;
  }

  // Close menu on hover out (desktop only)
  function closeMenu() {
    isOpen = false;
  }

  // Close menu if clicked outside
  function handleClickOutside(event) {
    if (menuRef && !menuRef.contains(event.target)) {
      isOpen = false;
    }
  }

  // Listen for clicks outside of the dropdown menu to close it
  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  // Handle navigation with login check
  function handleNavigation(path) {
    $isLoggedIn
      ? navigate(path) // Allow navigation if logged in
      : navigate("/signup"); // Redirect to signup page if not logged in
  }
</script>


<style>
/* Common Styles */
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.btn-dropdown {
  margin-left: 5px;
  cursor: pointer;
  font-size: .7rem; /* Smaller font size */
  padding: 1px 6px; /* Reduced padding to make the button smaller */
  padding-top: 5px;
  border-radius: 5px;
  
  background-color: rgb(207, 232, 254);
  color: blue;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-dropdown:hover {
  background-color: rgb(207, 232, 254);
  color: blue;
}

.dropdown-content {
  position: absolute;
  background-color: #fff;
  min-width: 180px; /* Smaller width */
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: none; /* Hidden by default */
  top: 100%;
  left: 0;
  z-index: 10;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown.open .dropdown-content {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.dropdown-content .back {
  padding: 8px 10px; /* Adjusted padding to make menu items more compact */
  font-size: 0.9rem; /* Smaller font size */
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-content .back:hover {
  background-color: #e6f7ff;
  color: #0073e6;
}

.dropdown-content .back:last-child {
  border-bottom: none;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .dropdown {
    display: inline-block;
    position: relative; /* Make sure the dropdown's position is relative to its container */
    width: auto; /* Ensure the dropdown does not take full width */
    
  }

  .btn-dropdown {
    font-size: 0.50rem; /* Smaller font size for mobile */
    width: auto; /* Ensure it's not taking full width */
    padding: 4px 8px; /* Smaller padding for mobile */
    position: absolute; /* Position the button relative to its parent */
    left: 0; /* Align it to the left side of the parent */
    top: 0; /* Align the button with the top of the parent */
  
  }

  .dropdown-content {
    position: absolute;
    min-width: 100%; /* Ensure the dropdown has full width */
    border-radius: 0;
    box-shadow: none;
    transform: none;
    opacity: 1;
    display: none; /* Ensure it's hidden by default */
    flex-direction: column;
    padding: 0; /* Remove unnecessary padding */
    background-color: #fff;
    z-index: 1;
    top: 100%; /* Position it just below the dropdown button */
    border-radius: 5px;
  }

  .dropdown.open .dropdown-content {
    display: block; /* Display the dropdown when it's open */
  }

  .dropdown-content .back {
    padding: 8px 15px; /* Adjusted padding */
    font-size: 0.85rem; /* Slightly smaller font size */
  }

  .dropdown-content .back:hover {
    background-color: #e6f7ff;
    color: #0073e6;
  }
}
</style>
<div
  class="dropdown"
  bind:this={menuRef}
  class:open={isOpen}
  on:mouseenter={openMenu}
  on:mouseleave={closeMenu}
>
  <!-- Dropdown button -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={toggleMenu}
    class="btn-dropdown"
  >
    ▾
  </div>
  
  <!-- Dropdown content -->
  <div class="dropdown-content">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="back" on:click={() => handleNavigation("/backremover")}>
      BGRemove
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="back" on:click={() => handleNavigation("/multiplebackgroundremoval")}>
      Batch BGRemover
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="back" on:click={() => handleNavigation("/imagecompression")}>
      QuickCompress
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="back" on:click={() => handleNavigation("/multipleimagecompression")}>
      BatchCompress
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="back" on:click={() => handleNavigation("/batchcropping")}>
      BatchCropping
    </div>
  </div>
</div>