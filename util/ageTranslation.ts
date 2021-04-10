// https://www.acs-schools.com/hillingdon/admissions/year-grade-placement

const usGrades = (age: number) => {
  if (age < 4) {
    return 0;
  } else if (4 <= age && age < 5) {
    // Pre-kindergarten
    return 0;
  } else if (5 <= age && age < 6) {
    // Kindergarten
    return 0;
  } else if (6 <= age && age < 7) {
    return 1;
  } else if (7 <= age && age < 8) {
    return 2;
  } else if (8 <= age && age < 9) {
    return 3;
  } else if (9 <= age && age < 10) {
    return 4;
  } else if (10 <= age && age < 11) {
    return 5;
  } else if (11 <= age && age < 12) {
    return 6;
  } else if (12 <= age && age < 13) {
    return 7;
  } else if (13 <= age && age < 14) {
    return 8;
  } else if (14 <= age && age < 15) {
    return 9;
  } else if (15 <= age && age < 16) {
    return 10;
  } else if (16 <= age && age < 17) {
    return 11;
  } else if (17 <= age && age < 18) {
    return 12;
  } else if (18 <= age && age < 19) {
    return 13;
  } else if (19 <= age && age < 20) {
    return 14;
  } else if (20 <= age && age < 21) {
    return 15;
  } else if (21 <= age && age < 22) {
    return 16;
  } else if (22 <= age && age < 23) {
    return 17;
  }
  return 0;
};

export default usGrades;
