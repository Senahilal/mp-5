import { ShortenedUrls } from "@/types";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

export default function Result({ url_object }: { url_object: ShortenedUrls }) {
    return (
        <div className="p-4 m-2 bg-red-300 flex flex-col items-center">
            <h2 className="text-4xl font-bold">{url_object.alias}</h2>
            <p className="text-lg">{url_object.shortened_url}</p>
        </div>
    );
}
