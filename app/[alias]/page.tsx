import Result from "@/components/displayResult";
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

    return <Result url_object={url_object} />;
}
