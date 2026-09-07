/**
 * 말랑말랑 자취비서 (Mallang Mallang Jachwi Assistant)
 * Interactive Script & Scroll Reveal Observer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. One-time reveal observer for Section 3: Problem Statement
  // Prevents flickering & re-hiding when scrolling into Section 4 (User Voice)
  const problemElements = document.querySelectorAll('.reveal-problem-panel');

  const problemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Unobserve permanently once revealed
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.1
  });

  problemElements.forEach((el) => {
    problemObserver.observe(el);
  });

  // 2. Re-triggerable observer for other sections
  const otherRevealElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-user-voice-header, .reveal-user-voice-left, .reveal-user-voice-right, .reveal-goal-header, .reveal-goal-row, .reveal-concept-header, .reveal-concept-stage, .reveal-concept-text, .reveal-concept-bottom'
  );

  const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        // Re-enable reveal animation when scrolling out of viewport and returning
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  });

  otherRevealElements.forEach((el) => {
    generalObserver.observe(el);
  });

  // =========================================================================
  // GSAP & ScrollTrigger Scrubbed Timelines for Sections 7 & 8
  // =========================================================================
  function initGSAPScrubbing() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // -----------------------------------------------------------------------
    // Section 7: Feature 01 / Budget Planning
    // Sequence: 1. Start Circle & Line Draw -> 2. Arrowhead -> 3. Home Budget Screen -> 4. Copy Text
    // -----------------------------------------------------------------------
    const bgCornerPath = document.querySelector('.feature-budget-arrow-path');
    if (bgCornerPath) {
      const cornerLen = Math.ceil(bgCornerPath.getTotalLength());
      const bgCircles = document.querySelectorAll('.feature-budget-arrow-svg circle');

      gsap.set(bgCircles, { opacity: 0 });
      gsap.set(bgCornerPath, { strokeDasharray: cornerLen, strokeDashoffset: cornerLen });
      gsap.set('.feature-budget-arrow-head', { opacity: 0 });
      gsap.set('.feature-budget-home-inner', { opacity: 0, y: 20 });
      gsap.set('.feature-budget-copy-inner', { opacity: 0, y: 20 });

      const bgTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.feature-budget-stage',
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });

      bgTl.to(bgCircles, { opacity: 1, duration: 0.05, ease: 'none' }, 0)
          .to(bgCornerPath, { strokeDashoffset: 0, duration: 0.35, ease: 'none' }, 0)
          .to('.feature-budget-arrow-head', { opacity: 1, duration: 0.05, ease: 'none' }, '+=0.02')
          .to('.feature-budget-home-inner', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05')
          .to('.feature-budget-copy-inner', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05');
    }

    // -----------------------------------------------------------------------
    // Section 8 Flow 1: Left Record -> Right Daily Log Screen
    // Sequence: 1. Start Circle & 1st Line Draw -> 2. Arrowhead -> 3. Daily Log Screen -> 4. Middle Text
    // -----------------------------------------------------------------------
    const arrow1Path = document.querySelector('.feature-record-arrow1-path');
    if (arrow1Path) {
      const arr1Len = Math.ceil(arrow1Path.getTotalLength());
      const arr1Circles = document.querySelectorAll('.feature-record-arrow1-svg circle');

      gsap.set(arr1Circles, { opacity: 0 });
      gsap.set(arrow1Path, { strokeDasharray: arr1Len, strokeDashoffset: arr1Len });
      gsap.set('.feature-record-arrow1-head', { opacity: 0 });
      gsap.set('.feature-record-daily-wrap', { opacity: 0, y: 20 });
      gsap.set('.feature-record-mid-text-wrap', { opacity: 0, y: 20 });

      const recTl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.feature-record-arrow1-wrap',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });

      recTl1.to(arr1Circles, { opacity: 1, duration: 0.05, ease: 'none' }, 0)
            .to(arrow1Path, { strokeDashoffset: 0, duration: 0.35, ease: 'none' }, 0)
            .to('.feature-record-arrow1-head', { opacity: 1, duration: 0.05, ease: 'none' }, '+=0.02')
            .to('.feature-record-daily-wrap', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05')
            .to('.feature-record-mid-text-wrap', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05');
    }

    // -----------------------------------------------------------------------
    // Section 8 Flow 2: Daily Log -> Right Bottom Monthly Stats Screen
    // Sequence: 1. Start Circle & 2nd Line Draw -> 2. Arrowhead -> 3. Monthly Stats Screen -> 4. Bottom Text
    // -----------------------------------------------------------------------
    const arrow2Path = document.querySelector('.feature-record-arrow2-path');
    if (arrow2Path) {
      const arr2Len = Math.ceil(arrow2Path.getTotalLength());
      const arr2Circles = document.querySelectorAll('.feature-record-arrow2-svg circle');

      gsap.set(arr2Circles, { opacity: 0 });
      gsap.set(arrow2Path, { strokeDasharray: arr2Len, strokeDashoffset: arr2Len });
      gsap.set('.feature-record-arrow2-head', { opacity: 0 });
      gsap.set('.feature-record-stats-wrap', { opacity: 0, y: 20 });
      gsap.set('.feature-record-bottom-text-wrap', { opacity: 0, y: 20 });

      const recTl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.feature-record-arrow2-wrap',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });

      recTl2.to(arr2Circles, { opacity: 1, duration: 0.05, ease: 'none' }, 0)
            .to(arrow2Path, { strokeDashoffset: 0, duration: 0.35, ease: 'none' }, 0)
            .to('.feature-record-arrow2-head', { opacity: 1, duration: 0.05, ease: 'none' }, '+=0.02')
            .to('.feature-record-stats-wrap', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05')
            .to('.feature-record-bottom-text-wrap', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05');
    }

    // -----------------------------------------------------------------------
    // Section 9: Feature 03 / Emergency Fund Challenge
    // Sequence: 1. Start Circle & Arrow Draw -> 2. Arrowhead -> 3. Edit Screen -> 4. Bottom Copy Text
    // -----------------------------------------------------------------------
    const savArrowPath = document.querySelector('.feature-saving-arrow-path');
    if (savArrowPath) {
      const savLen = Math.ceil(savArrowPath.getTotalLength());
      const savCircles = document.querySelectorAll('.feature-saving-arrow-svg circle');

      gsap.set(savCircles, { opacity: 0 });
      gsap.set(savArrowPath, { strokeDasharray: savLen, strokeDashoffset: savLen });
      gsap.set('.feature-saving-arrow-head', { opacity: 0 });
      gsap.set('.feature-saving-edit-inner', { opacity: 0, y: 20 });
      gsap.set('.feature-saving-copy-inner', { opacity: 0, y: 20 });

      const savTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.feature-saving-stage',
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });

      savTl.to(savCircles, { opacity: 1, duration: 0.05, ease: 'none' }, 0)
           .to(savArrowPath, { strokeDashoffset: 0, duration: 0.35, ease: 'none' }, 0)
           .to('.feature-saving-arrow-head', { opacity: 1, duration: 0.05, ease: 'none' }, '+=0.02')
           .to('.feature-saving-edit-inner', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05')
           .to('.feature-saving-copy-inner', { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '+=0.05');
    }

    // -----------------------------------------------------------------------
    // Section 10: Design Concept / Color
    // Sequence:
    // 0~10%: Section Header
    // 10~70%: 5 Color Cards in sequence (Mongi Green -> Butter Yellow -> Cream Ivory -> Blush Pink -> Tangerine Orange)
    // 70~85%: Bottom Slogan Text (COZY · FRIENDLY · CLEAR)
    // 85~100%: Hold fully visible state
    // -----------------------------------------------------------------------
    const colorSection = document.querySelector('.design-concept-color-section');
    if (colorSection) {
      const colorCards = [
        '.card-mongi-green',
        '.card-butter-yellow',
        '.card-cream-ivory',
        '.card-blush-pink',
        '.card-tangerine-orange'
      ];

      gsap.set('.design-concept-color-header', { opacity: 0, y: 15 });
      gsap.set(colorCards, { opacity: 0, y: 20 });
      gsap.set('.design-concept-color-bottom', { opacity: 0, y: 15 });

      const colorTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.design-concept-color-section',
          start: 'top 85%',
          end: 'center 35%',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });

      // 1. Header fade in (0 -> 0.1)
      colorTl.to('.design-concept-color-header', {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'none'
      }, 0)
      // 2. 5 Color cards sequential stagger fade up (0.1 -> ~0.62)
      .to(colorCards, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        stagger: 0.10,
        ease: 'none'
      }, 0.1)
      // 3. Bottom concept slogan fade up (0.7 -> 0.85)
      .to('.design-concept-color-bottom', {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: 'none'
      }, 0.7)
      // 4. Hold state (0.85 -> 1.0)
      .to({}, { duration: 0.15 }, 0.85);
    }

    // -----------------------------------------------------------------------
    // Section 11: UI Showcase (Sequential Card-by-Card Scroll Trigger)
    // 1. Header Text (top 85% -> top 55%)
    // 2. Rows 1, 2 (top 90% -> bottom 60%) & Row 3 (top 90% -> bottom 70%)
    // -----------------------------------------------------------------------
    const showcaseSection = document.querySelector('.ui-showcase-section');
    if (showcaseSection) {
      // 1. Header animation (Title Badge & 3-Line Korean text)
      const headerEl = showcaseSection.querySelector('.ui-showcase-header');
      if (headerEl) {
        const textLines = headerEl.querySelectorAll('.line-1, .line-2, .line-3');
        const badgeEl = headerEl.querySelector('.ui-showcase-badge');

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });

        if (badgeEl) {
          headerTl.fromTo(badgeEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, ease: 'none' }, 0);
        }
        if (textLines.length > 0) {
          headerTl.fromTo(textLines, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, ease: 'none' }, 0.05);
        }
      }

      // 2. Row-by-Row Card Timelines (Perfectly Timed Card-by-Card Reveal)
      const rows = gsap.utils.toArray('.ui-showcase-row');
      rows.forEach((row) => {
        const cards = row.querySelectorAll('.ui-showcase-card-inner');
        const isRow3 = row.classList.contains('row-3');

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 55,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              end: isRow3 ? 'bottom 70%' : 'bottom 60%',
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          }
        );
      });
    }

    // -----------------------------------------------------------------------
    // Section 12: Ending Receipt (references/12-ending-receipt.png)
    // Timeline Sequence:
    // 0 ~ 0.15: Title Label badge appears (Ending)
    // 0.15 ~ 0.75: Receipt paper prints top to bottom (clipPath inset(0 0 100% 0) -> inset(0 0 0% 0))
    //               while paper wrapper zigs-zags left-to-right (x: -8 to +7, rot: -0.25 to +0.25)
    // 0.75 ~ 0.88: Receipt output completes, x: 0, rot: 0, 100% visible
    // 0.88 ~ 0.95: Copyright text appears below receipt
    // 0.95 ~ 1.00: Hold final state before pin completes
    // -----------------------------------------------------------------------
    const endingSection = document.querySelector('.ending-receipt-section');
    if (endingSection) {
      const endingHeader = endingSection.querySelector('.ending-receipt-header');
      const paperWrap = endingSection.querySelector('.ending-receipt-paper-wrap');
      const copyrightText = endingSection.querySelector('.ending-copyright');

      gsap.set(endingHeader, { opacity: 0, y: 20 });
      gsap.set(paperWrap, { clipPath: 'inset(0% 0% 100% 0%)', x: 0, rotation: 0 });
      gsap.set(copyrightText, { opacity: 0, y: 15 });

      const receiptTl = gsap.timeline({
        scrollTrigger: {
          trigger: endingSection,
          start: 'top top',
          end: '+=1800',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // 1. Ending label appears (0 -> 0.15)
      receiptTl.to(endingHeader, {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: 'none'
      }, 0)

      // 2. Receipt printer top-to-bottom reveal (0.15 -> 0.75)
      .to(paperWrap, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.60,
        ease: 'none'
      }, 0.15)

      // 3. Printer zigzag movement sequence during printing (0.15 -> 0.75)
      .to(paperWrap, { x: -8, rotation: -0.25, duration: 0.10, ease: 'none' }, 0.15)
      .to(paperWrap, { x: 7, rotation: 0.25, duration: 0.10, ease: 'none' }, 0.25)
      .to(paperWrap, { x: -6, rotation: -0.15, duration: 0.10, ease: 'none' }, 0.35)
      .to(paperWrap, { x: 5, rotation: 0.15, duration: 0.10, ease: 'none' }, 0.45)
      .to(paperWrap, { x: -3, rotation: -0.1, duration: 0.10, ease: 'none' }, 0.55)
      .to(paperWrap, { x: 0, rotation: 0, duration: 0.10, ease: 'none' }, 0.65)

      // 4. Copyright text appears (0.88 -> 0.95)
      .to(copyrightText, {
        opacity: 1,
        y: 0,
        duration: 0.07,
        ease: 'none'
      }, 0.88)

      // 5. Hold final state (0.95 -> 1.0)
      .to({}, { duration: 0.05 }, 0.95);
    }
  }

  initGSAPScrubbing();

  // Refresh ScrollTrigger positions after page load and image assets are complete
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });

  // Debounced refresh on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 150);
  });
});


