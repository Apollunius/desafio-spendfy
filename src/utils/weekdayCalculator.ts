function transformStringOrNumber(
  entryValue: number | string,
  isAnNumber: boolean
) {
  if (isAnNumber) {
    switch (entryValue) {
      case 1:
        return "segunda";
      case 2:
        return "terça";
      case 3:
        return "quarta";
      case 4:
        return "quinta";
      case 5:
        return "sexta";
      case 6:
        return "sábado";
      default:
        return "domingo";
    }
  }

  switch (entryValue) {
    case "segunda":
      return 1;
    case "terça":
      return 2;
    case "terca":
      return 2;
    case "quarta":
      return 3;
    case "quinta":
      return 4;
    case "sexta":
      return 5;
    case "sábado":
      return 6;
    case "sabado":
      return 6;
    default:
      return 7;
  }
}

export function weekdayCalculator(startDay: string, amountOfDays: number) {
  // convertendo os dias como se fosse numero
  const dayNumber = transformStringOrNumber(
    startDay.toLocaleLowerCase(),
    false
  ) as number;
  // passando os numeros para um array para poder utilizar o reduce
  const numbers = [dayNumber, amountOfDays];

  const total = numbers.reduce((acc, x) => acc + x);
  const rest = total % 7; // o resto virá o dia como numero

  // o resto sendo zero o dia final será o startDay + o resto do amountOfDays
  if (rest === 0) {
    const finalDay = dayNumber + (amountOfDays % 7);

    // transformar o numero do dia em string;
    return transformStringOrNumber(finalDay, true);
  }

  return transformStringOrNumber(rest, true);
}
