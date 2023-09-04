import { Link } from "@remix-run/react"
import type { PropsWithChildren } from "react"
import type { Recommendation } from "~/lib/data"
import { Star } from "./Star"
import { Token } from "./Token"

export namespace RecommendationCard {
    export interface Props {
        recommendation: Recommendation
    }
}

export function RecommendationCard({
    recommendation: { image, name, createdAt, stars, description, tags, slug, link },
}: RecommendationCard.Props) {
    const starElements = stars
        ? Array(stars)
              .fill(stars)
              .map((_, idx) => <Star key={idx} />)
        : null

    return (
        <Card id={slug}>
            {image && (
                <img
                    alt=""
                    className="aspect-[5/4] max-h-64 border-2 border-black object-cover shadow-hard sm:aspect-[2/3]"
                    src={image}
                />
            )}
            <Content>
                <TextContent>
                    <Title>
                        <a
                            className="text-sans text-4xl hover:text-amber-500 dark:hover:text-purple-600"
                            href={link}
                            rel="noreferrer"
                            target="_blank"
                        >
                            {name}
                        </a>

                        {starElements && (
                            <div className="flex content-center items-center gap-3">
                                {starElements}
                            </div>
                        )}
                    </Title>
                    <span className="font-serif-text">{description}</span>
                </TextContent>

                <Footer>
                    <Tags>
                        {tags.map(tag => (
                            <Token key={tag.name} tag={tag} />
                        ))}
                    </Tags>
                    <Link
                        className="font-serif-text hover:text-amber-500 hover:underline dark:hover:text-purple-600"
                        to={`#${slug}`}
                    >
                        {createdAt}
                    </Link>
                </Footer>
            </Content>
        </Card>
    )
}

function Footer({ children }: PropsWithChildren) {
    return (
        <div className="flex w-full flex-wrap items-center justify-between gap-4 pr-4">
            {children}
        </div>
    )
}

function Title({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center gap-4 pb-5 sm:flex-row sm:pb-0">{children}</div>
    )
}

function Tags({ children }: PropsWithChildren) {
    return <div className="flex items-center gap-3">{children}</div>
}

function TextContent({ children }: PropsWithChildren) {
    return (
        <div className="flex w-full flex-col items-center gap-3 pb-8 sm:items-start">
            {children}
        </div>
    )
}

function Content({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-[264px] w-full flex-col items-center justify-between">
            {children}
        </div>
    )
}

function Card({ id, children }: PropsWithChildren<{ id: string }>) {
    return (
        <div
            className="flex min-h-[264px] w-full flex-col items-center justify-center gap-5 rounded-xl border-2 border-black bg-[#FDFAF7] p-6 shadow-hard-lg dark:bg-[#232326] sm:flex-row"
            id={id}
        >
            {children}
        </div>
    )
}
