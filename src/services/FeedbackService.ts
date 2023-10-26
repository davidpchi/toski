import { sendDataToGoogleSheets } from "./GoogleFormsService";

const feedbackSubmitEndpoint =
    "https://docs.google.com/forms/d/e/1FAIpQLSfGc83oJZbPT1f5ghVNYx_qNBczu_803mnlKBloHjRaX3Z6-Q/formResponse?usp=pp_url";

export const submitFeedback = async (feedback: string) => {
    const formData: { [fieldName: string]: string } = {};
    formData["894361764"] = feedback;

    sendDataToGoogleSheets({ formData, submitEndpoint: feedbackSubmitEndpoint });
};
