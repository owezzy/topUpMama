import {FooterComponent} from "../app/footer/footer.component";

const minutesToAdd = 10;
const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

export function calcDateDiff(endDay: Date = futureDate): FooterComponent {
  const dDay = endDay.valueOf();

  const milliSecondsInASecond = 1000;
  const hoursInADay = 24;
  const minutesInAnHour = 60;
  const secondsInAMinute = 60;

  const timeDifference = dDay - Date.now();

  const daysToDay = Math.floor(
    timeDifference /
    (milliSecondsInASecond * minutesInAnHour * secondsInAMinute * hoursInADay)
  );

  const hoursToDay = Math.floor(
    (timeDifference /
      (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
    hoursInADay
  );

  const minutesToDay = Math.floor(
    (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
    secondsInAMinute
  );

  const secondsToDay =
    Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;

  // @ts-ignore
  return { secondsToDay, minutesToDay, hoursToDay, daysToDay };
}
