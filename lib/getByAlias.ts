import getCollection, { URL_COLLECTION } from "@/db";
//import { ObjectId } from "mongodb";
import { ShortenedUrls } from "@/types";

export default async function getByAlias(alias: string,): Promise<ShortenedUrls | null> {
    //const urlId = ObjectId.createFromHexString(id); //to find by id

    const urlCollection = await getCollection(URL_COLLECTION);
    const data = await urlCollection.findOne({ alias: alias });

    if (data === null) {
        return null;
    }

    const url_object = {
        id: data.id,
        alias: data.alias,
        original_url: data.original_url,
        shortened_url: data.shortened_url,
    };

    return url_object;
}
