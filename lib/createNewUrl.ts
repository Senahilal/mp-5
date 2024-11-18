"use server";

import getCollection, { URL_COLLECTION } from "@/db";
import { ShortenedUrls } from "@/types";

export default async function createNewShortenedUrl(
    alias: string,
    original_url: string,
    shortened_url: string
): Promise<ShortenedUrls | null> {
    const shortUrl = {
        alias: alias,
        original_url: original_url,
        shortened_url: shortened_url,
    };

    const urlCollection = await getCollection(URL_COLLECTION);

    // Check if the alias already exists
    const existingAlias = await urlCollection.findOne({ alias });
    if (existingAlias) {
        throw new Error("Alias already in use");
    }

    //if alias does not exist add object into db
    const res = await urlCollection.insertOne(shortUrl);

    if (!res.acknowledged) {
        return null;
    }

    return { ...shortUrl, id: res.insertedId.toHexString() };
}

