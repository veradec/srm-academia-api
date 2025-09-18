export interface AttendanceData {
  courseTitle: string;
  courseConducted: number;
  courseAbsent: number;
  courseAttendance: string;
}

export interface CourseClassCount {
  [courseName: string]: number;
}

export interface PredictionResult {
  courseName: string;
  calculatedClasses: number;
  currentTotal: number;
  presentClasses: number;
  finalTotal: number;
  currentAttendance: string;
  prediction: string;
}

export function calculateAttendancePrediction(
  courseClassCounts: CourseClassCount,
  attendanceData: AttendanceData[]
): PredictionResult[] {
  const results: PredictionResult[] = [];

  // Create a map of attendance data for quick lookup
  const attendanceMap = new Map<string, AttendanceData>();
  attendanceData.forEach(course => {
    attendanceMap.set(course.courseTitle, course);
  });

  // Process each course
  Object.entries(courseClassCounts).forEach(([courseName, calculatedClasses]) => {
    const attendance = attendanceMap.get(courseName);
    
    if (attendance) {
      const currentTotal = attendance.courseConducted;
      const presentClasses = attendance.courseConducted - attendance.courseAbsent;
      const finalTotal = currentTotal + calculatedClasses;
      const currentAttendance = attendance.courseAttendance;
      
      // Calculate prediction: (present classes / final total) * 100
      let prediction = 'N/A';
      if (presentClasses > 0 && finalTotal > 0) {
        prediction = ((presentClasses / finalTotal) * 100).toFixed(1) + '%';
      }
      
      results.push({
        courseName,
        calculatedClasses,
        currentTotal,
        presentClasses,
        finalTotal,
        currentAttendance,
        prediction
      });
    }
  });

  // Sort by calculated classes (descending)
  return results.sort((a, b) => b.calculatedClasses - a.calculatedClasses);
}
