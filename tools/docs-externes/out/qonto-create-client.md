> ## Documentation Index
> Fetch the complete documentation index at: https://docs.qonto.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a client

> OAuth scope: `client.write`



Creates a single client for the authenticated organization.

<Warning>
  There is no uniqueness rule. It is strongly advised to search using the [GET /v2/clients](/api-reference/business-api/clients/list-clients) endpoint for a given client before creating a new client.
  <br/>**Price plans:** this endpoint is available for all Qonto price plans.
</Warning>




## OpenAPI

````yaml post /v2/clients
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
  /v2/clients:
    post:
      tags:
        - Clients
      summary: Create a client
      description: |
        OAuth scope: `client.write`



        Creates a single client for the authenticated organization.

        <Warning>
          There is no uniqueness rule. It is strongly advised to search using the [GET /v2/clients](/api-reference/business-api/clients/list-clients) endpoint for a given client before creating a new client.
          <br/>**Price plans:** this endpoint is available for all Qonto price plans.
        </Warning>
      parameters:
        - $ref: '#/components/parameters/X-Qonto-Staging-Token'
      requestBody:
        description: >-
          When creating a client to be used for **invoicing purposes**, do note:


          - A client can be created by only specifying a `type` and a `name`
          (depending on the chosen `type`);


          - However, to be able to use that client for invoicing, the following
          additional fields must also be provided:
              - `currency`
              - `locale`
              - address, either as root-level fields (`address`, `city`, `zip_code`, `province_code` and `country_code`) or inside the `billing_address` field object.
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ClientCreatePayload'
      responses:
        '200':
          description: Returns the client created.
          content:
            application/json:
              schema:
                type: object
                properties:
                  client:
                    $ref: '#/components/schemas/Client'
                required:
                  - client
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
            - client.write
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
    ClientCreatePayload:
      oneOf:
        - $ref: '#/components/schemas/ClientIndividualCreatePayload'
        - $ref: '#/components/schemas/ClientCompanyCreatePayload'
      discriminator:
        propertyName: kind
        mapping:
          individual: '#/components/schemas/ClientIndividualCreatePayload'
          company: '#/components/schemas/ClientCompanyCreatePayload'
          freelancer: '#/components/schemas/ClientCompanyCreatePayload'
    Client:
      oneOf:
        - $ref: '#/components/schemas/ClientCompany'
        - $ref: '#/components/schemas/ClientIndividual'
      discriminator:
        propertyName: kind
        mapping:
          company: '#/components/schemas/ClientCompany'
          freelancer: '#/components/schemas/ClientCompany'
          individual: '#/components/schemas/ClientIndividual'
    ClientIndividualCreatePayload:
      type: object
      properties:
        name:
          type: string
          description: >-
            Name of the client that needs to pay the client invoice.  It is
            required if type is `company`
          maxLength: 250
        first_name:
          type: string
          description: >-
            First name of the client that needs to pay the invoice. It is
            required if type is `individual` or `freelancer`
          maxLength: 60
        last_name:
          type: string
          description: >-
            Last name of the client that needs to pay the invoice. It is
            required if type is individual or freelancer.
          maxLength: 60
        kind:
          type: string
          enum:
            - individual
            - company
            - freelancer
          description: >-
            Client kind: `individual` represents a physical person (a consumer)
            whereas `company` represents a legal entity. For Italian
            organizations only, `freelancer` (a legal entity with the name of a
            person) is also accepted.
        type:
          type: string
          deprecated: true
          enum:
            - individual
            - company
            - freelancer
          description: >-
            This field is identical to kind. You can choose to send either
            `type` or `kind`. If you end up sending both, `kind` will take
            precedence over `type`.
        email:
          type: string
          description: >-
            E-mail address of the client that needs to pay the invoice, which is
            displayed in the invoice.
          format: email
          example: john.doe@qonto.eu
        extra_emails:
          type:
            - array
            - 'null'
          description: >
            Additional email addresses for the client.

            Store additional emails that won't appear in the document but will
            be used as recipients when sending the document via email.
          items:
            type: string
            format: email
            maxLength: 250
            example: additional@email.com
          maxItems: 100
          example:
            - additional@email.com
            - backup@email.com
        phone:
          type: object
          description: Client's phone country code and number.
          properties:
            country_code:
              type: string
              description: Country code of the client's phone number.
              example: '+33'
            number:
              type: string
              description: Phone number of the client.
              example: '123456789'
        e_invoicing_address:
          type: string
          description: |
            Specifically for French organizations.
            A unique address in one of the formats:
            - siren e.g. 987654321
            - siren_siret e.g. 987654321_98765432100012
            - siren_siret_routingCode e.g. 987654321_98765432100012_00001
            - siren_suffix e.g. 987654321_00002

            Note the address should also exist in the Annuaire to be accepted.
          example: '987654321'
        vat_number:
          type: string
          description: >
            Value Added Tax number of the client (a legal entity) that needs to
            pay the invoice.


            **French VAT Number Format:** If the VAT number starts with 'FR', it
            must follow this format:

            - "FR" is the country code (2 characters)

            - The "2-character key" is a checksum that can be two digits or an
            alphanumeric combination (letters/digits)

            - The final 9 digits are the company's SIREN number (the core French
            business identifier)


            Example: `FR12345678901` (FR + 2-character checksum + 9-digit SIREN)
          maxLength: 20
        tax_identification_number:
          type: string
          description: >
            Tax Identification Number (TIN) of the client. Format varies by
            country:

            - **France**: SIREN (9 digits) or SIRET (14 digits)

            - **Italy**: Codice Fiscale (11 digits for companies, 16
            alphanumeric for individuals)

            - **Spain**: NIF/CIF (9 characters)

            - **Germany**: Steuernummer


            **Note:** A client can be created without this field, but invoice
            creation may fail if the field is missing or invalid based on these
            rules. If you receive a validation error related to
            `tax_identification_number` when creating an invoice, update the
            client first and then retry creating the invoice.
          maxLength: 20
        address:
          type: string
          description: >-
            Address of the client that needs to pay the invoice.


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.street_address` instead.
          maxLength: 250
          deprecated: true
        city:
          type: string
          description: >-
            City of the client that needs to pay the invoice.

            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.city` instead.
          maxLength: 50
          deprecated: true
        zip_code:
          type: string
          description: >-
            Zip code of the client that needs to pay the invoice. For clients
            with Italy as a country, the value must be 5 characters. For other
            countries, the value is capped to 20 characters.


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.zip_code` instead.
          maxLength: 20
          deprecated: true
        province_code:
          type: string
          description: >-
            Province code of the client that needs to pay the invoice. It is
            required only for Italian organizations.


            List of province codes:

            AG, AL, AN, AO, AP, AQ, AR, AT, AV, BA, BG, BI, BL, BN, BO, BR, BS,
            BT, BZ, CA, CB, CE, CH, CL, CN, CO, CR, CS, CT, CZ, EN, FC, FE, FG,
            FI, FM, FR, GE, GO, GR, IM, IS, KR, LC, LE, LI, LO, LT, LU, MB, MC,
            ME, MI, MN, MO, MS, MT, NA, NO, NU, OR, PA, PC, PD, PE, PG, PI, PN,
            PO, PR, PT, PU, PV, PZ, RA, RC, RE, RG, RI, RM, RN, RO, SA, SI, SO,
            SP, SR, SS, SU, SV, TA, TE, TN, TO, TP, TR, TS, TV, UD, VA, VB, VC,
            VE, VI, VR, VT, VV


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.province_code` instead.
          minLength: 2
          maxLength: 2
          deprecated: true
        country_code:
          type: string
          description: >-
            Country code of the client that needs to pay the invoice as a
            root-level field (ISO 3166 format).


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.country_code` instead.
          minLength: 2
          maxLength: 2
          example: FR
          deprecated: true
        billing_address:
          type: object
          description: >-
            Billing address of the client, which will be reflected on the
            invoice. Required to fill in either this object (with fields
            `street_address`, `city`, `zip_code`, `province_code` and
            `country_code`) or the root level fields (`address`, `city`,
            `zip_code`, `province_code` and `country_code`) when creating an
            invoice with this client.
          allOf:
            - $ref: '#/components/schemas/ClientBillingAddress'
        delivery_address:
          type: object
          description: Delivery address of the client whose
          allOf:
            - $ref: '#/components/schemas/ClientDeliveryAddress'
        recipient_code:
          type: string
          description: >-
            Only for Italian clients. Represents the client's recipient code, so
            that the client can receive the e-invoice in his SDI portal.
        currency:
          type: string
          description: >-
            Client's currency in ISO 4217 format (alpha-3). Required when
            creating a client invoice and will be used as the invoice currency.
          example: EUR
        locale:
          type: string
          description: >
            Language of the documents created on Qonto (invoices, quotes, credit
            notes) for this particular client.

            It is possible to choose between five languages: French, English,
            Italian, German, and Spanish. Required when creating an invoice with
            this client.

            Note, although we accept locales of format fr-FR we ignore the
            region part, treating this as fr
          example: FR
      required:
        - first_name
        - last_name
        - kind
    ClientCompanyCreatePayload:
      type: object
      properties:
        name:
          type: string
          description: >-
            Name of the client that needs to pay the client invoice.  It is
            required if type is `company`
          maxLength: 250
        first_name:
          type: string
          description: >-
            First name of the client that needs to pay the invoice. It is
            required if type is `individual` or `freelancer`
          maxLength: 60
        last_name:
          type: string
          description: >-
            Last name of the client that needs to pay the invoice. It is
            required if type is individual or freelancer.
          maxLength: 60
        kind:
          type: string
          enum:
            - company
            - freelancer
          description: >
            Describes the client type. `individual` represents a physical person
            (a consumer) whereas `company` or `freelancer` represent a legal
            entity. Usually a `freelancer` is a legal entity with the name of a
            person.
        type:
          type: string
          enum:
            - company
          description: >-
            Client type: `individual` represents a physical person (a consumer)
            whereas `company` represents a legal entity. For Italian
            organizations only, `freelancer` (a legal entity with the name of a
            person) is also accepted.
        email:
          type: string
          description: >-
            E-mail address of the client that needs to pay the invoice, which is
            displayed in the invoice.
          format: email
          example: john.doe@qonto.eu
        extra_emails:
          type:
            - array
            - 'null'
          description: >
            Additional email addresses for the client.

            Store additional emails that won't appear in the document but will
            be used as recipients when sending the document via email.
          items:
            type: string
            format: email
            maxLength: 250
            example: additional@email.com
          maxItems: 100
          example:
            - additional@email.com
            - backup@email.com
        phone:
          type: object
          description: Client's phone number.
          properties:
            country_code:
              type: string
              description: Country code of the client's phone number.
              example: '+33'
            number:
              type: string
              description: Phone number of the client.
              example: '123456789'
        e_invoicing_address:
          type: string
          description: |
            Specifically for French organizations.
            A unique address in one of the formats:
            - siren e.g. 987654321
            - siren_siret e.g. 987654321_98765432100012
            - siren_siret_routingCode e.g. 987654321_98765432100012_00001
            - siren_suffix e.g. 987654321_00002

            Note the address should also exist in the Annuaire to be accepted.
          example: '987654321'
        vat_number:
          type: string
          description: >
            Value Added Tax number of the client (a legal entity) that needs to
            pay the invoice.


            **French VAT Number Format:** If the VAT number starts with 'FR', it
            must follow this format:

            - "FR" is the country code (2 characters)

            - The "2-character key" is a checksum that can be two digits or an
            alphanumeric combination (letters/digits)

            - The final 9 digits are the company's SIREN number (the core French
            business identifier)


            Example: `FR12345678901` (FR + 2-character checksum + 9-digit SIREN)
          maxLength: 20
        tax_identification_number:
          type: string
          description: >
            Tax Identification Number (TIN) of the client. Format varies by
            country:

            - **France**: SIREN (9 digits) or SIRET (14 digits)

            - **Italy**: Codice Fiscale (11 digits for companies, 16
            alphanumeric for individuals)

            - **Spain**: NIF/CIF (9 characters)

            - **Germany**: Steuernummer


            **Note:** A client can be created without this field, but invoice
            creation may fail if the field is missing or invalid based on these
            rules. If you receive a validation error related to
            `tax_identification_number` when creating an invoice, update the
            client first and then retry creating the invoice.
          maxLength: 20
        address:
          type: string
          description: >-
            Address of the client that needs to pay the invoice.


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.street_address` instead.
          maxLength: 250
          deprecated: true
        city:
          type: string
          description: >-
            City of the client that needs to pay the invoice.

            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.city` instead.
          maxLength: 50
          deprecated: true
        zip_code:
          type: string
          description: >-
            Zip code of the client that needs to pay the invoice. For clients
            with Italy as a country, the value must be 5 characters. For other
            countries, the value is capped to 20 characters.


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.zip_code` instead.
          maxLength: 20
          deprecated: true
        province_code:
          type: string
          description: >-
            Province code of the client that needs to pay the invoice. It is
            required only for Italian organizations.


            List of province codes:

            AG, AL, AN, AO, AP, AQ, AR, AT, AV, BA, BG, BI, BL, BN, BO, BR, BS,
            BT, BZ, CA, CB, CE, CH, CL, CN, CO, CR, CS, CT, CZ, EN, FC, FE, FG,
            FI, FM, FR, GE, GO, GR, IM, IS, KR, LC, LE, LI, LO, LT, LU, MB, MC,
            ME, MI, MN, MO, MS, MT, NA, NO, NU, OR, PA, PC, PD, PE, PG, PI, PN,
            PO, PR, PT, PU, PV, PZ, RA, RC, RE, RG, RI, RM, RN, RO, SA, SI, SO,
            SP, SR, SS, SU, SV, TA, TE, TN, TO, TP, TR, TS, TV, UD, VA, VB, VC,
            VE, VI, VR, VT, VV


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.province_code` instead.
          minLength: 2
          maxLength: 2
          deprecated: true
        country_code:
          type: string
          description: >-
            Country code of the client that needs to pay the invoice as a
            root-level field (ISO 3166 format).


            **DEPRECATED**: This field is deprecated. Please use
            `billing_address.country_code` instead.
          minLength: 2
          maxLength: 2
          example: FR
          deprecated: true
        billing_address:
          type: object
          description: >-
            Billing address of the client, which will be reflected on the
            invoice. Required to fill in either this object (with fields
            `street_address`, `city`, `zip_code`, `province_code` and
            `country_code`) or the root level fields (`address`, `city`,
            `zip_code`, `province_code` and `country_code`) when creating an
            invoice with this client.
          allOf:
            - $ref: '#/components/schemas/ClientBillingAddress'
        delivery_address:
          type: object
          description: Delivery address of the client whose
          allOf:
            - $ref: '#/components/schemas/ClientDeliveryAddress'
        recipient_code:
          type: string
          description: >-
            Only for Italian clients. Represents the client's recipient code, so
            that the client can receive the e-invoice in his SDI portal.
        currency:
          type: string
          description: >-
            Client's currency in ISO 4217 format (alpha-3). Required when
            creating a client invoice and will be used as the invoice currency.
          example: EUR
        locale:
          type: string
          description: >
            Language of the documents created on Qonto (invoices, quotes, credit
            notes) for this particular client.

            It is possible to choose between five languages: French, English,
            Italian, German, and Spanish. Required when creating an invoice with
            this client.

            Note, although we accept locales of format fr-FR we ignore the
            region part, treating this as fr.
          example: FR
      required:
        - name
        - kind
    ClientCompany:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
          description: Name of the client that needs to pay the client invoice.
          example: John Doe
        first_name:
          type: string
          description: First name of the client that needs to pay the invoice.
          example: John
        last_name:
          type: string
          description: Last name of the client that needs to pay the invoice.
          example: Doe
        phone_number:
          type: string
          description: >-
            Phone number of the client that needs to pay the invoice.
            Deprecated, use `phone` instead.
          example: '+33123456789'
          deprecated: true
        phone:
          type: object
          description: >-
            Phone country code and number of the client that needs to pay the
            invoice.
          properties:
            country_code:
              type: string
              description: Country code of the client's phone number.
              example: '+33'
            number:
              type: string
              description: Phone number of the client.
              example: '123456789'
        kind:
          type: string
          enum:
            - company
            - freelancer
          description: >
            Describes the client type. `individual` represents a physical person
            (a consumer) whereas `company` or `freelancer` represent a legal
            entity. Usually a `freelancer` is a legal entity with the name of a
            person.
        type:
          type: string
          deprecated: true
          enum:
            - company
            - individual
            - freelancer
          description: >
            Describes the client type. `individual` represents a physical person
            (a consumer) whereas `company` or `freelancer` represent a legal
            entity. Usually a `freelancer` is a legal entity with the name of a
            person.
        email:
          type: string
          description: >-
            E-mail address of the client that needs to pay the invoice, which is
            displayed in the invoice.
          format: email
          example: john.doe@qonto.eu
        extra_emails:
          type:
            - array
            - 'null'
          description: >
            Additional email addresses for the client.

            Store additional emails that won't appear in the document but will
            be used as recipients when sending the document via email.
          items:
            type: string
            format: email
            maxLength: 250
            example: additional@email.com
          maxItems: 100
          example:
            - additional@email.com
            - backup@email.com
        currency:
          type: string
          description: >-
            Client's currency in ISO 4217 format (alpha-3). Required when
            creating a client invoice and will be used as the invoice currency.
          example: EUR
        e_invoicing_address:
          type: string
          description: |
            Specifically for French organizations.
            A unique address in one of the formats:
            - siren e.g. 987654321
            - siren_siret e.g. 987654321_98765432100012
            - siren_siret_routingCode e.g. 987654321_98765432100012_00001
            - siren_suffix e.g. 987654321_00002

            Note the address should also exist in the Annuaire to be accepted.
          example: '987654321'
        e_invoicing_reachable:
          type: boolean
          description: >
            Whether the client's `e_invoicing_address` is considered reachable
            for e-invoicing: active in both the French Annuaire and Peppol.
            Present on client responses (get, list, create, update). `false` if
            the address is empty, lookup fails, or either side is inactive.
          example: true
        vat_number:
          type: string
          description: >-
            Value Added Tax number of the client (a legal entity) that needs to
            pay the invoice.
        tax_identification_number:
          type: string
          description: >
            Tax Identification Number (TIN) of the client. Format varies by
            country:

            - **France**: SIREN (9 digits) or SIRET (14 digits)

            - **Italy**: Codice Fiscale (11 digits for companies, 16
            alphanumeric for individuals)

            - **Spain**: NIF/CIF (9 characters)

            - **Germany**: Steuernummer


            **Note:** A client can be created without this field, but invoice
            creation may fail if the field is missing or invalid based on these
            rules. If you receive a validation error related to
            `tax_identification_number` when creating an invoice, update the
            client first and then retry creating the invoice.
        address:
          type: string
          description: Address of the client that needs to pay the invoice.
        city:
          type: string
          description: City of the client that needs to pay the invoice.
        zip_code:
          type: string
          description: Zip code of the client that needs to pay the invoice.
        province_code:
          type: string
          description: >-
            Only for italian organizations. Represents the province code of the
            client.
        country_code:
          type: string
          description: Country code of the client that needs to pay the invoice.
        billing_address:
          type: object
          description: >-
            Billing address of the client that needs to pay the invoice. Stores
            the same data as the root-level fields address fields (`address`,
            `city`, `zip_code`, `province_code`, `country_code`).
          properties:
            street_address:
              type: string
              description: >
                represent the street address section of the billing address of
                the client. (eg street, number, floor, door, etc)
              maxLength: 250
              example: 123 Main Street
            city:
              type: string
              description: >-
                City on the billing address of the client that needs to pay the
                invoice
              maxLength: 50
              example: Paris
            zip_code:
              type: string
              description: >-
                Zip code on the billing address of the client that needs to pay
                the invoice
              maxLength: 20
              example: '75010'
            province_code:
              type: string
              description: Province code of the client's billing address
              maxLength: 2
            country_code:
              type: string
              description: >-
                Country code on the billing address of the client that needs to
                pay the invoice
              maxLength: 2
              example: fr
        delivery_address:
          type: object
          description: >-
            Delivery address of the client that needs to pay the invoice. Stores
            the same data as the root-level fields address fields (`address`,
            `city`, `zip_code`, `province_code`, `country_code`).
          properties:
            street_address:
              type: string
              description: >
                represent the street address section of the delivery address of
                the client. (eg street, number, floor, door, etc)
              maxLength: 250
              example: 123 Main Street
            city:
              type: string
              description: >-
                City on the delivery address of the client that needs to pay the
                invoice
              maxLength: 50
              example: Paris
            zip_code:
              type: string
              description: >-
                Zip code on the delivery address of the client that needs to pay
                the invoice
              maxLength: 20
              example: '75010'
            province_code:
              type: string
              description: >-
                Province code of the client's delivery address that needs to pay
                the invoice
              maxLength: 2
            country_code:
              type: string
              description: >-
                Country code on the delivery address of the client that needs to
                pay the invoice
              maxLength: 2
              example: fr
        recipient_code:
          type: string
          description: >-
            Only for italian clients. Represents the client's recipient code for
            receiving an the e-invoice in his SdI portal.
        created_at:
          type: string
          description: Date the client was created. Note that this is a machine date.
        updated_at:
          type: string
          description: Date the client was last updated. Note that this is a machine date.
        locale:
          type: string
          description: >-
            Language of the documents created on Qonto (invoices, quotes, credit
            notes) for this particular client. Note, although we accept locales
            of format fr-FR we ignore the region part, treating this as fr.
          example: fr
      required:
        - kind
    ClientIndividual:
      type: object
      properties:
        id:
          type: string
          format: uuid
        first_name:
          type: string
          description: First name of the client that needs to pay the invoice.
          example: John
        last_name:
          type: string
          description: Last name of the client that needs to pay the invoice.
          example: Doe
        phone_number:
          type: string
          description: >-
            Phone number of the client that needs to pay the invoice.
            Deprecated, use `phone` instead.
          example: '+33123456789'
          deprecated: true
        phone:
          type: object
          description: >-
            Phone country code and number of the client that needs to pay the
            invoice.
          properties:
            country_code:
              type: string
              description: Country code of the client's phone number.
              example: '+33'
            number:
              type: string
              description: Phone number of the client.
              example: '123456789'
        kind:
          type: string
          enum:
            - individual
          description: >
            Describes the client type. `individual` represents a physical person
            (a consumer) whereas `company` or `freelancer` represent a legal
            entity. Usually a `freelancer` is a legal entity with the name of a
            person.
        type:
          type: string
          enum:
            - individual
            - freelancer
          description: >
            Client type: `individual` represents a physical person (a consumer)
            whereas `company` or `freelancer` represent a legal entity. Usually
            a `freelancer` is a legal entity with the name of a person.
        email:
          type: string
          description: >-
            E-mail address of the client that needs to pay the invoice, which is
            displayed in the invoice.
          format: email
          example: john.doe@qonto.eu
        extra_emails:
          type:
            - array
            - 'null'
          description: >
            Additional email addresses for the client.

            Store additional emails that won't appear in the document but will
            be used as recipients when sending the document via email.
          items:
            type: string
            format: email
            maxLength: 250
            example: additional@email.com
          maxItems: 100
          example:
            - additional@email.com
            - backup@email.com
        currency:
          type: string
          description: >-
            Client's currency in ISO 4217 format (alpha-3). Required when
            creating a client invoice and will be used as the invoice currency.
          example: EUR
        e_invoicing_address:
          type: string
          description: |
            Specifically for French organizations.
            A unique address in one of the formats:
            - siren e.g. 987654321
            - siren_siret e.g. 987654321_98765432100012
            - siren_siret_routingCode e.g. 987654321_98765432100012_00001
            - siren_suffix e.g. 987654321_00002

            Note the address should also exist in the Annuaire to be accepted.
          example: '987654321'
        e_invoicing_reachable:
          type: boolean
          description: >
            Whether the client's `e_invoicing_address` is considered reachable
            for e-invoicing: active in both the French Annuaire and Peppol.
            Present on client responses (get, list, create, update). `false` if
            the address is empty, lookup fails, or either side is inactive.
          example: true
        vat_number:
          type: string
          description: >-
            Value Added Tax number of the client (a legal entity) that needs to
            pay the invoice.
        tax_identification_number:
          type: string
          description: >
            Tax Identification Number (TIN) of the client. Format varies by
            country:

            - **France**: SIREN (9 digits) or SIRET (14 digits)

            - **Italy**: Codice Fiscale (11 digits for companies, 16
            alphanumeric for individuals)

            - **Spain**: NIF/CIF (9 characters)

            - **Germany**: Steuernummer


            **Note:** A client can be created without this field, but invoice
            creation may fail if the field is missing or invalid based on these
            rules. If you receive a validation error related to
            `tax_identification_number` when creating an invoice, update the
            client first and then retry creating the invoice.
        address:
          type: string
          description: Address of the client that needs to pay the invoice.
        city:
          type: string
          description: City of the client that needs to pay the invoice.
        zip_code:
          type: string
          description: Zip code of the client that needs to pay the invoice.
        province_code:
          type: string
          description: >-
            Only for italian organizations. Represents the province code of the
            client.
        country_code:
          type: string
          description: Country code of the client that needs to pay the invoice.
        billing_address:
          type: object
          description: >-
            Billing address of the client that needs to pay the invoice. Stores
            the same data as the root-level fields address fields (`address`,
            `city`, `zip_code`, `province_code`, `country_code`).
          properties:
            street_address:
              type: string
              description: >
                represent the street address section of the billing address of
                the client. (eg street, number, floor, door, etc)
              maxLength: 250
              example: 123 Main Street
            city:
              type: string
              description: >-
                City on the billing address of the client that needs to pay the
                invoice
              maxLength: 50
              example: Paris
            zip_code:
              type: string
              description: >-
                Zip code on the billing address of the client that needs to pay
                the invoice
              maxLength: 20
              example: '75010'
            province_code:
              type: string
              description: Province code of the client's billing address
              maxLength: 2
            country_code:
              type: string
              description: >-
                Country code on the billing address of the client that needs to
                pay the invoice
              maxLength: 2
              example: fr
        delivery_address:
          type: object
          description: >-
            Delivery address of the client that needs to pay the invoice. Stores
            the same data as the root-level fields address fields (`address`,
            `city`, `zip_code`, `province_code`, `country_code`).
          properties:
            street_address:
              type: string
              description: >
                represent the street address section of the delivery address of
                the client. (eg street, number, floor, door, etc)
              maxLength: 250
              example: 123 Main Street
            city:
              type: string
              description: >-
                City on the delivery address of the client that needs to pay the
                invoice
              maxLength: 50
              example: Paris
            zip_code:
              type: string
              description: >-
                Zip code on the delivery address of the client that needs to pay
                the invoice
              maxLength: 20
              example: '75010'
            province_code:
              type: string
              description: >-
                Province code of the client's delivery address that needs to pay
                the invoice
              maxLength: 2
            country_code:
              type: string
              description: >-
                Country code on the delivery address of the client that needs to
                pay the invoice
              maxLength: 2
              example: fr
        recipient_code:
          type: string
          description: >-
            Only for italian clients. Represents the client's recipient code for
            receiving an the e-invoice in his SdI portal.
        created_at:
          type: string
          description: Date the client was created. Note that this is a machine date.
        updated_at:
          type: string
          description: Date the client was last updated. Note that this is a machine date.
        locale:
          type: string
          description: >-
            Language of the documents created on Qonto (invoices, quotes, credit
            notes) for this particular client. Note, although we accept locales
            of format fr-FR we ignore the region part, treating this as fr.
          example: fr
      required:
        - kind
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