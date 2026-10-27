> ## Documentation Index
> Fetch the complete documentation index at: https://docs.qonto.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Send a client invoice via e-invoice

> OAuth scope: `client_invoice.write`

Sends the client invoice identified by the `id` path parameter via e-invoice.

<Tip>
**French specificity:** For French organizations and partners, e-invoice refers to using Qonto's *Plateforme Agréée* (also referred to as "PA")
</Tip>

**Eligibility** (prerequisites)

1. The **organization** must be allowed to send e-invoices. For French organizations that means e-invoicing is activated on the organization **and** the organization's SIREN is registered in the *Annuaire*. Unlike the two conditions below, this one **is** checked when you call this endpoint: an organization that does not meet it gets a **`403`**.
2. The **client** on the invoice must be reachable on the e-invoicing network: **`e_invoicing_reachable`** on the client (from [Retrieve a client](/api-reference/business-api/clients/retrieve-a-client) or [List clients](/api-reference/business-api/clients/list-clients)) must be **`true`**. If it is **`false`**, do not call this endpoint, use [Send a client invoice via email](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice) instead. This is **not** checked when you call this endpoint: an invoice sent to an unreachable recipient is reported as not transmitted in **`einvoicing_lifecycle_events`**.
3. The client invoice must also **not** already have been submitted for e-invoice. If a send was already requested, calling this endpoint again completes successfully and does not resubmit the invoice. To send again after a rejection, import or create a new invoice.

<Note>
**`sending_status`** from [Get e-invoicing settings](/api-reference/business-api/expense-management/e-invoicing/retrieve-settings) reports whether e-invoicing is activated on the organization. It does **not** cover the *Annuaire* registration, so **`sending_status: "enabled"`** is not on its own a guarantee that this endpoint will accept the call.
</Note>

**Processing** (asynchronous)

Relative to the e-invoicing network, delivery is **asynchronous**. A **`204`** means the request was **accepted for processing**, not that the invoice was fully delivered or issued on the network. The client invoice **`status`** does not change when you call this endpoint.

**Tracking and observability**

Track downstream steps on the invoice via **`einvoicing_lifecycle_events`**. The `status_code` values follow the platform's lifecycle; a typical sequence is:

1. **200** — Submitted (deposited for e-invoicing)
2. **201** — Issued by the platform (released into the network)
3. **202** — Received from the platform (the receiving platform acknowledges receipt from the sender), when applicable

There is no separate lifecycle-only endpoint. Use **Retrieve a client invoice** (**`GET /v2/client_invoices/{id}`**): the **`client_invoice`** object includes **`einvoicing_lifecycle_events`** (each event has a lifecycle **`status_code`**—for example **`201`** for *Issued by the platform* when that milestone is recorded) and **`einvoicing_status`**. Client invoice **webhooks** support **`updated`** (and **`created`**) events; treat them as a signal to **fetch the invoice again** if you need the latest lifecycle list. The documented webhook payload includes **`einvoicing_status`** but not the full **`einvoicing_lifecycle_events`** array.

**E-invoicing API flows**

<AccordionGroup>

  <Accordion title="Flow 1 — Invoices created in Qonto">
    1. Create a client invoice in Qonto
    2. Send it via e-invoice using the endpoint **`POST /v2/client_invoices/{id}/send_by_einvoice`**
    3. Use the Qonto invoice **`id`** to track its lifecycle (**`einvoicing_lifecycle_events`**) and [Mark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/mark-a-client-invoice-as-paid), [Unmark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/unmark-a-client-invoice-as-paid), etc.
  </Accordion>

  <Accordion title="Flow 2 — Invoices created in a third-party invoicing tool">
    This flow lets you send an invoice initially generated with a third-party invoicing tool via e-invoice, by importing it into Qonto while preserving your original Factur-X file:

      1. Generate the invoice in the [Factur-X format](/api-reference/business-api/expense-management/client-quotes-notes/introduction-factur-x), including the correct **`.xml`** file
      2. [Import the invoice into Qonto](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/bulk-import-client-invoices) using **`POST /v2/client_invoices/bulk`** — this preserves your original file and returns a Qonto invoice **`id`**
      3. Send the invoice via e-invoice using the endpoint **`POST /v2/client_invoices/{id}/send_by_einvoice`**
      4. Use the Qonto invoice **`id`** to track its lifecycle (**`einvoicing_lifecycle_events`**) and [Mark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/mark-a-client-invoice-as-paid), [Unmark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/unmark-a-client-invoice-as-paid), etc.
  </Accordion>

</AccordionGroup> 

**Attachments**

Supporting documents attached to the invoice are **not** carried by this endpoint. If the invoice has an **`upload_id`**, that document is **not** embedded in the emitted XML and the **`upload_id`** is ignored. The call still succeeds and no error is returned.

This means the e-invoicing channel cannot currently satisfy a recipient who requires supporting documents inside the XML file (the *attached document*, **`BT-125`** of EN 16931). Attachments are delivered only by [Send a client invoice via email](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice).

**Environment limitations**

The e-invoicing flow is only available in the **production** environment. Sandbox does not support e-invoicing, as the underlying e-invoicing network operates exclusively in production - this is a platform-level constraint.

**Errors**

Invoice data and recipient reachability are not validated synchronously: invalid invoice data or an unreachable recipient does **not** return an error on this call. Check **`einvoicing_lifecycle_events`** on the invoice to confirm it was transmitted.

Sender-side eligibility **is** validated synchronously and returns **`403`**. The response body is identical whichever condition failed, so it cannot be used to tell them apart. The causes are:

- the access token is missing the **`client_invoice.write`** scope;
- the organization is not eligible for e-invoicing on Qonto, or has not activated it;
- the organization's KYB is incomplete;
- the organization is deactivated;
- for French organizations, the organization's SIREN is not registered in the *Annuaire*.



## OpenAPI

````yaml post /v2/client_invoices/{id}/send_by_einvoice
openapi: 3.1.1
info:
  version: v2
  title: Qonto
servers:
  - url: https://thirdparty.qonto.com
    description: Production URL
  - url: https://thirdparty-sandbox.staging.qonto.co
    description: Sandbox URL
security:
  - OAuth:
      - organization.read
      - membership.read
      - membership.write
      - attachment.write
      - internal_transfer.write
      - payment.write
      - supplier_invoice.write
      - supplier_invoice.read
      - client_invoices.read
      - client_invoice.write
      - client.read
      - client.write
      - product.read
      - product.write
      - request_review.write
      - request_review.read
      - team.read
      - team.write
      - request_transfers.write
      - insurance_contract.read
      - insurance_contract.write
      - card.read
      - card.write
      - bank_account.write
      - beneficiary.trust
      - webhook
      - payment_link.write
      - payment_link.read
      - sepa_direct_debit.read
      - sepa_direct_debit.write
      - terminal.read
      - terminal.write
  - SecretKey: []
paths:
  /v2/client_invoices/{id}/send_by_einvoice:
    post:
      tags:
        - Client Invoices
      summary: Send a client invoice via e-invoice
      description: >-
        OAuth scope: `client_invoice.write`


        Sends the client invoice identified by the `id` path parameter via
        e-invoice.


        <Tip>

        **French specificity:** For French organizations and partners, e-invoice
        refers to using Qonto's *Plateforme Agréée* (also referred to as "PA")

        </Tip>


        **Eligibility** (prerequisites)


        1. The **organization** must be allowed to send e-invoices. For French
        organizations that means e-invoicing is activated on the organization
        **and** the organization's SIREN is registered in the *Annuaire*. Unlike
        the two conditions below, this one **is** checked when you call this
        endpoint: an organization that does not meet it gets a **`403`**.

        2. The **client** on the invoice must be reachable on the e-invoicing
        network: **`e_invoicing_reachable`** on the client (from [Retrieve a
        client](/api-reference/business-api/clients/retrieve-a-client) or [List
        clients](/api-reference/business-api/clients/list-clients)) must be
        **`true`**. If it is **`false`**, do not call this endpoint, use [Send a
        client invoice via
        email](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice)
        instead. This is **not** checked when you call this endpoint: an invoice
        sent to an unreachable recipient is reported as not transmitted in
        **`einvoicing_lifecycle_events`**.

        3. The client invoice must also **not** already have been submitted for
        e-invoice. If a send was already requested, calling this endpoint again
        completes successfully and does not resubmit the invoice. To send again
        after a rejection, import or create a new invoice.


        <Note>

        **`sending_status`** from [Get e-invoicing
        settings](/api-reference/business-api/expense-management/e-invoicing/retrieve-settings)
        reports whether e-invoicing is activated on the organization. It does
        **not** cover the *Annuaire* registration, so **`sending_status:
        "enabled"`** is not on its own a guarantee that this endpoint will
        accept the call.

        </Note>


        **Processing** (asynchronous)


        Relative to the e-invoicing network, delivery is **asynchronous**. A
        **`204`** means the request was **accepted for processing**, not that
        the invoice was fully delivered or issued on the network. The client
        invoice **`status`** does not change when you call this endpoint.


        **Tracking and observability**


        Track downstream steps on the invoice via
        **`einvoicing_lifecycle_events`**. The `status_code` values follow the
        platform's lifecycle; a typical sequence is:


        1. **200** — Submitted (deposited for e-invoicing)

        2. **201** — Issued by the platform (released into the network)

        3. **202** — Received from the platform (the receiving platform
        acknowledges receipt from the sender), when applicable


        There is no separate lifecycle-only endpoint. Use **Retrieve a client
        invoice** (**`GET /v2/client_invoices/{id}`**): the **`client_invoice`**
        object includes **`einvoicing_lifecycle_events`** (each event has a
        lifecycle **`status_code`**—for example **`201`** for *Issued by the
        platform* when that milestone is recorded) and **`einvoicing_status`**.
        Client invoice **webhooks** support **`updated`** (and **`created`**)
        events; treat them as a signal to **fetch the invoice again** if you
        need the latest lifecycle list. The documented webhook payload includes
        **`einvoicing_status`** but not the full
        **`einvoicing_lifecycle_events`** array.


        **E-invoicing API flows**


        <AccordionGroup>

          <Accordion title="Flow 1 — Invoices created in Qonto">
            1. Create a client invoice in Qonto
            2. Send it via e-invoice using the endpoint **`POST /v2/client_invoices/{id}/send_by_einvoice`**
            3. Use the Qonto invoice **`id`** to track its lifecycle (**`einvoicing_lifecycle_events`**) and [Mark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/mark-a-client-invoice-as-paid), [Unmark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/unmark-a-client-invoice-as-paid), etc.
          </Accordion>

          <Accordion title="Flow 2 — Invoices created in a third-party invoicing tool">
            This flow lets you send an invoice initially generated with a third-party invoicing tool via e-invoice, by importing it into Qonto while preserving your original Factur-X file:

              1. Generate the invoice in the [Factur-X format](/api-reference/business-api/expense-management/client-quotes-notes/introduction-factur-x), including the correct **`.xml`** file
              2. [Import the invoice into Qonto](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/bulk-import-client-invoices) using **`POST /v2/client_invoices/bulk`** — this preserves your original file and returns a Qonto invoice **`id`**
              3. Send the invoice via e-invoice using the endpoint **`POST /v2/client_invoices/{id}/send_by_einvoice`**
              4. Use the Qonto invoice **`id`** to track its lifecycle (**`einvoicing_lifecycle_events`**) and [Mark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/mark-a-client-invoice-as-paid), [Unmark it as paid](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/unmark-a-client-invoice-as-paid), etc.
          </Accordion>

        </AccordionGroup> 


        **Attachments**


        Supporting documents attached to the invoice are **not** carried by this
        endpoint. If the invoice has an **`upload_id`**, that document is
        **not** embedded in the emitted XML and the **`upload_id`** is ignored.
        The call still succeeds and no error is returned.


        This means the e-invoicing channel cannot currently satisfy a recipient
        who requires supporting documents inside the XML file (the *attached
        document*, **`BT-125`** of EN 16931). Attachments are delivered only by
        [Send a client invoice via
        email](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/send-a-client-invoice).


        **Environment limitations**


        The e-invoicing flow is only available in the **production**
        environment. Sandbox does not support e-invoicing, as the underlying
        e-invoicing network operates exclusively in production - this is a
        platform-level constraint.


        **Errors**


        Invoice data and recipient reachability are not validated synchronously:
        invalid invoice data or an unreachable recipient does **not** return an
        error on this call. Check **`einvoicing_lifecycle_events`** on the
        invoice to confirm it was transmitted.


        Sender-side eligibility **is** validated synchronously and returns
        **`403`**. The response body is identical whichever condition failed, so
        it cannot be used to tell them apart. The causes are:


        - the access token is missing the **`client_invoice.write`** scope;

        - the organization is not eligible for e-invoicing on Qonto, or has not
        activated it;

        - the organization's KYB is incomplete;

        - the organization is deactivated;

        - for French organizations, the organization's SIREN is not registered
        in the *Annuaire*.
      operationId: send_client_invoice_by_e_invoice
      parameters:
        - $ref: '#/components/parameters/X-Qonto-Staging-Token'
        - name: id
          in: path
          description: The ID of the client invoice to send
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '204':
          description: >-
            Request accepted for processing; e-invoice flow continues
            asynchronously
        '400':
          $ref: '#/components/responses/400-Bad-request'
        '401':
          $ref: '#/components/responses/401-Unauthorized'
        '403':
          $ref: '#/components/responses/403-Forbidden'
        '404':
          $ref: '#/components/responses/404-Not-Found'
        '422':
          $ref: '#/components/responses/422-Unprocessable-Entity'
        '500':
          $ref: '#/components/responses/500-Internal-Server-Error'
      security:
        - OAuth:
            - client_invoice.write
        - SecretKey: []
components:
  parameters:
    X-Qonto-Staging-Token:
      name: X-Qonto-Staging-Token
      in: header
      description: >-
        Required only for Sandbox API requests; to get one, please sign up to
        the [Developer Portal](https://developers.qonto.com/).
      schema:
        type: string
  responses:
    400-Bad-request:
      description: Returns a bad request error.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/BadRequestResponseBody'
          examples:
            Authorization field missing:
              value:
                errors:
                  - code: bad_request
                    detail: Authorization field missing
    401-Unauthorized:
      description: Returns an unauthorized error.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UnauthorizedResponseBody'
          examples:
            authorization_header_missing:
              value:
                errors:
                  - code: authorization_header_missing
                    detail: authorization header missing
            authorization_token_invalid:
              value:
                errors:
                  - code: authorization_token_invalid
                    detail: authorization token invalid
    403-Forbidden:
      description: Returns a forbidden error.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ForbiddenResponseBody'
          examples:
            Insufficient permissions:
              value:
                errors:
                  - code: forbidden
                    detail: User does not have sufficient permissions for this action.
    404-Not-Found:
      description: Returns a not found error.
      content:
        application/json:
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  $ref: '#/components/schemas/NotFoundError'
    422-Unprocessable-Entity:
      description: Returns an unprocessable entity error.
      content:
        application/json:
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  $ref: '#/components/schemas/UnprocessableEntityError'
    500-Internal-Server-Error:
      description: Returns an internal server error.
  schemas:
    BadRequestResponseBody:
      type: object
      properties:
        errors:
          type: array
          items:
            $ref: '#/components/schemas/BadRequestError'
      required:
        - errors
    UnauthorizedResponseBody:
      type: object
      properties:
        errors:
          type: array
          items:
            $ref: '#/components/schemas/UnauthorizedError'
      required:
        - errors
    ForbiddenResponseBody:
      type: object
      properties:
        errors:
          type: array
          items:
            $ref: '#/components/schemas/ForbiddenError'
      required:
        - errors
    NotFoundError:
      type: object
      properties:
        code:
          type: string
          description: Error code.
        detail:
          type: string
          description: Human readable error that explains error `code`.
        source:
          type: object
          properties:
            parameter:
              type: string
              description: The parameter that causes the error.
      required:
        - code
        - detail
      x-examples:
        Object not found:
          code: not_found
          detail: Object not found
          source:
            parameter: id
    UnprocessableEntityError:
      type: object
      properties:
        status:
          type: string
          example: unprocessable entity
        code:
          type: string
          description: Error code.
          example: missing_key
        detail:
          type: string
          description: Human readable error that explains error `code`.
          example: property is missing
        message:
          type: string
          example: property id is missing
        source:
          type: object
          properties:
            pointer:
              type: string
              description: >-
                The property and the item in an array (if applicable) that
                causes the error.
              example: id
            parameter:
              type: string
              description: The query parameter that caused the error (optional).
      required:
        - code
        - detail
    BadRequestError:
      type: object
      properties:
        code:
          type: string
          description: Error code.
        detail:
          type: string
          description: Human readable error that explains error `code`.
        source:
          type: object
          properties:
            pointer:
              type: string
              description: >-
                The property in the request body that caused the error
                (optional).
            parameter:
              type: string
              description: The query parameter that caused the error (optional).
      required:
        - code
        - detail
      x-examples:
        Authorization field missing:
          code: bad_request
          detail: Authorization field missing
    UnauthorizedError:
      type: object
      properties:
        code:
          type: string
          description: Error code.
        detail:
          type: string
          description: Human readable error that explains error `code`.
      required:
        - code
        - detail
      x-examples:
        Invalid credentials:
          code: unauthorized
          detail: Invalid credentials
    ForbiddenError:
      type: object
      properties:
        code:
          type: string
          description: Error code.
        detail:
          type: string
          description: Human readable error that explains error `code`.
      required:
        - code
        - detail
      x-examples:
        Insufficient permissions:
          code: forbidden
          detail: User does not have sufficient permissions for this action.
  securitySchemes:
    OAuth:
      type: oauth2
      description: >
        Bearer authorization header: `Bearer <token>`, where `<token>` is the
        access token received from the authorization server at the end of the
        [OAuth 2.0
        flow](/get-started/business-api/authentication/oauth/oauth-flow).
      flows:
        authorizationCode:
          refreshUrl: https://oauth.qonto.com/oauth2/token
          authorizationUrl: https://oauth.qonto.com/oauth2/auth
          scopes:
            attachment.read: Retrieve attachments
            attachment.write: Upload attachments and remove attachments from transactions
            bank_account.write: Create, update and close bank accounts
            beneficiary.trust: Trust SEPA beneficiaries
            card.read: Retrieve cards
            card.write: Create or update cards
            cash_flow_category.read: Retrieve cash flow categories
            cash_flow_category.write: >-
              Create, update and delete cash flow categories, and assign them to
              transactions
            client.read: Retrieve clients
            client.write: Create clients
            client_invoice.write: Create client invoices
            client_invoices.read: Retrieve client invoices and credit notes
            einvoicing.read: Retrieve e-invoicing settings
            embed_auth_link.write: Create Embed auth links
            insurance_contract.read: Retrieve insurance contracts
            insurance_contract.write: Create and update insurance contracts
            internal_transfer.write: >-
              Create internal transfers (between 2 Qonto accounts of the same
              organization)
            international_transfer.write: Create international transfers
            membership.read: Retrieve the authentified membership
            membership.write: Invite team members
            offline_access: Retrieve a refresh token
            organization.read: >-
              Retrieve organization, bank accounts, transactions, transfers,
              beneficiaries, labels, memberships, requests & statements
            payment.write: Create external transfers and untrust beneficiaries
            payment_link.read: >-
              Retrieve payment links, their payments, and the available payment
              methods
            payment_link.write: >-
              Connect to the payment links provider, create and deactivate
              payment links
            product.read: Retrieve products
            product.write: Create products
            request_cards.write: Create card requests
            request_review.write: Approve or decline requests
            request_transfers.write: Create transfer requests
            sepa_direct_debit.read: View SEPA Direct Debit payments
            sepa_direct_debit.write: Manage SEPA Direct Debit payments
            subscription.read: Retrieve the organization's current subscription plan
            supplier_invoice.read: Retrieve supplier invoices
            supplier_invoice.write: Create supplier invoices
            team.read: Retrieve teams
            team.write: Create teams
            terminal.read: View your payment terminals
            terminal.write: Configure your terminals and initiate payments
            user_organization.read: View the organizations the user has granted access to
            webhook: >-
              Receive a notification each time a particular event occurs in
              Qonto
          tokenUrl: https://oauth.qonto.com/oauth2/token
    SecretKey:
      type: apiKey
      description: cf. [API key](/get-started/business-api/authentication/api-key)
      name: Authorization
      in: header

````