export function weekdayCalculator(startDay: string, amountOfDays: number) {
  let dayNumber = 0;

  // convertendo os dias como se fosse numero
  switch (startDay.toLocaleLowerCase()) {
    case "segunda":
      dayNumber = 1;
      break;
    case "terça":
      dayNumber = 2;
      break;
    case "terca":
      dayNumber = 2;
      break;
    case "quarta":
      dayNumber = 3;
      break;
    case "quinta":
      dayNumber = 4;
      break;
    case "sexta":
      dayNumber = 5;
      break;
    case "sábado":
      dayNumber = 6;
      break;
    case "sabado":
      dayNumber = 6;
      break;
    case "domingo":
      dayNumber = 7;
      break;
  }

  // passando os numeros para um array para poder utilizar o reduce
  const numbers = [dayNumber, amountOfDays];

  const total = numbers.reduce((acc, x) => acc + x);
  const rest = total % 7; // o resto virá o dia como numero

  let stringDay = "";

  // o resto sendo zero o dia final será o startDay + o resto do amountOfDays
  if (rest === 0) {
    const finalDay = dayNumber + (amountOfDays % 7);

    // transformar o numero do dia em string;
    switch (finalDay) {
      case 1:
        stringDay = "segunda";
        break;
      case 2:
        stringDay = "terça";
        break;
      case 3:
        stringDay = "quarta";
        break;
      case 4:
        stringDay = "quinta";
        break;
      case 5:
        stringDay = "sexta";
        break;
      case 6:
        stringDay = "sábado";
        break;
      case 7:
        stringDay = "domingo";
        break;
    }
  } else {
    switch (rest) {
      case 1:
        stringDay = "segunda";
        break;
      case 2:
        stringDay = "terça";
        break;
      case 3:
        stringDay = "quarta";
        break;
      case 4:
        stringDay = "quinta";
        break;
      case 5:
        stringDay = "sexta";
        break;
      case 6:
        stringDay = "sábado";
        break;
      case 7:
        stringDay = "domingo";
        break;
    }
  }

  return stringDay;
}
