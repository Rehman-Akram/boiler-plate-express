const generateInviteEmail = (recipientName, message, inviteLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invitation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          text-align: center;
          padding: 20px;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #333333;
        }

        p {
          color: #666666;
        }

        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #34bd7b;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        a, a:link, a:visited,a:hover{
          color:#000 !important;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hi ${recipientName ? recipientName : 'User'},</h1>
        <p>${message ? message : ''}</p>
        <p>InviteLink: <a href="${inviteLink}">Link</a></p>
        <p>Looking forward to seeing you!</p>
        <p>Best regards,</p>
      </div>
    </body>
    </html>
  `;
}

module.exports = { generateInviteEmail }
