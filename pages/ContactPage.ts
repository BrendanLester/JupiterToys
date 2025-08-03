import { expect } from "@playwright/test";
import { page } from "./TestPage";

export const pageElements = {
    Forename: () => page.getByRole('textbox', { name: 'Forename' }),
    Surname: () => page.getByRole('textbox', { name: 'Surname' }),
    Email: () => page.getByRole('textbox', { name: 'Email' }),
    Telephone: () => page.getByRole('textbox', { name: 'Telephone' }),
    Message: () => page.getByRole('textbox', { name: 'Message' }),
    SubmitButton: () => page.getByRole('link', { name: 'Submit' }),

}

export async function enterForemame(forename : string){
    await pageElements.Forename().fill(forename)
}

export async function enterEmail(email : string){
    await pageElements.Email().fill(email);
}

export async function enterMessage(message : string){
    await pageElements.Message().fill(message);
}

export async function clickSubmitButton(){
    await pageElements.SubmitButton().click()
}


export async function verifyFieldRequiredMessageVisible(message){
    await expect.soft(page.getByText(message)).toBeVisible();
}

export async function verifyFieldRequiredMessageHidden(message){
    await expect.soft(page.getByText(message)).toBeHidden();
}

export async function verifySubmitMessage(forename){
    await expect.soft(page.getByText(`Thanks ${forename}, we appreciate your feedback.`)).toBeVisible({timeout: 20000});
                                                                            //Increment timeout as Submision varies and can take time
}
