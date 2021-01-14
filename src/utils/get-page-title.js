import settings from '../settings'

const title = settings.title || 'Vue3.0jsVantMobileTemplate'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
