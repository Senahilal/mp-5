//import Result from "@/components/displayResult";
import getByAlias from "@/lib/getByAlias";

export default async function AliasUrlPage({
    params,
}: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    const url_object = await getByAlias(alias);

    if (url_object === null) {
        return <p>Url could not found</p>;
    }
    else{
        return <meta http-equiv="refresh" content={`0;url=${url_object.original_url}`} />;
    }

    //test
    //return <Result url_object={url_object} />;
}
