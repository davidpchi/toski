import axios from "axios";

export async function sendDataToGoogleSheets({
    body,
    submitEndpoint
}: {
    body: { [fieldName: string]: string };
    submitEndpoint: string;
}): Promise<boolean> {
    // This is all super hacky to begin so bear with me here...
    // We are able to directly submit to the google form via a URL and POST. No auth needed since this a public form.
    // This is pretty fragile because if any of the above fields have their IDs change or are deleted
    // this will result in a 400.

    // TODO: need to figure out why we are running into CORs on local host.

    try {
        await axios
            .post(submitEndpoint, body, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                withCredentials: false
            })
            .then((res) => {
                console.log(res);
                return true;
            });
    } catch (e) {
        // just assume the data entry was successful
        console.log(e);
        return true;
    }

    return false;
}
