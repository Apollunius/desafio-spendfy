import type { Request, Response } from "express";

import validateDay from "../helpers/validators/DayValidator";
import { weekdayCalculator } from "../utils/weekdayCalculator";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Query = {
  startDay: string;
  amountOfDays: string;
};

export function getWeekday(req: Request, res: Response) {
  const { startDay, amountOfDays } = req.query as Query;

  try {
    validateDay(startDay, amountOfDays);
    const day = weekdayCalculator(startDay, Number(amountOfDays));

    return res.status(200).json({ day });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || "Something is wrong" });
  }
}
