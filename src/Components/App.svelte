<script>
	import { Router, Route, } from 'svelte-routing';
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Home from "./Home.svelte";
	import Login from './Login.svelte';
	import Signup from "./SignUp.svelte";
	import About from './AboutUs.svelte'
	import Contact from './ContactUs.svelte'
	import Features from './Features.svelte'
	import Backremover from './Backremover.svelte'
	import ImageCompression from './ImageCompression.svelte';
	import MultipleImageCompression from './MultipleImageCompression.svelte';
	import MultipleBackGroundRemoval from './MultipleBackGroundRemoval.svelte';
	import BatchCropping from './BatchCropping.svelte';
  </script>
  
  <main>
	<Header />
	<Router>
		<!-- Define routes correctly -->
		<Route path="/" component={Home} />
		<Route path="/about" component={About} />
		<Route path="/contact" component={Contact} />
		<Route path="/feature" component={Features} />
		<Route path="/login" component={Login} />
		<Route path="/signup" component={Signup} />
		<Route path="/backremover" component={Backremover} />
		<Route path="/imagecompression" component={ImageCompression} />
		<Route path="/multipleimagecompression" component={MultipleImageCompression} />
		<Route path="/multiplebackgroundremoval" component={MultipleBackGroundRemoval} />
		<Route path="/batchcropping" component={BatchCropping} />
	  </Router>
	<Footer />
  </main>
  
  