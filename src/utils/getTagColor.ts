/**
 * 태그 이름에 따라 고유한 색상을 반환하는 함수
 */
export const getTagColor = (tagName: string) => {
  const bgColors = ["#F9EEE3", "#E7F7DB", "#F7DBF0", "#DBE6F7"];
  const fontColors = ["#D58D49", "#86D549", "#D549B6", "#4981D5"];

  const charCodeSum = Array.from(tagName).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );

  return {
    name: tagName,
    bgColor: bgColors[charCodeSum % bgColors.length],
    fontColor: fontColors[charCodeSum % fontColors.length],
  };
};
