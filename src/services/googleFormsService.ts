import axios from "axios";

/**
 * Sends data to a public Google Form via its form endpoint.
 *
 * @async
 * @function
 * @param {Object.<string, string>} params.formData - An object containing form field names as keys and their values as values. Field names should be without the 'entry.' prefix.
 * @param {string} params.submitEndpoint - The URL endpoint of the Google Form to which the data should be posted.
 * @returns {Promise<boolean>} Returns `true` if the data submission was successful (or assumed to be successful), `false` otherwise.
 */
export async function sendDataToGoogleSheets({
    formData,
    submitEndpoint
}: {
    formData: { [fieldName: string]: string };
    submitEndpoint: string;
}): Promise<boolean> {
    // This is all super hacky to begin so bear with me here...
    // We are able to directly submit to the google form via a URL and POST. No auth needed since this a public form.
    // This is pretty fragile because if any of the above fields have their IDs change or are deleted
    // this will result in a 400.

    // TODO: need to figure out why we are running into CORs on local host.
    const prefixedBody = Object.keys(formData).reduce(
        (acc, key) => {
            acc["entry." + key] = formData[key];
            return acc;
        },
        {} as { [fieldName: string]: string }
    );

    try {
        await axios
            .post(submitEndpoint, prefixedBody, {
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
