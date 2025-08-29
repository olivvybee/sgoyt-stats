import { X2jOptions, XMLParser } from 'fast-xml-parser';
import { BGGThreadApiResponse } from './types/thread';

export const BASE_URL = 'https://boardgamegeek.com';

export class BGGClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest<TResponse>(path: string): Promise<string> {
    const url = buildUrl(BASE_URL, path);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    return await response.text();
  }

  private async makeXmlV2Request<TResponse>(
    path: string,
    params?: URLSearchParams | undefined,
    parserOptions?: X2jOptions | undefined
  ): Promise<TResponse> {
    const fullPath = buildUrl('xmlapi2', `${path}?${params?.toString()}`);
    const response = await this.makeRequest(fullPath);

    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      attributeNamePrefix: '',
      ...parserOptions,
    });
    const parsedData = parser.parse(response);

    return parsedData;
  }

  async thread(
    id: number,
    { after }: { after?: number } = {}
  ): Promise<BGGThreadApiResponse> {
    const params = new URLSearchParams();

    params.append('id', id.toString());

    if (after) {
      params.append('minarticleid', after.toString());
    }

    return this.makeXmlV2Request('thread', params, {
      isArray: (tagName) => tagName === 'article',
    });
  }
}

const buildUrl = (start: string, end: string) => {
  const normalisedEnd = end.startsWith('/') ? end : `/${end}`;
  return `${start}${normalisedEnd}`;
};
