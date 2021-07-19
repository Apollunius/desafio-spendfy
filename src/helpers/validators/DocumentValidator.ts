
import { Document } from "../../models/Document";
import HttpError from "../errors/HttpError";

export default function validateDocument(document: Document) {
	if(!document.name){
		throw new HttpError("Name is required", 400);
	}
	if(!document.content){
		throw new HttpError("Content is required", 400);

	}
}