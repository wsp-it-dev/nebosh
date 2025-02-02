# Certificate Management System

### Required Functionalities

- Manage certificates
- Certificate verification / validation
- Automated Emails

### Entities

- Admin
- Certificate Holder
- Visitor

### Flow

- Admin can create/modify certificates
- Certificate will have a unique QR code of URL
- Visitor can scan QR code, certificate holder information auto filled
- Visitor can request certificate validity / information
- Visitor can submit application for certificate information
- Visitor information should also be collected(name, email, organization)
- Verification email sent to visitor and certificate holder(saved in records as well)
- Visitor will receive just confirmation email
- Certificate holder will receive an email, with visitor information and authentication code and a URL
- Holder can visit this URL and input authentication code, to confirm that information should be provided to visitor
- Visitor will receive an email with all the details about certificate holder

###

- Only Admin can access the dashboard
- Admin can add Certificate
