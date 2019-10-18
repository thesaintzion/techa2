/**
  * @function sendEmail
  * @description sends an email to provided recipients
  * @param {object} transporter
  * @param {object} emailOptions
  * @returns {promise} info
  */
 const sendEmail = (transporter, emailOptions) => new Promise((resolve, reject) => {
    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
  
  
  export default sendEmail;
  