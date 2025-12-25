export default function timeTodayToIso(time: string | null) {
  if (!time) return null;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  const iso = `${yyyy}-${mm}-${dd}T${time}:00`;
  const parsed = new Date(iso);

  if (isNaN(parsed.getTime())) {
    throw new Error(`Invalid time value: ${time}`);
  }

  return parsed.toISOString();
}
