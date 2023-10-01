import { cva } from "cva"
import { Link } from "react-router-dom"
import type { Tag } from "~/lib/data"
import type { ClassProps } from "~/lib/props"

export type HTMLAttributeAnchorTarget = "_self" | "_blank" | "_parent" | "_top" | string

export namespace Token {
    export interface Props extends ClassProps {
        tag: Tag
        target?: HTMLAttributeAnchorTarget
    }
}

const token = cva({
    base: "rounded-lg shadow-hard border-2 font-serif-text border-black p-2 bg-amber-500 dark:bg-purple-600",
    variants: {
        type: {
            button: "hover:bg-amber-600 dark:hover:bg-purple-800",
        },
    },
})

export function Token({ tag, className = undefined, target = "_blank" }: Token.Props) {
    let hasLink = !!tag.link

    if (hasLink) {
        return (
            <Link
                className={token({ type: "button", className })}
                rel="noreferrer"
                target={target}
                to={tag.link!}
            >
                {tag.name}
                {/* {icon} */}
            </Link>
        )
    }

    return (
        <span className={token({ className })}>
            {tag.name}
            {/* {icon} */}
        </span>
    )
}
