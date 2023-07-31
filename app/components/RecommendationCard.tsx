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
                    className="object-cover aspect-[5/4] sm:aspect-[2/3] max-h-64 border-2 border-black shadow-hard"
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
                            <div className="flex items-center content-center gap-3">
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
                        className="font-serif-text hover:underline hover:text-amber-500 dark:hover:text-purple-600"
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
        <div className="flex flex-wrap gap-4 justify-between items-center w-full pr-4">
            {children}
        </div>
    )
}

function Title({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-5 sm:pb-0">{children}</div>
    )
}

function Tags({ children }: PropsWithChildren) {
    return <div className="flex items-center gap-3">{children}</div>
}

function TextContent({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center sm:items-start w-full gap-3 pb-8">
            {children}
        </div>
    )
}

function Content({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col justify-between items-center w-full min-h-[264px]">
            {children}
        </div>
    )
}

function Card({ id, children }: PropsWithChildren<{ id: string }>) {
    return (
        <div
            className="bg-[#FDFAF7] dark:bg-[#232326] p-6 border-black border-2 flex flex-col sm:flex-row gap-5 items-center justify-center min-h-[264px] rounded-xl w-full shadow-hard-lg"
            id={id}
        >
            {children}
        </div>
    )
}
