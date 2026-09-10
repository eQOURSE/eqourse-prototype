import { aiDataServicesCategories } from "@/components/ai-data-services/shared/aiDataServicesNavData";
import { contentServicesCategories } from "@/components/content-services/shared/contentServicesNavData";

export interface ServicePageOption {
  label: string;
  path: string;
}

export interface ServiceCategoryOption extends ServicePageOption {
  children: ServicePageOption[];
}

export interface ServiceVerticalOption extends ServicePageOption {
  categories: ServiceCategoryOption[];
}

export const SERVICE_TAXONOMY: ServiceVerticalOption[] = [
  {
    label: "AI Data Services",
    path: "/ai-data-services",
    categories: aiDataServicesCategories.map((category) => ({
      label: category.label,
      path: category.href,
      children: category.subServices.map((item) => ({ label: item.label, path: item.href })),
    })),
  },
  {
    label: "Content Services",
    path: "/content-services",
    categories: contentServicesCategories.map((category) => ({
      label: category.label,
      path: category.href,
      children: category.subServices.map((item) => ({ label: item.label, path: item.href })),
    })),
  },
];

export const normalizePagePaths = (paths: string[] = []) =>
  Array.from(new Set(paths.map((path) => `/${path.trim().replace(/^\/+|\/+$/g, "")}`).filter((path) => path !== "/")));
