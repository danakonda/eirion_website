import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

export type IconName =
  | "activity"
  | "arrow-left"
  | "arrow-right"
  | "award"
  | "bot"
  | "building-2"
  | "calendar-clock"
  | "calendar-heart"
  | "chart-column"
  | "check"
  | "chevron-down"
  | "circle-check"
  | "clock"
  | "dna"
  | "eye"
  | "file-text"
  | "flask-conical"
  | "git-branch"
  | "globe"
  | "heart-handshake"
  | "heart-pulse"
  | "linkedin"
  | "lock"
  | "mail"
  | "menu"
  | "message-circle"
  | "minus"
  | "mouse"
  | "pill"
  | "plus"
  | "shield-check"
  | "sparkles"
  | "stethoscope"
  | "trees"
  | "turtle"
  | "users"
  | "workflow"
  | "x"
  | "zap";

const ICONS: Record<IconName, string> = {
  "activity": "<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\" />",
  "arrow-left": "<path d=\"m12 19-7-7 7-7\" />\n  <path d=\"M19 12H5\" />",
  "arrow-right": "<path d=\"M5 12h14\" />\n  <path d=\"m12 5 7 7-7 7\" />",
  "award": "<path d=\"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526\" />\n  <circle cx=\"12\" cy=\"8\" r=\"6\" />",
  "bot": "<path d=\"M12 8V4H8\" />\n  <rect width=\"16\" height=\"12\" x=\"4\" y=\"8\" rx=\"2\" />\n  <path d=\"M2 14h2\" />\n  <path d=\"M20 14h2\" />\n  <path d=\"M15 13v2\" />\n  <path d=\"M9 13v2\" />",
  "building-2": "<path d=\"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z\" />\n  <path d=\"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\" />\n  <path d=\"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2\" />\n  <path d=\"M10 6h4\" />\n  <path d=\"M10 10h4\" />\n  <path d=\"M10 14h4\" />\n  <path d=\"M10 18h4\" />",
  "calendar-clock": "<path d=\"M16 14v2.2l1.6 1\" />\n  <path d=\"M16 2v4\" />\n  <path d=\"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5\" />\n  <path d=\"M3 10h5\" />\n  <path d=\"M8 2v4\" />\n  <circle cx=\"16\" cy=\"16\" r=\"6\" />",
  "calendar-heart": "<path d=\"M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125\" />\n  <path d=\"M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z\" />\n  <path d=\"M16 2v4\" />\n  <path d=\"M3 10h18\" />\n  <path d=\"M8 2v4\" />",
  "chart-column": "<path d=\"M3 3v16a2 2 0 0 0 2 2h16\" />\n  <path d=\"M18 17V9\" />\n  <path d=\"M13 17V5\" />\n  <path d=\"M8 17v-3\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <path d=\"m9 12 2 2 4-4\" />",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <polyline points=\"12 6 12 12 16 14\" />",
  "dna": "<path d=\"m10 16 1.5 1.5\" />\n  <path d=\"m14 8-1.5-1.5\" />\n  <path d=\"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993\" />\n  <path d=\"m16.5 10.5 1 1\" />\n  <path d=\"m17 6-2.891-2.891\" />\n  <path d=\"M2 15c6.667-6 13.333 0 20-6\" />\n  <path d=\"m20 9 .891.891\" />\n  <path d=\"M3.109 14.109 4 15\" />\n  <path d=\"m6.5 12.5 1 1\" />\n  <path d=\"m7 18 2.891 2.891\" />\n  <path d=\"M9 22c1.798-1.998 2.518-3.995 2.807-5.993\" />",
  "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" />\n  <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "file-text": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" />\n  <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" />\n  <path d=\"M10 9H8\" />\n  <path d=\"M16 13H8\" />\n  <path d=\"M16 17H8\" />",
  "flask-conical": "<path d=\"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2\" />\n  <path d=\"M6.453 15h11.094\" />\n  <path d=\"M8.5 2h7\" />",
  "git-branch": "<path d=\"M15 6a9 9 0 0 0-9 9V3\" />\n  <circle cx=\"18\" cy=\"6\" r=\"3\" />\n  <circle cx=\"6\" cy=\"18\" r=\"3\" />",
  "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" />\n  <path d=\"M2 12h20\" />",
  "heart-handshake": "<path d=\"M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762\" />",
  "heart-pulse": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" />\n  <path d=\"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27\" />",
  "linkedin": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\" />\n  <rect width=\"4\" height=\"12\" x=\"2\" y=\"9\" />\n  <circle cx=\"4\" cy=\"4\" r=\"2\" />",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" />\n  <path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
  "mail": "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" />\n  <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" />",
  "menu": "<path d=\"M4 5h16\" />\n  <path d=\"M4 12h16\" />\n  <path d=\"M4 19h16\" />",
  "message-circle": "<path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\" />",
  "minus": "<path d=\"M5 12h14\" />",
  "mouse": "<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"7\" />\n  <path d=\"M12 6v4\" />",
  "pill": "<path d=\"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z\" />\n  <path d=\"m8.5 8.5 7 7\" />",
  "plus": "<path d=\"M5 12h14\" />\n  <path d=\"M12 5v14\" />",
  "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />\n  <path d=\"m9 12 2 2 4-4\" />",
  "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\" />\n  <path d=\"M20 2v4\" />\n  <path d=\"M22 4h-4\" />\n  <circle cx=\"4\" cy=\"20\" r=\"2\" />",
  "stethoscope": "<path d=\"M11 2v2\" />\n  <path d=\"M5 2v2\" />\n  <path d=\"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1\" />\n  <path d=\"M8 15a6 6 0 0 0 12 0v-3\" />\n  <circle cx=\"20\" cy=\"10\" r=\"2\" />",
  "trees": "<path d=\"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z\" />\n  <path d=\"M7 16v6\" />\n  <path d=\"M13 19v3\" />\n  <path d=\"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5\" />",
  "turtle": "<path d=\"m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z\" />\n  <path d=\"M4.82 7.9 8 10\" />\n  <path d=\"M15.18 7.9 12 10\" />\n  <path d=\"M16.93 10H20a2 2 0 0 1 0 4H2\" />",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" />\n  <path d=\"M16 3.128a4 4 0 0 1 0 7.744\" />\n  <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" />\n  <circle cx=\"9\" cy=\"7\" r=\"4\" />",
  "workflow": "<rect width=\"8\" height=\"8\" x=\"3\" y=\"3\" rx=\"2\" />\n  <path d=\"M7 11v4a2 2 0 0 0 2 2h4\" />\n  <rect width=\"8\" height=\"8\" x=\"13\" y=\"13\" rx=\"2\" />",
  "x": "<path d=\"M18 6 6 18\" />\n  <path d=\"m6 6 12 12\" />",
  "zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" />",
};

@Component({
  selector: "app-icon",
  template: `<svg
  [attr.width]="size()"
  [attr.height]="size()"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
  [innerHTML]="path"
></svg>`,
  styles: ":host{display:contents} svg{flex-shrink:0}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Icon implements AfterViewInit {
  readonly name = input.required<IconName>();
  readonly size = input(24);
  protected path: SafeHtml = "";
  private readonly sanitizer = inject(DomSanitizer);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      this.path = this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()]);
    });
  }

  ngAfterViewInit(): void {
    // forward classes placed on <app-icon> (e.g. size-[2.7cqw]) to the rendered svg
    const el = this.host.nativeElement;
    const svg = el.querySelector("svg");
    const cls = (el.getAttribute("class") || "").trim();
    if (svg && cls) {
      svg.setAttribute("class", ((svg.getAttribute("class") || "") + " " + cls).trim());
    }
  }
}
