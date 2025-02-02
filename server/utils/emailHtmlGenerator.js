exports.visitorRequestedEmail = (visitorName, certificateNumber) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verification Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
      }

      h1 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
      }

      p {
        line-height: 1.6;
        color: #555;
      }

      .logo {
        text-align: center;
        margin-bottom: 20px;
      }

      .logo img {
        max-width: 150px;
      }

      a {
        color: rgb(19, 127, 227);
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://ktcpk.com/assets/ktcpk.png" alt="NEBOSHUK" />
      </div>
      <h3>Nebosh Certificate Verification System</h3>
      <p>Dear ${visitorName},</p>
      <p>
        Thank you for submitting a request to verify a NEBOSH unit certificate
        or Parchment. Your request has been forwarded to the learner who was
        initially issued the certificate with ID ${certificateNumber}, and they
        will need to approve your request.
      </p>
      <p>
        Please note, this request will expire automatically in two days if the
        certificate holder does not respond. It may be helpful to remind the
        individual you are verifying to check their inbox.
      </p>
      <p>
        <b>Why is NEBOSH asking for confirmation from the certificate holder?</b
        ><br />
        To protect against fraudulent activities, such as counterfeit
        certificates created for personal gain, NEBOSH requires confirmation
        directly from the certificate holder. This ensures that the verification
        is only completed for those who have truly earned their NEBOSH
        qualification.
      </p>

      <p>
        <b
          >Please remember that this email does not confirm the verification,</b
        >
        as the final result will be sent to you directly from NEBOSH within two
        business days. In the meantime, we recommend reviewing our "Verifying
        Credentials to Prevent Qualification Fraud" guide, which provides tips
        and advice on authenticating NEBOSH unit certificates and Parchments.
        This guide can be found on our <a href="#">verifications page</a>.
      </p>

      <p>
        <b><u>Important:</u></b> To assist NEBOSH in tackling fraudulent
        activities, we will keep a record of your verification request and its
        outcome. We will also store your name, organisation, and email for
        monitoring purposes.
      </p>

      <p>
        Should you have any further questions, please feel free to
        <a href="mailto:info@neboshuk-validation-verisecure.org"
          >contact NEBOSH.</a
        ><br />
        Best regards,<br /><br />
        NEBOSH Team
      </p>
    </div>
  </body>
</html>

    `;
};
