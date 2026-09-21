"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { HtmlContent } from "@/components/HtmlContent";
import { SiteChrome } from "@/components/SiteChrome";
import { StructuredContent } from "@/components/StructuredContent";

const query = `#graphql
  query PageWithSettings($relativePath: String!, $siteRelativePath: String!, $designRelativePath: String!) {
    page(relativePath: $relativePath) {
      ... on Document {
        _sys {
          filename
          basename
          path
          relativePath
          extension
        }
        id
      }
      slug
      title
      description
      keywords
      robots
      canonical
      ogTitle
      ogDescription
      ogImage
      bodyHtml
      sections {
        ... on PageSectionsLandingChoice {
          __typename
          leftImage
          leftLabel
          leftTitle
          leftButton
          rightImage
          rightLabel
          rightTitle
          rightButton
        }
        ... on PageSectionsPageHero {
          __typename
          id
          label
          title
          description
          logo
          logoAlt
        }
        ... on PageSectionsHomeHero {
          __typename
          id
          label
          titleLine1
          titleAccent
          description
          primaryButtonText
          primaryButtonUrl
          secondaryButtonText
          secondaryButtonUrl
          image
          imageAlt
          badgeTitle
          badgeText
        }
        ... on PageSectionsFeature {
          __typename
          id
          label
          title
          image
          imageAlt
          imageRight
          badge
          texts { text }
          values { icon title text }
        }
        ... on PageSectionsAboutSlider {
          __typename
          id
          label
          title
          images { src alt }
          cardLabel
          cardTitle
          texts { text }
          values { icon title text }
        }
        ... on PageSectionsCardGrid {
          __typename
          id
          variant
          label
          title
          description
          cards { icon image imageAlt title text linkText linkUrl }
        }
        ... on PageSectionsGallery {
          __typename
          id
          variant
          label
          title
          description
          items { src alt tag title wide video }
        }
        ... on PageSectionsTestimonials {
          __typename
          id
          label
          title
          items { text author source }
        }
        ... on PageSectionsTeamGrid {
          __typename
          id
          label
          title
          description
          members { image imageAlt name role text skills { text } }
        }
        ... on PageSectionsTeamImage {
          __typename
          id
          label
          title
          text
          image
          imageAlt
          placeholderTitle
          placeholderText
        }
        ... on PageSectionsFaq {
          __typename
          id
          label
          title
          items { question answer }
        }
        ... on PageSectionsCalculator {
          __typename
          id
          label
          title
          description
          tip
        }
        ... on PageSectionsBioBlock {
          __typename
          id
          icon
          title
          text
        }
        ... on PageSectionsContact {
          __typename
          id
          label
          title
          description
          mapTitle
          mapText
          mapEmbedUrl
        }
        ... on PageSectionsCta {
          __typename
          id
          label
          title
          text
          buttons { text url style }
        }
        ... on PageSectionsLegal {
          __typename
          id
          title
          blocks { title text }
        }
      }
      media {
        originalSrc
        src
        alt
      }
      schemaJson
    }
    siteSettings(relativePath: $siteRelativePath) {
      ... on Document {
        _sys {
          filename
          basename
          path
          relativePath
          extension
        }
        id
      }
      siteName
      baseUrl
      logo
      logoAlt
      phone
      phoneHref
      email
      address
      footerText
      cookieTitle
      cookieText
    }
    designSettings(relativePath: $designRelativePath) {
      ... on Document {
        _sys {
          filename
          basename
          path
          relativePath
          extension
        }
        id
      }
      bodyFont
      headingFont
      accentFont
      primaryColor
    }
  }
`;

type Props = {
  data: any;
  variables: {
    relativePath: string;
    siteRelativePath: string;
    designRelativePath: string;
  };
};

export function VisualPage({ data, variables }: Props) {
  const tina = useTina({ query, variables, data });
  const page = tina.data.page;
  const site = tina.data.siteSettings;
  const design = tina.data.designSettings;

  return (
    <SiteChrome site={site} design={design}>
      {page.schemaJson?.map((schema: string, index: number) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      {page.sections?.length ? <StructuredContent page={page} site={site} /> : <div data-tina-field={tinaField(page, "bodyHtml")}><HtmlContent page={page} /></div>}
    </SiteChrome>
  );
}

export { query as visualPageQuery };
