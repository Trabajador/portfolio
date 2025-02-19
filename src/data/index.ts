import { HomeIcon, AcademicCapIcon, Cog6ToothIcon, DocumentDuplicateIcon, UserIcon } from "@heroicons/vue/24/outline";
import { GlobeAltIcon, PaperAirplaneIcon, PencilSquareIcon, ShoppingBagIcon, CodeBracketIcon, CursorArrowRippleIcon } from "@heroicons/vue/24/solid";
import MabblyImg from "../assets/svg/mabbly.svg";
import IkoImg from "../assets/svg/iko.svg";
import GriffithImg from "../assets/svg/griffith.svg";
import HiTideImg from "../assets/svg/hitide.svg";
import TolmarImg from "../assets/svg/tolmar.svg";
import NourishImg from "../assets/svg/nourish.svg";
import BioSphereImg from "../assets/svg/biosphere.svg";
import FensolviImg from "../assets/svg/fensolvi.svg";
import FanosxImage from "../assets/svg/fanosx.svg";
import TLNImage from "../assets/svg/tln.svg";
import LiquidImage from "../assets/svg/liquid.svg";
import BitfulImage from "../assets/svg/bitful.svg";
import SparkImage from "../assets/svg/spark.svg";
import Avatar1 from "../assets/img/avatar1.png";
import Avatar2 from "../assets/img/avatar2.png";
import Avatar3 from "../assets/img/avatar3.png";
import Avatar4 from "../assets/img/avatar4.png";
import HTML5 from "../assets/svg/html5.svg";
import CSS3 from "../assets/svg/css3.svg";
import Vue from "../assets/svg/vue-9.svg";
import ViteJS from "../assets/svg/vitejs.svg";
import Js from "../assets/svg/js.svg";
import Figma from "../assets/svg/figma.svg";
import Wordpress from "../assets/svg/wordpress.svg";
import Shopify from "../assets/svg/shopify.svg";

export const navItems = [
  {
    name: "Home",
    href: "#hero",
    icon: HomeIcon,
  },
  {
    name: "Skills",
    href: "#skills",
    icon: AcademicCapIcon,
  },
  {
    name: "Projects",
    href: "#projects",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Services",
    href: "#services",
    icon: Cog6ToothIcon,
  },
  {
    name: "Contact",
    href: "#contact",
    icon: UserIcon,
  },
];

export const projectsItems = [
  {
    title: "Mabbly",
    url: 'https://www.mabbly.com/',
    image: MabblyImg,
  },
  {
    title: "Griffith Foods",
    url: 'https://griffithfoods.com/',
    image: GriffithImg,
  },
  {
    title: "Iko Global",
    url: 'https://www.iko.com/na/',
    image: IkoImg,
  },
  {
    title: "Tolmar",
    url: 'https://tolmar.com/',
    image: TolmarImg,
  },
  {
    title: "HiTide Capital",
    url: 'https://hitidecapital.com/',
    image: HiTideImg,
  },
  {
    title: "Nourish Ventures",
    url: 'https://nourishventures.com/',
    image: NourishImg,
  },
  {
    title: "BioSphere Plastic",
    url: 'https://biosphereplastic.com/',
    image: BioSphereImg,
  },
  {
    title: "Fensolvi",
    url: 'https://fensolvi.com/',
    image: FensolviImg,
  },
  {
    title: "LALL",
    url: 'https://littlealittlelonger.tolmar.com/',
  },
  {
    title: "Fanosx",
    url: 'https://fanosx.com/',
    image: FanosxImage,
  },
  {
    title: "The Lactation Network (TLN)",
    url: 'https://lactationnetwork.com/',
    image: TLNImage,
  },
  {
    title: "Liquid Insight",
    url: 'https://liquidinsight.net/',
    image: LiquidImage,
  },
  {
    title: "Bitful",
    url: 'https://bitful.com/',
    image: BitfulImage,
  },
  {
    title: "Spark",
    url: 'https://lendwithspark.com/',
    image: SparkImage,
  },
];

export const skillsItems = [
  {
    name: "Vue",
    logo: Vue,
  },
  {
    name: "ViteJS",
    logo: ViteJS,
  },
  {
    name: "HTML5",
    logo: HTML5,
  },
  {
    name: 'CSS3',
    logo: CSS3,
  },
  { name: "JavaScript",
    logo: Js,
  },
  {
    name: "Figma",
    logo: Figma,
  },

  {
    name: "Wordpress",
    logo: Wordpress,
  },
  {
    name: "Shopify",
    logo: Shopify,
  },
];

export const servicesItems = [
  {
    title: "Custom Website Development",
    description:
      "Providing custom website development with a focus on responsive design, ensuring cross-browser compatibility and performance optimization for a seamless user experience across all devices. Additionally, SEO-friendly and accessible designs (WCAG compliant) are implemented to enhance search visibility and inclusivity.",
    logo: GlobeAltIcon,
  },
  {
    title: "Single Page Applications",
    description:
      "Developing dynamic, fast-loading single-page applications (SPAs) using Vue.js framework, offering a seamless user experience without page reloads. My expertise includes integrating SPAs with REST APIs or GraphQL for real-time data interaction",
    logo: PaperAirplaneIcon,
  },
  {
    title: "CMS Theme Development",
    description:
      "Creating and customizing CMS themes for platforms like WordPress, Shopify, and other CMS, providing unique, client-specific designs that align with their branding and functionality needs. My services range from building fully custom themes to modifying pre-built templates for optimized user engagement.",
    logo: PencilSquareIcon,
  },
  {
    title: "E-commerce Front-End Development",
    description:
      "Developing intuitive and user-friendly interfaces for online stores, focusing on improving product page performance and conversion rates. Additionally, I offer customization services for e-commerce platforms like Shopify and WooCommerce to create tailored shopping experiences.",
    logo: ShoppingBagIcon,
  },
  {
    title: "Version Control and Code Management",
    description:
      "Providing expertise in setting up Git-based version control systems (GitHub, GitLab) for collaborative development and code management. Offering code review services to maintain clean, efficient, and best-practice-compliant codebases.",
    logo: CodeBracketIcon,
  },
  {
    title: "Animations and Visual Effects",
    description:
      "Creating engaging animations and transitions using CSS, JavaScript, and libraries like GSAP to enhance user interaction and visual appeal. Implementing scroll-based effects and parallax designs to create a dynamic and immersive user experience.",
    logo: CursorArrowRippleIcon,
  },
];

export const testimonialsItems = [
  {
    name: "Tony",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: Avatar1,
  },
  {
    name: "John Doe",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: Avatar2,
  },
  {
    name: "Roddin",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: Avatar3,
  },
  {
    name: "Jane",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: Avatar4,
  },
];