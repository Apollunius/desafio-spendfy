import HttpError from "../errors/HttpError";

export default function validateId(id: string) {
  if (id) {
    if (!Number(id)) {
      throw new HttpError("Invalid Id!", 400);
    }
  } else {
    throw new HttpError("Id is required", 400);
  }
}
