import axios from "axios";

const feedbackSubmitEndpoint =
    "https://docs.google.com/forms/d/e/1FAIpQLSfGc83oJZbPT1f5ghVNYx_qNBczu_803mnlKBloHjRaX3Z6-Q/formResponse?usp=pp_url";

export const submitFeedback = async (feedback: string) => {
    const body: { [fieldName: string]: string } = {};
    body["entry.894361764"] = feedback;

    // This is all super hacky to begin so bear with me here...
    // We are able to directly submit to the google form via a URL and POST. No auth needed since this a public form.
    // This is pretty fragile because if any of the above fields have their IDs change or are deleted
    // this will result in a 400.

    // TODO: need to figure out why we are running into CORs on local host.
    try {
        await axios
            .post(feedbackSubmitEndpoint, body, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                withCredentials: false,
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
};
