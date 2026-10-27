> ## Documentation Index
> Fetch the complete documentation index at: https://docs.qonto.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a credit note

> OAuth scope: `client_invoice.write`

Creates a credit note linked to an existing invoice for the authenticated organization.

- The cumulative total of all credit notes for an invoice cannot exceed the invoice amount.
- If the credit note amount equals the invoice amount, the invoice will be automatically canceled.
- Credit notes cannot be created for partial (progress) invoices.




## OpenAPI

````yaml post /v2/credit_notes
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
  /v2/credit_notes:
    post:
      tags:
        - Credit Notes
      summary: Create a credit note
      description: >
        OAuth scope: `client_invoice.write`


        Creates a credit note linked to an existing invoice for the
        authenticated organization.


        - The cumulative total of all credit notes for an invoice cannot exceed
        the invoice amount.

        - If the credit note amount equals the invoice amount, the invoice will
        be automatically canceled.

        - Credit notes cannot be created for partial (progress) invoices.
      operationId: create_credit_note
      parameters:
        - $ref: '#/components/parameters/X-Qonto-Staging-Token'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreditNoteCreatePayload'
      responses:
        '201':
          description: Returns the credit note created.
          content:
            application/json:
              schema:
                type: object
                properties:
                  credit_note:
                    $ref: '#/components/schemas/CreditNote'
                required:
                  - credit_note
        '400':
          $ref: '#/components/responses/400-Bad-request'
        '401':
          $ref: '#/components/responses/401-Unauthorized'
        '403':
          $ref: '#/components/responses/403-Forbidden'
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
  schemas:
    CreditNoteCreatePayload:
      type: object
      properties:
        invoice_id:
          type: string
          format: uuid
          description: ID of the invoice to create the credit note for.
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        issue_date:
          type: string
          format: date
          description: Date the credit note was issued. The format should be `YYYY-MM-DD`.
          example: '2024-01-15'
        reason:
          type: string
          description: Reason for issuing the credit note.
          maxLength: 500
          example: Product returned
        currency:
          type: string
          description: Currency for the credit note. Trigram following ISO 4217.
          example: EUR
        number:
          type: string
          description: >-
            Credit note number. Must be unique within the organization and is:

            - **required** if automatic numbering is disabled for the
            authenticated organization;

            - **optional** if automatic numbering is enabled for the
            authenticated organization (default setting).
              However, if provided, it will be used as the credit note number.
          maxLength: 40
          example: CN-2024-001
        terms_and_conditions:
          type: string
          description: Additional notes added by the credit note's initiator.
          maxLength: 525
        contact_email:
          type: string
          format: email
          description: Contact email for the credit note.
          example: contact@company.com
        discount:
          type: object
          description: >-
            Global discount applied to the entire credit note.

            This discount is applied to the sum of all items (after item-level
            discounts, if any).
          properties:
            type:
              type: string
              enum:
                - percentage
                - absolute
              description: >-
                Type of the discount. `percentage` for a rate-based discount or
                `absolute` for a fixed amount discount.
              example: percentage
            value:
              type: string
              description: >-
                Rate or absolute amount that will be discounted.

                - For `percentage` type: Value between 0.0001 (0.01%) and 1
                (100%). For example, for a 20% discount, use `0.2`.

                - For `absolute` type: Fixed amount to be deducted.
              example: '0.1'
        items:
          type: array
          description: >-
            Line items for the credit note. Quantities should be positive; the
            system will negate them.
          items:
            $ref: '#/components/schemas/DocumentItemPayload'
        welfare_fund:
          type: object
          description: Italian-specific welfare fund details.
          properties:
            type:
              type: string
              example: TC01
            rate:
              type: string
              example: '0.04'
        withholding_tax:
          type: object
          description: Italian and Spanish-specific withholding tax details.
          properties:
            reason:
              type: string
              example: RF01
            rate:
              type: string
              example: '0.20'
            payment_reason:
              type: string
        stamp_duty_amount:
          type: string
          description: Italian-specific stamp duty amount.
          example: '2.00'
      required:
        - invoice_id
        - issue_date
        - currency
        - reason
        - items
    CreditNote:
      type: object
      properties:
        id:
          type: string
          format: uuid
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        invoice_id:
          type: string
          description: Invoice id the credit note is linked to.
          format: uuid
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        attachment_id:
          type: string
          description: >-
            Attachment UUID corresponding to that particular credit note. You
            can obtain details and get the credit note by using [Get
            attachment](/api-reference/business-api/expense-management/attachments/retrieve-an-attachment).
          format: uuid
          example: 4d5418bb-bd0d-4df4-865c-c07afab8bb48
        issue_date:
          type: string
          description: Date the initiator mentioned that the credit note was created.
          format: date
          example: '2022-03-01'
        invoice_issue_date:
          type: string
          description: Issue date of the invoice identified by `invoice_id`.
          format: date
          example: '2022-03-02'
        number:
          type: string
          example: INV001
        terms_and_conditions:
          type: string
          description: T&C data added by the credit note’s initiator.
          example: This is an example.
        header:
          type: string
          description: Header text added by the credit note’s initiator.
          example: This is an example.
        footer:
          type: string
          description: Footer text added by the credit note’s initiator.
          example: This is an example.
        vat_amount:
          type: object
          properties:
            value:
              type: string
              example: '0.51'
            currency:
              type: string
              example: EUR
        vat_amount_cents:
          type: integer
          example: 51
        total_amount:
          type: object
          properties:
            value:
              type: string
              example: '12.52'
            currency:
              type: string
              example: EUR
        total_amount_cents:
          type: integer
          example: 1252
        currency:
          type: string
          example: EUR
        created_at:
          type: string
          description: Date the credit note was created. Note that this is a machine date.
          format: date-time
          example: '2022-03-04T17:58:30+02:00'
        finalized_at:
          type:
            - string
            - 'null'
          format: date-time
          example: '2022-03-04T17:58:30+02:00'
        contact_email:
          type: string
          description: E-mail address of the credit note’s initiator.
          format: email
          example: contact@qonto.com
        invoice_url:
          type: string
          description: >-
            URL of the invoice public page, accessible without authentication
            for 180 days after issuance, provided the invoice has not been
            canceled.
          format: uri
          example: https://pay.qonto.com/invoices/00000000-0000-0000-0000-000000000000
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
            amount:
              type: string
              example: '1.00'
        stamp_duty_amount:
          type: string
          minLength: 4
          maxLength: 15
          example: '1.00'
        items:
          type: array
          items:
            $ref: '#/components/schemas/DocumentItem'
        client:
          $ref: '#/components/schemas/EmbeddedClient'
        einvoicing_lifecycle_events:
          $ref: '#/components/schemas/EinvoicingLifecycleEvents'
    DocumentItemPayload:
      type: object
      properties:
        title:
          type: string
          description: >-
            Item’s title. It is displayed as the first line of the item in bold
            in the invoice table. It indicates in a short sentence the product
            or service being sold.
          maxLength: 40
        description:
          type: string
          description: >-
            Item’s description of the product or service being sold. It is added
            below the title of each item in the invoice table. Free format, with
            a maximum of 300 characters. Use `\n` to indicate line breaks.
          maxLength: 1800
        quantity:
          type: string
          description: >-
            Item’s quantity of the specific product or services being sold. For
            example, it can be in hours or in number of products. Decimals
            should be separated by a period “.”
          example: '0.5'
        unit:
          type: string
          description: >
            Item’s unit. It is an optional field and allows maximum 20
            characters for non Italian organizations.

            - For Italian organizations, documents are generated in PDF format
            and in XML format (automatically sent to the Italian tax
            authorites). In the PDF, unit will appear with a maximum of 20
            characters. In the XML file, it is truncated down to the first 10
            characters.

            - For French organizations, documents are generated under the
            Factur-X format (a structured PDF file with an embedded XML). For
            the XML file, units that have a corresponding EN16931 code (standard
            followed by Factur-X format) will be indicated with its relevant
            code. See mapping below of possible values and their corresponding
            code.


            <details>

            <summary>Possible values and corresponding EN16931 code (pursuant to
            the <a
            href"'https://www.impots.gouv.fr/specifications-externes-b2b">“Annexe
            7” of the B2B external specifications for French e-invoicing</a>,
            BT-130, allowed units of measure)</summary>


            | Unit                    | EN16931 code |

            |-||

            | unit                    | C62  |

            | hour                    | HUR  |

            | day                     | DAY  |

            | month                   | MON  |

            | gram                    | GRM  |

            | kilogram                | KGM  |

            | liter                   | LTR  |

            | meter                   | MTR  |

            | square_meter            | MTK  |

            | cubic_meter             | MTQ  |

            | ampere                  | AMP  |

            | number_of_articles      | NAR  |

            | centimeter              | CMT  |

            | cubic_meter_per_hour    | MQH  |

            | gigajoule               | GV   |

            | gigawatt                | A90  |

            | gigawatt_hour           | GWH  |

            | half_year               | SAN  |

            | joule                   | JOU  |

            | kilojoule               | KJO  |

            | kilovar                 | KVR  |

            | kilovolt_ampere_reactive_hour | K3  |

            | kilowatt                | KWT  |

            | kilowatt_hour           | KWH  |

            | megajoule               | 3B   |

            | megawatt                | MAW  |

            | megawatt_hour           | MWH  |

            | milligram               | MGM  |

            | milliliter              | MLT  |

            | millimeter              | MMT  |

            | minute                  | MIN  |

            | pair                    | PR   |

            | quarter                 | QAN  |

            | second                  | SEC  |

            | set                     | SET  |

            | ton                     | TNE  |

            | two_week                | W4   |

            | watt_hour               | WHR  |

            | week                    | WEE  |

            | year                    | ANN  |

            | custom_input_text       | ZZ   |

            </details>
          example: meter
        unit_price:
          type: object
          properties:
            value:
              type: string
              description: >-
                Price per unit of product or service sold. Decimals should be
                separated by a period “.”
            currency:
              type: string
              description: >-
                Item’s currency. Currently, only value allowed is EUR. Format
                supported is a trigram following ISO 4217.
          required:
            - value
            - currency
        vat_rate:
          type: string
          description: >-
            VAT rate applicable for that particular item. Written in decimals,
            separated by a period “.” For example, for a VAT of 10%, input is
            0.1
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
          description: >-
            VAT exemption reason when the item’s vat_rate is equal to 0. If VAT
            rate is not 0, this field should not be included. Required for
            Italian organizations and for French organizations subject to
            e-reporting.


            Allowed codes depend on the organization’s country:

            - Italy: `N1` to `N7` codes

            - France: `S293B`, `S262.1`, `S259`, `S283`, `S261`, `S262`, `S263`

            - Germany: `S19.1`, `S4.1B`, `S4.1A`, `S4`, `S13B`

            - Spain: `S122`, `S25`, `S21`, `S69`, `S20`, `S84.1.2`

            - Austria: `S6.1.27`, `S11.1A`, `S6.1.16`, `S6.1.13`, `S6.1.19`

            - Belgium: `S44.1`, `S44.3.11`, `S44.3.2`, `S44.3.4`, `S39bis`,
            `S56bis`, `S39`, `S21`

            - Netherlands: `S25`, `S9`, `S11`, `S12`

            - Portugal: `S53`, `S9.29.30`, `S9.27.28`, `S9.1-5`
          example: N1
        discount:
          type: object
          properties:
            type:
              type: string
              enum:
                - percentage
                - absolute
              description: Type of the discount for that item.
              example: percentage
            value:
              type: string
              description: Rate or the absolute amount that will be discounted
              example: '0.1'
      required:
        - title
        - quantity
        - unit_price
        - vat_rate
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