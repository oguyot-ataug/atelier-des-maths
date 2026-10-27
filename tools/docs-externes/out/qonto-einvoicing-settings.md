> ## Documentation Index
> Fetch the complete documentation index at: https://docs.qonto.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get e-invoicing settings

> OAuth scope: `einvoicing.read`

Returns the e-invoicing sending and receiving status for the authenticated organization. If the country is not supported, it returns the default settings.




## OpenAPI

````yaml get /v2/einvoicing/settings
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
  /v2/einvoicing/settings:
    get:
      tags:
        - E-invoicing
      summary: Get e-invoicing settings
      description: >
        OAuth scope: `einvoicing.read`


        Returns the e-invoicing sending and receiving status for the
        authenticated organization. If the country is not supported, it returns
        the default settings.
      operationId: get_einvoicing_settings
      parameters:
        - $ref: '#/components/parameters/X-Qonto-Staging-Token'
      responses:
        '200':
          description: Returns the e-invoicing settings.
          content:
            application/json:
              schema:
                type: object
                properties:
                  sending_status:
                    type: string
                    example: enabled
                    enum:
                      - enabled
                      - disabled
                    description: The status of e-invoicing sending for the organization
                  receiving_status:
                    type: string
                    example: enabled
                    enum:
                      - enabled
                      - disabled
                      - pending_creation
                      - pending_deletion
                    description: The status of e-invoicing receiving for the organization
                required:
                  - sending_status
                  - receiving_status
        '401':
          $ref: '#/components/responses/401-Unauthorized'
        '403':
          $ref: '#/components/responses/403-Forbidden'
        '404':
          $ref: '#/components/responses/404-Not-Found'
        '500':
          $ref: '#/components/responses/500-Internal-Server-Error'
      security:
        - OAuth:
            - einvoicing.read
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
    500-Internal-Server-Error:
      description: Returns an internal server error.
  schemas:
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