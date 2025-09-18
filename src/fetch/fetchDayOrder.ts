import axios from "axios";

export async function fetchDayOrder(cookie: string) {
  try {
    const request = await axios(
      "https://academia.srmist.edu.in/srm_university/academia-academic-services/page/WELCOME",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          cookie,
          Referer: "https://academia.srmist.edu.in/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        method: "GET",
      }
    );
    return request.data;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      error.status === 500
    ) {
      return { error: "Unauthorized", status: 401 };
    }

    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch attendance",
      status:
        error && typeof error === "object" && "status" in error
          ? error.status
          : 500,
    };
  }
}
