import * as cheerio from "cheerio";
import { AttendanceResponse, AttendanceDetail } from "../type/attendance";
import { attendanceStatus } from "../../utils/attendanceStatus";
export async function parseAttendance(
  response: string
): Promise<AttendanceResponse> {
  try {
    const match = response.match(/pageSanitizer\.sanitize\('(.*)'\);/s);
    if (!match || !match[1]) {
      return { error: "Failed to extract attendance data", status: 404 };
    }
    const encodedHtml = match[1];
    const decodedHtml = encodedHtml
      .replace(/\\x([0-9A-Fa-f]{2})/g, (_: string, hex: string) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      .replace(/\\\\/g, "")
      .replace(/\\'/g, "'");

    const $ = cheerio.load(decodedHtml);
    const table = $('table[style*="font-size :16px;"][bgcolor="#FAFAD2"]');

    const rows = table.find("tr").slice(1).toArray();
    const attendanceDetails: AttendanceDetail[] = rows.map((row) => {
      const cols = $(row).find("td");
      const get = (idx: number) =>
        cols[idx] ? $(cols[idx]).text().trim() : "";
      return {
        courseCode: cols[0] ? $(cols[0]).contents().first().text().trim() : "",
        courseTitle: get(1),
        courseCategory: get(2),
        courseFaculty: get(3).split("(")[0].trim(),
        courseSlot: get(4),
        courseConducted: Number(get(6)),
        courseAbsent: Number(get(7)),
        courseAttendance: cols[8]
          ? $(cols[8]).find("strong").text().trim()
          : "",
        courseAttendanceStatus: attendanceStatus({
          conducted: Number(get(6)),
          absent: Number(get(7)),
        }),
      };
    });

    return { attendance: attendanceDetails, status: 200 };
  } catch (error) {
    console.error("Error parsing attendance:", error);
    return { error: "Failed to parse attendance", status: 500 };
  }
}
