import { google } from 'googleapis';

const googleConfig = {
  clientId: process.env.CLIENTID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.CLIENTSECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: process.env.REDIRECTURI // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}