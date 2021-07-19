import HttpError from "../errors/HttpError";

export default function validateDay(day: string, amountOfDays?: string) {
  if (day) {
    if (
      day.toLocaleLowerCase() !== "segunda" &&
      day.toLocaleLowerCase() !== "terça" &&
      day.toLocaleLowerCase() !== "terca" &&
      day.toLocaleLowerCase() !== "quarta" &&
      day.toLocaleLowerCase() !== "quinta" &&
      day.toLocaleLowerCase() !== "sexta" &&
      day.toLocaleLowerCase() !== "sábado" &&
      day.toLocaleLowerCase() !== "sabado" &&
      day.toLocaleLowerCase() !== "domingo"
    ) {
      throw new HttpError("Weekday is invalid", 400);
    }
  } else {
    throw new HttpError("Weekday is required", 400);
  }

  if (amountOfDays) {
    if (
      !Number(amountOfDays) ||
      !Number.isInteger(Number(amountOfDays)) ||
      Number(amountOfDays) < 0
    ) {
      throw new HttpError("amountOfDays is invalid", 400);
    }
  } else {
    throw new HttpError("amountOfDays is required", 400);
  }
}
