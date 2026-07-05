<script>
	// Svelte 5 logic
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	let email = $state('');
	let emailError = $state('');
	let showAllChapters = $state(false);

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
	<title>The UI Design Playbook - Create Beautiful Interfaces</title>
	<meta name="description" content="Stop designing boring websites. Learn 50 simple, step-by-step rules to make your web apps look 10x more premium. Written for developers and founders." />
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
			<span>Aether Design</span>
		</div>
		<button class="nav-cta" onclick={() => {
			const formEl = document.getElementById('bottom-cta-section');
			if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
				<span class="badge">BY AETHER DESIGN</span>
				
				<h1>Stop Designing Boring Websites. Start Creating <span class="highlight-yellow">Masterpieces</span></h1>
				
				<p class="hero-subtitle">
					The UI Design Playbook. Learn 50 simple, step-by-step rules to make your websites and apps look 10x more premium. Written for developers and founders.
				</p>
				
				<div class="hero-stats">
					<span>122 Pages</span>
					<span class="divider">•</span>
					<span>50 Design Rules</span>
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
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296a3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
						</svg>
						<span>Secure checkout via Stripe</span>
					</div>
					<div class="indicator-item">
						<svg class="trust-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296a3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
						</svg>
						<span>Instant PDF delivery</span>
					</div>
					<div class="indicator-item">
						<svg class="trust-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296a3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
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
							<img src="/images/ebook-cover.png?v=ui-playbook" alt="The UI Design Playbook: 50 Secrets to Designing Beautiful Interfaces Ebook Cover" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Trouble Section -->
	<section class="trouble-section">
		<div class="container text-center">
			<h2 class="trouble-title">Are You Tired of Designing Ugly Websites?</h2>
			<p class="section-subtitle-light trouble-subtitle">
				The average developer spends hours tweaking CSS variables only to produce pages that feel amateur.
			</p>

			<div class="troubles-grid">
				<div class="trouble-card">
					<div class="trouble-num-badge">1</div>
					<h3>Ugly Browser Defaults</h3>
					<p>Relying on standard gray outlines, blocky cards, and plain blue links that feel outdated.</p>
				</div>
				<div class="trouble-card">
					<div class="trouble-num-badge">2</div>
					<h3>Bad Visual Hierarchy</h3>
					<p>Users don't know where to focus. Action buttons blend into details and get completely ignored.</p>
				</div>
				<div class="trouble-card">
					<div class="trouble-num-badge">3</div>
					<h3>Clashing Typography</h3>
					<p>Choosing mismatched fonts and size scales that ruin your app's professional credibility.</p>
				</div>
				<div class="trouble-card">
					<div class="trouble-num-badge">4</div>
					<h3>Layout Frustrations</h3>
					<p>Fiddling with grid properties and padding, only for elements to feel uneven and disorganized.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Inside the Book Section -->
	<section class="inside-book-section">
		<div class="container text-center">
			<span class="section-badge-red">INSIDE THE BOOK</span>
			<h2 class="inside-title">What's Inside the Book</h2>
			<p class="section-subtitle-light">
				10 chapters, 50 design rules, 100+ side-by-side examples — organized from beginner to advanced.
			</p>

			<div class="chapters-grid">
				<div class="chapter-card">
					<div class="chapter-num-badge">1</div>
					<div class="chapter-content">
						<h4>Visual Hierarchy Rules</h4>
						<p>Direct users' eyes to the most important actions immediately with visual scaling rules.</p>
					</div>
				</div>
				<div class="chapter-card">
					<div class="chapter-num-badge">2</div>
					<div class="chapter-content">
						<h4>Typography Systems</h4>
						<p>Establish clear typographic hierarchies, select pairing schemes, and set perfect line heights.</p>
					</div>
				</div>
				<div class="chapter-card">
					<div class="chapter-num-badge">3</div>
					<div class="chapter-content">
						<h4>Curated Color Systems</h4>
						<p>Build professional palettes using HSL, create slate gradients, and use intentional highlights.</p>
					</div>
				</div>
				<div class="chapter-card">
					<div class="chapter-num-badge">4</div>
					<div class="chapter-content">
						<h4>Spacing & Grids</h4>
						<p>Master padding scales and layout grid models using a simple 8px mathematical rhythm.</p>
					</div>
				</div>
				<div class="chapter-card">
					<div class="chapter-num-badge">5</div>
					<div class="chapter-content">
						<h4>Accents & Depth</h4>
						<p>Elevate interfaces with soft drop shadows, glassmorphism card glows, and premium border highlights.</p>
					</div>
				</div>
				<div class="chapter-card">
					<div class="chapter-num-badge">6</div>
					<div class="chapter-content">
						<h4>Micro-Interactions</h4>
						<p>Define interactive states, button hover effects, and springy CSS transitions that feel premium.</p>
					</div>
				</div>

				{#if showAllChapters}
					<div class="chapter-card" transition:slide>
						<div class="chapter-num-badge">7</div>
						<div class="chapter-content">
							<h4>Form Design Secrets</h4>
							<p>Create checkout boxes, input outlines, inline error banners, and clean action layouts.</p>
						</div>
					</div>
					<div class="chapter-card" transition:slide>
						<div class="chapter-num-badge">8</div>
						<div class="chapter-content">
							<h4>Dark Mode Engineering</h4>
							<p>Learn dark schema rules to maintain color saturation, readable contrasts, and premium gradients.</p>
						</div>
					</div>
					<div class="chapter-card" transition:slide>
						<div class="chapter-num-badge">9</div>
						<div class="chapter-content">
							<h4>Component Mastery</h4>
							<p>Set up figma auto-layouts, reuse symbols, and build scalable asset design libraries.</p>
						</div>
					</div>
					<div class="chapter-card" transition:slide>
						<div class="chapter-num-badge">10</div>
						<div class="chapter-content">
							<h4>Design to Code</h4>
							<p>Translate figma styles directly to semantic HTML structures and Tailwind/Vanilla CSS rules.</p>
						</div>
					</div>
				{/if}
			</div>

			<div class="see-chapters-row">
				<button class="btn-outline-red" onclick={() => showAllChapters = !showAllChapters}>
					{showAllChapters ? 'Show Less' : 'See All 10 Chapters'}
				</button>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="testimonials-section">
		<div class="container">
			<h2 class="text-center">What Designers & Developers Are Saying</h2>
			<div class="testimonials-grid">
				<div class="testimonial-card">
					<div class="stars">★★★★★</div>
					<p class="quote">"This guide transformed my side-projects! I used to build tools that functioned well but looked amateur. Applying just the typographic and spacing rules made my app look like a premium SaaS product on launch day."</p>
					<p class="author">— Alex M., Indie Hacker</p>
				</div>
				<div class="testimonial-card">
					<div class="stars">★★★★★</div>
					<p class="quote">"As a developer with zero design background, design was always a black box. This handbook gives concrete, mathematical formulas for layout, padding, and font pairing. The results are incredible."</p>
					<p class="author">— Sarah K., Full-Stack Engineer</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing CTA Section -->
	<section class="pricing-cta-section text-center">
		<div class="container pricing-cta-container">
			<div class="value-stack-box">
				<span class="value-stack-title">TOTAL VALUE OF EVERYTHING BELOW</span>
				<div class="crossed-value">$72.00</div>
				<span class="yours-today-title">YOURS TODAY FOR JUST</span>
				<div class="large-deal-price">$16.99</div>
				
				<div class="save-badge-wrapper">
					<span class="save-badge">You save $55.01 • 76% off</span>
				</div>
				
				<div class="value-items-list">
					<div class="value-item">
						<div class="value-item-left">
							<span class="check-icon-circle">✓</span>
							<span>The UI Design Playbook — full PDF guide</span>
						</div>
						<span class="value-item-price">$29.00</span>
					</div>
					<div class="value-item">
						<div class="value-item-left">
							<span class="check-icon-circle">✓</span>
							<span>Component & Auto-Layout Workbook (Figma file)</span>
						</div>
						<span class="value-item-price">$12.00</span>
					</div>
					<div class="value-item">
						<div class="value-item-left">
							<span class="check-icon-circle">✓</span>
							<span>Quick-reference accessibility checklist</span>
						</div>
						<span class="value-item-price">$9.00</span>
					</div>
					<div class="value-item">
						<div class="value-item-left">
							<span class="check-icon-circle">✓</span>
							<span>Emergency component-spacing scale card</span>
						</div>
						<span class="value-item-price">$7.00</span>
					</div>
					<div class="value-item">
						<div class="value-item-left">
							<span class="check-icon-circle">✓</span>
							<span>Lifetime updates as new design rules are added</span>
						</div>
						<span class="value-item-price">$15.00</span>
					</div>
				</div>
			</div>

			<div class="pricing-btn-row">
				<button class="pricing-red-btn" onclick={() => {
					const formEl = document.getElementById('bottom-cta-section');
					if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
				}}>
					Get Instant Access Now &rarr;
				</button>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="faq-section">
		<div class="container">
			<h2 class="text-center">Frequently Asked Questions</h2>
			<div class="faq-accordion">
				<details class="faq-item">
					<summary class="faq-question">
						<span>Is this really worth the price?</span>
						<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</summary>
					<div class="faq-answer">
						<p>Yes, absolutely. Hiring a UI designer or buying high-end templates can cost hundreds or thousands of dollars. By improving just one interface using these 50 rules, you will immediately elevate your product and make back your investment.</p>
					</div>
				</details>
				<details class="faq-item">
					<summary class="faq-question">
						<span>What if I'm a programmer with zero visual design talent?</span>
						<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</summary>
					<div class="faq-answer">
						<p>This playbook was written specifically for developers. It avoids vague artsy theories and focuses instead on concrete rules, spacing scales, HSL values, and component structures so you cannot make a mistake.</p>
					</div>
				</details>
				<details class="faq-item">
					<summary class="faq-question">
						<span>How do I access the guide after purchase?</span>
						<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</summary>
					<div class="faq-answer">
						<p>Immediately after completing your payment via Stripe, you will be redirected to a download screen where you can download the PDF and companion files. You will also receive an email with direct download links so you can access them anytime.</p>
					</div>
				</details>
				<details class="faq-item">
					<summary class="faq-question">
						<span>How is this different from reading blog posts?</span>
						<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</summary>
					<div class="faq-answer">
						<p>Instead of searching through fragmented blog posts or design tweets, this guide provides a structured, comprehensive system covering the 50 most essential rules. You can reference it in seconds while coding or mockup designing.</p>
					</div>
				</details>
				<details class="faq-item">
					<summary class="faq-question">
						<span>What format are the assets in?</span>
						<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</summary>
					<div class="faq-answer">
						<p>The book is delivered as a high-quality, fully indexed PDF document. The companion resources include Figma templates (.fig) and interactive cheat-sheets.</p>
					</div>
				</details>
				<details class="faq-item">
					<summary class="faq-question">
						<span>Can I get a refund if I'm not satisfied?</span>
						<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</summary>
					<div class="faq-answer">
						<p>Because this is an instant digital product with immediate download access, all sales are final and we do not offer refunds. However, we are confident that these rules will make a massive impact on your design quality.</p>
					</div>
				</details>
			</div>
		</div>
	</section>

	<!-- Bottom CTA Section -->
	<section id="bottom-cta-section" class="bottom-cta-section text-center">
		<div class="container bottom-cta-container">
			<h2>Stop Designing Boring Websites. Start Creating Masterpieces.</h2>
			<p class="bottom-subtitle">Get instant access to 50 step-by-step UI design rules and start designing beautiful interfaces today.</p>
			
			<form onsubmit={handleSubmit} class="checkout-form bottom-form">
				<div class="input-group">
					<input 
						type="email" 
						placeholder="your@email.com" 
						bind:value={email}
						class="email-input"
					/>
					<button type="submit" class="btn-primary hero-btn bottom-btn">
						Get Instant Access
					</button>
				</div>
				{#if emailError}
					<p class="error-msg text-center-msg">{emailError}</p>
				{/if}
			</form>

			<div class="bottom-price-info">
				<span class="current-price">$16.99</span>
				<span class="old-price">$33.99</span>
				<span class="frequency">ONE-TIME, INSTANT ACCESS</span>
			</div>
		</div>
	</section>
</main>

<footer class="footer-detailed">
	<div class="container footer-container-detailed">
		<p class="methodology">
			<strong>Methodology & assumptions:</strong> Typical homeowner saves $300–$1,500 per year. The $10,000 figure represents long-term cumulative savings across many repairs; individual results vary based on which fixes you actually do.
		</p>
		<p class="disclaimer">
			<strong>Disclaimer:</strong> This book is for informational and educational purposes only. It is not a substitute for professional plumbing advice. Always consult a licensed plumber for complex repairs and check your local building codes before performing any plumbing work. The author and publisher are not responsible for any damages, injuries, or losses resulting from the use of information in this product. Results may vary. Savings estimates are based on average industry pricing and are not guaranteed. All sales are final — instant digital download, no refunds.
		</p>
		<p class="ai-notice">AI tools were used to assist in the creation of this product.</p>
		
		<div class="footer-links-row">
			<span>&copy; {new Date().getFullYear()} Blueprint Media. All rights reserved.</span>
			<span class="divider-dot">•</span>
			<a href="mailto:blueprintmedia.contact@gmail.com">blueprintmedia.contact@gmail.com</a>
			<span class="divider-dot">•</span>
			<a href="#youtube">YouTube</a>
			<span class="divider-dot">•</span>
			<a href="#more">More books I recommend</a>
		</div>
		
		<div class="footer-legal-row">
			<a href="#privacy">Privacy Policy</a>
			<span class="divider-slash">/</span>
			<a href="#terms">Terms of Service</a>
			<span class="divider-slash">/</span>
			<a href="#refund">Refund Policy</a>
		</div>
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
		background: radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.05) 0%, rgba(11, 15, 25, 0) 60%);
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
		background-color: #ffffff;
		border-top: 1px solid var(--color-border);
		color: #111827;
	}

	.trouble-title {
		font-size: 2.8rem;
		font-weight: 950;
		color: #111827;
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}

	.trouble-subtitle {
		color: #6b7280;
		font-size: 1.1rem;
		max-width: 650px;
		margin: 0 auto 3.5rem auto;
		line-height: 1.6;
	}

	.troubles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.trouble-card {
		background-color: #fbfdfb;
		border: 1px solid #d1fae5;
		border-radius: 12px;
		padding: 2.5rem 1.8rem;
		text-align: left;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.trouble-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
	}

	.trouble-num-badge {
		width: 2rem;
		height: 2rem;
		background-color: var(--color-yellow-light);
		color: var(--color-yellow);
		font-weight: 800;
		font-size: 1rem;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-bottom: 1.5rem;
	}

	.trouble-card h3 {
		font-size: 1.25rem;
		font-weight: 800;
		color: #111827;
		margin: 0 0 1rem 0;
	}

	.trouble-card p {
		font-size: 0.92rem;
		color: #4b5563;
		line-height: 1.6;
		margin: 0;
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

	/* Inside the Book Section */
	.inside-book-section {
		padding: 6rem 0;
		background-color: #ffffff;
		border-top: 1px solid var(--color-border);
	}

	.section-badge-red {
		text-transform: uppercase;
		color: var(--color-yellow);
		font-weight: 800;
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		display: block;
		margin-bottom: 0.5rem;
	}

	.inside-title {
		font-size: 2.8rem;
		font-weight: 950;
		color: #111827;
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}

	.section-subtitle-light {
		color: #6b7280;
		font-size: 1.1rem;
		max-width: 650px;
		margin: 0 auto 3.5rem auto;
		line-height: 1.6;
	}

	.chapters-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		max-width: 950px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.chapters-grid {
			grid-template-columns: 1fr;
			padding: 0 1rem;
		}
	}

	.chapter-card {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		background: #fbfdfb;
		border: 1px solid #d1fae5;
		border-radius: 12px;
		padding: 1.5rem 1.8rem;
		text-align: left;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.chapter-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(16, 185, 129, 0.15);
	}

	.chapter-num-badge {
		width: 2rem;
		height: 2rem;
		background-color: var(--color-yellow);
		color: #ffffff;
		font-weight: 800;
		font-size: 1rem;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.chapter-content h4 {
		font-size: 1.05rem;
		font-weight: 700;
		color: #111827;
		margin: 0 0 0.35rem 0;
	}

	.chapter-content p {
		font-size: 0.88rem;
		color: #4b5563;
		line-height: 1.5;
		margin: 0;
	}

	.see-chapters-row {
		margin-top: 3.5rem;
		display: flex;
		justify-content: center;
	}

	.btn-outline-red {
		background: #ffffff;
		color: var(--color-yellow);
		border: 2px solid #a7f3d0;
		border-radius: 8px;
		padding: 0.75rem 2rem;
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.2s;
		box-shadow: 0 4px 10px rgba(16, 185, 129, 0.03);
	}

	.btn-outline-red:hover {
		background: #f0fdf4;
		border-color: #6ee7b7;
		transform: translateY(-1px);
		box-shadow: 0 6px 15px rgba(16, 185, 129, 0.08);
	}

	/* Pricing CTA & Value Stack Box */
	.pricing-cta-section {
		padding: 6rem 0;
		background-color: #f8fafc;
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
	}

	.pricing-cta-container {
		max-width: 650px;
	}

	.value-stack-box {
		width: 100%;
		background: #fbfdfb;
		border: 1px solid #d1fae5;
		border-radius: 16px;
		padding: 2.5rem 3rem;
		box-shadow: 0 10px 30px rgba(16, 185, 129, 0.04);
		margin-bottom: 2rem;
	}

	@media (max-width: 600px) {
		.value-stack-box {
			padding: 2rem 1.5rem;
		}
	}

	.value-stack-title {
		font-size: 0.8rem;
		font-weight: 800;
		color: #9ca3af;
		letter-spacing: 0.08em;
		display: block;
		margin-bottom: 0.5rem;
	}

	.crossed-value {
		font-size: 2.2rem;
		font-weight: 700;
		color: #9ca3af;
		text-decoration: line-through;
		margin-bottom: 1.5rem;
		font-family: var(--font-title);
	}

	.yours-today-title {
		font-size: 0.85rem;
		font-weight: 800;
		color: #111827;
		letter-spacing: 0.05em;
		display: block;
		margin-bottom: 0.25rem;
	}

	.large-deal-price {
		font-size: 4.5rem;
		font-weight: 900;
		color: var(--color-yellow);
		line-height: 1;
		margin-bottom: 0.75rem;
		font-family: var(--font-title);
	}

	.save-badge-wrapper {
		margin-bottom: 2rem;
	}

	.save-badge {
		background-color: var(--color-yellow-light);
		color: var(--color-yellow-hover);
		font-size: 0.88rem;
		font-weight: 800;
		padding: 0.35rem 1rem;
		border-radius: 9999px;
		display: inline-block;
	}

	.value-items-list {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		border-top: 1px dashed #a7f3d0;
		padding-top: 1.5rem;
		text-align: left;
	}

	.value-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.95rem;
		color: #374151;
	}

	.value-item-left {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.check-icon-circle {
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--color-yellow-light);
		color: var(--color-yellow-hover);
		font-size: 0.75rem;
		font-weight: 800;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.value-item-price {
		font-weight: 700;
		color: #111827;
	}

	.pricing-btn-row {
		margin-top: 2.5rem;
		display: flex;
		justify-content: center;
	}

	.pricing-red-btn {
		background-color: var(--color-yellow) !important;
		color: #ffffff !important;
		border: none;
		border-radius: 8px;
		padding: 1rem 2.5rem;
		font-size: 1.15rem;
		font-weight: 800;
		cursor: pointer;
		transition: all 0.2s;
		box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4) !important;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.pricing-red-btn:hover {
		background-color: var(--color-yellow-hover) !important;
		box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6) !important;
		transform: translateY(-1px);
	}

	/* FAQ Section Accordion */
	.faq-section {
		padding: 6rem 0;
		background-color: #ffffff;
	}

	.faq-section h2 {
		font-size: 2.5rem;
		font-weight: 900;
		margin-bottom: 3rem;
		letter-spacing: -0.02em;
		color: #111827;
	}

	.faq-accordion {
		max-width: 700px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	@media (max-width: 768px) {
		.faq-accordion {
			padding: 0 1rem;
		}
	}

	.faq-item {
		border-bottom: 1px solid #e5e7eb;
		padding-bottom: 0.85rem;
	}

	.faq-question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.05rem;
		font-weight: 600;
		color: #1f2937;
		padding: 0.75rem 0;
		cursor: pointer;
		list-style: none;
		outline: none;
	}

	.faq-question::-webkit-details-marker {
		display: none;
	}

	.chevron-icon {
		width: 1.2rem;
		height: 1.2rem;
		color: #9ca3af;
		transition: transform 0.2s;
		flex-shrink: 0;
	}

	.faq-item[open] .chevron-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0.5rem 0 1rem 0;
		color: #4b5563;
		font-size: 0.95rem;
		line-height: 1.6;
		text-align: left;
	}

	.faq-answer p {
		margin: 0;
	}

	/* Bottom CTA Section */
	.bottom-cta-section {
		padding: 6rem 0;
		background-color: #0b0f19;
		color: #ffffff;
	}

	.bottom-cta-section h2 {
		font-size: 2.8rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		margin: 0 0 1rem 0;
	}

	.bottom-subtitle {
		color: #9ca3af;
		font-size: 1.15rem;
		max-width: 600px;
		margin: 0 auto 2.5rem auto;
		line-height: 1.6;
	}

	.bottom-form {
		max-width: 500px;
		margin: 0 auto 2.5rem auto;
	}

	.text-center-msg {
		text-align: center !important;
		margin-top: 0.8rem;
	}

	.bottom-btn {
		background-color: var(--color-yellow) !important;
		color: #ffffff !important;
	}

	.bottom-btn:hover {
		background-color: var(--color-yellow-hover) !important;
	}

	.bottom-price-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		font-family: var(--font-title);
		margin-bottom: 2rem;
	}

	/* Detailed Footer */
	.footer-detailed {
		background-color: #ffffff;
		color: #4b5563;
		border-top: 1px solid #e5e7eb;
		padding: 4rem 0;
		font-size: 0.78rem;
		line-height: 1.6;
		text-align: center;
	}

	.footer-container-detailed {
		max-width: 950px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.methodology, .disclaimer {
		margin: 0 0 1.5rem 0;
		text-align: center;
	}

	.ai-notice {
		font-style: italic;
		margin: 0 0 2rem 0;
		color: #9ca3af;
	}

	.footer-links-row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		color: #6b7280;
		margin-bottom: 1rem;
	}

	.footer-links-row a {
		color: #6b7280;
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-links-row a:hover {
		color: #111827;
		text-decoration: underline;
	}

	.divider-dot {
		color: #d1d5db;
	}

	.footer-legal-row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		color: #9ca3af;
	}

	.footer-legal-row a {
		color: #9ca3af;
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-legal-row a:hover {
		color: #4b5563;
		text-decoration: underline;
	}

	.divider-slash {
		color: #e5e7eb;
	}
</style>
