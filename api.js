class API {
  apiUrl = "https://api.github.com";
  #token = "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";

  async getUser(userName) {
    const response = await fetch(`${this.apiUrl}/users/${userName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  async getFollowers(userName, amount = 10) {
    const response = await fetch(
      `${this.apiUrl}/users/${userName}/followers?per_page=${amount}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.#token}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  async getRepositories(userName, amount = 10) {
    const response = await fetch(
      `${this.apiUrl}/users/${userName}/repos?per_page=${amount}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.#token}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
}

export const api = new API();
