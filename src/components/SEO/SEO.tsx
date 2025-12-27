import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
    noIndex?: boolean;
    canonicalUrl?: string;
}

const defaultSEO = {
    title: 'Kadamora - Smart Estate Management for Modern Living',
    description:
        "Transform your property experience with Kadamora's innovative estate management platform. Discover, manage, and invest in properties with ease. Join 20K+ satisfied users today.",
    keywords:
        'estate management, property management, real estate, smart homes, property investment, Kadamora, modern living, property platform',
    image: 'https://kadamora.com/assets/logo/logo-full.png',
    url: 'https://kadamora.com',
    type: 'website',
    author: 'Kadamora',
};

export default function SEO({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    author,
    noIndex = false,
    canonicalUrl,
}: SEOProps) {
    const seo = {
        title: title ? `${title} | Kadamora` : defaultSEO.title,
        description: description || defaultSEO.description,
        keywords: keywords || defaultSEO.keywords,
        image: image || defaultSEO.image,
        url: url || defaultSEO.url,
        type: type || defaultSEO.type,
        author: author || defaultSEO.author,
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
            <meta name="author" content={seo.author} />

            {/* Robots */}
            <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={seo.type} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:image:alt" content={seo.title} />
            <meta property="og:site_name" content="Kadamora" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seo.url} />
            <meta property="twitter:title" content={seo.title} />
            <meta property="twitter:description" content={seo.description} />
            <meta property="twitter:image" content={seo.image} />
            <meta property="twitter:image:alt" content={seo.title} />
            <meta property="twitter:site" content="@kadamora" />
            <meta property="twitter:creator" content="@kadamora" />
        </Helmet>
    );
}

// Pre-configured SEO components for specific pages
export const HomeSEO = () => (
    <SEO
        title="Home"
        description="Welcome to Kadamora - Your gateway to smart estate management. Discover innovative property solutions, connect with trusted agents, and transform your real estate experience."
        keywords="kadamora, home, real estate platform, property management, smart homes, estate solutions"
        url="https://kadamora.com/"
    />
);

export const AboutSEO = () => (
    <SEO
        title="About Us"
        description="Learn about Kadamora's mission to revolutionize estate management. Our team of experts is dedicated to providing cutting-edge property solutions for modern living."
        keywords="about kadamora, company info, real estate experts, property management team, estate management solutions"
        url="https://kadamora.com/about"
    />
);

export const TimelineSEO = () => (
    <SEO
        title="Timeline"
        description="Follow Kadamora's journey and discover the latest updates, milestones, and developments in our smart estate management platform."
        keywords="kadamora timeline, company updates, real estate news, property platform updates, estate management milestones"
        url="https://kadamora.com/timeline"
    />
);

export const ContactSEO = () => (
    <SEO
        title="Contact Us"
        description="Get in touch with Kadamora's expert team. We're here to help with your property management needs and answer any questions about our platform."
        keywords="contact kadamora, customer support, property help, estate management contact, real estate assistance"
        url="https://kadamora.com/contact"
    />
);

export const ListingsSEO = () => (
    <SEO
        title="Property Listings"
        description="Browse premium property listings on Kadamora. Find your perfect home, investment property, or commercial space with our advanced search and filtering tools."
        keywords="property listings, real estate listings, homes for sale, property search, real estate marketplace, kadamora properties"
        url="https://kadamora.com/listings"
    />
);

export const LoginSEO = () => (
    <SEO
        title="Login"
        description="Sign in to your Kadamora account to access personalized property recommendations, saved listings, and exclusive estate management tools."
        noIndex={true}
    />
);

export const SignupSEO = () => (
    <SEO
        title="Sign Up"
        description="Join Kadamora today and unlock access to premium property listings, smart estate management tools, and personalized real estate services."
        noIndex={true}
    />
);
