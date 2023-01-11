# Shopify Free Shipping Bar

This code creates a countdown timer that displays the remaining time until 11:30 am Eastern Time of the next business day, and also displays the delivery date range between two dates (2 business days and 3 business days ahead).

## HTML Markup
The following HTML markup is used to create the container for the timer and display the remaining time and delivery date range:

```
<div class="shipping-countdown">
  <p class="shipping-countdown-title">Estimated Delivery Date</p>
  <span class="shipping-countdown-text" id="orderBefore"></span><br />
  <span class="shipping-countdown-text" id="range"></span>
</div>
```

## JavaScript

The following JavaScript is used to calculate and display the remaining time and delivery date range:

```
function countDown() {
    // Get the current time in Eastern Time
    const now = luxon.DateTime.local().setZone("America/New_York");
    now.setupBusiness();

    // Set the target cutoff time time to 11:30 am Eastern Time
    let targetTime = now.set({ hour: 11, minute: 30, second: 0 });

    // If the current time is after 11:30 am, set the target time to the same time on the following business day
    if (now > targetTime || now.weekday > 5) {
        targetTime = targetTime.plusBusiness({ days: 1 });
        while (targetTime.weekday > 5) {
            targetTime = targetTime.plusBusiness({ days: 1 });
        }
    }

    // Calculate the time remaining until the target time
    const remainingTime = targetTime
        .diff(now, ["hours", "minutes", "seconds"])
        .toObject();

    document.getElementById("orderBefore").innerHTML = `
     Order within ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, and ${remainingTime.seconds} seconds
    `;

    // Change the delivery between dates
    let earlyDelivery = now.plusBusiness({ days: 2 });
    let lateDelivery = now.plusBusiness({ days: 3 });

    function formatDate(now) {
        return now.toLocaleString({
            weekday: "long",
            month: "long",
            day: "2-digit"
        });
    }

    document.getElementById("range").innerHTML = `
    to receive your package between ${formatDate(
        earlyDelivery
    )} and ${formatDate(lateDelivery)}.
      `;
}

setInterval(countDown, 1000);
```

The countDown() function is responsible for calculating and displaying the remaining time until the target time of 11:30 am Eastern Time of the next business day, by setting up the current time in Eastern Time, then setting the target time as 11:30 am, and checking if the current time is after the target time or if the current day is a weekend day, in which case it sets the target time to the same time on the following business day.

Then the function calculates the remaining time until the target time and formats it as hours, minutes, and seconds, and displays it in the "orderBefore" span element. It also calculates the delivery date range between two dates (2 business days and 3 business days ahead) and formats it as a human-readable string, and displays it in the "range" span element.

The setInterval() method is used to call the countDown() function every second (1000 milliseconds). So the countdown will be continuously updated every second.

## Usage

To use this code, you will need to add the HTML, CSS, and JavaScript code to your project and ensure that you have the luxon library imported.

Note: You should be aware that this code has a specific timezone "Eastern Time" and specific business hours and cutoff time, so it should be customized if you need to use it in another time zone or specific business hours.
