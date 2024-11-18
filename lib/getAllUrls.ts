import getCollection, { URL_COLLECTION } from "@/db";
import { ShortenedUrls } from "@/types";

export default async function getAllUrls(): Promise<ShortenedUrls[]> {
    const urlCollection = await getCollection(URL_COLLECTION);
    const data = await urlCollection.find().toArray();

    const shortenedUrls: ShortenedUrls[] = data.map((u) => ({
        id: u._id.toHexString(),
        alias: u.alias,
        original_url: u.url,
        shortened_url: u.shortened_url,
    }));

    return shortenedUrls.reverse();
}
