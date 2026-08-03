async function loadInvoices() {
  const res = await fetch('/api/invoices');
  const invoices = await res.json();
  document.getElementById('rows').innerHTML = invoices
    .map((inv) => `
      <tr>
        <td>${inv.id}</td>
        <td>${inv.customer}</td>
        <td><span class="status">${inv.status}</span></td>
        <td>${inv.due}</td>
        <td class="money">£${inv.total.toFixed(2)}</td>
      </tr>`)
    .join('');
}

loadInvoices();
