import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("pt_BR");

export function getTimeAgo(): TimeAgo {
  return timeAgo;
}

export function getTimeAgoText(date: string): string {
  return getTimeAgo().format(new Date(date));
}
