/**
 * A script that runs while the browser parses the HTML, before the first paint.
 *
 * On the client it renders as `text/plain` so it stays inert: scripts inserted
 * through a DOM update never execute anyway, and React warns about rendering
 * `<script>` during a client render. `suppressHydrationWarning` covers the
 * resulting `type` mismatch.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
