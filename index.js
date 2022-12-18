theme.ShippingBar = (function () {
		let bar = document.querySelector(".announcement-bar__text");
		let promote_text = bar.dataset.promote;
		let unlocked_text = bar.dataset.unlocked;
		let threshold = bar.dataset.threshold;

		function update() {
			$.getJSON("/cart.js").then(function (cart) {
				let value_left = threshold - cart.total_price;
				let value_left_money = Shopify.formatMoney(
					value_left,
					Shopify.money_format
				);
				if (value_left <= 0) {
					bar.innerHTML =
						'<p class="announcement-bar__message">' + unlocked_text + "</p>";
				} else {
					bar.innerHTML =
						'<p class="announcement-bar__message">' +
						promote_text.replace("[value]", value_left_money) +
						"</p>";
				}
			});
		}
		return { update: update };
	})();

window.onload = theme.ShippingBar.update();
