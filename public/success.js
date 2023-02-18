document.addEventListener("DOMContentLoaded", async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let sessionId = urlParams.get("session_id");

  if (sessionId) {
    const { customer, session } =
      await fetch(`stripe/order/success?session_id=${sessionId}
  `)
        .then((res) => res.json())
        .catch((error) => console.log(error));
    console.log(customer);
    setText("customer_name", customer.name);
  }
});

const setText = (elementId, text) => {
  const element = document.querySelector(`${elementId}`);
  element.innerHTML = text;
};
