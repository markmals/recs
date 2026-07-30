import { cva } from "cva";
import type { ReactNode, SVGProps } from "react";
import { Link } from "react-router";
import * as HeroIcons from "@heroicons/react/20/solid";
import type { Tag } from "~/lib/data";
import type { ClassProps } from "~/lib/props";

export type HTMLAttributeAnchorTarget = "_self" | "_blank" | "_parent" | "_top" | string;

const token = cva({
    base:
        "rounded-lg border-2 border-black bg-amber-500 p-2 font-serif-text shadow-hard dark:bg-purple-600",
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
    const Icon = hasLink && tag.icon
        ? (HeroIcons as Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element>)[tag.icon]
        : undefined;
    const icon = Icon ? <Icon aria-hidden={true} className="ml-1 inline h-4 w-4" /> : null;
    return hasLink
        ? (
            <Link
                className={token({ type: "button", className })}
                rel="noreferrer"
                target={target}
                to={tag.link!}
            >
                {tag.name}
                {icon}
            </Link>
        )
        : (
            <span className={token({ className })}>
                {tag.name}
                {icon}
            </span>
        );
}

export namespace TokenButton {
    export type Props =
        & ClassProps
        & (
            | { label: string; "aria-label": string; children?: undefined }
            | { children: ReactNode; label?: undefined }
        )
        & {
            "aria-label"?: string;
            name?: string;
            value?: string;
            onClick?: () => void;
            type?: "button" | "submit" | "reset";
        };
}

export function TokenButton({ className: cn, ...props }: TokenButton.Props) {
    const children = props.label || props.children;
    return (
        <button className={token({ type: "button", className: cn })} type="submit" {...props}>
            {children}
            {/* {icon} */}
        </button>
    );
}
