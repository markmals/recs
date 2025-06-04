import { useEffect } from "react";
import { Form, useLoaderData, useNavigate, useSubmit } from "react-router";
import type { Route } from "../../routes/_index/+types/route";
import { Input } from "../Input";

// const navigation = useNavigation()
// const { contacts, q } = loaderData

// const searching = Boolean(
//     navigation.location && new URLSearchParams(navigation.location.search).has("q"),
// )

// const submit = useSubmit()
// const navigate = useNavigate()

export function Search() {
    const { stars, query } = useLoaderData() as Route.ComponentProps["loaderData"];
    // const navigation = useNavigation();
    // const searching = Boolean(
    //     navigation.location && new URLSearchParams(navigation.location.search).has("q"),
    // );

    const submit = useSubmit();
    const navigate = useNavigate();

    useEffect(() => {
        if (document) {
            document.querySelector<HTMLInputElement>("#q")!.value = query ?? "";
        }
    }, [query]);

    return (
        <Form className="px-4 pb-8" method="get">
            {stars !== null && <input name="stars" type="hidden" value={stars} />}
            <Input
                aria-label="Search recommendations"
                defaultValue={query ?? ""}
                id="q"
                name="q"
                onInput={(event) => {
                    // Remove empty query params when value is empty
                    if (!event.currentTarget.value) {
                        navigate("/");
                        return;
                    }
                    const isFirstSearch = query === undefined;
                    submit(event.currentTarget.form, {
                        replace: !isFirstSearch,
                    });
                }}
                placeholder="Search..."
                type="search"
            />
        </Form>
    );
}
