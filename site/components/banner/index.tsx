import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Avatar, Bar, BrandMark, Collapse, Field, Icon, Stage, States, Stream, Text, Window, type Act } from "../kit";
import "./grid.css";

// Student OS feature banner (references/bento.md). Three tiles: a 2 × 2 lead
// and two supporting tiles stacked beside it.
//
//   Tile     Span   Kind        The one thing                      Moves
//   /today   2 × 2  Hero UI     the morning brief in its window    /today sent, the brief streams in
//   /study   1 × 1  Component   one quiz question, answered        the right option ticks
//   /apply   1 × 1  Object      a resume, one line matched         the matched line highlights
//
// One window in the grid (the lead's). Neighbors differ in kind and ground:
// the apply tile is the one teal tile. Each picture is its own Stage at 1:1,
// pinned to the tile's bottom and cropped by it; copy is page text.

const STEP = 110;
const LEAD = 450;

function usePictureWidth(fallback = 340) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);
  const [measured, setMeasured] = useState(false);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      setWidth(Math.max(1, node.getBoundingClientRect().width));
      setMeasured(true);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width, measured] as const;
}

function Tile({ area, title, children, picture, tone }: { area: string; title: ReactNode; children?: ReactNode; picture?: ReactNode; tone?: "teal" }) {
  return (
    <section className={`so-tile so-tile--${area}`} data-tone={tone} data-crop>
      <p className="so-copy">
        {title} {children}
      </p>
      {picture}
    </section>
  );
}

/* ---------------- /today (lead) ---------------- */

const Q = "/today";
// Real /today output for the demo test profile (see site/demo/README.md)
const LINES = [
  { when: "6am", text: "Courier shift until 10. Lecture at 1pm, leave by 12:15." },
  { when: "Fri", text: "QUANT201 Quiz 3. A 25-min ANOVA drill tonight covers it." },
  { when: "Habits", text: "Core 3/4 yesterday. Missed 10 pages: read them at lunch." },
];
// The phone column is a redesign, not a squeeze: two items, each one line
const LINES_COMPACT = [
  { when: "6am", text: "Shift until 10, lecture 1pm." },
  { when: "Fri", text: "Quiz 3. 25-min drill tonight." },
];
const COUNTS = LINES.map((l) => l.text.split(" ").length);

type Brief = { draft: string; pressed: boolean; sent: boolean; phase: "idle" | "thinking" | "answer"; words: number[]; sources: boolean };
const briefStart: Brief = { draft: "", pressed: false, sent: false, phase: "idle", words: [0, 0, 0], sources: false };
const briefEnd: Brief = { draft: "", pressed: false, sent: true, phase: "answer", words: COUNTS, sources: true };

async function briefScript(a: Act<Brief>) {
  await a.wait(LEAD + 250);
  a.mark("type");
  await a.type("draft", Q, { interval: 90 });
  await a.wait(450);
  a.mark("send");
  // The send button takes the press; the message leaves as it releases
  a.put({ pressed: true });
  await a.wait(140);
  a.put({ pressed: false, sent: true, draft: "" });
  await a.wait(450);
  a.put({ phase: "thinking" });
  await a.wait(1200);
  a.mark("stream");
  const words = [1, 0, 0];
  a.put({ phase: "answer", words: [...words] });
  for (let line = 0; line < LINES.length; line++) {
    for (let i = line === 0 ? 2 : 1; i <= COUNTS[line]; i++) {
      words[line] = i;
      a.put({ words: [...words] });
      await a.wait(55);
    }
    await a.wait(260);
  }
  a.mark("sources");
  a.put({ sources: true });
  await a.wait(3000);
}

function Today() {
  const [picture, width, measured] = usePictureWidth(640);
  const compact = width < 520;
  const height = compact ? 344 : 500;
  const lines = compact ? LINES_COMPACT : LINES;
  return (
    <Tile
      area="today"
      title={<b>Your day, briefed by 6am.</b>}
      picture={
        <div ref={picture} className="so-picture so-picture--full">
          {measured && <Stage<Brief> width={width} height={height} initial={briefStart} poster={briefEnd} script={briefScript} play="once" className="so-stage">
            {(s) => (
              <Window title="Student OS" className="so-win" toolbar={<Avatar name="Jordan Lee" size={22} />}>
                <div className="so-body">
                  <div className="so-thread">
                    {/* Yesterday's exchange, as placeholder; the thread's top edge
                        fades it out rather than slicing it as the thread rises */}
                    <div className="so-past" aria-hidden>
                      <Bar w="64%" h={8} r={4} tone={2} />
                      <Bar w="80%" h={8} r={4} tone={2} />
                      <Bar w={92} h={30} r={15} tone={1} className="so-past-q" />
                      <Bar w="90%" h={8} r={4} tone={2} />
                      <Bar w="74%" h={8} r={4} tone={2} />
                      <Bar w="86%" h={8} r={4} tone={2} />
                      <Bar w="52%" h={8} r={4} tone={2} />
                    </div>
                    <Collapse open={s.sent} reveal="drop" from="below">
                      <div className="so-q">
                        <Text className="so-cmd">{Q}</Text>
                      </div>
                    </Collapse>
                    <Collapse open={s.phase === "thinking"}>
                      <Text className="so-thinking">Reading calendar and habits</Text>
                    </Collapse>
                    <Collapse open={s.phase === "answer"}>
                      <div className="so-a">
                        <Text className="so-date">Tuesday 3 Nov</Text>
                        <ul className="so-list">
                          {lines.map((l, i) => (
                            <li key={l.when} className="so-item" data-on={s.words[i] > 0 || undefined}>
                              <span className="so-when">{l.when}</span>
                              <Stream className="so-stream" text={l.text} count={s.words[i]} />
                            </li>
                          ))}
                        </ul>
                        <div className="so-sources" data-on={s.sources || undefined}>
                          <span className="so-source">
                            <BrandMark brand="google-calendar" tile={false} size={13} />
                            Google Calendar
                          </span>
                          <span className="so-source">
                            <BrandMark brand="notion" tile={false} size={13} />
                            Habits
                          </span>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                  <Field
                    className="so-composer"
                    value={s.draft}
                    placeholder="Type / for a command"
                    focused={!s.sent}
                    trailing={
                      <span className="so-send" data-ready={s.draft ? true : undefined} data-pressed={s.pressed || undefined} aria-hidden>
                        <Icon name="arrow" size={14} stroke={2} />
                      </span>
                    }
                  />
                </div>
              </Window>
            )}
          </Stage>}
        </div>
      }
    >
      Shifts, lectures and deadlines, read from your calendar and Notion.
    </Tile>
  );
}

/* ---------------- /study (component) ---------------- */

type Beat = { on: boolean };
const before: Beat = { on: false };
const after: Beat = { on: true };
// The lead tile tells its story first; the supporting tiles answer after its
// sources land (about 6.3s), study then apply, in reading order
const AFTER_LEAD = 6600;
const beat = (i: number) => async (a: Act<Beat>) => {
  await a.wait(AFTER_LEAD + i * STEP * 4);
  await a.set({ on: true });
};

const OPTIONS = ["t-test", "ANOVA", "Chi-square", "Regression"];

function Study() {
  const [picture, width, measured] = usePictureWidth();
  return (
    <Tile
      area="study"
      title={<b>Drills, not rereading.</b>}
      picture={
        <div ref={picture} className="so-picture so-picture--full">
          {measured && <Stage<Beat> width={width} height={196} initial={before} poster={after} play="once" script={beat(0)} className="so-stage">
            {(s) => (
              <div className="so-quiz">
                <div className="so-quiz-top">
                  <div className="so-quiz-head">
                    <span>Question 4 of 10</span>
                    <span className="so-quiz-time">
                      <Icon name="clock" size={12} />
                      12:40
                    </span>
                  </div>
                  <div className="so-quiz-q">Which test compares the means of three or more groups?</div>
                </div>
                <div className="so-options">
                  {OPTIONS.map((o) => {
                    const right = o === "ANOVA";
                    return (
                      <div key={o} className="so-option" data-right={(right && s.on) || undefined}>
                        <span className="so-option-label">{o}</span>
                        {right && (
                          <States
                            value={s.on ? "done" : "wait"}
                            align="end"
                            className="so-option-mark"
                            states={{ wait: <span className="so-radio" />, done: <Icon name="check" size={16} /> }}
                          />
                        )}
                        {!right && <span className="so-radio" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Stage>}
        </div>
      }
    >
      Timed recall from your own notes.
    </Tile>
  );
}

/* ---------------- /apply (object) ---------------- */

function Apply() {
  return (
    <Tile
      area="apply"
      tone="teal"
      title={<b>Fits the ad, every time.</b>}
      picture={
        <div className="so-picture so-picture--small">
          <Stage<Beat> width={360} height={196} initial={before} poster={after} play="once" script={beat(1)} className="so-stage">
            {(s) => (
              <div className="so-paper-wrap">
                <div className="so-paper">
                  <span className="so-paper-name">Jordan Lee</span>
                  <span className="so-paper-sub">Data analyst intern application</span>
                  <span className="so-paper-rule" />
                  <span className="so-paper-label">Experience</span>
                  <Bar w="92%" h={5} r={3} tone={2} />
                  <span className="so-match" data-on={s.on || undefined}>
                    <span>Automated weekly reporting in SQL and Power BI, saving 2 hours a week</span>
                  </span>
                  <Bar w="80%" h={5} r={3} tone={2} />
                  <Bar w="88%" h={5} r={3} tone={2} />
                </div>
                <span className="so-chip" data-on={s.on || undefined}>
                  <Icon name="check" size={13} /> SQL, Power BI matched
                </span>
              </div>
            )}
          </Stage>
        </div>
      }
    >
      Resume and cover letter, tailored per role.
    </Tile>
  );
}

export default function StudentOsGrid() {
  return (
    <div className="so-grid-wrap">
      <div className="so-grid">
        <Today />
        <Study />
        <Apply />
      </div>
    </div>
  );
}
