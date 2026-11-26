/** crispEmber -- TypeScript SDK */

export class Client {
  private apiKey: string;
  private baseUrl: string;
  private maxRetries: number;

  constructor(options: {
    apiKey: string;
    baseUrl?: string;
    maxRetries?: number;
  }) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? "https://api.example.com";
    this.maxRetries = options.maxRetries ?? 3;
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const res = await fetch(`${this.baseUrl}${path}`, {
          method,
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        }

        return await res.json() as T;
      } catch (err) {
        lastError = err as Error;
        if (attempt < this.maxRetries - 1) {
          await new Promise(r => setTimeout(r, 2 ** attempt * 1000));
        }
      }
    }

    throw lastError ?? new Error("Request failed");
  }
}

export { Client as default };