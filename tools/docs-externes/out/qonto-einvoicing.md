> ## Documentation Index
> Fetch the complete documentation index at: https://docs.qonto.com/llms.txt
> Use this file to discover all available pages before exploring further.

# E-invoicing via API

> How to send and receive electronic invoices through Qonto's API

Qonto is a certified **Plateforme Agréée (PA)** in France's e-invoicing network. You can send invoices to clients, receive invoices from suppliers, and generate Factur-X-compliant documents .  all through our API.

## Does Qonto support AFNOR XP Z12-013?

Qonto's API does not follow the [AFNOR XP Z12-013 standard](https://www.boutique.afnor.org/fr-fr/norme/xp-z12013/api-pour-interfacer-les-systemes-dinformations-des-entreprises-avec-les-pla/fa212532/444702). However, it covers the same e-invoicing use cases. The only difference is that it is Qonto-specific rather than following the AFNOR interoperability standard.

| What you want to do | Qonto API |
| - | - |
| Send invoices to clients through the e-invoicing network | [`POST /v2/client_invoices/{id}/send_by_einvoice`](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice-by-e-invoice) |
| Receive invoices from suppliers | [`GET /v2/supplier_invoices`](https://docs.qonto.com/api-reference/business-api/expense-management/supplier-invoices/list-supplier-invoices) |
| Import invoices generated in your own tool (Factur-X, UBL, CII) | [`POST /v2/client_invoices/bulk`](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/bulk-import-client-invoices) |
| Track invoice lifecycle and status | [`GET /v2/client_invoices/{id}`](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/retrieve-a-client-invoice) |
| Generate Factur-X invoices directly on Qonto | [Factur-X guide](https://docs.qonto.com/get-started/business-api/use-cases/generate-factur-x-invoice.md) |
| Check your e-invoicing settings | [`GET /v2/einvoicing/settings`](https://docs.qonto.com/api-reference/business-api/expense-management/e-invoicing/retrieve-settings) |

> [!NOTE]
>
> `sending_status` reports whether e-invoicing is activated on the organization. For French organizations it does **not** cover the *Annuaire* registration, which is also required to send — see [Send a client invoice via e-invoice](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice-by-e-invoice.md) for the full list of prerequisites and the errors they produce.

## I generate Factur-X invoices in my own tool: how do I send them through Qonto?

If you already produce structured invoices (Factur-X, UBL 2.1, or CII) and want Qonto to handle transmission through the e-invoicing network:

1. **Import the invoice** via [`POST /v2/client_invoices/bulk`](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/bulk-import-client-invoices) to register it and obtain a `client_invoice_id`
2. **Send it via e-invoicing** via [`POST /v2/client_invoices/{id}/send_by_einvoice`](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice-by-e-invoice).  Qonto routes it to the recipient's platform
3. **Track delivery** by polling [`GET /v2/client_invoices/{id}`](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/retrieve-a-client-invoice) for status updates

This is the [PA as a Service](https://docs.qonto.com/qonto-embed/plateforme-agreee-as-a-service.md) flow. Your users keep generating invoices in your tool.  Qonto handles the network routing.

## Where to go next

> **[Generate a Factur-X invoice](https://docs.qonto.com/get-started/business-api/use-cases/generate-factur-x-invoice.md)**
>
> Full walkthrough with Python and Node.js code examples.

> **[PA as a Service](https://docs.qonto.com/qonto-embed/plateforme-agreee-as-a-service.md)**
>
> Use Qonto as a transmission platform for your own invoicing tool.

> **[Factur-X reference](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/introduction-factur-x.md)**
>
> How Factur-X PDF generation works on Qonto.
