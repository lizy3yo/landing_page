<script>
	// Svelte 5 logic
	import { goto } from '$app/navigation';

	let email = $state('');
	let emailError = $state('');

	function handleSubmit(event) {
		event.preventDefault();
		if (!email) {
			emailError = 'Please enter your email to continue';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailError = 'Please enter a valid email address';
			return;
		}
		
		emailError = '';
		// Store email in sessionStorage to pre-fill checkout later
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('customer_email', email);
		}
		// Redirect to the pre-checkout upsell page
		goto('/upsell');
	}
</script>

<svelte:head>
	<title>50 Easy Plumbing Fixes - Save on Plumbing Repairs</title>
	<meta name="description" content="Stop overpaying plumbers for simple repairs. Learn 50 easy plumbing fixes you can do yourself in under 30 minutes with our step-by-step handbook." />
</svelte:head>

<!-- Promo Sale Banner -->
<div class="promo-bar">
	• LAUNCH SALE — 50% OFF
</div>

<!-- Header -->
<header class="header-nav">
	<div class="container nav-container">
		<div class="brand">
			<svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
			</svg>
			<span>Mark Silverbridge</span>
		</div>
		<button class="nav-cta" onclick={() => {
			const formEl = document.getElementById('hero-form');
			if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
		}}>
			Get Your Copy — $16.99
		</button>
	</div>
</header>

<main>
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container hero-container">
			<div class="hero-content">
				<span class="badge">BY MARK SILVERBRIDGE</span>
				
				<h1>Stop Overpaying for Plumbing Repairs You Could <span class="highlight-yellow">Do Yourself</span></h1>
				
				<p class="hero-subtitle">
					A Step-by-Step Guide. Stop overpaying plumbers for simple repairs you can do yourself in under 30 minutes.
				</p>
				
				<div class="hero-stats">
					<span>122 Pages</span>
					<span class="divider">•</span>
					<span>50 Step-by-Step Fixes</span>
					<span class="divider">•</span>
					<span>Instant PDF Download</span>
				</div>

				<form id="hero-form" onsubmit={handleSubmit} class="checkout-form">
					<div class="input-group">
						<input 
							type="email" 
							placeholder="your@email.com" 
							bind:value={email}
							class="email-input"
						/>
						<button type="submit" class="btn-primary hero-btn">
							Get Instant Access
						</button>
					</div>
					{#if emailError}
						<p class="error-msg">{emailError}</p>
					{/if}
				</form>

				<div class="price-info">
					<span class="current-price">$16.99</span>
					<span class="old-price">$33.99</span>
					<span class="frequency">ONE-TIME, INSTANT ACCESS</span>
				</div>

				<div class="trust-indicators">
					<div class="indicator-item">
						<svg class="trust-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
						</svg>
						<span>Secure checkout via Stripe</span>
					</div>
					<div class="indicator-item">
						<svg class="trust-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
						</svg>
						<span>Instant PDF delivery</span>
					</div>
					<div class="indicator-item">
						<svg class="trust-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
						</svg>
						<span>Read on any device</span>
					</div>
				</div>
			</div>

			<div class="hero-image">
				<div class="book-container">
					<div class="book">
						<div class="book-spine"></div>
						<div class="book-cover">
							<img src="/images/ebook-cover.png" alt="50 Easy Plumbing Fixes That Will Save You $10,000 Ebook Cover" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Trouble Section -->
	<section class="trouble-section">
		<div class="container text-center">
			<h2>Are You Tired of Getting Ripped Off by Plumbers?</h2>
			<p class="section-subtitle">
				The average homeowner spends <strong>$5,000 – $15,000</strong> on plumbing repairs they could have easily solved themselves with standard household tools.
			</p>

			<div class="benefits-grid">
				<div class="benefit-card">
					<div class="benefit-icon">💧</div>
					<h3>Stop Dripping Faucets</h3>
					<p>Learn how to replace washers and cartridges in minutes. Stop listening to that annoying drip and saving hundreds of gallons of wasted water.</p>
				</div>
				<div class="benefit-card">
					<div class="benefit-icon">🚽</div>
					<h3>Fix Running Toilets</h3>
					<p>No more jiggling the handle. Diagnose toilet valve problems, replace flappers, and fix fills instantly with clear illustrations.</p>
				</div>
				<div class="benefit-card">
					<div class="benefit-icon">🌀</div>
					<h3>Clear Clogged Drains</h3>
					<p>Forget calling rooter services. Master the use of plungers, hand snakes, and natural chemical solutions for sinks, tubs, and main lines.</p>
				</div>
				<div class="benefit-card">
					<div class="benefit-icon">🔧</div>
					<h3>Toolbox Essentials</h3>
					<p>Understand the exact tools needed for home projects. Avoid buying useless expensive gear and get the exact subset that actually works.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="testimonials-section">
		<div class="container">
			<h2 class="text-center">What Homeowners Are Saying</h2>
			<div class="testimonials-grid">
				<div class="testimonial-card">
					<div class="stars">★★★★★</div>
					<p class="quote">"This guide saved me on night one! A pipe under our kitchen sink started spraying. I opened the book, found the exact page for shut-offs and gaskets, and fixed it for $4 in parts instead of a $250 emergency plumber fee."</p>
					<p class="author">— David K., Homeowner</p>
				</div>
				<div class="testimonial-card">
					<div class="stars">★★★★★</div>
					<p class="quote">"Super easy to follow. The step-by-step checklists are fool-proof. I’m not a handy person at all, but I managed to replace my bathroom faucet completely by myself. Highly recommend!"</p>
					<p class="author">— Sarah L., First-Time Buyer</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing CTA Section -->
	<section class="pricing-cta-section text-center">
		<div class="container pricing-cta-container">
			<h2>Save $10,000 in Repairs Starting Today</h2>
			<p>Get instant access to the digital PDF guide. Read on your phone, tablet, or laptop while doing repairs.</p>
			
			<div class="pricing-cta-box">
				<div class="pricing-header">
					<span class="price-title">SPECIAL PRE-ORDER LAUNCH PRICE</span>
					<div class="cta-price">
						<span class="large-price">$16.99</span>
						<span class="slashed-price">$33.99</span>
					</div>
				</div>
				
				<button class="btn-primary" onclick={() => {
					const formEl = document.getElementById('hero-form');
					if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
				}}>
					Get Your Copy Now
				</button>
				
				<p class="guarantee">🔒 30-Day Money-Back Guarantee. No Questions Asked.</p>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="container">
		<p>&copy; {new Date().getFullYear()} Mark Silverbridge. All rights reserved.</p>
		<p>
			<a href="#privacy">Privacy Policy</a> | 
			<a href="#terms">Terms of Service</a> | 
			<a href="#support">Support Helpdesk</a>
		</p>
	</div>
</footer>

<style>
	/* Custom Landing Page Styles */
	.text-center {
		text-align: center;
	}

	.highlight-yellow {
		color: var(--color-yellow);
	}

	/* Hero Section */
	.hero-section {
		padding: 5rem 0 6rem 0;
		position: relative;
		overflow: hidden;
		background: radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.05) 0%, rgba(11, 15, 25, 0) 60%);
	}

	.hero-container {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 3rem;
		align-items: center;
	}

	@media (max-width: 900px) {
		.hero-container {
			grid-template-columns: 1fr;
			text-align: center;
			gap: 4rem;
		}

		.hero-stats, .trust-indicators {
			justify-content: center;
		}

		.checkout-form {
			max-width: 500px;
			margin: 0 auto;
		}
	}

	.hero-content h1 {
		font-size: 3.5rem;
		margin-bottom: 1.5rem;
		letter-spacing: -0.03em;
		font-weight: 900;
	}

	@media (max-width: 600px) {
		.hero-content h1 {
			font-size: 2.5rem;
		}
	}

	.hero-subtitle {
		font-size: 1.2rem;
		color: var(--color-text-secondary);
		margin-bottom: 2rem;
		max-width: 600px;
	}

	.hero-stats {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		font-family: var(--font-title);
		font-weight: 700;
		font-size: 0.95rem;
		color: var(--color-text-primary);
		margin-bottom: 2rem;
	}

	.hero-stats .divider {
		color: var(--color-yellow);
	}

	/* Email CTA input styling from image */
	.checkout-form {
		margin-bottom: 1.5rem;
	}

	.input-group {
		display: flex;
		background-color: #ffffff;
		border-radius: 8px;
		padding: 4px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	.email-input {
		flex: 1;
		border: none;
		background: transparent;
		padding: 0.8rem 1rem;
		color: var(--color-text-dark);
		font-family: var(--font-body);
		font-size: 1rem;
		outline: none;
		min-width: 0;
	}

	.email-input::placeholder {
		color: #94a3b8;
	}

	.hero-btn {
		width: auto;
		padding: 0 1.8rem;
		font-size: 0.95rem;
		border-radius: 6px;
		box-shadow: none;
	}

	@media (max-width: 500px) {
		.input-group {
			flex-direction: column;
			background: transparent;
			box-shadow: none;
			padding: 0;
			gap: 0.8rem;
		}
		.email-input {
			background-color: white;
			border-radius: 8px;
			padding: 1rem;
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		}
		.hero-btn {
			width: 100%;
			padding: 1rem;
		}
	}

	.error-msg {
		color: #f87171;
		font-size: 0.85rem;
		margin-top: 0.5rem;
		text-align: left;
	}

	.price-info {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		font-family: var(--font-title);
		margin-bottom: 2rem;
	}

	.current-price {
		font-size: 1.5rem;
		color: var(--color-yellow);
		font-weight: 800;
	}

	.old-price {
		color: var(--color-text-secondary);
		text-decoration: line-through;
		font-size: 1.15rem;
	}

	.frequency {
		font-size: 0.75rem;
		background-color: rgba(255, 255, 255, 0.06);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		letter-spacing: 0.05em;
		color: var(--color-text-secondary);
	}

	.trust-indicators {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		border-top: 1px solid var(--color-border);
		padding-top: 1.5rem;
	}

	.indicator-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--color-text-secondary);
	}

	.trust-icon {
		width: 1rem;
		height: 1rem;
		color: var(--color-yellow);
	}

	/* Trouble Section */
	.trouble-section {
		padding: 6rem 0;
		border-top: 1px solid var(--color-border);
		background-color: rgba(255, 255, 255, 0.01);
	}

	.trouble-section h2 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
	}

	.section-subtitle {
		font-size: 1.15rem;
		color: var(--color-text-secondary);
		max-width: 700px;
		margin: 0 auto 4rem auto;
	}

	.section-subtitle strong {
		color: var(--color-text-primary);
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
	}

	.benefit-card {
		background-color: var(--color-bg-card);
		border: 1px solid var(--color-border);
		padding: 2.5rem 1.8rem;
		border-radius: 12px;
		text-align: left;
		transition: all var(--transition-speed) ease;
	}

	.benefit-card:hover {
		transform: translateY(-5px);
		border-color: rgba(251, 191, 36, 0.2);
		background-color: var(--color-bg-card-hover);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	.benefit-icon {
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
	}

	.benefit-card h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.benefit-card p {
		color: var(--color-text-secondary);
		font-size: 0.95rem;
	}

	/* Testimonials Section */
	.testimonials-section {
		padding: 6rem 0;
		border-top: 1px solid var(--color-border);
	}

	.testimonials-section h2 {
		font-size: 2.5rem;
		margin-bottom: 4rem;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
	}

	.testimonial-card {
		background-color: var(--color-bg-card);
		border: 1px solid var(--color-border);
		padding: 2.5rem;
		border-radius: 16px;
		position: relative;
	}

	.stars {
		color: var(--color-yellow);
		margin-bottom: 1rem;
		font-size: 1.1rem;
		letter-spacing: 0.1em;
	}

	.quote {
		font-style: italic;
		font-size: 1.05rem;
		margin-bottom: 1.5rem;
		color: var(--color-text-primary);
	}

	.author {
		font-family: var(--font-title);
		font-weight: 700;
		color: var(--color-yellow);
		font-size: 0.95rem;
	}

	/* Pricing CTA Section */
	.pricing-cta-section {
		padding: 6rem 0;
		background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.04) 0%, rgba(11, 15, 25, 0) 70%);
		border-top: 1px solid var(--color-border);
	}

	.pricing-cta-container {
		max-width: 650px;
	}

	.pricing-cta-section h2 {
		font-size: 2.8rem;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
	}

	.pricing-cta-section p {
		color: var(--color-text-secondary);
		margin-bottom: 2.5rem;
	}

	.pricing-cta-box {
		background-color: var(--color-bg-card);
		border: 1px solid rgba(251, 191, 36, 0.2);
		padding: 3rem 2.5rem;
		border-radius: 16px;
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
	}

	.pricing-header {
		margin-bottom: 2rem;
	}

	.price-title {
		font-family: var(--font-title);
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: var(--color-text-secondary);
	}

	.cta-price {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.large-price {
		font-size: 3.5rem;
		font-family: var(--font-title);
		font-weight: 900;
		color: var(--color-yellow);
	}

	.slashed-price {
		font-size: 1.8rem;
		color: var(--color-text-secondary);
		text-decoration: line-through;
	}

	.guarantee {
		margin-top: 1.5rem;
		font-size: 0.85rem;
		color: var(--color-text-secondary) !important;
		margin-bottom: 0 !important;
	}
</style>
