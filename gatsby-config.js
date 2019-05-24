module.exports = {
    siteMetadata: {
        title: `TransTex`,
        siteUrl: `https://transtex.netlify.com/`,
        description: `For the IPLAB Utility`,
        author: `Tucker`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `images`,
              path: `${__dirname}/src/img`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `TransTex`,
                short_name: `TransTex`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/img/favicon.jpg`,
            },
          },
    ],
}