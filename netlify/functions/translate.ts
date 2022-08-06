import fetch from "node-fetch"
import { URLSearchParams } from "url"
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
    const url    = process.env.TEXTRA_API_ENDPOINT || ""
    const key    = process.env.TEXTRA_API_KEY || ""
    const secret = process.env.TEXTRA_API_SECRET || ""
    const name   = process.env.TEXTRA_USER_NAME || ""
    const api_name  = process.env.TEXTRA_API_NAME || ""
    const api_param = process.env.TEXTRA_API_PARAM || ""

    const paramsForGetToken = new URLSearchParams()
    paramsForGetToken.append("grant_type", "client_credentials")
    paramsForGetToken.append("client_id", key)
    paramsForGetToken.append("client_secret", secret)
    paramsForGetToken.append("urlAccessToken", `${url}/oauth2/token.php`)

    try {
        const resToken = await fetch(`${url}/oauth2/token.php`, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: paramsForGetToken
        }).then(res => res.text())
    
        const access_token = JSON.parse(resToken).access_token

        const paramsForApi = new URLSearchParams()
        paramsForApi.append("access_token", access_token)
        paramsForApi.append("key", key)
        paramsForApi.append("api_name", api_name)
        paramsForApi.append("api_param", api_param)
        paramsForApi.append("name", name)
        paramsForApi.append("type", "json")
        paramsForApi.append("text", event.body!)

        const res = await fetch(`${url}/api/`, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: paramsForApi
        }).then(res => res.text())

        return { statusCode: 200, body: JSON.parse(res).resultset.result.information["text-t"] };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data' }),
        };
    }
};