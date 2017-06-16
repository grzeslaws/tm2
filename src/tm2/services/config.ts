import { environment } from '../../environments/environment';

export const CONFIG = {
  loginEndpoint: () => toFullUrl(`login`),
  deviceEndpoint: (id: number) => toFullUrl(`device/${id}`),
  deviceInfoEndpoint: (fragment: string) => toFullUrl(`deviceInfo?fragment=${fragment}`),
  devicePriceListEndpoint: () => toFullUrl(`devicePriceList`),
  tradeEndpoint: () => toFullUrl(`trade`),
  reportGroupedByStoreNameEndpoint: () => toFullUrl(`report/groupedByStoreName`),
  reportGroupedByDateEndpoint: () => toFullUrl(`report/groupedByDate`),
  barcodeEndpoint: () => toFullUrl(`barcode`),
  applicationName: "go11"
}

function toFullUrl(path: string) {
  return `${environment.backendUrl}/${path}`;
}