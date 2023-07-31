import type { Tag } from "~/lib/data"

export function Token({ tag: { name, link } }: { tag: Tag }) {
    const cls =
        "rounded-lg shadow-hard border-2 font-serif-text border-black p-2 bg-amber-500 dark:bg-purple-600"

    if (link) {
        return (
            <a
                className={`${cls} hover:bg-amber-700 dark:hover:bg-purple-800`}
                href={link}
                rel="noreferrer"
                target="_blank"
            >
                {name}
                {/* {icon} */}
            </a>
        )
    }

    return (
        <span className={cls}>
            {name}
            {/* {icon} */}
        </span>
    )
}
