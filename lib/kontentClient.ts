// Kontent.ai Delivery API


import { createDeliveryClient, camelCasePropertyNameResolver } from '@kontent-ai/delivery-sdk'
import { HeroUnit, Page } from '../models';

const sourceTrackingHeaderName = 'X-KC-SOURCE'

const client = createDeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID || "f7099aef-188e-00e9-af3b-a9caa5b02a77",
  globalHeaders: (_queryConfig) => [
    {
      header: sourceTrackingHeaderName,
      value: `${process.env.APP_NAME || "n/a"};${process.env.APP_VERSION || "n/a"}`,
    },
  ],
  propertyNameResolver: camelCasePropertyNameResolver
});

export async function getHeroUnit() : Promise<HeroUnit> {
  const response = await client
    .item<HeroUnit>('home_page_hero_unit')
    .toPromise()

  return (response.data.item);
}

export async function getHomepage() : Promise<Page> {
  const response = await client
    .item<Page>('homepage')
    .toPromise()

  return (response.data.item);
}