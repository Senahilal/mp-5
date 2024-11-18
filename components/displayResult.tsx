import { ShortenedUrls } from "@/types";
//import { ThumbDown, ThumbUp } from "@mui/icons-material";

export default function Result({ url_object }: { url_object: ShortenedUrls }) {
    return (
        <div >
            <h2>{url_object.alias}</h2>
            <p>{url_object.shortened_url}</p>
        </div>
    );
}
