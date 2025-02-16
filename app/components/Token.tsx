import { cva } from "cva";
import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Tag } from "~/lib/data";
import type { ClassProps } from "~/lib/props";

export type HTMLAttributeAnchorTarget = "_self" | "_blank" | "_parent" | "_top" | string;

const token = cva({
    base: "rounded-lg shadow-hard border-2 font-serif-text border-black p-2 bg-amber-500 dark:bg-purple-600",
    variants: {
        type: {
            button: "hover:bg-amber-600 dark:hover:bg-purple-800",
        },
    },
});

export namespace Token {
    export interface Props extends ClassProps {
        tag: Tag;
        target?: HTMLAttributeAnchorTarget;
    }
}

export function Token({ tag, className = undefined, target = "_blank" }: Token.Props) {
    const hasLink = !!tag.link;
    return hasLink ? (
        <Link
            className={token({ type: "button", className })}
            rel="noreferrer"
            target={target}
            to={tag.link!}
        >
            {tag.name}
            {/* {icon} */}
        </Link>
    ) : (
        <span className={token({ className })}>
            {tag.name}
            {/* {icon} */}
        </span>
    );
}

export namespace TokenButton {
    export type Props = ClassProps &
        (
            | { label: string; "aria-label": string; children?: undefined }
            | { children: ReactNode; label?: undefined }
        ) & {
            "aria-label"?: string;
            name?: string;
            value?: string;
            onClick?: () => void;
            type?: "button" | "submit" | "reset";
        };
}

export function TokenButton(props: TokenButton.Props) {
    const children = props.label || props.children;
    return (
        <button className={token({ type: "button" })} {...props}>
            {children}
            {/* {icon} */}
        </button>
    );
}
