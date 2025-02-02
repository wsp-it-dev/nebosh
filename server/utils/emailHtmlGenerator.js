const infoEmail = "info@neboshuk-validation-verisecure.org";

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
        <a href="mailto:${infoEmail}"
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

exports.studentVerificationEmail = (
  visitorName,
  visitorOrganisation,
  studentName,
  qualification,
  certNumber,
  authCode,
  verificationURL,
  expireDate,
  expireTime
) => {
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

      p,
      ul {
        line-height: 1.6;
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

      ul {
        list-style-type: none;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://ktcpk.com/assets/ktcpk.png" alt="NEBOSHUK" />
      </div>
      <h3>Nebosh Certificate Verification System</h3>
      <p>Dear ${studentName},</p>
      <p>
        NEBOSH has received a request to verify a NEBOSH certificate that was
        issued to you. To protect your learner from fraudulent activity we
        require you, as the certificate owner, to confirm that you are aware of
        this request and that you are happy for NEBOSH to confirm
        authenticating.
      </p>
      <p>The request was made by:</p>
      <p>
          <span><b>Name:</b> ${visitorName}</span><br />
          <span><b>Organisation:</b> ${visitorOrganisation}</span>
      </p>
      <p>The certificate they have requested verification for is as follows:</p>
      <p>
          <span><b>Qualification:</b> ${qualification}</span> <br />
          <span><b>Master log certificate No:</b> ${certNumber}</span>
      </p>
      <p>
        <b>Why is NEBOSH asking you to authorise this request?</b><br />
        there are instances where individuals or counterfeit organisations
        produce replica copies of certificates for their personal or financial
        gain. It is likely that these individuals will not have completed the
        qualifications that they say they have. This security measure ensures
        that unauthorised individuals or organisations do not benefits from your
        achievements.
      </p>

      <p>
        <b
          >If you are expecting this request and wish to authorise the
          verification.</b
        >
      </p>

      <p>
        Follow the link below and enter the authorisation code. Once you have
        accepted the verification request an email will be sent to the verifier
        confirming authentication of your NEBOSH Certificate.
      </p>

      <p>
        <b>PLEASE NOTE:</b> as an additional security check and to protect your
        certificates being used by others, we do provide additional information
        to verifier that is <b>NOT</b> printed on certificate. This is your date
        of birth, and we will advise the verifier to check this against
        government issued ID.
        <b
          >If you do not want NEBOSH to disclose your date of birth, please do
          not authorise the request and
          <a href="mailto:info@neboshuk-validation-verisecure.org"
            >contact NEBOSH directly.</a
          ></b
        >
      </p>

      <p><a href="${verificationURL}">${verificationURL}</a></p>

      <p><b>Authorisation code:</b> ${authCode}</p>

      <p>
        <b>If you are not expecting this request.</b> <br />
        You can either follow the link above and select reject, an email will be
        automatically sent to the verifier advising them that their request has
        been rejected by you and NEBOSH will not verify the certificate.
      </p>

      <p>
        <b>OR</b> you can do nothing, the request will expire at ${expireTime} on
        ${expireDate}.
      </p>

      <p>
        Should you have any further questions, please feel free to
        <a href="mailto:${infoEmail}"
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
