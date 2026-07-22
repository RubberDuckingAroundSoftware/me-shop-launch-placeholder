/**
 * Per-visit starting moodboard.
 *
 * The server has no way of knowing which cards a visitor has already seen, so it
 * always renders index 0. The card actually shown on arrival is picked in the
 * browser from two sources in `localStorage`:
 *
 *   - the collector "seen" set, so a returning visitor lands on something new
 *   - the previous visit's starting index, so two visits in a row never open
 *     with the same card even once everything has been seen
 *
 * Two things need that index and they must agree:
 *
 *   1. `buildStartIndexScript()` produces an inline script that runs while the
 *      browser parses the HTML — before the first paint and before React loads.
 *      It swaps the visible slide and the catchphrase directly in the DOM, so
 *      card 0 is never painted.
 *   2. `resolveStartIndex()` feeds the same value into React's lazy `useState`
 *      initializers during hydration, so React's output matches that DOM.
 *
 * The script publishes its choice on `window` and `resolveStartIndex()` reads it
 * back, which keeps them in sync and makes the pick happen exactly once per
 * visit. The selection logic is therefore written twice — once here in TS and
 * once as the script source below. Keep the two in step; the TS copy is the
 * fallback that runs when the inline script never does (a strict CSP without a
 * nonce, or a client-side navigation where the script is inert).
 */

export const SEEN_STORAGE_KEY = "meshop_seen_moodboards";
export const LAST_START_STORAGE_KEY = "meshop_last_start";

const GLOBAL_KEY = "__meshopStartIndex";

declare global {
  interface Window {
    [GLOBAL_KEY]?: number;
  }
}

function pickStartIndex(total: number): number {
  let seen: number[] = [];
  let last = -1;

  try {
    const storedSeen = localStorage.getItem(SEEN_STORAGE_KEY);
    if (storedSeen) {
      const parsed = JSON.parse(storedSeen);
      if (Array.isArray(parsed)) seen = parsed;
    }
    const storedLast = localStorage.getItem(LAST_START_STORAGE_KEY);
    if (storedLast !== null) last = Number(storedLast);
  } catch {
    // ignore storage errors
  }

  const all = Array.from({ length: total }, (_, i) => i);
  const unseen = all.filter((i) => i !== last && !seen.includes(i));
  const pool = unseen.length > 0 ? unseen : all.filter((i) => i !== last);
  const index = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : 0;

  try {
    localStorage.setItem(LAST_START_STORAGE_KEY, String(index));
  } catch {
    // ignore storage errors
  }

  return index;
}

/**
 * The index this visit starts on. Safe to call from a lazy `useState`
 * initializer: it returns 0 during SSR and the same value on every client call.
 */
export function resolveStartIndex(total: number): number {
  if (typeof window === "undefined" || total < 1) return 0;

  const cached = window[GLOBAL_KEY];
  if (typeof cached === "number" && cached >= 0 && cached < total) return cached;

  const index = pickStartIndex(total);
  window[GLOBAL_KEY] = index;
  return index;
}

export interface StartIndexScriptOptions {
  total: number;
  /** Slide elements are `${slideIdPrefix}${index}`, each carrying `data-catchphrase`. */
  slideIdPrefix: string;
  activeClassName: string;
  inactiveClassName: string;
  /** Element whose text content is the catchphrase of the visible card. */
  catchphraseId: string;
  /** Trailing period, hidden when the catchphrase already ends in punctuation. */
  catchphrasePeriodId: string;
  hiddenClassName: string;
}

/** Source of the inline script described at the top of this file. */
export function buildStartIndexScript({
  total,
  slideIdPrefix,
  activeClassName,
  inactiveClassName,
  catchphraseId,
  catchphrasePeriodId,
  hiddenClassName,
}: StartIndexScriptOptions): string {
  const s = JSON.stringify;

  return `(function(){try{
var t=${total};if(t<1)return;
var seen=[],last=-1,i;
try{
var v=localStorage.getItem(${s(SEEN_STORAGE_KEY)});if(v){var p=JSON.parse(v);if(Array.isArray(p))seen=p}
var l=localStorage.getItem(${s(LAST_START_STORAGE_KEY)});if(l!==null)last=Number(l)
}catch(e){}
var pool=[];
for(i=0;i<t;i++){if(i!==last&&seen.indexOf(i)<0)pool.push(i)}
if(!pool.length){for(i=0;i<t;i++){if(i!==last)pool.push(i)}}
var idx=pool.length?pool[Math.floor(Math.random()*pool.length)]:0;
try{localStorage.setItem(${s(LAST_START_STORAGE_KEY)},String(idx))}catch(e){}
window[${s(GLOBAL_KEY)}]=idx;
if(idx===0)return;
for(i=0;i<t;i++){var el=document.getElementById(${s(slideIdPrefix)}+i);if(el)el.className=i===idx?${s(activeClassName)}:${s(inactiveClassName)}}
var slide=document.getElementById(${s(slideIdPrefix)}+idx);if(!slide)return;
var phrase=slide.getAttribute("data-catchphrase")||"";
var text=document.getElementById(${s(catchphraseId)});
if(text&&phrase)text.textContent=phrase;
var dot=document.getElementById(${s(catchphrasePeriodId)});
if(dot&&phrase)dot.classList[/[.!?]$/.test(phrase)?"add":"remove"](${s(hiddenClassName)});
var img=slide.querySelector("img");
if(img){var link=document.createElement("link");link.rel="preload";link.as="image";link.setAttribute("fetchpriority","high");
var src=img.getAttribute("src")||"",set=img.getAttribute("srcset"),sizes=img.getAttribute("sizes");
if(src)link.href=src;if(set)link.setAttribute("imagesrcset",set);if(sizes)link.setAttribute("imagesizes",sizes);
if(src||set)document.head.appendChild(link)}
}catch(e){}})()`;
}
