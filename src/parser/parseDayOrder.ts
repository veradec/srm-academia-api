import * as cheerio from "cheerio";
import { DayOrderResponse } from "../type/dayOrder";

export async function parseDayOrder(
  response: string
): Promise<DayOrderResponse> {
  try {
    const match = response.match(/pageSanitizer\.sanitize\('(.*)'\);/s);
    if (!match || !match[1]) {
      return { error: "Failed to extract dayOrder details", status: 404 };
    }

    const encodedHtml = match[1];

    const decodedHtml = encodedHtml
      .replace(/\\x([0-9A-Fa-f]{2})/g, (_: string, hex: string) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      .replace(/\\\\/g, "")
      .replace(/\\'/g, "'");

    const $ = cheerio.load(decodedHtml);

    let dayOrderText = "";
    let dayOrder = "-";

    $("span.highlight font[color='yellow']").each((_, el) => {
      const text = $(el).text().trim();
      if (text.startsWith("Day Order:")) {
        dayOrderText = text.replace("Day Order:", "").trim();
      }
    });

    for (const order of ["1", "2", "3", "4", "5"]) {
      if (dayOrderText.includes(order)) {
        dayOrder = order;
        break;
      }
    }

    return { dayOrder, status: 200 };
  } catch (error) {
    console.error("Error parsing day order:", error);
    return { error: "Failed to parse day order", status: 500 };
  }
}
