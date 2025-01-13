import { MenuItem } from "@/types/menuItems";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: {
      en: "Homepage",
      ne: "गृहपृष्‍ठ",
    },
    path: "/",
  },
  {
    id: 2,
    title: {
      en: "About Us",
      ne: "हाम्रो बारे",
    },
    path: "/about",
    children: [
      {
        id: 21,
        title: {
          en: "Introduction",
          ne: "परिचय",
        },
        path: "/about/introduction",
      },
      {
        id: 22,
        title: {
          en: "Vision & Mission",
          ne: "दृष्टि र लक्ष्य",
        },
        path: "/about/vision-mission",
      },
    ],
  },
  {
    id: 3,
    title: {
      en: "Organizational Structure",
      ne: "संगठन संरचना",
    },
    path: "/organization",
  },
  {
    id: 4,
    title: {
      en: "Employee Details",
      ne: "कर्मचारी विवरण",
    },
    path: "/employees",
  },
  {
    id: 5,
    title: {
      en: "Gallery",
      ne: "ग्यालरी",
    },
    path: "/gallery",
  },
  {
    id: 6,
    title: {
      en: "Departments/Branches",
      ne: "महाशाखा/ शाखा",
    },
    path: "/departments",
    children: [
      {
        id: 61,
        title: {
          en: "Administration",
          ne: "प्रशासन",
        },
        path: "/departments/administration",
      },
      {
        id: 62,
        title: {
          en: "Finance",
          ne: "वित्त",
        },
        path: "/departments/finance",
      },
    ],
  },
  {
    id: 7,
    title: {
      en: "Subordinate Offices",
      ne: "मातहतका कार्यालय",
    },
    path: "/offices",
  },
  {
    id: 8,
    title: {
      en: "Links",
      ne: "लिंकहरु",
    },
    path: "/links",
  },
  {
    id: 9,
    title: {
      en: "Career Guidance",
      ne: "वृत्ति मार्गनिर्देशन",
    },
    path: "/career",
  },
  {
    id: 10,
    title: {
      en: "Contact Us",
      ne: "सम्पर्क गर्नुहोस्",
    },
    path: "/contact-us",
  },
];
