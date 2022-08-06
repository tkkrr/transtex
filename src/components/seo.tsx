import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

type seoProps = {
    description?: string,
    keywords?: string[],
    title: string,
    path: string,
    image?: string,
}

const SEO = (props: seoProps) => {
    return <StaticQuery
        query={detailsQuery}
        render={data => {
            const metaDescription = props.description || data.site.siteMetadata.description
            const imagePath = props.image || getSrc(data.image)
            const socialTitle = `${props.title} | ${data.site.siteMetadata.title}`
            const sitePath = `https://transtex.netlify.com${props.path}`
            return <>
                <title>{socialTitle}</title>
                <meta name="description" content={metaDescription}/>
                <meta property="og:title" content={socialTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={`https://transtex.netlify.com${imagePath}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={sitePath} />
                <meta property="fb:app_id" content="554524141717254" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={data.site.siteMetadata.author} />
                <meta name="twitter:title" content={socialTitle} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:site" content="@Acid1012" />
                <meta name="keywords" content={props.keywords?.join(", ")}/>
            </>
        }}
    />
}

SEO.defaultProps = {
  keywords: ["tucker", "翻訳"],
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
