<script>
	import { page } from '$app/stores';
	
	// Svelte 5 derived state
	let hasUpsell = $derived($page.url.searchParams.get('upsell') === 'true');
	let customerEmail = $derived($page.url.searchParams.get('email') || 'your-email@example.com');
	
	// Generates a mock invoice number
	const invoiceNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);
</script>

<svelte:head>
	<title>Order Complete - Thank You!</title>
	<meta name="description" content="Your order was completed successfully. Download your guides below." />
</svelte:head>

<main class="success-page">
	<div class="container text-center max-content">
		
		<!-- Success Animation Card -->
		<div class="success-card">
			<div class="success-icon-wrapper">
				<svg class="success-check-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				</svg>
			</div>

			<h1 class="success-title">Order Confirmed!</h1>
			<p class="success-desc">
				Thank you for your purchase, Mark Silverbridge's plumbing guide is now ready for download. We've also sent a receipt and download copy to <strong>{customerEmail}</strong>.
			</p>
			
			<div class="invoice-details">
				<div class="detail-row">
					<span class="detail-label">Invoice Number:</span>
					<span class="detail-val">{invoiceNumber}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Payment Date:</span>
					<span class="detail-val">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Payment Status:</span>
					<span class="detail-val status-paid">PAID (via Stripe)</span>
				</div>
			</div>
		</div>

		<!-- Downloads Section -->
		<div class="downloads-section">
			<h2>Your Digital Library Downloads</h2>
			<p class="downloads-sub">Click the buttons below to open or download your PDF guides instantly.</p>

			<div class="downloads-grid">
				<!-- Main Book -->
				<div class="download-item-card">
					<div class="download-img">
						<img src="/images/ebook-cover.png" alt="Main Ebook Cover" />
					</div>
					<div class="download-info">
						<h3>50 Easy Plumbing Fixes That Will Save You $10,000</h3>
						<p class="file-size">PDF Ebook • 122 Pages • 18.4 MB</p>
						<a href="#download-main" class="btn-primary dl-btn" onclick={(e) => { e.preventDefault(); alert('Simulated PDF Download triggered for Main Guide!'); }}>
							📥 Download Ebook PDF
						</a>
					</div>
				</div>

				<!-- Companion Book (If purchased) -->
				{#if hasUpsell}
					<div class="download-item-card">
						<div class="download-img">
							<img src="/images/companion-cover.png" alt="Companion Cover" />
						</div>
						<div class="download-info">
							<h3>The Essential Home Plumbing Tools Checklist</h3>
							<p class="file-size">PDF Workbook • 18 Pages • 4.2 MB</p>
							<a href="#download-companion" class="btn-primary dl-btn warning-dl" onclick={(e) => { e.preventDefault(); alert('Simulated PDF Download triggered for Tools Checklist!'); }}>
								📥 Download Checklist PDF
							</a>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Return link -->
		<div class="return-home">
			<a href="/" class="btn-secondary return-btn">
				← Return to Homepage
			</a>
		</div>

	</div>
</main>

<footer>
	<div class="container">
		<p>&copy; {new Date().getFullYear()} Mark Silverbridge. All rights reserved.</p>
	</div>
</footer>

<style>
	.max-content {
		max-width: 750px;
	}

	.success-page {
		padding: 5rem 0;
	}

	/* Success Card layout */
	.success-card {
		background-color: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 20px;
		padding: 3.5rem 2.5rem;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
		margin-bottom: 3.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.success-icon-wrapper {
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
		background-color: rgba(251, 191, 36, 0.1);
		color: var(--color-yellow);
		border: 2px solid rgba(251, 191, 36, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.success-check-icon {
		width: 2.2rem;
		height: 2.2rem;
	}

	.success-title {
		font-size: 2.5rem;
		font-weight: 900;
		margin-bottom: 0.8rem;
		letter-spacing: -0.02em;
	}

	.success-desc {
		color: var(--color-text-secondary);
		font-size: 1.05rem;
		max-width: 580px;
		line-height: 1.6;
		margin-bottom: 2.5rem;
	}

	.success-desc strong {
		color: var(--color-text-primary);
	}

	/* Invoice details alignment */
	.invoice-details {
		border-top: 1px solid var(--color-border);
		width: 100%;
		max-width: 480px;
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.95rem;
	}

	.detail-label {
		color: var(--color-text-secondary);
	}

	.detail-val {
		font-weight: 600;
		font-family: var(--font-title);
	}

	.status-paid {
		color: #34d399; /* Green paid color */
	}

	/* Downloads section */
	.downloads-section {
		margin-bottom: 4rem;
	}

	.downloads-section h2 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.downloads-sub {
		color: var(--color-text-secondary);
		margin-bottom: 2.5rem;
	}

	.downloads-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.download-item-card {
		background-color: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		padding: 2rem;
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 2rem;
		align-items: center;
		text-align: left;
		transition: transform var(--transition-speed);
	}

	.download-item-card:hover {
		transform: translateY(-2px);
		border-color: rgba(251, 191, 36, 0.15);
	}

	.download-img {
		width: 80px;
		height: 110px;
		border-radius: 6px;
		overflow: hidden;
		box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
	}

	.download-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.download-info h3 {
		font-size: 1.25rem;
		margin-bottom: 0.25rem;
		line-height: 1.3;
	}

	.file-size {
		color: var(--color-text-secondary);
		font-size: 0.85rem;
		margin-bottom: 1.2rem;
	}

	.dl-btn {
		width: auto;
		display: inline-flex;
		font-size: 0.9rem;
		padding: 0.6rem 1.5rem;
		border-radius: 6px;
	}

	.warning-dl {
		background-color: #f59e0b;
		color: #000;
		box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
	}

	.warning-dl:hover {
		background-color: #d97706;
		box-shadow: 0 6px 18px rgba(245, 158, 11, 0.5);
	}

	@media (max-width: 600px) {
		.download-item-card {
			grid-template-columns: 1fr;
			text-align: center;
			justify-items: center;
			gap: 1.5rem;
		}
		.dl-btn {
			width: 100%;
		}
	}

	.return-home {
		display: flex;
		justify-content: center;
	}

	.return-btn {
		width: auto;
		padding: 0.8rem 2.5rem;
	}
</style>
