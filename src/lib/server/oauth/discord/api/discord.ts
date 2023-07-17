import { nanoid } from "nanoid";

export const discord = (clientId, clientSecret, redirectPath, callbackurl) => {
    return {
        name: 'discord',
        authPath: '/oauth/discord/auth',
        validatePath: '/oauth/discord/validate',
        getAuthIdentity: () => {
            const provider = getDiscordIdentity(clientId, callbackurl);
            return provider;
        },
        getValidation: async (event) => {
            const token = await getDiscordValidation(clientId, clientSecret, event, callbackurl);
            return token;
        },
        getUser: async (token) => {
            const user = await getUser(token);
            return user;
        },
        redirectPath,
    };
};

export function getDiscordIdentity(client_id: string, callbackurl): Promise<any> {
    const state = nanoid();
    const cookieHeader = `discord_oauth_state=${state}; HttpOnly; Max-Age=3600; Path=/`;
    const authorizationUrlSearchParams = new URLSearchParams({
        client_id: client_id,
        state,
        redirect_uri: callbackurl,
        scope: "identify email",
    });
    const authorizationUrl = `https://discord.com/api/oauth2/authorize?${authorizationUrlSearchParams}&response_type=code&prompt=none`;
    const headers = new Headers();
    headers.append('Set-Cookie', cookieHeader);
    headers.append('Location', authorizationUrl);
    return headers;
}

//check state cookie and fetch access token
export async function getDiscordValidation(client_id: string, client_secret: string, event, callbackurl) {
    const storedState = event.cookies.get("discord_oauth_state");
    const state = event.url.searchParams.get("state");

    if (!storedState || !state || storedState !== state) {
        return new Response(null, {
            status: 400,
        });
    }
    const code = event.url.searchParams.get("code");
    if (!code) {
        return new Response(null, {
            status: 400,
        });
    }
    // console.log(code)
    const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            code,
            redirect_uri: callbackurl,
            grant_type: "authorization_code",
            scope: "identify email",
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        }
    });
    if (!response.ok) {
        console.log('Response was NOT okay');
        return new Response(null, {
            status: 400
        });
    }
    const result = await response.json() as { access_token: string };
    const accessToken = result.access_token;
    return accessToken;
}

export async function getUser(accessToken) {
    try {
      const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user information.');
      }
  
      const data = await response.json();
 
      const userData = {
        email: data.email,
        username: data.username,
      };
    
      return userData;
    } catch (error) {
      return new Response(null, {
        status: 400
      });
    }
}
