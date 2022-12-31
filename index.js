import axios from "axios";
import qs from "qs";

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let scopes = [
    "user_read",
    "user:read:email",
    "chat:edit",
    "chat:read",

  ];
  const response_type = "code";
  scopes = scopes.join(" ");

  res.redirect(
    "https://id.twitch.tv/oauth2/authorize?" +
      qs.stringify({
        response_type: response_type,
        client_id: "<your clientID>",
        scope: scopes,
        redirect_uri: "http://localhost:3000/callback",
      })
  );
  res.redirect;
  return;
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  await FetchAccessToken(code);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function FetchAccessToken(code) {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token?" +
        qs.stringify({
          client_id: "<your clientID>",
          client_secret: "<your client secret>",
          code: code,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000/callback",
        }),
      null,
      {
        headers: {},
      }
    );

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function RefreshToken() {
  const refreshToken = twitchData.refreshToken;

  const newToken = await axios.post(
    "https://id.twitch.tv/oauth2/token?" +
      qs.stringify({
        client_id: "<your clientID>",
        client_secret: "<your client secret>",
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      })
  );

  return accessToken;
}
