import {messagesPl} from "./messages-pl";

const messagesEn = {
    id: "id",
    name: "name",
    date: "date",
    mandatory: "mandatory",
    optional: "optional",
    valid1: "Valid 1",
    valid2: "Valid 2",
    missingTopLevelId: "Missing top level id",
    missingTopLevelMandatorEmbedded: "Missing top level mandatory embedded",
    missingIdOnFirstEmbedded: "Missing id on first mandatory embedded",
    incorrectIdTypeForSecondEmbedded: "Incorrect id type for second embedded",
    unparsableDateOnFirstEmbedded: "Unparsabe date on second embedded"
};

export const messages = {
    en: messagesEn,
    pl: messagesPl
};
