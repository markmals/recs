import { Form, useLoaderData, useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { Input } from "../Input";
import type { Route } from "../../routes/_index/+types/route";

export function Search() {
    const { stars, query } = useLoaderData() as Route.ComponentProps["loaderData"];
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (document) {
            const input = document.querySelector<HTMLInputElement>("#q");
            if (input) {
                input.value = query ?? "";
            }
        }
    }, [query]);

    return (
        <Form className="px-4 pb-8" method="get">
            {stars !== null && <input type="hidden" name="stars" value={stars} />}
            <Input
                aria-label="Search recommendations"
                defaultValue={query ?? ""}
                id="q"
                name="q"
                onInput={(event) => {
                    const params = new URLSearchParams(searchParams);
                    if (!event.currentTarget.value) {
                        params.delete("q");
                    } else {
                        params.set("q", event.currentTarget.value);
                    }
                    navigate(`?${params.toString()}`, { replace: query !== null });
                }}
                placeholder="Search..."
                type="search"
            />
        </Form>
    );
}
