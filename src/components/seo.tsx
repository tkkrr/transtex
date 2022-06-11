import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

type seoProps = {
    description?: string,
    lang?: string,
    meta?: [],
    keywords?: string[],
    title: string,
    path: string,
    image?: string,
}

const SEO: React.StatelessComponent<seoProps> = props => {
    return (
        <StaticQuery
        query={detailsQuery}
        render={data => {
            const metaDescription = props.description || data.site.siteMetadata.description
            const imagePath = props.image || getSrc(data.image)
            const socialTitle = `${props.title} | ${data.site.siteMetadata.title}`
            const sitePath = `https://transtex.netlify.com${props.path}`
            return (
            <Helmet
                htmlAttributes={ { lang: props.lang } }
                title={ props.title }
                titleTemplate={ `${data.site.siteMetadata.title}` }
                meta={ [
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: socialTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: "https://transtex.netlify.com" + imagePath,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:url`,
                    content: sitePath,
                },
                {
                    property: `fb:app_id`,
                    content: `554524141717254`,
                },
                {
                    name: `twitter:card`,
                    content: `summary_large_image`,
                },
                {
                    name: `twitter:creator`,
                    content: data.site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: socialTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:site`,
                    content: `@Acid1012`,
                },
                ]
                .concat(
                props.keywords ? {
                    name: `keywords`,
                    content: props.keywords.join(`, `),
                } : []
                )
                .concat(
                props.meta ? props.meta : []
                )
            }
            />
            )
        }}
        />
    )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  keywords: ["tucker"],
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site:site {
      siteMetadata {
        title
        description
        author
      }
    },
    image:file(relativePath: {eq: "image.jpg"}) {
      childImageSharp{
        gatsbyImageData
      }
    },
  }
`
