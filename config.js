/**
 * Site configuration — update before deploying.
 * @see README.md → "Contact form setup"
 */
const SITE_CONFIG = {
  name: "Dasari Sridevi",
  email: "dasarisridevi481@gmail.com",

  /** Replace with your GitHub Pages / Netlify URL after deployment */
  liveSiteUrl: "https://24a31a05bp.github.io/Portfolio",

  /** Public repo for this portfolio */
  githubRepo: "https://github.com/24A31A05BP/Portfolio",

  /**
   * Contact form: "web3forms" (email notifications) | "formspree" | "mailto" (fallback)
   * Get a free Web3Forms key: https://web3forms.com → use the email above
   */
  contactMethod: "web3forms",
  web3formsAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};
