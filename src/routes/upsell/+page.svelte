<script>
	import { goto } from '$app/navigation';
	
	function handleAccept() {
		goto('/checkout?upsell=true');
	}

	function handleDecline() {
		goto('/checkout?upsell=false');
	}
</script>

<svelte:head>
	<title>Special Offer - Companion Workbook</title>
	<meta name="description" content="Add the Essential Home Plumbing Tools Checklist to your order for a special launch price." />
</svelte:head>

<!-- Promo Sale Banner -->
<div class="promo-bar warning-bar">
	⚠️ SPECIAL ONE-TIME OFFER — ONLY VALID BEFORE CHECKOUT
</div>

<main class="upsell-container">
	<div class="container text-center max-content">
		
		<div class="upsell-header">
			<span class="badge warning-badge">LIMITED TIME UPGRADE</span>
			<h1 class="upsell-title">Wait! Don't Checkout Yet...</h1>
			<p class="upsell-subtitle">
				Complete your toolbox and make repairs even easier. Add our companion workbook <strong>"The Essential Home Plumbing Tools Checklist"</strong> to your order for only <span class="highlight-yellow">$9</span> (regularly $19.00).
			</p>
		</div>

		<div class="upsell-grid">
			<!-- Book image -->
			<div class="upsell-image">
				<div class="book-container">
					<div class="book">
						<div class="book-spine"></div>
						<div class="book-cover">
							<img src="/images/companion-cover.png" alt="The Essential Home Plumbing Tools Checklist Companion Workbook Cover" />
						</div>
					</div>
				</div>
				<div class="badge-discount">-50% OFF WORKBOOK</div>
			</div>

			<!-- Value list -->
			<div class="upsell-features">
				<h3>What's Inside the Tools Checklist:</h3>
				<ul class="features-list">
					<li>
						<span class="icon">✅</span>
						<div>
							<strong>The Exact Toolbox Blueprint:</strong>
							<p>A categorized checklist of the 12 essential tools every homeowner needs. Don't buy expensive plumbing sets you will never use.</p>
						</div>
					</li>
					<li>
						<span class="icon">✅</span>
						<div>
							<strong>Sizing & Compatibility Guide:</strong>
							<p>A handy cheat-sheet for pipes and thread sizes. Walk into any hardware store and get the exact matching joints or washers on the first try.</p>
						</div>
					</li>
					<li>
						<span class="icon">✅</span>
						<div>
							<strong>Emergency Shut-off Checklist:</strong>
							<p>A printable sheet detailing where shut-off valves are located in typical home configurations and how to isolate leaks instantly.</p>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- Action Box -->
		<div class="action-box">
			<div class="pricing-summary">
				<div class="pricing-option">
					<span class="option-label">Original Price:</span>
					<span class="option-val slashed">$19.00</span>
				</div>
				<div class="pricing-option highlight">
					<span class="option-label">One-Time Offer Price:</span>
					<span class="option-val">$9.00</span>
				</div>
			</div>

			<div class="cta-buttons">
				<button class="btn-primary accept-btn" onclick={handleAccept}>
					✅ Yes, Add It to My Order
				</button>
				<button class="btn-secondary decline-btn" onclick={handleDecline}>
					❌ No thanks, I'll pass on this deal
				</button>
			</div>

			<p class="upsell-guarantee">🔒 Your purchase is backed by our 30-day money-back guarantee. Added items will be included on the checkout page.</p>
		</div>

	</div>
</main>

<footer>
	<div class="container">
		<p>&copy; {new Date().getFullYear()} Mark Silverbridge. All rights reserved.</p>
	</div>
</footer>

<style>
	.warning-bar {
		background-color: #f59e0b;
		color: #000;
	}

	.warning-badge {
		background-color: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
		border-color: rgba(245, 158, 11, 0.2);
	}

	.max-content {
		max-width: 850px;
	}

	.upsell-container {
		padding: 4rem 0;
	}

	.upsell-header {
		margin-bottom: 3rem;
	}

	.upsell-title {
		font-size: 3rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}

	.upsell-subtitle {
		font-size: 1.15rem;
		color: var(--color-text-secondary);
		max-width: 750px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.upsell-subtitle strong {
		color: var(--color-text-primary);
	}

	.upsell-grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 3rem;
		align-items: center;
		margin-bottom: 4rem;
	}

	@media (max-width: 768px) {
		.upsell-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.upsell-features {
			text-align: left;
		}
	}

	.upsell-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.badge-discount {
		background-color: rgba(248, 113, 113, 0.15);
		color: #f87171;
		border: 1px dashed rgba(248, 113, 113, 0.4);
		font-family: var(--font-title);
		font-size: 0.8rem;
		font-weight: 800;
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
	}

	.upsell-features {
		text-align: left;
	}

	.upsell-features h3 {
		font-size: 1.4rem;
		margin-bottom: 1.5rem;
		color: var(--color-text-primary);
	}

	.features-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.features-list li {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.features-list li .icon {
		font-size: 1.25rem;
		margin-top: 0.2rem;
	}

	.features-list li strong {
		display: block;
		font-family: var(--font-title);
		font-size: 1.05rem;
		color: var(--color-text-primary);
		margin-bottom: 0.25rem;
	}

	.features-list li p {
		color: var(--color-text-secondary);
		font-size: 0.95rem;
	}

	/* Action Box */
	.action-box {
		background-color: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.pricing-summary {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
		flex-wrap: wrap;
	}

	.pricing-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-title);
	}

	.option-label {
		color: var(--color-text-secondary);
		font-size: 0.95rem;
	}

	.option-val {
		font-size: 1.25rem;
		font-weight: 800;
	}

	.option-val.slashed {
		text-decoration: line-through;
		color: var(--color-text-secondary);
	}

	.pricing-option.highlight .option-val {
		color: var(--color-yellow);
		font-size: 1.5rem;
	}

	.cta-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.2rem;
		margin-bottom: 1.5rem;
	}

	@media (max-width: 600px) {
		.cta-buttons {
			grid-template-columns: 1fr;
			gap: 0.8rem;
		}
	}

	.accept-btn {
		font-size: 1.1rem;
		padding: 1.1rem 2rem;
	}

	.decline-btn {
		font-size: 1rem;
		padding: 1.1rem 2rem;
	}

	.upsell-guarantee {
		font-size: 0.85rem;
		color: var(--color-text-secondary);
	}
</style>
