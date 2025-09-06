export function TruncateMessage(msg: string, maxLength = 100) {
  if (msg.length > maxLength) {
    return msg.substring(0, maxLength) + "...";
  }
  return msg;
}
