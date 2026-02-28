import type Lenis from "lenis";

const isMobileViewport = () => window.innerWidth < 768;

// on mobile, about acts as snap (no free-scroll needed, single viewport)
const getEffectiveType = (entry: FlowEntry): SectionType => {
  if (isMobileViewport() && entry.id === "about") return "snap";
  return entry.type;
};

// snap: one gesture = full viewport jump, block all native/lenis scroll
// free: lenis/gsap-driven scroll, only intercept at boundaries
// pass: completely natural scroll, never intercept

export type SectionType = "snap" | "free" | "pass";

export interface FlowEntry {
  id: string;
  type: SectionType;
}

export const PAGE_FLOW: FlowEntry[] = [
  { id: "home", type: "snap" },
  { id: "mission-logs", type: "snap" },
  { id: "rewards", type: "free" },
  { id: "timeline", type: "free" },
  { id: "guidelines", type: "snap" },
  { id: "faqs", type: "snap" },
  { id: "about", type: "free" },
  { id: "ribbon-section", type: "pass" },
];

export const SNAP_DURATION = 1.0;
export const SNAP_COOLDOWN = 200;
export const WHEEL_THRESHOLD = 30;
export const TRACKPAD_ACCUM_THRESHOLD = 100;
export const TOUCH_SWIPE_MIN = 30;

export const SNAP_EASE = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const findPinSpacer = (el: HTMLElement): HTMLElement | null => {
  const ancestor = el.closest(".pin-spacer") as HTMLElement | null;
  if (ancestor) return ancestor;
  return el.querySelector(".pin-spacer") as HTMLElement | null;
};

export const getSectionRange = (
  id: string,
): { top: number; bottom: number; height: number } => {
  const el = document.getElementById(id);
  if (!el) return { top: 0, bottom: 0, height: 0 };

  const spacer = findPinSpacer(el);
  if (spacer) {
    const rect = spacer.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const h = spacer.offsetHeight;
    return { top, bottom: top + h, height: h };
  }

  if (id === "mission-logs") {
    const wrapper = el.parentElement;
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const h = wrapper.offsetHeight;
      return { top, bottom: top + h, height: h };
    }
  }

  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const h = el.offsetHeight;
  return { top, bottom: top + h, height: h };
};

export const getSnapTarget = (id: string): number => {
  if (id === "mission-logs") {
    const el = document.getElementById(id);
    if (el?.parentElement) {
      return el.parentElement.getBoundingClientRect().top + window.scrollY;
    }
  }

  const el = document.getElementById(id);
  if (!el) return 0;

  const spacer = findPinSpacer(el);
  if (spacer) {
    return spacer.getBoundingClientRect().top + window.scrollY;
  }

  return el.getBoundingClientRect().top + window.scrollY;
};

export const getFreeZoneExit = (id: string): number => {
  const range = getSectionRange(id);
  return Math.max(0, range.bottom - window.innerHeight);
};

const hasPinSpacer = (id: string): boolean => {
  const el = document.getElementById(id);
  if (!el) return false;
  return findPinSpacer(el) !== null;
};

export const locateCurrentEntry = (
  scrollY: number,
): { entry: FlowEntry; index: number } | null => {
  const vh = window.innerHeight;
  const tolerance = 20;

  for (let i = 0; i < PAGE_FLOW.length; i++) {
    const entry = PAGE_FLOW[i];
    const range = getSectionRange(entry.id);
    const effectiveType = getEffectiveType(entry);

    if (effectiveType === "free") {
      let bottomTol = tolerance;
      if (!hasPinSpacer(entry.id)) {
        bottomTol = tolerance + vh * 0.5;
      }
      if (
        scrollY >= range.top - tolerance &&
        scrollY <= range.bottom - vh + bottomTol
      ) {
        return { entry, index: i };
      }
    } else if (effectiveType === "snap") {
      const target = getSnapTarget(entry.id);
      if (Math.abs(scrollY - target) < vh * 0.5) {
        return { entry, index: i };
      }
    } else {
      // pass sections
      if (scrollY >= range.top - tolerance) {
        return { entry, index: i };
      }
    }
  }

  let bestIdx = 0;
  let bestDist = Infinity;
  for (let i = 0; i < PAGE_FLOW.length; i++) {
    const target = getSnapTarget(PAGE_FLOW[i].id);
    const d = Math.abs(scrollY - target);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return { entry: PAGE_FLOW[bestIdx], index: bestIdx };
};

export const isPinActive = (id: string): boolean => {
  const el = document.getElementById(id);
  if (!el) return false;
  const spacer = findPinSpacer(el);
  if (!spacer) return false;
  const sy = window.scrollY;
  const spacerRect = spacer.getBoundingClientRect();
  const spacerTop = spacerRect.top + sy;
  const spacerEnd = spacerTop + spacer.offsetHeight - window.innerHeight;
  return sy >= spacerTop - 10 && sy <= spacerEnd + 10;
};

export const isAtFreeZoneTop = (id: string): boolean => {
  const el = document.getElementById(id);
  if (!el) return false;
  const spacer = findPinSpacer(el);
  if (spacer) {
    const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
    return window.scrollY <= spacerTop + 15;
  }
  const rect = el.getBoundingClientRect();
  return rect.top >= -15;
};

export const isAtFreeZoneBottom = (id: string): boolean => {
  const el = document.getElementById(id);
  if (!el) return false;

  if (id === "about") {
    return false;
  }

  const spacer = findPinSpacer(el);
  if (spacer) {
    const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
    const spacerEnd = spacerTop + spacer.offsetHeight - window.innerHeight;
    return window.scrollY >= spacerEnd - 15;
  }

  const rect = el.getBoundingClientRect();
  return rect.bottom <= window.innerHeight * 0.15;
};

export interface ScrollEngineCallbacks {
  onFooterVisibilityChange: (visible: boolean) => void;
}

export class ScrollEngine {
  private lenis: Lenis;
  private callbacks: ScrollEngineCallbacks;

  private isSnapping = false;
  private suspended = false;
  private suspendTimer: ReturnType<typeof setTimeout> | null = null;
  private cooldownUntil = 0;
  private deltaAccum = 0;
  private accumTimer: ReturnType<typeof setTimeout> | null = null;
  private touchStartY = 0;
  private touchStartTime = 0;
  private lastScrollY = 0;
  private lastEntryId = "";

  private boundHandleWheel: (e: WheelEvent) => void;
  private boundHandleTouchStart: (e: TouchEvent) => void;
  private boundHandleTouchMove: (e: TouchEvent) => void;
  private boundHandleTouchEnd: (e: TouchEvent) => void;
  private boundHandleKeyDown: (e: KeyboardEvent) => void;
  private boundHandleFooterCheck: () => void;
  private boundHandleIdleCorrection: () => void;
  private boundHandleBoundaryGuard: () => void;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(lenis: Lenis, callbacks: ScrollEngineCallbacks) {
    this.lenis = lenis;
    this.callbacks = callbacks;

    this.boundHandleWheel = this.handleWheel.bind(this);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    this.boundHandleTouchEnd = this.handleTouchEnd.bind(this);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleFooterCheck = this.checkFooterVisibility.bind(this);
    this.boundHandleIdleCorrection = this.handleIdleCorrection.bind(this);
    this.boundHandleBoundaryGuard = this.handleBoundaryGuard.bind(this);
  }

  attach(): void {
    this.lastScrollY = window.scrollY;
    const loc = locateCurrentEntry(window.scrollY);
    this.lastEntryId = loc ? loc.entry.id : "";

    window.addEventListener("wheel", this.boundHandleWheel, { passive: false });
    window.addEventListener("touchstart", this.boundHandleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchmove", this.boundHandleTouchMove, {
      passive: false,
    });
    window.addEventListener("touchend", this.boundHandleTouchEnd, {
      passive: true,
    });
    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("scroll", this.boundHandleFooterCheck, {
      passive: true,
    });
    window.addEventListener("scroll", this.boundHandleIdleCorrection, {
      passive: true,
    });
    window.addEventListener("scroll", this.boundHandleBoundaryGuard, {
      passive: true,
    });
    this.checkFooterVisibility();
  }

  detach(): void {
    window.removeEventListener("wheel", this.boundHandleWheel);
    window.removeEventListener("touchstart", this.boundHandleTouchStart);
    window.removeEventListener("touchmove", this.boundHandleTouchMove);
    window.removeEventListener("touchend", this.boundHandleTouchEnd);
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("scroll", this.boundHandleFooterCheck);
    window.removeEventListener("scroll", this.boundHandleIdleCorrection);
    window.removeEventListener("scroll", this.boundHandleBoundaryGuard);
    if (this.accumTimer) clearTimeout(this.accumTimer);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this.suspendTimer) clearTimeout(this.suspendTimer);
  }

  // suspends guards for programmatic nav menu scrolling
  navigateToSection(sectionId: string, duration = 1.5): void {
    this.suspended = true;
    this.isSnapping = true;
    if (this.suspendTimer) clearTimeout(this.suspendTimer);

    this.killLenisVelocity();

    const target = getSnapTarget(sectionId);

    this.lenis.scrollTo(target, {
      duration,
      lock: true,
      force: true,
      easing: SNAP_EASE,
      onComplete: () => {
        this.killLenisVelocity();
        this.lenis.start();
        this.isSnapping = false;
        this.lastScrollY = window.scrollY;
        const loc = locateCurrentEntry(window.scrollY);
        this.lastEntryId = loc ? loc.entry.id : "";
        this.cooldownUntil = Date.now() + SNAP_COOLDOWN + 300;
        this.suspendTimer = setTimeout(() => {
          this.suspended = false;
        }, 400);
      },
    });
  }

  private killLenisVelocity(): void {
    this.lenis.stop();
    const l = this.lenis as any;
    l.targetScroll = window.scrollY;
    l.animatedScroll = window.scrollY;
    l.velocity = 0;
  }

  private snapTo(targetId: string, duration = SNAP_DURATION): void {
    if (this.isSnapping) return;

    const targetY = getSnapTarget(targetId);
    if (Math.abs(window.scrollY - targetY) < 3) return;

    this.isSnapping = true;
    this.killLenisVelocity();

    this.lenis.scrollTo(targetY, {
      duration,
      lock: true,
      force: true,
      easing: SNAP_EASE,
      onComplete: () => {
        this.killLenisVelocity();
        this.lenis.start();
        this.cooldownUntil = Date.now() + SNAP_COOLDOWN + 400;
        this.isSnapping = false;
        this.lastScrollY = window.scrollY;
        const loc = locateCurrentEntry(window.scrollY);
        if (loc) this.lastEntryId = loc.entry.id;
      },
    });
  }

  private scrollToPosition(targetY: number, duration = SNAP_DURATION): void {
    if (this.isSnapping) return;
    if (Math.abs(window.scrollY - targetY) < 3) return;

    this.isSnapping = true;
    this.killLenisVelocity();

    this.lenis.scrollTo(targetY, {
      duration,
      lock: true,
      force: true,
      easing: SNAP_EASE,
      onComplete: () => {
        this.killLenisVelocity();
        this.lenis.start();
        this.cooldownUntil = Date.now() + SNAP_COOLDOWN + 400;
        this.isSnapping = false;
        this.lastScrollY = window.scrollY;
        const loc = locateCurrentEntry(window.scrollY);
        if (loc) this.lastEntryId = loc.entry.id;
      },
    });
  }

  private canNavigate(): boolean {
    if (this.isSnapping) return false;
    if (Date.now() < this.cooldownUntil) return false;
    return true;
  }

  private navigateFlow(direction: "down" | "up"): boolean {
    if (!this.canNavigate()) return false;

    const loc = locateCurrentEntry(window.scrollY);
    if (!loc) return false;

    const { entry, index } = loc;
    const effectiveType = getEffectiveType(entry);

    if (effectiveType === "pass") return false;

    if (effectiveType === "free") {
      if (direction === "down" && isAtFreeZoneBottom(entry.id)) {
        const nextIdx = index + 1;
        if (nextIdx >= PAGE_FLOW.length) return false;
        const next = PAGE_FLOW[nextIdx];
        const nextEffective = getEffectiveType(next);
        if (nextEffective === "free" || nextEffective === "pass") {
          return false;
        }
        this.snapTo(next.id);
        return true;
      }

      if (direction === "up" && isAtFreeZoneTop(entry.id)) {
        const prevIdx = index - 1;
        if (prevIdx < 0) return false;
        const prev = PAGE_FLOW[prevIdx];
        const prevEffective = getEffectiveType(prev);
        if (prevEffective === "free" || prevEffective === "pass") {
          return false;
        }
        this.snapTo(prev.id);
        return true;
      }

      return false;
    }

    if (direction === "down") {
      const nextIdx = index + 1;
      if (nextIdx >= PAGE_FLOW.length) return false;
      const next = PAGE_FLOW[nextIdx];
      const nextEffective = getEffectiveType(next);

      if (nextEffective === "free") {
        this.scrollToPosition(getSnapTarget(next.id));
      } else if (nextEffective === "snap") {
        this.snapTo(next.id);
      } else if (nextEffective === "pass") {
        // allow navigating into pass sections (ribbon/footer)
        this.scrollToPosition(getSnapTarget(next.id));
      } else {
        return false;
      }
      return true;
    } else {
      if (entry.id === "home") return false;

      const prevIdx = index - 1;
      if (prevIdx < 0) return false;
      const prev = PAGE_FLOW[prevIdx];
      const prevEffective = getEffectiveType(prev);

      if (prevEffective === "free") {
        this.scrollToPosition(getFreeZoneExit(prev.id));
      } else if (prevEffective === "snap") {
        this.snapTo(prev.id);
      } else {
        return false;
      }
      return true;
    }
  }

  private getCurrentSectionType(): SectionType {
    const loc = locateCurrentEntry(window.scrollY);
    if (!loc) return "snap";
    return getEffectiveType(loc.entry);
  }

  private checkFooterVisibility(): void {
    const ribbon = document.getElementById("ribbon-section");
    const about = document.getElementById("about");
    const vh = window.innerHeight;
    const ribbonVisible = ribbon
      ? ribbon.getBoundingClientRect().top < vh &&
        ribbon.getBoundingClientRect().bottom > 0
      : false;
    const aboutRect = about ? about.getBoundingClientRect() : null;
    const aboutNear = aboutRect ? aboutRect.bottom <= vh + 400 : false;
    const aboutPastBottom = aboutRect ? aboutRect.bottom <= vh * 0.5 : false;
    const docHeight = document.documentElement.scrollHeight;
    const nearDocBottom = window.scrollY + vh >= docHeight - 500;

    this.callbacks.onFooterVisibilityChange(
      ribbonVisible || aboutNear || aboutPastBottom || nearDocBottom,
    );
  }

  private handleIdleCorrection(): void {
    if (this.isSnapping || this.suspended) return;
    if (Date.now() < this.cooldownUntil) return;

    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      if (this.isSnapping || this.suspended) return;
      if (Date.now() < this.cooldownUntil) return;

      const loc = locateCurrentEntry(window.scrollY);
      if (!loc) return;

      if (loc.entry.type !== "snap") return;

      const target = getSnapTarget(loc.entry.id);
      const drift = Math.abs(window.scrollY - target);

      if (drift > 5 && drift < window.innerHeight * 0.3) {
        this.snapTo(loc.entry.id, 0.4);
      }
    }, 600);
  }

  // catches momentum overshooting snap sections
  private handleBoundaryGuard(): void {
    if (this.isSnapping || this.suspended) {
      this.lastScrollY = window.scrollY;
      return;
    }
    if (Date.now() < this.cooldownUntil) {
      this.lastScrollY = window.scrollY;
      const loc = locateCurrentEntry(window.scrollY);
      if (loc) this.lastEntryId = loc.entry.id;
      return;
    }

    const sy = window.scrollY;
    const prevY = this.lastScrollY;
    this.lastScrollY = sy;

    const delta = sy - prevY;
    if (Math.abs(delta) < 2) return;

    const loc = locateCurrentEntry(sy);
    if (!loc) return;

    const currentId = loc.entry.id;
    const prevEntryId = this.lastEntryId;
    this.lastEntryId = currentId;

    if (currentId !== prevEntryId && prevEntryId !== "") {
      const currentEntry = loc.entry;

      const currentEffective = getEffectiveType(currentEntry);

      if (currentEffective === "free") {
        const prevIdx = PAGE_FLOW.findIndex((e) => e.id === prevEntryId);
        const prevEntry = prevIdx >= 0 ? PAGE_FLOW[prevIdx] : null;
        if (prevEntry && prevEntry.type === "free") {
          return;
        }
      }

      if (currentEffective === "pass") {
        const prevIdx = PAGE_FLOW.findIndex((e) => e.id === prevEntryId);
        const prevEntry = prevIdx >= 0 ? PAGE_FLOW[prevIdx] : null;
        if (
          prevEntry &&
          (prevEntry.type === "free" || prevEntry.type === "pass")
        ) {
          return;
        }
      }

      if (currentEffective === "snap") {
        const prevIdx = PAGE_FLOW.findIndex((e) => e.id === prevEntryId);
        const prevEntry = prevIdx >= 0 ? PAGE_FLOW[prevIdx] : null;

        if (prevEntry && prevEntry.type === "free") {
          this.killLenisVelocity();
          this.lenis.start();
          this.snapTo(currentEntry.id, 0.6);
          return;
        }
      }

      if (currentEffective === "free" || currentEffective === "pass") {
        const prevIdx = PAGE_FLOW.findIndex((e) => e.id === prevEntryId);
        const currIdx = loc.index;

        if (prevIdx >= 0 && Math.abs(currIdx - prevIdx) > 1) {
          const step = currIdx > prevIdx ? 1 : -1;
          for (let i = prevIdx + step; i !== currIdx; i += step) {
            if (i < 0 || i >= PAGE_FLOW.length) break;
            if (PAGE_FLOW[i].type === "snap") {
              this.killLenisVelocity();
              this.lenis.start();
              this.snapTo(PAGE_FLOW[i].id, 0.6);
              return;
            }
          }
        }
      }
    }

    if (loc.entry.type === "snap") {
      const l = this.lenis as any;
      const velocity = Math.abs(l.velocity || 0);
      if (velocity > 0.5) {
        const target = getSnapTarget(loc.entry.id);
        const drift = Math.abs(sy - target);
        if (drift > 10 && drift < window.innerHeight * 0.4) {
          this.killLenisVelocity();
          this.lenis.start();
          this.snapTo(loc.entry.id, 0.6);
        }
      }
    }
  }

  private handleWheel(e: WheelEvent): void {
    if (this.isSnapping || this.suspended) {
      e.preventDefault();
      return;
    }

    const type = this.getCurrentSectionType();

    if (type === "pass") {
      // mobile: allow scrolling up from ribbon back to about
      if (isMobileViewport() && e.deltaY < 0) {
        const loc = locateCurrentEntry(window.scrollY);
        if (loc && loc.index > 0) {
          e.preventDefault();
          const prev = PAGE_FLOW[loc.index - 1];
          this.killLenisVelocity();
          this.lenis.start();
          this.snapTo(prev.id, 0.8);
        }
      }
      return;
    }

    if (type === "free") {
      const loc = locateCurrentEntry(window.scrollY);
      if (!loc) return;

      const dir: "down" | "up" = e.deltaY > 0 ? "down" : "up";

      if (dir === "down" && isAtFreeZoneBottom(loc.entry.id)) {
        const nextIdx = loc.index + 1;
        const next = nextIdx < PAGE_FLOW.length ? PAGE_FLOW[nextIdx] : null;
        if (
          next &&
          (getEffectiveType(next) === "pass" ||
            getEffectiveType(next) === "free")
        )
          return;

        const handled = this.navigateFlow(dir);
        if (handled) {
          e.preventDefault();
          this.killLenisVelocity();
        }
        return;
      }
      if (dir === "up" && isAtFreeZoneTop(loc.entry.id)) {
        const prevIdx = loc.index - 1;
        const prev = prevIdx >= 0 ? PAGE_FLOW[prevIdx] : null;
        if (
          prev &&
          (getEffectiveType(prev) === "pass" ||
            getEffectiveType(prev) === "free")
        )
          return;

        const handled = this.navigateFlow(dir);
        if (handled) {
          e.preventDefault();
          this.killLenisVelocity();
        }
        return;
      }

      return;
    }

    e.preventDefault();
    this.killLenisVelocity();

    const direction: "down" | "up" = e.deltaY > 0 ? "down" : "up";
    const absDelta = Math.abs(e.deltaY);
    const isTrackpad = absDelta < 50 && absDelta > 0;

    if (isTrackpad) {
      this.deltaAccum += e.deltaY;

      if (this.accumTimer) clearTimeout(this.accumTimer);
      this.accumTimer = setTimeout(() => {
        this.deltaAccum = 0;
      }, 250);

      if (Math.abs(this.deltaAccum) < TRACKPAD_ACCUM_THRESHOLD) {
        return;
      }

      this.deltaAccum = 0;
      if (this.accumTimer) {
        clearTimeout(this.accumTimer);
        this.accumTimer = null;
      }
    } else if (absDelta < WHEEL_THRESHOLD) {
      return;
    }

    this.navigateFlow(direction);
  }

  private handleTouchStart(e: TouchEvent): void {
    if (this.suspended) return;
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();

    const type = this.getCurrentSectionType();
    if (type === "snap" && !this.isSnapping) {
      this.killLenisVelocity();
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    if (this.isSnapping || this.suspended) {
      e.preventDefault();
      return;
    }

    const type = this.getCurrentSectionType();

    if (type === "pass") return;

    if (type === "snap") {
      e.preventDefault();
      this.killLenisVelocity();
      return;
    }

    const loc = locateCurrentEntry(window.scrollY);
    if (!loc) return;

    const diff = this.touchStartY - e.touches[0].clientY;
    const dir: "down" | "up" = diff > 0 ? "down" : "up";

    if (dir === "down" && isAtFreeZoneBottom(loc.entry.id)) {
      const nextIdx = loc.index + 1;
      const next = nextIdx < PAGE_FLOW.length ? PAGE_FLOW[nextIdx] : null;
      if (
        next &&
        (getEffectiveType(next) === "pass" || getEffectiveType(next) === "free")
      )
        return;
      e.preventDefault();
      this.killLenisVelocity();
      return;
    }
    if (dir === "up" && isAtFreeZoneTop(loc.entry.id)) {
      const prevIdx = loc.index - 1;
      const prev = prevIdx >= 0 ? PAGE_FLOW[prevIdx] : null;
      if (
        prev &&
        (getEffectiveType(prev) === "pass" || getEffectiveType(prev) === "free")
      )
        return;
      e.preventDefault();
      this.killLenisVelocity();
      return;
    }
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (this.isSnapping || this.suspended) return;

    const endY = e.changedTouches[0].clientY;
    const diff = this.touchStartY - endY;
    const elapsed = Date.now() - this.touchStartTime;

    const minDist = elapsed < 200 ? TOUCH_SWIPE_MIN * 0.5 : TOUCH_SWIPE_MIN;
    if (Math.abs(diff) < minDist) return;

    const direction: "down" | "up" = diff > 0 ? "down" : "up";
    const type = this.getCurrentSectionType();

    // mobile: swipe up from pass section → snap to previous
    if (type === "pass" && direction === "up" && isMobileViewport()) {
      const loc = locateCurrentEntry(window.scrollY);
      if (loc && loc.index > 0) {
        const prev = PAGE_FLOW[loc.index - 1];
        this.killLenisVelocity();
        this.lenis.start();
        this.snapTo(prev.id, 0.8);
      }
      return;
    }

    if (type === "snap") {
      this.navigateFlow(direction);
      return;
    }

    if (type === "free") {
      const loc = locateCurrentEntry(window.scrollY);
      if (!loc) return;

      if (direction === "down" && isAtFreeZoneBottom(loc.entry.id)) {
        const nextIdx = loc.index + 1;
        const next = nextIdx < PAGE_FLOW.length ? PAGE_FLOW[nextIdx] : null;
        if (
          next &&
          (getEffectiveType(next) === "pass" ||
            getEffectiveType(next) === "free")
        )
          return;
        this.navigateFlow(direction);
        return;
      }
      if (direction === "up" && isAtFreeZoneTop(loc.entry.id)) {
        const prevIdx = loc.index - 1;
        const prev = prevIdx >= 0 ? PAGE_FLOW[prevIdx] : null;
        if (
          prev &&
          (getEffectiveType(prev) === "pass" ||
            getEffectiveType(prev) === "free")
        )
          return;
        this.navigateFlow(direction);
        return;
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.isSnapping || this.suspended) return;
    if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key))
      return;

    const type = this.getCurrentSectionType();
    if (type === "pass") return;

    const direction: "down" | "up" =
      e.key === "ArrowDown" || e.key === "PageDown" || e.key === " "
        ? "down"
        : "up";

    if (type === "snap") {
      e.preventDefault();
      this.killLenisVelocity();
      this.navigateFlow(direction);
      return;
    }

    if (type === "free") {
      const loc = locateCurrentEntry(window.scrollY);
      if (!loc) return;

      if (direction === "down" && isAtFreeZoneBottom(loc.entry.id)) {
        e.preventDefault();
        this.navigateFlow(direction);
        return;
      }
      if (direction === "up" && isAtFreeZoneTop(loc.entry.id)) {
        e.preventDefault();
        this.navigateFlow(direction);
        return;
      }
    }
  }
}
