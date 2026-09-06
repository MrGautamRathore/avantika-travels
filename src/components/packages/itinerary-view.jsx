"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sun,
  Sunset,
  Moon,
  Utensils,
  Hotel,
  Car,
  Info,
  Check,
  ChevronDown,
  Sparkles,
  Layers,
  Compass,
} from "lucide-react";

/**
 * FormattedInline handles inline markup:
 * - **bold text** or __bold text__
 * - *italic text* or _italic text_
 * - ==highlight text==
 * - [badge: text]
 * - Time tags: @08:30 AM or [time: 08:30 AM] or [08:30 AM]
 */
export function FormattedInline({ text }) {
  if (!text) return null;

  // Tokenize string by matching inline tokens
  const tokenRegex =
    /(\*\*[^*]+\*\*|__[^_]+__|==[^=]+==|\[badge:[^\]]+\]|@\s*\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?(?:[\s–—-]+\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)?|\[(?:time:\s*)?\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?(?:[\s–—-]+\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)?\]|\*[^*]+\*|_[^_]+_)/g;

  const parts = text.split(tokenRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        // Bold (**text** or __text__)
        if (
          (part.startsWith("**") && part.endsWith("**")) ||
          (part.startsWith("__") && part.endsWith("__"))
        ) {
          return (
            <strong key={`b-${index}`} className="font-bold text-gray-900">
              {part.slice(2, -2)}
            </strong>
          );
        }

        // Highlight (==text==)
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <mark
              key={`h-${index}`}
              className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium border border-amber-200"
            >
              {part.slice(2, -2)}
            </mark>
          );
        }

        // Badge [badge: text]
        if (part.startsWith("[badge:") && part.endsWith("]")) {
          return (
            <span
              key={`badge-${index}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mx-1 align-middle"
            >
              {part.slice(7, -1).trim()}
            </span>
          );
        }

        // Time tag: @ 08:30 AM or [08:30 AM] or [time: 08:30 AM]
        if (
          part.startsWith("@") ||
          (part.startsWith("[") &&
            part.endsWith("]") &&
            /\d{1,2}:\d{2}/.test(part))
        ) {
          let timeVal = part;
          if (part.startsWith("@")) {
            timeVal = part.replace(/^@\s*/, "").trim();
          } else {
            timeVal = part.slice(1, -1).replace(/^time:\s*/i, "").trim();
          }
          return (
            <span
              key={`t-${index}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/80 mr-1.5 align-baseline shadow-xs"
            >
              <Clock className="w-3 h-3 text-sky-600 shrink-0" />
              {timeVal}
            </span>
          );
        }

        // Italic (*text* or _text_)
        if (
          (part.startsWith("*") && part.endsWith("*")) ||
          (part.startsWith("_") && part.endsWith("_"))
        ) {
          return (
            <em key={`i-${index}`} className="italic text-gray-800">
              {part.slice(1, -1)}
            </em>
          );
        }

        return <span key={`s-${index}`}>{part}</span>;
      })}
    </>
  );
}

/**
 * Detect Section Icon based on subheader title keywords
 */
function detectSectionIcon(title = "") {
  const lower = title.toLowerCase();
  if (
    lower.includes("morning") ||
    lower.includes("sunrise") ||
    lower.includes("bhasma") ||
    lower.includes("☀️")
  )
    return "morning";
  if (
    lower.includes("afternoon") ||
    lower.includes("noon") ||
    lower.includes("lunch") ||
    lower.includes("🌇")
  )
    return "afternoon";
  if (
    lower.includes("evening") ||
    lower.includes("night") ||
    lower.includes("aarti") ||
    lower.includes("🌙")
  )
    return "evening";
  if (
    lower.includes("pickup") ||
    lower.includes("drop") ||
    lower.includes("drive") ||
    lower.includes("transfer") ||
    lower.includes("cab") ||
    lower.includes("🚗")
  )
    return "travel";
  if (
    lower.includes("food") ||
    lower.includes("breakfast") ||
    lower.includes("dinner") ||
    lower.includes("meal") ||
    lower.includes("🍽️")
  )
    return "food";
  if (
    lower.includes("stay") ||
    lower.includes("hotel") ||
    lower.includes("resort") ||
    lower.includes("check-in") ||
    lower.includes("🏨")
  )
    return "hotel";
  return "default";
}

function renderSectionIconBadge(iconType) {
  switch (iconType) {
    case "morning":
      return (
        <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60 shadow-xs">
          <Sun className="w-4 h-4" />
        </span>
      );
    case "afternoon":
      return (
        <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-200/60 shadow-xs">
          <Sunset className="w-4 h-4" />
        </span>
      );
    case "evening":
      return (
        <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/60 shadow-xs">
          <Moon className="w-4 h-4" />
        </span>
      );
    case "travel":
      return (
        <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60 shadow-xs">
          <Car className="w-4 h-4" />
        </span>
      );
    case "food":
      return (
        <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 shadow-xs">
          <Utensils className="w-4 h-4" />
        </span>
      );
    case "hotel":
      return (
        <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-200/60 shadow-xs">
          <Hotel className="w-4 h-4" />
        </span>
      );
    default:
      return (
        <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200/60 shadow-xs">
          <Compass className="w-4 h-4" />
        </span>
      );
  }
}

/**
 * Parses raw text of one day into structured blocks
 */
export function parseItineraryDay(rawText, index) {
  if (!rawText || typeof rawText !== "string") {
    return {
      dayNumber: index + 1,
      dayTitle: `Day ${index + 1}`,
      meta: { customBadges: [] },
      sections: [],
    };
  }

  let text = rawText.trim();

  // If text doesn't have newlines but has double spaces or emoji headers, normalize them
  if (!text.includes("\n")) {
    text = text
      .replace(/\s{2,}(?=[🛕🚗☀️🍽️🌇🌙🏨📍⏱️🎯#\*\-\>])/g, "\n")
      .replace(/(?=[☀️🌇🌙🛕🚗🍽️🏨📍⏱️🎯]\s+[A-Za-z])/g, "\n");
  }

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let dayTitle = "";
  const meta = {
    stay: "",
    meals: "",
    transfer: "",
    duration: "",
    pickup: "",
    drop: "",
    customBadges: [],
  };

  const sections = [];
  let currentSection = {
    title: "",
    icon: "default",
    items: [],
  };

  const finalizeSection = () => {
    if (currentSection.title || currentSection.items.length > 0) {
      sections.push({ ...currentSection });
      currentSection = {
        title: "",
        icon: "default",
        items: [],
      };
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Stay Badge
    const stayMatch = line.match(
      /^(?:\[stay:\s*(.*?)\]|(?:🏨\s*Stay:\s*(.*))|(?:Stay:\s*(.*)))/i
    );
    if (stayMatch) {
      meta.stay = (stayMatch[1] || stayMatch[2] || stayMatch[3]).trim();
      continue;
    }

    // Meals Badge
    const mealsMatch = line.match(
      /^(?:\[meals:\s*(.*?)\]|(?:🍽️\s*Meals:\s*(.*))|(?:Meals:\s*(.*)))/i
    );
    if (mealsMatch) {
      meta.meals = (mealsMatch[1] || mealsMatch[2] || mealsMatch[3]).trim();
      continue;
    }

    // Transfer Badge
    const transferMatch = line.match(
      /^(?:\[transfer:\s*(.*?)\]|(?:🚗\s*(?:Transfer|Transport|Cab):\s*(.*))|(?:(?:Transfer|Transport|Cab):\s*(.*)))/i
    );
    if (transferMatch) {
      meta.transfer = (
        transferMatch[1] ||
        transferMatch[2] ||
        transferMatch[3]
      ).trim();
      continue;
    }

    // Pickup Badge
    const pickupMatch = line.match(
      /^(?:\[pickup:\s*(.*?)\]|(?:🚗\s*Pickup:\s*(.*))|(?:Pickup(?:\s*Point)?:\s*(.*)))/i
    );
    if (pickupMatch) {
      meta.pickup = (
        pickupMatch[1] ||
        pickupMatch[2] ||
        pickupMatch[3]
      ).trim();
      continue;
    }

    // Drop Badge
    const dropMatch = line.match(
      /^(?:\[drop:\s*(.*?)\]|(?:🚗\s*Drop:\s*(.*))|(?:Drop(?:\s*Point)?:\s*(.*)))/i
    );
    if (dropMatch) {
      meta.drop = (dropMatch[1] || dropMatch[2] || dropMatch[3]).trim();
      continue;
    }

    // Duration Badge
    const durationMatch = line.match(
      /^(?:\[duration:\s*(.*?)\]|(?:⏱️\s*Duration:\s*(.*))|(?:Duration:\s*(.*)))/i
    );
    if (durationMatch) {
      meta.duration = (
        durationMatch[1] ||
        durationMatch[2] ||
        durationMatch[3]
      ).trim();
      continue;
    }

    // Custom Badge [badge: ...]
    const badgeMatch = line.match(/^\[badge:\s*(.*?)\]/i);
    if (badgeMatch) {
      meta.customBadges.push(badgeMatch[1].trim());
      continue;
    }

    // Day Title: # Title (if not yet found)
    if (line.startsWith("# ") && !dayTitle) {
      dayTitle = line.replace(/^#\s+/, "").trim();
      continue;
    }

    // Subheading: ## Heading or ### Heading
    const subheaderMatch = line.match(/^#{2,3}\s+(.*)/);
    if (subheaderMatch) {
      finalizeSection();
      const rawTitle = subheaderMatch[1].trim();
      currentSection.title = rawTitle;
      currentSection.icon = detectSectionIcon(rawTitle);
      continue;
    }

    // Emoji-based subheaders: e.g. "☀️ Morning Darshan (8:30 AM – 12:30 PM)"
    const emojiHeaderMatch = line.match(
      /^([☀️🌇🌙🛕🚗🍽️🏨⏱️📍🎯])\s*([A-Za-z].*)/
    );
    if (
      emojiHeaderMatch &&
      !line.startsWith("-") &&
      !line.startsWith("*") &&
      line.length < 90
    ) {
      finalizeSection();
      currentSection.title = line;
      currentSection.icon = detectSectionIcon(line);
      continue;
    }

    // Dividers: ---
    if (/^---{2,}$/.test(line)) {
      currentSection.items.push({ type: "divider", content: "" });
      continue;
    }

    // Tips / Alerts / Notes: > Note: or ! Note: or > Tip:
    if (
      line.startsWith(">") ||
      line.startsWith("! ") ||
      /^Tip:/i.test(line) ||
      /^Note:/i.test(line) ||
      /^Important:/i.test(line)
    ) {
      const cleanTip = line
        .replace(/^[>!]\s*/, "")
        .replace(/^(?:Tip|Note|Important):\s*/i, "")
        .trim();
      currentSection.items.push({
        type: "tip",
        content: cleanTip,
      });
      continue;
    }

    // Bullet points: - item, * item, • item
    const bulletMatch = line.match(/^[-*•]\s+(.*)/);
    if (bulletMatch) {
      currentSection.items.push({
        type: "bullet",
        content: bulletMatch[1].trim(),
      });
      continue;
    }

    // Highlight / Check items: + item or ✓ item
    const highlightMatch = line.match(/^[+✓]\s+(.*)/);
    if (highlightMatch) {
      currentSection.items.push({
        type: "highlight",
        content: highlightMatch[1].trim(),
      });
      continue;
    }

    // Numbered items: 1. item, 2. item
    const stepMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (stepMatch) {
      currentSection.items.push({
        type: "step",
        stepNumber: parseInt(stepMatch[1], 10),
        content: stepMatch[2].trim(),
      });
      continue;
    }

    // Sub-labels ending in colon: e.g. "Places visited:" or "Suggested Lunch:"
    if (line.endsWith(":") && line.length < 40) {
      currentSection.items.push({
        type: "label",
        content: line,
      });
      continue;
    }

    // Regular paragraph
    currentSection.items.push({
      type: "paragraph",
      content: line,
    });
  }

  finalizeSection();

  // If no dayTitle found from # Heading, check if first line was a title or fallback to "Day X"
  if (!dayTitle) {
    if (
      sections.length > 0 &&
      sections[0].items.length > 0 &&
      sections[0].items[0].type === "paragraph" &&
      sections[0].items[0].content.length < 60 &&
      /^(?:Day\s*\d+|[🛕📍])/i.test(sections[0].items[0].content)
    ) {
      dayTitle = sections[0].items[0].content;
      sections[0].items.shift();
    } else {
      dayTitle = `Day ${index + 1}`;
    }
  }

  // Clean title from redundant "Day X:" prefix if we already display the Day pill
  const cleanTitle = dayTitle.replace(/^Day\s*\d+[\s:–—-]+/i, "").trim();

  return {
    dayNumber: index + 1,
    dayTitle: cleanTitle || dayTitle,
    rawDayTitle: dayTitle,
    meta,
    sections,
  };
}

/**
 * Normalizes an itinerary array.
 * If user stored multiple days in a single string (e.g. "Day 1: ...,Day 2: ..."),
 * this smartly splits them into separate day elements!
 */
export function normalizeItineraryList(rawItinerary) {
  if (!Array.isArray(rawItinerary) || rawItinerary.length === 0) return [];

  // Check if it's a single string that holds multiple days
  if (rawItinerary.length === 1 && typeof rawItinerary[0] === "string") {
    const single = rawItinerary[0];

    // Check for comma separated "Day 1: ...,Day 2: ..."
    if (/(?:^|\s|,)(?:Day\s*\d+[:\s])/i.test(single)) {
      const splitDays = single
        .split(/(?:,\s*(?=Day\s*\d+[:\s])|\n(?=Day\s*\d+[:\s]))/i)
        .map((d) => d.trim())
        .filter(Boolean);

      if (splitDays.length > 1) {
        return splitDays;
      }
    }

    // Check for markdown headers "# Day 1", "# Day 2"
    if (/(?:^|\n)#\s+Day\s*\d+/i.test(single)) {
      const splitDays = single
        .split(/(?=\n#\s+Day\s*\d+)/i)
        .map((d) => d.trim())
        .filter(Boolean);

      if (splitDays.length > 1) {
        return splitDays;
      }
    }
  }

  return rawItinerary;
}

export default function ItineraryView({ itinerary = [] }) {
  const normalizedList = useMemo(
    () => normalizeItineraryList(itinerary),
    [itinerary]
  );

  const parsedDays = useMemo(() => {
    return normalizedList.map((dayText, index) =>
      parseItineraryDay(dayText, index)
    );
  }, [normalizedList]);

  // Initially open all days
  const [openDays, setOpenDays] = useState(() => {
    return new Set(parsedDays.map((_, i) => i));
  });

  const toggleDay = (index) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenDays(new Set(parsedDays.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenDays(new Set());
  };

  if (parsedDays.length === 0) {
    return null;
  }

  const allOpen = openDays.size === parsedDays.length;

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Tour Schedule</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Day-wise Detailed Itinerary
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {parsedDays.length} {parsedDays.length === 1 ? "Day" : "Days"}{" "}
            thoughtfully planned for a seamless pilgrimage & sightseeing
            journey.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            type="button"
            onClick={allOpen ? collapseAll : expandAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            {allOpen ? "Collapse All" : "Expand All"}
          </button>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 sm:pl-10 space-y-6">
        {/* Continuous Connecting Line */}
        <div className="absolute top-5 bottom-8 left-[19px] sm:left-[27px] w-0.5 bg-gradient-to-b from-primary via-primary/40 to-gray-200" />

        {parsedDays.map((day, index) => {
          const isOpen = openDays.has(index);

          return (
            <motion.div
              key={`day-card-${day.dayNumber}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              {/* Timeline Day Pill / Node */}
              <div className="absolute -left-[24px] sm:-left-[32px] top-4 z-10">
                <button
                  type="button"
                  onClick={() => toggleDay(index)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary to-rose-600 text-white font-bold text-xs sm:text-sm flex flex-col items-center justify-center shadow-md shadow-primary/20 hover:scale-105 transition-transform cursor-pointer"
                  title={`Toggle Day ${day.dayNumber}`}
                >
                  <span className="text-[9px] uppercase tracking-wider opacity-85 font-medium leading-none mb-0.5">
                    Day
                  </span>
                  <span className="leading-none text-sm sm:text-base font-extrabold">
                    {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
                  </span>
                </button>
              </div>

              {/* Day Card */}
              <div className="ml-4 sm:ml-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden">
                {/* Card Header */}
                <div
                  onClick={() => toggleDay(index)}
                  className="p-5 sm:p-6 bg-gradient-to-r from-gray-50/70 via-white to-gray-50/40 border-b border-gray-100 flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        Day {day.dayNumber}
                      </span>
                      {day.meta.duration && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60">
                          <Clock className="w-3 h-3 text-amber-600" />
                          {day.meta.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      <FormattedInline text={day.dayTitle} />
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary/10 group-hover:text-primary text-gray-500 flex items-center justify-center transition-colors">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>
                </div>

                {/* Card Body Accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 sm:p-7 space-y-6">
                        {/* Sections within the Day */}
                        {day.sections.map((section, sIdx) => (
                          <div key={`sec-${day.dayNumber}-${sIdx}`} className="space-y-3">
                            {/* Section Header / Subheading */}
                            {section.title && (
                              <div className="flex items-center gap-2.5 pt-1 pb-1 border-b border-gray-100">
                                {renderSectionIconBadge(section.icon)}
                                <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                                  <FormattedInline text={section.title} />
                                </h4>
                              </div>
                            )}

                            {/* Section Items */}
                            <div className="space-y-2.5 pl-1">
                              {section.items.map((item, itIdx) => {
                                const itemKey = `it-${day.dayNumber}-${sIdx}-${itIdx}`;

                                if (item.type === "bullet") {
                                  return (
                                    <div
                                      key={itemKey}
                                      className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed"
                                    >
                                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                      </span>
                                      <div className="flex-1">
                                        <FormattedInline text={item.content} />
                                      </div>
                                    </div>
                                  );
                                }

                                if (item.type === "highlight") {
                                  return (
                                    <div
                                      key={itemKey}
                                      className="flex items-start gap-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/70 text-emerald-950 text-sm sm:text-base"
                                    >
                                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      </span>
                                      <div className="flex-1 font-medium">
                                        <FormattedInline text={item.content} />
                                      </div>
                                    </div>
                                  );
                                }

                                if (item.type === "step") {
                                  return (
                                    <div
                                      key={itemKey}
                                      className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed"
                                    >
                                      <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-gray-200">
                                        {item.stepNumber < 10
                                          ? `0${item.stepNumber}`
                                          : item.stepNumber}
                                      </span>
                                      <div className="flex-1">
                                        <FormattedInline text={item.content} />
                                      </div>
                                    </div>
                                  );
                                }

                                if (item.type === "tip") {
                                  return (
                                    <div
                                      key={itemKey}
                                      className="my-2 p-4 bg-gradient-to-r from-amber-50/90 to-orange-50/50 border border-amber-200/90 rounded-xl flex items-start gap-3 text-amber-950 text-sm leading-relaxed"
                                    >
                                      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                      <div className="flex-1">
                                        <span className="font-bold text-amber-900 mr-1.5 uppercase tracking-wide text-xs">
                                          Important Tip:
                                        </span>
                                        <FormattedInline text={item.content} />
                                      </div>
                                    </div>
                                  );
                                }

                                if (item.type === "label") {
                                  return (
                                    <p
                                      key={itemKey}
                                      className="font-bold text-gray-800 text-sm sm:text-base pt-1"
                                    >
                                      <FormattedInline text={item.content} />
                                    </p>
                                  );
                                }

                                if (item.type === "divider") {
                                  return (
                                    <hr
                                      key={itemKey}
                                      className="my-3 border-gray-100"
                                    />
                                  );
                                }

                                return (
                                  <p
                                    key={itemKey}
                                    className="text-gray-700 text-sm sm:text-base leading-relaxed"
                                  >
                                    <FormattedInline text={item.content} />
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        {/* Day Essentials / Badges Footer */}
                        {(day.meta.stay ||
                          day.meta.meals ||
                          day.meta.transfer ||
                          day.meta.pickup ||
                          day.meta.drop ||
                          (day.meta.customBadges &&
                            day.meta.customBadges.length > 0)) && (
                          <div className="mt-6 pt-5 border-t border-gray-100">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                              Day Essentials
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                              {day.meta.stay && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-100 text-xs sm:text-sm">
                                  <Hotel className="w-4 h-4 text-purple-600 shrink-0" />
                                  <span>
                                    <strong className="font-semibold text-purple-950">
                                      Stay:
                                    </strong>{" "}
                                    {day.meta.stay}
                                  </span>
                                </div>
                              )}

                              {day.meta.meals && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100 text-xs sm:text-sm">
                                  <Utensils className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>
                                    <strong className="font-semibold text-emerald-950">
                                      Meals:
                                    </strong>{" "}
                                    {day.meta.meals}
                                  </span>
                                </div>
                              )}

                              {day.meta.transfer && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 text-xs sm:text-sm">
                                  <Car className="w-4 h-4 text-blue-600 shrink-0" />
                                  <span>
                                    <strong className="font-semibold text-blue-950">
                                      Transfer:
                                    </strong>{" "}
                                    {day.meta.transfer}
                                  </span>
                                </div>
                              )}

                              {day.meta.pickup && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 text-xs sm:text-sm">
                                  <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
                                  <span>
                                    <strong className="font-semibold text-slate-950">
                                      Pickup:
                                    </strong>{" "}
                                    {day.meta.pickup}
                                  </span>
                                </div>
                              )}

                              {day.meta.drop && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 text-xs sm:text-sm">
                                  <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
                                  <span>
                                    <strong className="font-semibold text-slate-950">
                                      Drop:
                                    </strong>{" "}
                                    {day.meta.drop}
                                  </span>
                                </div>
                              )}

                              {day.meta.customBadges?.map((badge, bIdx) => (
                                <div
                                  key={`cbadge-${day.dayNumber}-${bIdx}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-900 border border-rose-100 text-xs sm:text-sm"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                  <span>{badge}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
