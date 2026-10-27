> ## Documentation Index
> Fetch the complete documentation index at: https://docs.qonto.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve a client invoice

> OAuth scope: `client_invoices.read`

Retrieves the client invoice identified by the `id` path parameter.



## OpenAPI

````yaml get /v2/client_invoices/{id}
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
  /v2/client_invoices/{id}:
    get:
      tags:
        - Client Invoices
      summary: Retrieve a client invoice
      description: |-
        OAuth scope: `client_invoices.read`

        Retrieves the client invoice identified by the `id` path parameter.
      operationId: get_client_invoice
      parameters:
        - $ref: '#/components/parameters/X-Qonto-Staging-Token'
        - name: id
          in: path
          description: UUID of the client invoice to retrieve.
          required: true
          schema:
            type: string
            format: uuid
            example: e3d68a1a-b23f-496a-a9a2-815089337720
      responses:
        '200':
          description: Returns the client invoice identified by the `id` path parameter.
          content:
            application/json:
              schema:
                type: object
                properties:
                  client_invoice:
                    $ref: '#/components/schemas/ClientInvoice'
                required:
                  - client_invoice
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
            - client_invoices.read
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
  schemas:
    ClientInvoice:
      type: object
      properties:
        id:
          type: string
          format: uuid
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        organization_id:
          type: string
          format: uuid
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        attachment_id:
          type: string
          description: >-
            Attachment UUID corresponding to that particular invoice.

            <br>The attachment is generated **asynchronously**. While it is
            being generated this property is **omitted from the response**
            rather than returned as `null`, so treat an absent `attachment_id`
            as "not ready yet" and keep polling. After creating the invoice (by
            calling the [POST
            /v2/client_invoices](/api-reference/business-api/expense-management/client-quotes-notes/client-invoices/create-a-client-invoice)
            endpoint) or finalizing it, wait ~10s and then call the [GET
            /v2/client_invoices/{id}](https://api-doc.qonto.com/docs/business-api/copd6wc7nwym8-show-client-invoice)
            endpoint until `attachment_id` is present.

            <br>This property enables you to get the invoice file by using the
            [GET
            /v2/attachments/{id}](/api-reference/business-api/expense-management/attachments/retrieve-an-attachment)
            endpoint.

            <br>The file is a PDF for invoices created on Qonto. Imported
            invoices keep their original file, which may also be a JPEG or a
            PNG, so read `file_content_type` from the attachment response
            instead of assuming `application/pdf`.
          format: uuid
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        number:
          type: string
          example: INV001
        purchase_order:
          type: string
          description: Purchase order data added by the invoice’s initiator.
        status:
          type: string
          enum:
            - draft
            - unpaid
            - paid
            - canceled
          example: paid
        invoice_url:
          type: string
          description: >-
            URL of the invoice public page, accessible without authentication
            for 180 days after issuance, provided the invoice has not been
            canceled.
          format: uri
          example: https://pay.qonto.com/invoices/00000000-0000-0000-0000-000000000000
        contact_email:
          type: string
          description: E-mail address of the invoice’s initiator.
          format: email
          example: contact@qonto.com
        terms_and_conditions:
          type: string
          description: The T&C data added by the invoice’s initiator.
          example: This is an example.
        discount_conditions:
          type:
            - string
            - 'null'
          description: >-
            Any discount for advance payment of the invoice. It is optional and
            is only for French organizations.
          example: Pas d’escompte accordé pour paiement anticipé.
        late_payment_penalties:
          type:
            - string
            - 'null'
          description: >-
            Late payment penalties applied in case of non-payment invoice.  It
            is optional and is only for French organizations.
          example: >-
            En cas de non-paiement à la date d'échéance, des pénalités calculées
            à trois fois le taux d’intérêt légal seront appliquées.
        legal_fixed_compensation:
          type:
            - string
            - 'null'
          description: >-
            The legal fixed compensation applied in case late payment of the
            invoice. It is optional and is only for French organizations.
          example: >-
            Tout retard de paiement entraînera une indemnité forfaitaire pour
            frais de recouvrement de 40€.
        header:
          type: string
          description: The header text added by the credit note’s initiator.
          example: This is an example.
        footer:
          type: string
          description: The footer text added by the credit note’s initiator.
          example: This is an example.
        currency:
          type: string
          example: EUR
        discount:
          type: object
          description: Global discount that was applied to the invoice.
          properties:
            type:
              type: string
              enum:
                - percentage
                - absolute
              description: Type of the discount applied.
              example: percentage
            value:
              type: string
              description: Rate or absolute amount that was discounted.
              example: '0.1'
            amount:
              type: object
              description: >-
                The calculated discount amount that was deducted from the
                invoice.
              properties:
                value:
                  type: string
                  example: '10.00'
                currency:
                  type: string
                  example: EUR
        total_amount:
          type: object
          description: Total amount that needs to be paid by the client.
          properties:
            value:
              type: string
              example: '12.52'
            currency:
              type: string
              example: EUR
        total_amount_cents:
          type: integer
          description: Total amount in cents that needs to be paid by the client.
          example: 1252
        vat_amount:
          type: object
          description: VAT amount that is applicable to the invoice.
          properties:
            value:
              type: string
              example: '0.51'
            currency:
              type: string
              example: EUR
        vat_amount_cents:
          type: integer
          description: VAT amount in cents that is applicable to the invoice.
          example: 51
        issue_date:
          type: string
          description: Date the initiator mentioned that the invoice was created.
          format: date
          example: '2022-03-01'
        due_date:
          type: string
          description: Payment’s deadline added by the initiator.
          format: date
          example: '2022-03-01'
        performance_date:
          type:
            - string
            - 'null'
          description: >
            **DEPRECATED**: This field is deprecated. Please use
            `performance_start_date` and `performance_end_date` instead.


            The performance date represents when the job or service was
            completed by the client. Date the initiator mentioned that the
            contents of the invoice were performed.
          format: date
          example: '2022-03-01'
          deprecated: true
        performance_start_date:
          type:
            - string
            - 'null'
          description: >
            Start date of the performance period mentioned by the initiator for
            the invoice contents.


            The performance period defines the date range during which the job
            or service was completed by the client. This field marks the
            beginning of that period and can be used together with
            `performance_end_date` to create a flexible date range instead of a
            single fixed date.
          format: date
          example: '2022-03-01'
        performance_end_date:
          type:
            - string
            - 'null'
          description: >
            End date of the performance period mentioned by the initiator for
            the invoice contents.


            This field defines the end of the performance date range, allowing
            the work or service to have been completed anytime between
            `performance_start_date` and `performance_end_date`. When used
            together with `performance_start_date`, it creates a flexible time
            window rather than specifying completion on a single specific date.
          format: date
          example: '2022-03-31'
        created_at:
          type: string
          description: Date the invoice was created. Note that this is a machine date.
          format: date-time
          example: '2022-03-04T17:58:30+02:00'
        finalized_at:
          type:
            - string
            - 'null'
          description: Date the invoice was transitioned from `Draft` to `Unpaid` status.
          format: date-time
          example: '2022-03-04T17:58:30+02:00'
        paid_at:
          type:
            - string
            - 'null'
          description: Date on which the invoice was paid.
          format: date-time
          example: '2022-03-04T17:58:30+02:00'
        amount_paid:
          type: object
          description: >-
            Amount paid for this invoice, expressed as a money object.


            **Note**: The `amount_paid` object is always returned. In the
            following cases, `amount_paid.value` is `'0.00'`:

            - The invoice was manually marked as paid and is not linked to a
            transaction.

            - The invoice is linked to a transaction that occurred before
            January 1, 2026.
          properties:
            value:
              type: string
              example: '12.52'
            currency:
              type: string
              example: EUR
        stamp_duty_amount:
          type: string
          minLength: 4
          maxLength: 15
          example: '1.00'
        items:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/DocumentItem'
        client:
          $ref: '#/components/schemas/EmbeddedClient'
        payment_methods:
          type: array
          items:
            type: object
            properties:
              beneficiary_name:
                type: string
                description: >-
                  Name of the beneficiary that will receive the invoice's
                  payment.
                example: John Doe
              bic:
                type: string
                description: Beneficiary’s International Bank Account Number.
                example: ABCDEFG1XXX
              iban:
                type: string
                description: Beneficiary account's Bank Identifier.
                example: FR1420041010050500013M02606
              type:
                type: string
                enum:
                  - transfer
                description: Invoice's payment method.
                example: transfer
        credit_notes_ids:
          type: array
          description: >-
            If any credit notes are linked to the invoice, this represents the
            id of those credit notes.
          items:
            type: string
            format: uuid
            readOnly: true
        organization:
          $ref: '#/components/schemas/EmbeddedInvoiceOrganization'
        einvoicing_status:
          type: string
          description: >-
            Only applicable to Italian organizations. Remains blank for French
            organizations.
          enum:
            - pending
            - submitted
            - declined
            - approved
            - not_delivered
            - submission_failed
        welfare_fund:
          type: object
          properties:
            type:
              type: string
              enum:
                - TC01
                - TC02
                - TC03
                - TC04
                - TC05
                - TC06
                - TC07
                - TC08
                - TC09
                - TC10
                - TC11
                - TC12
                - TC13
                - TC14
                - TC15
                - TC16
                - TC17
                - TC18
                - TC19
                - TC20
                - TC21
                - TC22
              example: TC01
            rate:
              type: string
              minLength: 4
              maxLength: 6
              example: '0.0001'
        withholding_tax:
          type: object
          description: >-
            - Only applicable for Italian organizations and Spanish freelancers.

            - Object which relates to an amount of tax paid by the client,
            rather than the supplier, for specific cases.

            - This amount is a percentage deducted from the total amount of the
            invoice after VAT application.

            - The `rate` field specifies the percentage of tax and `amount`
            field specifies the total amount of the tax.
          properties:
            reason:
              type: string
              enum:
                - RF01
                - RF02
                - RF03
                - RF04
                - RF05
                - RF06
              example: RF01
            rate:
              type: string
              minLength: 4
              maxLength: 6
              example: '0.01'
            payment_reason:
              type: string
              minLength: 1
              maxLength: 2
              example: L1
            amount:
              type: string
              example: '1.00'
        payment_reporting:
          type: object
          properties:
            conditions:
              type: string
              enum:
                - TP01
                - TP02
                - TP03
              example: TP01
            method:
              type: string
              enum:
                - MP01
                - MP02
                - MP03
                - MP04
                - MP05
                - MP06
                - MP07
                - MP08
                - MP09
                - MP10
                - MP11
                - MP12
                - MP13
                - MP14
                - MP15
                - MP16
                - MP17
                - MP18
                - MP19
                - MP20
                - MP21
                - MP22
              example: MP01
        quote_id:
          type: string
          format: uuid
          description: |
            ID of the quote this invoice was created from, if any.
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        invoice_type:
          type: string
          enum:
            - standard
            - deposit
            - partial
            - balance
          description: >
            Nature of the invoice.


            - `standard`: the invoice covers the whole amount of the items it
            lists.

            - `deposit`: the invoice covers an advance payment on a larger
            order.

            - `partial`: progress invoice (facture de situation). The invoice
            covers a
              share of the work described by its items, so `total_amount` is a fraction
              of the value of those items.
            - `balance`: the invoice covers the remainder of an order, net of a
            deposit.


            Only `standard` invoices are guaranteed to have `total_amount` equal
            to the

            sum of their line items. For every other type, rely on
            `total_amount` and

            `total_amount_cents` for the amount actually invoiced and due. The
            progress

            share of a `partial` invoice is not exposed by the API.
          example: standard
        einvoicing_lifecycle_events:
          $ref: '#/components/schemas/EinvoicingLifecycleEvents'
      required:
        - id
        - organization_id
        - number
        - purchase_order
        - status
        - invoice_url
        - contact_email
        - terms_and_conditions
        - discount_conditions
        - late_payment_penalties
        - legal_fixed_compensation
        - header
        - footer
        - currency
        - total_amount
        - total_amount_cents
        - vat_amount
        - vat_amount_cents
        - issue_date
        - due_date
        - performance_date
        - performance_start_date
        - performance_end_date
        - created_at
        - finalized_at
        - paid_at
        - stamp_duty_amount
        - items
        - client
        - payment_methods
        - credit_notes_ids
        - organization
        - invoice_type
      x-examples: {}
    DocumentItem:
      type: object
      properties:
        title:
          type: string
          example: Plastic tables
        description:
          type: string
          example: Plastic tables for McDonald’s restaurants
        quantity:
          type: string
          example: '1.5'
        unit:
          type: string
          example: meter
        unit_price:
          type: object
          description: >-
            Amount of the price per unit. Note that an item can contain multiple
            units. The number of units is defined via `quantity`.
          properties:
            value:
              type: string
              example: '10.0'
            currency:
              type: string
              example: EUR
        unit_price_cents:
          type: integer
          description: >-
            Amount in cents of the price per unit. Note that an item can contain
            multiple units. The number of units is defined via `quantity`.
          example: 1000
        vat_rate:
          type: string
          description: >-
            VAT rate in decimal (0.1 for 10%) applicable to that particular
            item.
          example: '0.1'
        vat_exemption_reason:
          type: string
          enum:
            - N1
            - N2
            - N2.1
            - N2.2
            - N3
            - N3.1
            - N3.2
            - N3.3
            - N3.4
            - N3.5
            - N3.6
            - N4
            - N5
            - N6
            - N6.1
            - N6.2
            - N6.3
            - N6.4
            - N6.5
            - N6.6
            - N6.7
            - N6.8
            - N6.9
            - N7
            - S293B
            - S262.1
            - S259
            - S283
            - S261
            - S262
            - S263
            - S19.1
            - S4.1B
            - S4.1A
            - S4
            - S13B
            - S122
            - S25
            - S21
            - S69
            - S20
            - S84.1.2
            - S6.1.27
            - S11.1A
            - S6.1.16
            - S6.1.13
            - S6.1.19
            - S44.1
            - S44.3.11
            - S44.3.2
            - S44.3.4
            - S39bis
            - S56bis
            - S39
            - S9
            - S11
            - S12
            - S53
            - S9.29.30
            - S9.27.28
            - S9.1-5
          description: Exemption reason
        discount:
          type: object
          properties:
            type:
              type: string
              enum:
                - percentage
                - absolute
              example: percentage
            value:
              type: string
              description: >-
                Discount rate or absolute amount. For percentage, the minimum
                value is 0.0001 (0.01%), and the maximum value is 1 (100%). For
                absolute value, the maximum is determined by Quantity * Unit
                Price.
              example: '0.1'
            amount:
              type: object
              properties:
                value:
                  type: string
                  example: '120'
                currency:
                  type: string
                  example: EUR
        total_vat:
          type: object
          description: VAT amount that is applicable to that specific item.
          properties:
            value:
              type: string
              example: '120'
            currency:
              type: string
              example: EUR
        total_vat_cents:
          type: integer
          description: VAT amount in cents that is applicable to that specific item.
          example: 12000
        total_amount:
          type: object
          description: Amount that needs to be paid by the client for that specific item.
          properties:
            value:
              type: string
              example: '300.50'
            currency:
              type: string
              example: EUR
        total_amount_cents:
          type: integer
          description: >-
            Amount in cents that needs to be paid by the client for that
            specific item.
          example: 30050
        subtotal:
          type: object
          properties:
            value:
              type: string
              description: Subtotal amount for the item without VAT. Quantity * Unit_price.
              example: '120'
            currency:
              type: string
              example: EUR
        subtotal_cents:
          type: integer
          description: Subtotal amount in cents for the item without VAT.
          example: 12000
    EmbeddedClient:
      type: object
      description: Client that needs to pay the invoice.
      properties:
        id:
          type: string
          format: uuid
          example: 33v418bb-bd0d-4df4-865c-c07afab8bb48
        name:
          type: string
          description: >-
            Note that this property will be returned only if the client is a
            `company`.
          example: McDonald's
        first_name:
          type: string
          description: >-
            Note that this property will be returned only if the client is an
            `individual` or a `freelancer`.
          example: Jane
        last_name:
          type: string
          description: >-
            Note that this property will be returned only if the client is an
            `individual` or a `freelancer`.
          example: Doe
        type:
          type: string
          enum:
            - individual
            - company
            - freelancer
          example: individual
        email:
          type:
            - string
            - 'null'
          format: email
          example: client@qonto.com
        vat_number:
          type: string
          example: FR32123456789
        tax_identification_number:
          type: string
          example: '123456789'
        address:
          type: string
          example: 1 place de l’Opéra
        city:
          type: string
          example: Paris
        zip_code:
          type: string
          example: '75010'
        province_code:
          type: string
          description: >-
            Province code of the client. It is required only for Italian
            organizations
        country_code:
          type: string
          example: fr
        recipient_code:
          type: string
          description: >-
            Recipient code, so that the client can receive the e-invoice in his
            SdI portal.
        locale:
          type: string
          example: fr
        billing_address:
          type: object
          description: >-
            Billing address of the client, which will be reflected on the
            invoice. Stores the same data as the root-level fields address
            fields (`address`, `city`, `zip_code`, `province_code`,
            `country_code`).
          allOf:
            - $ref: '#/components/schemas/ClientBillingAddress'
        delivery_address:
          type: object
          description: >-
            Delivery address of the client. Stores the same data as the
            root-level fields address fields (`address`, `city`, `zip_code`,
            `province_code`, `country_code`).
          allOf:
            - $ref: '#/components/schemas/ClientDeliveryAddress'
    EmbeddedInvoiceOrganization:
      type: object
      description: Information of the organization at the time the document was issued.
      properties:
        id:
          type: string
          format: uuid
        legal_name:
          type: string
        legal_number:
          type: string
        legal_country:
          type: string
        address_line_1:
          type: string
        address_line_2:
          type: string
        address_zipcode:
          type: string
        address_city:
          type: string
        address_country:
          type: string
        company_leadership:
          type: string
          example: Jan Mueller
        district_court:
          type: string
          example: Munich
        commercial_register_number:
          type: string
          description: >-
            Is available for French and German organizations and is optional.

            - For French organizations, it represents RCS number (numéro
            Registre du Commerce et des Sociétés) of an incorporated business.
            For example: RCS A 123 123 123.

            - For German organizations, it represents the organization's
            commercial register number (handelsregisternummer). For example: HRB
            123455 B.
          example: HRB12345B
        vat_number:
          type: string
          example: FR123456789
        tax_number:
          type: string
          example: 123/123/1234
        legal_capital_share:
          type:
            - object
            - 'null'
          description: >-
            Capital share of an incorporated business. It is optional and is
            only for French organizations.
          properties:
            value:
              type: string
              maxLength: 12
              example: '10000.00'
            currency:
              $ref: '#/components/schemas/Currency'
        transaction_type:
          type:
            - string
            - 'null'
          enum:
            - goods
            - services
            - goods_and_services
            - null
          description: >-
            Type of transaction performed in the invoice. It is optional and is
            only for French organizations.
          example: goods
        vat_payment_condition:
          type:
            - string
            - 'null'
          enum:
            - on_receipts
            - compensated_for_sales
            - exempt
            - null
          description: >-
            Business’ VAT elected payment condition (whether TVA is paid on
            receipt or on invoice emission).

            There are two allowed values:

            - `receipt` which stands for “sur les encaissements” in French;

            -  `compensated_for_sales` which stands for “sur les débits” in
            French.

            It is optional and is only for French organizations.
          example: on_receipts
    EinvoicingLifecycleEvents:
      type: array
      description: Array of lifecycle events related to the e-invoicing process
      items:
        $ref: '#/components/schemas/EInvoicingLifecycleEvent'
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
    ClientBillingAddress:
      type: object
      description: >-
        Send either a `billing_address` object filled-in or individual
        root-level address fields (`address`, `city`, `zip_code`,
        `province_code`, `country_code`). When both are sent, `billing_address`
        takes precedence and overwrites root-level fields.
      properties:
        street_address:
          type: string
          description: >
            Street address section of the billing address of the client (eg
            street, number, floor, door, etc).
          maxLength: 250
          example: 123 Main Street
        city:
          type: string
          description: City on the billing address of the client
          maxLength: 50
          example: Paris
        zip_code:
          type: string
          description: Zip code on the billing address of the client
          maxLength: 20
          example: '75010'
        province_code:
          type: string
          description: >-
            Province code of the client's billing address. It is required only
            for Italian organizations.
          maxLength: 2
        country_code:
          type: string
          description: Country code on the billing address of the client (ISO 3166 format)
          maxLength: 2
          example: FR
    ClientDeliveryAddress:
      type: object
      properties:
        street_address:
          type: string
          description: >
            Street address section of the delivery address of the client. (eg
            street, number, floor, door, etc)
          maxLength: 250
          example: 123 Main Street
        city:
          type: string
          description: City on the delivery address of the client
          maxLength: 50
          example: Paris
        zip_code:
          type: string
          description: Zip code on the delivery address of the client
          maxLength: 20
          example: '75010'
        province_code:
          type: string
          description: >-
            Province code of the client's delivery address. It is required only
            for Italian organizations
          maxLength: 2
        country_code:
          type: string
          description: Country code on the delivery address of the client (ISO 3166 format)
          maxLength: 2
          example: FR
    Currency:
      type: string
      enum:
        - AED
        - AUD
        - BGN
        - CAD
        - CHF
        - CNY
        - CZK
        - DKK
        - EUR
        - GBP
        - GHS
        - HKD
        - HUF
        - ILS
        - MXN
        - NOK
        - NZD
        - PEN
        - PLN
        - RON
        - RSD
        - SAR
        - SEK
        - SGD
        - TRY
        - USD
        - ZAR
        - ZMW
      default: EUR
      example: EUR
    EInvoicingLifecycleEvent:
      type: object
      properties:
        status_code:
          $ref: '#/components/schemas/EInvoicingLifecycleEventStatusCode'
        reason:
          type: string
          description: The reason label associated with a given event
          example: DOUBLE FACTURE
        reason_message:
          type: string
          description: >-
            The reason message associated with a given event (comment provided
            by the user generating the event)
          example: I already received this invoice
        timestamp:
          type: string
          description: The timestamp of the event
          format: date-time
          example: '2024-12-04T11:05:16.4497Z'
      example:
        status_code: 200
        reason: DOUBLE FACTURE
        reason_message: I already received this invoice
        timestamp: '2024-12-04T11:05:16.4497Z'
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
    EInvoicingLifecycleEventStatusCode:
      type: integer
      enum:
        - 200
        - 201
        - 202
        - 203
        - 204
        - 205
        - 206
        - 207
        - 208
        - 209
        - 210
        - 211
        - 212
        - 213
        - 214
      description: >
        Status code of the operation. - 200: Déposée (Submitted) - 201: Emise
        par la plateforme (Issued by the platform) - 202: Reçue de la plateforme
        (Received from the platform) - 203: Mise à disposition (Made available)
        - 204: Prise en charge (Taken over) - 205: Approuvée (Approved) - 206:
        Approuvée partiellement (Partially approved) - 207: En litige (In
        dispute) - 208: Suspendue (Suspended) - 209: Complétée (Completed) -
        210: Refusée (Refused) - 211: Paiement transmis (Payment sent) - 212:
        Encaissée (Collected) - 213: Rejetée (Rejected) - 214: Visée (Vised)
      example: 200
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