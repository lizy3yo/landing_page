<script>
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	// Svelte 5 state variables
	let email = $state("");
	let cardholderName = $state("");
	let cardNumber = $state("");
	let cardExpiry = $state("");
	let cardCvc = $state("");
	let isProcessing = $state(false);
	let errorMessage = $state("");

	// Get URL parameter
	let hasUpsell = $derived($page.url.searchParams.get("upsell") === "true");

	// Price calculation
	let basePrice = 16.99;
	let upsellPrice = 9.0;
	let totalPrice = $derived(hasUpsell ? basePrice + upsellPrice : basePrice);

	onMount(() => {
		// Prefill email from sessionStorage
		const storedEmail = sessionStorage.getItem("customer_email");
		if (storedEmail) {
			email = storedEmail;
		}
	});

	function handlePayment(event) {
		event.preventDefault();
		if (!email) {
			errorMessage = "Email address is required.";
			return;
		}
		if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
			errorMessage = "Please enter a valid card number.";
			return;
		}
		if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
			errorMessage = "Please enter card expiry date (MM/YY).";
			return;
		}
		if (!cardCvc || cardCvc.length < 3) {
			errorMessage = "Please enter a valid CVC code.";
			return;
		}
		if (!cardholderName) {
			errorMessage = "Please enter the name on the card.";
			return;
		}

		errorMessage = "";
		isProcessing = true;

		// Simulate payment delay
		setTimeout(() => {
			isProcessing = false;
			// Navigate to success page
			goto(
				`/success?upsell=${hasUpsell}&email=${encodeURIComponent(email)}`,
			);
		}, 2000);
	}
</script>

<svelte:head>
	<title>Secure Checkout | Stripe</title>
	<meta
		name="description"
		content="Secure payment processor page powered by Stripe."
	/>
</svelte:head>

<div class="stripe-checkout-page">
	<div class="stripe-checkout-container">
		<!-- Left Column: Order Summary -->
		<div class="summary-pane">
			<a
				href={hasUpsell ? "/upsell" : "/"}
				class="back-link"
				aria-label="Back"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.5"
					stroke="currentColor"
					class="back-icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
					/>
				</svg>
			</a>

			<div class="brand-summary">
				<div class="brand-logo">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.2"
						stroke="currentColor"
						class="shop-icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.5a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
						/>
					</svg>
				</div>
				<span class="brand-name">Aether Design</span>
			</div>

			<div class="pricing-headline">
				<span class="pay-label">Pay Aether Design</span>
				<div class="amount-display">
					<span class="currency-symbol">$</span>
					<span class="amount-val">{totalPrice.toFixed(2)}</span>
				</div>
			</div>

			<!-- Product Items List -->
			<div class="items-list">
				<div class="item-row">
					<div class="item-details">
						<h4 class="item-title">The UI Design Playbook</h4>
						<p class="item-subtitle">Digital PDF Guide</p>
					</div>
					<span class="item-price">${basePrice.toFixed(2)}</span>
				</div>

				{#if hasUpsell}
					<div class="item-row">
						<div class="item-details">
							<h4 class="item-title">
								Figma Auto-Layout Workbook
							</h4>
							<p class="item-subtitle">Companion Workbook</p>
						</div>
						<span class="item-price">${upsellPrice.toFixed(2)}</span
						>
					</div>
				{/if}
			</div>

			<!-- Financials -->
			<div class="invoice-summary">
				<div class="invoice-row">
					<span>Subtotal</span>
					<span>${totalPrice.toFixed(2)}</span>
				</div>
				<div class="promo-row">
					<button type="button" class="promo-btn"
						>Add promotion code</button
					>
				</div>
				<div class="invoice-row total-row">
					<span>Total due</span>
					<span>${totalPrice.toFixed(2)}</span>
				</div>
			</div>
		</div>

		<!-- Right Column: Stripe Payment Form -->
		<div class="payment-pane">
			<!-- Pay with Link option -->
			<button
				type="button"
				class="link-btn"
				onclick={() => alert("Link login sequence simulated!")}
			>
				<span class="pay-with-text">Pay with</span>
				<span class="link-brand">
					<span class="link-circle">
						<svg
							class="link-circle-svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
							/>
						</svg>
					</span>
					<span class="link-word">link</span>
				</span>
			</button>

			<div class="or-separator">
				<div class="separator-line"></div>
				<span class="or-text">OR</span>
				<div class="separator-line"></div>
			</div>

			<form onsubmit={handlePayment}>
				<!-- Contact Information -->
				<div class="section-container">
					<h3 class="section-title">Contact information</h3>
					<div class="input-wrapper email-wrapper">
						<label for="stripe-email" class="inline-label"
							>Email</label
						>
						<input
							id="stripe-email"
							type="email"
							placeholder="dejesuskhar132@gmail.com"
							bind:value={email}
							class="stripe-input-inline"
							required
						/>
					</div>
				</div>

				<!-- Payment Method -->
				<div class="section-container">
					<h3 class="section-title">Payment method</h3>

					<div class="card-element-container">
						<!-- Card header line -->
						<div class="card-header">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								class="card-type-icon"
								viewBox="0 0 24 24"
							>
								<path
									d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v8z"
								/>
							</svg>
							<span class="card-header-text">Card</span>
						</div>

						<!-- Card fields block -->
						<div class="card-fields-box">
							<!-- Card Number Field -->
							<div class="form-group-card no-border-top">
								<label for="card-number" class="hidden-label"
									>Card information</label
								>
								<div class="card-number-wrapper">
									<input
										id="card-number"
										type="text"
										placeholder="1234 1234 1234 1234"
										bind:value={cardNumber}
										maxlength="19"
										class="card-inner-input"
										required
									/>
									<div class="card-logos-inline">
										<!-- Visa -->
										<svg
											class="card-logo visa"
											viewBox="0 0 36 24"
											width="24"
											height="16"
										>
											<rect
												width="36"
												height="24"
												rx="2"
												fill="#1A1F71"
											/>
											<path
												d="M13.6 15.6h1.8l1.1-7h-1.8m4.9 0h-1.7c-.5 0-.9.3-1.1.8l-3.2 6.2h1.9l.4-.9h2.3l.2.9h1.7l-1.5-7zm-1.8 4.2l.7-2.1.4 2.1h-1.1zm8.3-4.2h-1.8l-1.4 4.8-.6-4.1c-.1-.5-.5-.7-.9-.7h-2.9v.4c.6.1 1.2.3 1.6.6l1.5 5.7h1.9l2.8-7zm4.3 1.9c0-1.2-.7-1.7-1.5-2.1-.8-.4-1.3-.6-1.3-.9 0-.3.3-.6.9-.6.8 0 1.4.3 1.7.5l.3-1.4c-.4-.2-1.1-.4-1.9-.4-1.7 0-2.9.9-2.9 2.3 0 1 .9 1.5 1.6 1.9.7.3 1 .6 1 .9 0 .5-.6.7-1.1.7-.9 0-1.5-.2-1.9-.4l-.3 1.4c.5.2(1.3).4 2.1.4 1.8.1 3-.8 3-2.3z"
												fill="#FFF"
											/>
										</svg>
										<!-- Mastercard -->
										<svg
											class="card-logo mastercard"
											viewBox="0 0 36 24"
											width="24"
											height="16"
										>
											<rect
												width="36"
												height="24"
												rx="2"
												fill="#222"
											/>
											<circle
												cx="14"
												cy="12"
												r="7"
												fill="#EB001B"
											/>
											<circle
												cx="22"
												cy="12"
												r="7"
												fill="#F79E1B"
												fill-opacity="0.8"
											/>
										</svg>
										<!-- Amex -->
										<svg
											class="card-logo amex"
											viewBox="0 0 36 24"
											width="24"
											height="16"
										>
											<rect
												width="36"
												height="24"
												rx="2"
												fill="#01A6CA"
											/>
											<text
												x="4"
												y="15"
												fill="#FFF"
												font-size="7"
												font-family="sans-serif"
												font-weight="bold">AMEX</text
											>
										</svg>
										<!-- Discover -->
										<svg
											class="card-logo discover"
											viewBox="0 0 36 24"
											width="24"
											height="16"
										>
											<rect
												width="36"
												height="24"
												rx="2"
												fill="#F45B2B"
											/>
											<circle
												cx="18"
												cy="12"
												r="6"
												fill="#FFF"
												fill-opacity="0.3"
											/>
										</svg>
									</div>
								</div>
							</div>

							<!-- Expiry & CVC inline row -->
							<div class="card-row-split">
								<div class="form-group-sub first-sub">
									<input
										id="card-expiry"
										type="text"
										placeholder="MM / YY"
										bind:value={cardExpiry}
										maxlength="5"
										class="card-inner-input-sub"
										required
									/>
								</div>
								<div class="form-group-sub second-sub">
									<div class="cvc-wrapper">
										<input
											id="card-cvc"
											type="password"
											placeholder="CVC"
											bind:value={cardCvc}
											maxlength="4"
											class="card-inner-input-sub"
											required
										/>
										<svg
											class="cvc-icon"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path
												d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
											/>
										</svg>
									</div>
								</div>
							</div>

							<!-- Cardholder Name Field -->
							<div class="form-group-card border-top">
								<label for="stripe-name" class="hidden-label"
									>Cardholder name</label
								>
								<input
									id="stripe-name"
									type="text"
									placeholder="Full name on card"
									bind:value={cardholderName}
									class="card-inner-input"
									required
								/>
							</div>

							<!-- Country dropdown -->
							<div
								class="form-group-card border-top select-group"
							>
								<label for="stripe-country" class="hidden-label"
									>Country or region</label
								>
								<div class="select-wrapper">
									<select
										id="stripe-country"
										class="card-inner-select"
									>
										<option value="PH">Philippines</option>
										<option value="US">United States</option
										>
										<option value="CA">Canada</option>
										<option value="UK"
											>United Kingdom</option
										>
										<option value="AU">Australia</option>
										<option value="SG">Singapore</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Save Info for Faster Checkout -->
				<div class="save-info-container">
					<label class="checkbox-label">
						<input type="checkbox" class="stripe-checkbox" />
						<div class="checkbox-text-wrapper">
							<span class="checkbox-title"
								>Save my information for faster checkout</span
							>
							<p class="checkbox-desc">
								Pay securely at Blueprint Media and everywhere <span
									class="link-underline">Link</span
								> is accepted.
							</p>
						</div>
					</label>
				</div>

				<!-- Error Message -->
				{#if errorMessage}
					<div class="stripe-error-banner">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="error-banner-icon"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
							/>
						</svg>
						<span>{errorMessage}</span>
					</div>
				{/if}

				<!-- Submit Button -->
				<button
					type="submit"
					class="submit-btn"
					disabled={isProcessing}
				>
					{#if isProcessing}
						<span class="spinner spinner-light"></span>
						<span>Processing...</span>
					{:else}
						<span>Pay</span>
					{/if}
				</button>
			</form>

			<!-- Stripe Footer -->
			<div class="stripe-footer-links">
				<span>Powered by <strong>stripe</strong></span>
				<span class="dot-sep">|</span>
				<a href="#terms" class="footer-link">Terms</a>
				<a href="#privacy" class="footer-link">Privacy</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* Exact Stripe Checkout Layout CSS */
	.stripe-checkout-page {
		background-color: #ffffff;
		color: #30313d;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: stretch;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Helvetica, Arial, sans-serif;
		padding: 0;
		margin: 0;
	}

	.stripe-checkout-container {
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
	}

	@media (max-width: 850px) {
		.stripe-checkout-container {
			grid-template-columns: 1fr;
		}
		.summary-pane {
			padding: 2.5rem 1.5rem !important;
			border-right: none !important;
			border-bottom: 1px solid #e6ebf1;
		}
		.payment-pane {
			padding: 2.5rem 1.5rem !important;
		}
	}

	/* Left Pane: Summary */
	.summary-pane {
		padding: 4.5rem 4rem 4.5rem 2rem;
		border-right: 1px solid #e6ebf1;
		display: flex;
		flex-direction: column;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		color: #697386;
		margin-bottom: 2.5rem;
		align-self: flex-start;
		transition: color 0.15s;
		text-decoration: none;
	}

	.back-link:hover {
		color: #30313d;
	}

	.back-icon {
		width: 1.15rem;
		height: 1.15rem;
	}

	.brand-summary {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1.25rem;
	}

	.brand-logo {
		width: 28px;
		height: 28px;
		background-color: #f3f4f6;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #697386;
	}

	.shop-icon {
		width: 1.1rem;
		height: 1.1rem;
	}

	.brand-name {
		font-weight: 600;
		font-size: 0.95rem;
		color: #697386;
	}

	.pricing-headline {
		margin-bottom: 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.pay-label {
		color: #697386;
		font-size: 0.95rem;
		font-weight: 500;
	}

	.amount-display {
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
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.item-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.item-details {
		display: flex;
		flex-direction: column;
		max-width: 80%;
	}

	.item-title {
		font-size: 0.88rem;
		font-weight: 600;
		color: #30313d;
		line-height: 1.4;
		margin: 0;
	}

	.item-subtitle {
		font-size: 0.82rem;
		color: #697386;
		margin: 3px 0 0 0;
	}

	.item-price {
		font-size: 0.88rem;
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
		margin-top: auto;
	}

	.invoice-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.88rem;
		color: #697386;
	}

	.promo-row {
		margin: 0.4rem 0;
	}

	.promo-btn {
		background: #f3f4f6;
		color: #30313d;
		border: none;
		border-radius: 6px;
		padding: 5px 10px;
		font-size: 0.82rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.15s;
	}

	.promo-btn:hover {
		background: #e5e7eb;
	}

	.total-row {
		border-top: 1px solid #e6ebf1;
		padding-top: 1rem;
		font-weight: 600;
		color: #30313d;
		font-size: 0.94rem;
	}

	/* Right Pane: Payment details */
	.payment-pane {
		padding: 4.5rem 2rem 4.5rem 4rem;
		display: flex;
		flex-direction: column;
	}

	/* Pay with Link green button */
	.link-btn {
		width: 100%;
		background-color: #00d46a;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.15s;
		margin-bottom: 1.5rem;
	}

	.link-btn:hover {
		background-color: #00bd5e;
	}

	.pay-with-text {
		font-weight: 500;
	}

	.link-brand {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		margin-left: 5px;
	}

	.link-circle {
		width: 16px;
		height: 16px;
		background-color: #ffffff;
		border-radius: 50%;
		color: #00d46a;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.link-circle-svg {
		width: 12px;
		height: 12px;
	}

	.link-word {
		font-style: italic;
		font-weight: 900;
		font-size: 1.1rem;
		letter-spacing: -0.6px;
	}

	/* OR Separator line */
	.or-separator {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.separator-line {
		flex: 1;
		height: 1px;
		background-color: #e6ebf1;
	}

	.or-text {
		color: #a3acb9;
		font-size: 0.72rem;
		font-weight: 600;
		margin: 0 0.8rem;
		letter-spacing: 0.5px;
	}

	/* Form Section Headers */
	.section-title {
		font-size: 0.92rem;
		font-weight: 600;
		color: #30313d;
		margin: 1.5rem 0 0.6rem 0;
	}

	.section-container {
		margin-bottom: 1.25rem;
	}

	/* Unified Contact Info Block */
	.input-wrapper.email-wrapper {
		display: flex;
		align-items: center;
		border: 1px solid #d3dbe4;
		border-radius: 5px;
		background: #ffffff;
		height: 44px;
		box-shadow:
			0px 1px 1px rgba(0, 0, 0, 0.02),
			0px 3px 6px rgba(18, 42, 66, 0.01);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.input-wrapper.email-wrapper:focus-within {
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
	}

	.inline-label {
		color: #697386;
		font-size: 0.88rem;
		font-weight: 500;
		padding-left: 14px;
		flex-shrink: 0;
		width: 60px;
	}

	.stripe-input-inline {
		flex: 1;
		border: none;
		height: 100%;
		font-size: 0.88rem;
		color: #30313d;
		outline: none;
		background: transparent;
		padding-right: 14px;
	}

	/* Stripe Card Container Elements */
	.card-element-container {
		border: 1px solid #d3dbe4;
		border-radius: 5px;
		background-color: #ffffff;
		box-shadow:
			0px 1px 1px rgba(0, 0, 0, 0.02),
			0px 3px 6px rgba(18, 42, 66, 0.01);
		overflow: hidden;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.card-element-container:focus-within {
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 8px;
		border-bottom: 1px solid #e6ebf1;
		padding: 10px 14px;
		background-color: #fbfbfc;
	}

	.card-type-icon {
		width: 1.05rem;
		height: 1.05rem;
		color: #697386;
	}

	.card-header-text {
		font-size: 0.88rem;
		font-weight: 600;
		color: #30313d;
	}

	.card-fields-box {
		display: flex;
		flex-direction: column;
	}

	.form-group-card {
		padding: 10px 14px;
	}

	.form-group-card.border-top {
		border-top: 1px solid #e6ebf1;
	}

	.card-number-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-inner-input {
		border: none;
		outline: none;
		font-size: 0.88rem;
		color: #30313d;
		width: 100%;
		background: transparent;
		padding: 0;
	}

	.card-logos-inline {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-shrink: 0;
	}

	.card-logo {
		border-radius: 2px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	/* Card split row for Expiry and CVC */
	.card-row-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-top: 1px solid #e6ebf1;
		border-bottom: 1px solid #e6ebf1;
	}

	.form-group-sub {
		padding: 10px 14px;
	}

	.first-sub {
		border-right: 1px solid #e6ebf1;
	}

	.card-inner-input-sub {
		border: none;
		outline: none;
		font-size: 0.88rem;
		color: #30313d;
		width: 100%;
		background: transparent;
		padding: 0;
	}

	.cvc-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cvc-icon {
		width: 1rem;
		height: 1rem;
		color: #a3acb9;
		flex-shrink: 0;
	}

	/* Select styling */
	.select-group {
		position: relative;
	}

	.card-inner-select {
		border: none;
		outline: none;
		font-size: 0.88rem;
		color: #30313d;
		width: 100%;
		background: transparent;
		cursor: pointer;
		-webkit-appearance: none;
		appearance: none;
		background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23697386' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 2px center;
		background-size: 1rem;
		padding-right: 20px;
	}

	.hidden-label {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* Save my info checkbox style */
	.save-info-container {
		margin: 1.5rem 0;
	}

	.checkbox-label {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		cursor: pointer;
	}

	.stripe-checkbox {
		width: 16px;
		height: 16px;
		border: 1px solid #d3dbe4;
		border-radius: 4px;
		margin-top: 3px;
		accent-color: #10b981;
		flex-shrink: 0;
	}

	.checkbox-text-wrapper {
		display: flex;
		flex-direction: column;
	}

	.checkbox-title {
		font-size: 0.88rem;
		font-weight: 600;
		color: #30313d;
	}

	.checkbox-desc {
		font-size: 0.78rem;
		color: #697386;
		margin: 3px 0 0 0;
		line-height: 1.4;
	}

	.link-underline {
		text-decoration: underline;
		font-weight: 500;
	}

	/* Blue Stripe Pay Button */
	.submit-btn {
		width: 100%;
		background-color: #10b981;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color 0.15s,
			transform 0.1s;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.submit-btn:hover:not(:disabled) {
		background-color: #059669;
	}

	.submit-btn:active:not(:disabled) {
		transform: scale(0.99);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Error banner */
	.stripe-error-banner {
		display: flex;
		align-items: center;
		gap: 8px;
		background-color: #fff5f5;
		border: 1px solid #fecaca;
		color: #dc2626;
		padding: 10px 14px;
		border-radius: 5px;
		font-size: 0.82rem;
		margin-bottom: 1.25rem;
	}

	.error-banner-icon {
		width: 1.1rem;
		height: 1.1rem;
		flex-shrink: 0;
	}

	/* Footer links */
	.stripe-footer-links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		color: #a3acb9;
		font-size: 0.75rem;
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	.dot-sep {
		color: #e6ebf1;
	}

	.footer-link {
		color: #a3acb9;
		text-decoration: none;
	}

	.footer-link:hover {
		color: #697386;
	}

	/* Spinner animation */
	.spinner {
		display: inline-block;
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #ffffff;
		animation: spin 0.8s linear infinite;
		margin-right: 8px;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
