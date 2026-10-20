import { useEffect } from 'react';
import { siteConfig } from '../config/site';

export interface SEOOptions {
  title?: string;
  description?: string;
}

export function useDocumentTitle(titleOrOptions?: string | SEOOptions): void {
  useEffect(() => {
    let title: string | undefined;
    let description: string | undefined;

    if (typeof titleOrOptions === 'string') {
      title = titleOrOptions;
    } else if (titleOrOptions) {
      title = titleOrOptions.title;
      description = titleOrOptions.description;
    }

    const baseTitle = `${siteConfig.name} — RVCE`;
    document.title = title ? `${title} | ${baseTitle}` : `${siteConfig.name} — ${siteConfig.tagline}`;

    if (description) {
      let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;

      let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.content = description;
      }
    }

    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = document.title;
    }
  }, [titleOrOptions]);
}

export default useDocumentTitle;
