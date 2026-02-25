/**
 * Coordinate normalization utilities.
 * Converts DMS (Degrees Minutes Seconds) and DMM (Degrees Decimal Minutes)
 * formats into Decimal Degrees (DD) for consistent Mapbox rendering.
 *
 * Examples:
 *   DMS:  "21°47'18.68\"N"  → 21.78852
 *   DMM:  "21º 53.557' N"  → 21.89262
 *   DD:   "21.78852"       → 21.78852
 */

/** Parse a DMS string like `21°47'18.68"N` into decimal degrees */
export function parseDMS(input: string): number | null {
  const dms = input.match(
    /(-?\d+)[°º]\s*(\d+)[′']\s*([\d.]+)[″"]\s*([NSEWnsew])?/
  );
  if (dms) {
    const deg = parseFloat(dms[1]);
    const min = parseFloat(dms[2]);
    const sec = parseFloat(dms[3]);
    const dir = dms[4]?.toUpperCase();
    let dd = Math.abs(deg) + min / 60 + sec / 3600;
    if (dir === "S" || dir === "W" || deg < 0) dd *= -1;
    return Math.round(dd * 100000) / 100000;
  }
  return null;
}

/** Parse a DMM string like `21º 53.557' N` into decimal degrees */
export function parseDMM(input: string): number | null {
  const dmm = input.match(
    /(-?\d+)[°º]\s*([\d.]+)[′']\s*([NSEWnsew])?/
  );
  if (dmm) {
    const deg = parseFloat(dmm[1]);
    const min = parseFloat(dmm[2]);
    const dir = dmm[3]?.toUpperCase();
    let dd = Math.abs(deg) + min / 60;
    if (dir === "S" || dir === "W" || deg < 0) dd *= -1;
    return Math.round(dd * 100000) / 100000;
  }
  return null;
}

/**
 * Normalize any coordinate string (DMS, DMM, or plain DD) to decimal degrees.
 * Returns null if the input cannot be parsed.
 */
export function toDecimalDegrees(input: string): number | null {
  const trimmed = input.trim();

  // Already decimal degrees
  const plain = parseFloat(trimmed);
  if (!isNaN(plain) && /^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Math.round(plain * 100000) / 100000;
  }

  // Try DMS first (has seconds component)
  const dms = parseDMS(trimmed);
  if (dms !== null) return dms;

  // Try DMM (degrees + decimal minutes, no seconds)
  const dmm = parseDMM(trimmed);
  if (dmm !== null) return dmm;

  return null;
}

/**
 * Parse a lat/lng pair from mixed-format strings.
 * Example: parseCoordinates("21°47'18.68\"N", "92°36'33.31\"E")
 */
export function parseCoordinates(
  latStr: string,
  lngStr: string
): { lat: number; lng: number } | null {
  const lat = toDecimalDegrees(latStr);
  const lng = toDecimalDegrees(lngStr);
  if (lat === null || lng === null) return null;
  return { lat, lng };
}
