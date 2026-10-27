> ## Documentation Index
> Fetch the complete documentation index at: https://docs.qonto.com/llms.txt
> Use this file to discover all available pages before exploring further.

# PA as a Service

**What is PA as a Service?**

Qonto is a certified Plateforme Agréée (PA) - an approved platform in the French e-invoicing network mandated by the 2026 reform. As part of this network, Qonto can route structured electronic invoices between businesses on their behalf.

PA as a Service (PAaaS) lets your invoicing software plug directly into Qonto's PA via API. Your users keep generating invoices in your tool - Qonto handles the transmission through the e-invoicing network. No Qonto interface, no workflow disruption.

***

**How it works**

The integration follows three steps:

1. **Your user creates an invoice** in your tool, exported in one of the supported structured formats: Factur-X (recommended), UBL 2.1, or CII.
2. **You import the invoice to Qonto** via `POST /v2/client_invoices/bulk`. This registers the invoice and returns a `client_invoice_id`.
3. **You send the invoice via Qonto's PA** using that `client_invoice_id`. Qonto routes it through the e-invoicing network to the recipient's platform.

Once sent, you can poll the invoice status to track delivery and payment updates.

> [!NOTE]
>
> Coming soon: webhooks so you can be notified of supplier and client invoices' lifecycle events

***

**Account setup**

Each of your users needs a "Qonto PA" account (free, €0/month) to be registered as a PA user. This lightweight onboarding can be triggered programmatically - see [Create a registration](https://docs.qonto.com/api-reference/onboarding-api/endpoints/registrations/create-a-registration.md) for the full flow, including the PA-specific account configuration.

***

**Key endpoints**

* [Create a registration](https://docs.qonto.com/api-reference/onboarding-api/endpoints/registrations/create-a-registration.md) - trigger a workflow to guide the user through the necessary steps to register an organization with Qonto
* [Import a client invoice](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/bulk-import-client-invoices.md) - `POST /v2/client_invoices/bulk` to import an externally generated invoice (Factur-X, UBL, or CII) and obtain a `client_invoice_id`
* [Send via e-invoicing](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice-by-e-invoice.md) - `POST /v2/client_invoices/{id}/send_by_einvoice` to route the invoice through Qonto's PA
* [Retrieve a client invoice](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/retrieve-a-client-invoice.md) - fetch the current status and metadata
* [Retrieve a supplier invoice](https://docs.qonto.com/api-reference/business-api/expense-management/supplier-invoices/retrieve-a-supplier-invoice.md) - access incoming invoices received through the PA on behalf of your users

Required OAuth scope: `client_invoice.write`. The scope is necessary but not sufficient: the sending organization must also be allowed to send e-invoices, which for French organizations includes having its SIREN registered in the *Annuaire* — see [Send via e-invoicing](https://docs.qonto.com/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice-by-e-invoice.md) for the prerequisites.

***

**A note on AFNOR XP Z12-013**

Qonto's API does not currently follow the AFNOR XP Z12-013 standard. The endpoints listed above cover the same e-invoicing use cases — see [E-invoicing via API](https://docs.qonto.com/get-started/business-api/e-invoicing-standards.md) for details.
