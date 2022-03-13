const { google } = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENTID);

class googleUtils {
    googleConfig = {
        clientId: process.env.CLIENTID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
        clientSecret: process.env.CLIENTSECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
        redirect: process.env.REDIRECTURI // this must match your google api settings
    };

    defaultScope = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    createConnection() {
        return new google.auth.OAuth2(
            this.googleConfig.clientId,
            this.googleConfig.clientSecret,
            this.googleConfig.redirect
        );
    }


    getConnectionUrl(auth) {
        return auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
            scope: this.defaultScope
        });
    }


    urlGoogle() {
        const auth = this.createConnection(); // this is from previous step
        const url = this.getConnectionUrl(auth);
        return url;
    };

    getGooglePlusApi(auth) {
        return google.plus({ version: 'v1', auth });
    }

    async verify(token) {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENTID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
    }
}

module.exports = googleUtils; 
