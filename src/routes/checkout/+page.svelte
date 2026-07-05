<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Svelte 5 state variables
	let email = $state('');
	let cardholderName = $state('');
	let cardNumber = $state('');
	let cardExpiry = $state('');
	let cardCvc = $state('');
	let isProcessing = $state(false);
	let errorMessage = $state('');

	// Get URL parameter
	let hasUpsell = $derived($page.url.searchParams.get('upsell') === 'true');
	
	// Price calculation
	let basePrice = 16.99;
	let upsellPrice = 9.00;
	let totalPrice = $derived(hasUpsell ? basePrice + upsellPrice : basePrice);

	onMount(() => {
		// Prefill email from sessionStorage
		const storedEmail = sessionStorage.getItem('customer_email');
		if (storedEmail) {
			email = storedEmail;
		}
	});

	function handlePayment(event) {
		event.preventDefault();
		if (!email) {
			errorMessage = 'Email address is required.';
			return;
		}
		if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
			errorMessage = 'Please enter a valid card number.';
			return;
		}
		if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
			errorMessage = 'Please enter card expiry date (MM/YY).';
			return;
		}
		if (!cardCvc || cardCvc.length < 3) {
			errorMessage = 'Please enter a valid CVC code.';
			return;
		}
		if (!cardholderName) {
			errorMessage = 'Please enter the name on the card.';
			return;
		}

		errorMessage = '';
		isProcessing = true;

		// Simulate payment delay
		setTimeout(() => {
			isProcessing = false;
			// Navigate to success page
			goto(`/success?upsell=${hasUpsell}&email=${encodeURIComponent(email)}`);
		}, 2000);
	}
</script>

<svelte:head>
	<title>Secure Checkout | Stripe</title>
	<meta name="description" content="Secure payment processor page powered by Stripe." />
</svelte:head>

<div class="stripe-page">
	<div class="stripe-checkout-container">
		
		<!-- Left Pane: Order Summary -->
		<div class="summary-pane">
			<a href={hasUpsell ? "/upsell" : "/"} class="back-link">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="back-icon">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
				</svg>
				<span>Back</span>
			</a>
			
			<div class="brand-summary">
				<div class="brand-avatar">🛠️</div>
				<span class="brand-name">Mark Silverbridge</span>
			</div>
			
			<div class="pricing-headline">
				<span class="currency-symbol">$</span>
				<span class="amount-val">{totalPrice.toFixed(2)}</span>
			</div>

			<!-- Product Items List -->
			<div class="items-list">
				<div class="item-row">
					<div class="item-info">
						<div class="item-img-container">
							<img src="/images/ebook-cover.png" alt="Main Ebook Cover" />
						</div>
						<div>
							<h4 class="item-title">50 Easy Plumbing Fixes</h4>
							<p class="item-sub">Digital PDF Guide</p>
						</div>
					</div>
					<span class="item-price">${basePrice.toFixed(2)}</span>
				</div>

				{#if hasUpsell}
					<div class="item-row">
						<div class="item-info">
							<div class="item-img-container">
								<img src="/images/companion-cover.png" alt="Companion Cover" />
							</div>
							<div>
								<h4 class="item-title">Essential Tools Checklist</h4>
								<p class="item-sub">Companion Workbook</p>
							</div>
						</div>
						<span class="item-price">${upsellPrice.toFixed(2)}</span>
					</div>
				{/if}
			</div>

			<!-- Subtotals -->
			<div class="invoice-summary">
				<div class="invoice-row">
					<span>Subtotal</span>
					<span>${totalPrice.toFixed(2)}</span>
				</div>
				<div class="invoice-row">
					<span>Tax (0%)</span>
					<span>$0.00</span>
				</div>
				<div class="invoice-row total-row">
					<span>Total due</span>
					<span>${totalPrice.toFixed(2)}</span>
				</div>
			</div>

			<div class="stripe-badge-wrapper">
				<span class="stripe-badge">TEST MODE</span>
			</div>
		</div>

		<!-- Right Pane: Stripe Payment Form -->
		<div class="payment-pane">
			<h2>Pay with card</h2>
			
			{#if errorMessage}
				<div class="stripe-error">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="error-icon">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
					</svg>
					<span>{errorMessage}</span>
				</div>
			{/if}

			<form onsubmit={handlePayment}>
				
				<!-- Email Address -->
				<div class="form-group-stripe">
					<label for="stripe-email">Email</label>
					<input 
						id="stripe-email" 
						type="email" 
						placeholder="your@email.com" 
						bind:value={email}
						class="stripe-input"
						required
					/>
				</div>

				<!-- Card Info -->
				<div class="form-group-stripe">
					<label for="card-details">Card information</label>
					<div class="card-inputs-wrapper">
						<input 
							id="card-number" 
							type="text" 
							placeholder="1234 5678 1234 5678" 
							bind:value={cardNumber}
							maxlength="19"
							class="stripe-input sub-input number"
							required
						/>
						<div class="card-details-sub">
							<input 
								id="card-expiry" 
								type="text" 
								placeholder="MM/YY" 
								bind:value={cardExpiry}
								maxlength="5"
								class="stripe-input sub-input expiry"
								required
							/>
							<input 
								id="card-cvc" 
								type="password" 
								placeholder="CVC" 
								bind:value={cardCvc}
								maxlength="4"
								class="stripe-input sub-input cvc"
								required
							/>
						</div>
					</div>
				</div>

				<!-- Cardholder Name -->
				<div class="form-group-stripe">
					<label for="stripe-name">Name on card</label>
					<input 
						id="stripe-name" 
						type="text" 
						placeholder="Jane Doe" 
						bind:value={cardholderName}
						class="stripe-input"
						required
					/>
				</div>

				<!-- Billing Country -->
				<div class="form-group-stripe">
					<label for="stripe-country">Country or region</label>
					<select id="stripe-country" class="stripe-input select">
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="UK">United Kingdom</option>
						<option value="AU">Australia</option>
						<option value="DE">Germany</option>
						<option value="FR">France</option>
					</select>
				</div>

				<!-- Submit Button -->
				<button type="submit" class="stripe-btn" disabled={isProcessing}>
					{#if isProcessing}
						<span class="spinner spinner-light"></span>
						<span>Processing payment...</span>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="lock-icon-btn">
							<path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
						</svg>
						<span>Pay ${totalPrice.toFixed(2)}</span>
					{/if}
				</button>
			</form>

			<div class="stripe-security">
				<span>Powered by <strong>stripe</strong></span>
				<span class="sec-divider">|</span>
				<span>Terms</span>
				<span class="sec-divider">|</span>
				<span>Privacy</span>
			</div>
		</div>

	</div>
</div>

<style>
	/* Custom styling mirroring Stripe Checkout */
	.stripe-page {
		background-color: #ffffff;
		color: #30313d;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: stretch;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
	}

	.stripe-checkout-container {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.stripe-checkout-container {
			grid-template-columns: 1fr;
		}
		
		.summary-pane {
			border-right: none !important;
			border-bottom: 1px solid #e6ebf1;
			padding: 2.5rem 1.5rem !important;
		}

		.payment-pane {
			padding: 2.5rem 1.5rem !important;
		}
	}

	/* Left Summary Pane */
	.summary-pane {
		background-color: #f8f9fa;
		border-right: 1px solid #e6ebf1;
		padding: 4rem 3rem;
		display: flex;
		flex-direction: column;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: #697386;
		font-size: 0.85rem;
		font-weight: 500;
		margin-bottom: 2.5rem;
		transition: color var(--transition-speed);
		align-self: flex-start;
	}

	.back-link:hover {
		color: #30313d;
	}

	.back-icon {
		width: 0.9rem;
		height: 0.9rem;
	}

	.brand-summary {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1rem;
	}

	.brand-avatar {
		font-size: 1.3rem;
	}

	.brand-name {
		font-weight: 600;
		font-size: 0.95rem;
		color: #697386;
	}

	.pricing-headline {
		margin-bottom: 2.5rem;
		display: flex;
		align-items: baseline;
		color: #30313d;
	}

	.currency-symbol {
		font-size: 1.8rem;
		font-weight: 600;
		margin-right: 0.1rem;
	}

	.amount-val {
		font-size: 2.8rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	/* Product Items list styling */
	.items-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-bottom: 2rem;
	}

	.item-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.item-img-container {
		width: 44px;
		height: 58px;
		border-radius: 4px;
		overflow: hidden;
		border: 1px solid #e6ebf1;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		background-color: #fff;
	}

	.item-img-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.item-title {
		font-size: 0.9rem;
		font-weight: 600;
		color: #30313d;
	}

	.item-sub {
		font-size: 0.8rem;
		color: #697386;
		margin-top: 0.1rem;
	}

	.item-price {
		font-size: 0.9rem;
		font-weight: 500;
		color: #30313d;
	}

	/* Invoice summary calculations */
	.invoice-summary {
		border-top: 1px solid #e6ebf1;
		padding-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.invoice-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.85rem;
		color: #697386;
	}

	.total-row {
		border-top: 1px solid #e6ebf1;
		padding-top: 1rem;
		font-weight: 600;
		color: #30313d;
		font-size: 0.95rem;
	}

	.stripe-badge-wrapper {
		margin-top: auto;
		padding-top: 3rem;
	}

	.stripe-badge {
		background-color: #e3e8ee;
		color: #4f5b66;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		letter-spacing: 0.05em;
	}

	/* Right Payment Form Pane */
	.payment-pane {
		padding: 4rem 3.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.payment-pane h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #30313d;
		margin-bottom: 1.8rem;
	}

	/* Form Styling */
	.form-group-stripe {
		margin-bottom: 1.5rem;
	}

	.form-group-stripe label {
		display: block;
		font-size: 0.85rem;
		font-weight: 500;
		color: #4f5b66;
		margin-bottom: 0.4rem;
	}

	.stripe-input {
		width: 100%;
		border: 1px solid #d3dbe4;
		border-radius: 5px;
		padding: 0.75rem 0.9rem;
		font-size: 0.95rem;
		color: #30313d;
		outline: none;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02);
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
		background-color: #ffffff;
	}

	.stripe-input:focus {
		border-color: #635bff;
		box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.15);
	}

	.stripe-input.select {
		appearance: none;
		background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f5b66' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.8rem center;
		background-size: 1rem;
		padding-right: 2rem;
		cursor: pointer;
	}

	/* Combined card field mimicking Stripe card element */
	.card-inputs-wrapper {
		display: flex;
		flex-direction: column;
		border: 1px solid #d3dbe4;
		border-radius: 5px;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02);
		overflow: hidden;
	}

	.card-inputs-wrapper:focus-within {
		border-color: #635bff;
		box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.15);
	}

	.stripe-input.sub-input {
		border: none;
		border-radius: 0;
		box-shadow: none;
	}

	.stripe-input.sub-input.number {
		border-bottom: 1px solid #e6ebf1;
		background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='%23635BFF'%3E%3Cpath d='M30 6H2C0.9 6 0 6.9 0 8v16c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2V8c0-1.1-0.9-2-2-2zM30 24H2v-6h28v6zm0-10H2V8h28v6z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.8rem center;
		background-size: 1.5rem;
		padding-right: 2.5rem;
	}

	.card-details-sub {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.stripe-input.sub-input.expiry {
		border-right: 1px solid #e6ebf1;
	}

	/* Errors */
	.stripe-error {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: #fff9f9;
		border: 1px solid #ffd0d0;
		color: #df1b41;
		padding: 0.75rem 1rem;
		border-radius: 5px;
		font-size: 0.85rem;
		margin-bottom: 1.5rem;
	}

	.error-icon {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}

	/* Stripe pay button style */
	.stripe-btn {
		width: 100%;
		background-color: #635bff;
		color: #ffffff;
		border: none;
		padding: 0.85rem 1rem;
		font-size: 0.95rem;
		font-weight: 600;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(99, 91, 255, 0.16);
		transition: background-color 0.15s ease, transform 0.15s ease;
		margin-top: 2rem;
	}

	.stripe-btn:hover:not(:disabled) {
		background-color: #0a2540;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(10, 37, 64, 0.24);
	}

	.stripe-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	.stripe-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.lock-icon-btn {
		width: 0.85rem;
		height: 0.85rem;
	}

	.stripe-security {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.6rem;
		color: #a3acb9;
		font-size: 0.75rem;
		margin-top: 3rem;
	}

	.stripe-security strong {
		color: #8792a2;
	}

	.sec-divider {
		color: #e6ebf1;
	}
</style>
