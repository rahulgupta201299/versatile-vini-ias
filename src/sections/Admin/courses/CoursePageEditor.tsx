"use client";

import Box from "@mui/material/Box";
import { adminRequest } from "@/lib/adminClient";
import { AdminCoursePage, AdminCoursePlan, AdminCourseStage, CourseHeadings } from "@/types";
import { Field, FieldGrid, ListEditor, NumberInput, TextArea, TextInput } from "../allExams/formKit";
import ImageField from "../allExams/ImageField";
import FileField from "../common/FileField";
import IconSelect from "../common/IconSelect";
import { ExpandAllButton, PartCard, useOpenParts, usePart } from "../common/PartAccordion";
import ViewOnlyNotice from "../common/ViewOnlyNotice";
import { useSectionAccess } from "../AdminAccessContext";
import { CtaFields, ctaProblems, FaqsEditor, faqProblems, LINK_HINT, linkProblem, SubHeading, TextListEditor, textProblem } from "./courseFields";

/** Saves one part of a page and returns the saved page. */
const savePart = (id: string, part: string, body: unknown) => adminRequest<AdminCoursePage>(`courses/${id}/${part}`, { method: "PUT", body });

const NO_HEADINGS: CourseHeadings = { whatIs: "", learn: "", whyJoin: "", bestFor: "" };

const START_DATE_HINT = "Shown as “Starting from 29th May 2026”.";

/* ---------- parts used by both layouts ---------- */

function useSharedParts(page: AdminCoursePage) {
  const { _id: id } = page;

  const ctas = usePart(page.ctas, {
    validate: ctaProblems,
    submit: (input) => savePart(id, "ctas", input),
    fromSaved: (saved) => saved.ctas,
  });

  const faqs = usePart(page.faqs, {
    validate: faqProblems,
    submit: (input) => savePart(id, "faqs", { faqs: input }),
    fromSaved: (saved) => saved.faqs,
  });

  return { ctas, faqs };
}

type EditorProps = { page: AdminCoursePage; canEdit: boolean };

/* ---------- guide layout (Beginner's Kit) ---------- */

/** Steps follow the page: a = intro, b = buttons, c = syllabus, d = FAQs, e = guide and “why join” cards. */
const GUIDE_PARTS = ["intro", "ctas", "syllabus", "faqs", "overview", "fit"] as const;

function GuidePageEditor({ page, canEdit }: EditorProps) {
  const { _id: id } = page;
  const { isOpen, toggle, toggleAll, isAllOpen } = useOpenParts([...GUIDE_PARTS]);
  const { ctas, faqs } = useSharedParts(page);

  const intro = usePart(
    { title: page.title, summary: page.summary, priceLabel: page.priceLabel, startDate: page.startDate },
    {
      validate: ({ title, summary, priceLabel, startDate }) => [
        ...textProblem(title, "Add the title."),
        ...textProblem(summary, "Add the description."),
        ...textProblem(priceLabel, "Add the price text, e.g. FREE Course."),
        ...textProblem(startDate, "Choose the start date."),
      ],
      submit: (input) => savePart(id, "intro", input),
      fromSaved: ({ title, summary, priceLabel, startDate }) => ({ title, summary, priceLabel, startDate }),
    },
  );

  const syllabus = usePart(page.syllabus || { title: "", buttonLabel: "", file: "", fileName: "" }, {
    validate: ({ title, buttonLabel }) => [...textProblem(title, "Add the syllabus title."), ...textProblem(buttonLabel, "Add the button text.")],
    submit: (input) => savePart(id, "syllabus", input),
    fromSaved: (saved) => saved.syllabus || { title: "", buttonLabel: "", file: "", fileName: "" },
  });

  const overview = usePart(
    { guide: page.guide || { heading: "", text: "" }, headings: page.headings || NO_HEADINGS, whatIs: page.whatIs || [], learn: page.learn || [] },
    {
      validate: ({ guide, headings, learn }) => [
        ...textProblem(guide.heading, "Add the guide heading."),
        ...textProblem(guide.text, "Add the guide text."),
        ...textProblem(headings.whatIs, "Add the “What is” heading."),
        ...textProblem(headings.learn, "Add the “What will you learn” heading."),
        ...learn.flatMap(({ title }, index) => textProblem(title, `Learn card ${index + 1}: add its title.`)),
      ],
      submit: (input) => savePart(id, "overview", input),
      fromSaved: ({ guide, headings, whatIs, learn }) => ({ guide: guide || { heading: "", text: "" }, headings: headings || NO_HEADINGS, whatIs: whatIs || [], learn: learn || [] }),
    },
  );

  const fit = usePart(
    { headings: page.headings || NO_HEADINGS, whyJoin: page.whyJoin || [], bestFor: page.bestFor || [] },
    {
      validate: ({ headings }) => [...textProblem(headings.whyJoin, "Add the “Why should you join” heading."), ...textProblem(headings.bestFor, "Add the “Best for” heading.")],
      submit: (input) => savePart(id, "fit", input),
      fromSaved: ({ headings, whyJoin, bestFor }) => ({ headings: headings || NO_HEADINGS, whyJoin: whyJoin || [], bestFor: bestFor || [] }),
    },
  );

  const cardProps = (key: (typeof GUIDE_PARTS)[number]) => ({ id: key, isOpen: isOpen(key), onToggle: () => toggle(key), canEdit });

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      <ExpandAllButton isAllOpen={isAllOpen} onClick={toggleAll} />

      <PartCard {...cardProps("intro")} step="a" title="Title, description & date" description="The heading, the text under it, the price line (e.g. FREE Course) and the start date." part={intro}>
        <Field label="Title" required>
          <TextInput value={intro.input.title} onChange={(title) => intro.update({ ...intro.input, title })} />
        </Field>
        <Field label="Description" required>
          <TextArea value={intro.input.summary} onChange={(summary) => intro.update({ ...intro.input, summary })} rows={3} />
        </Field>
        <FieldGrid>
          <Field label="Price text" required hint="Shown in green when the course is free.">
            <TextInput value={intro.input.priceLabel} onChange={(priceLabel) => intro.update({ ...intro.input, priceLabel })} placeholder="FREE Course" />
          </Field>
          <Field label="Start date" required hint={START_DATE_HINT}>
            <TextInput type="date" value={intro.input.startDate} onChange={(startDate) => intro.update({ ...intro.input, startDate })} />
          </Field>
        </FieldGrid>
      </PartCard>

      <PartCard {...cardProps("ctas")} step="b" title="Course Details & Enroll buttons" description="Used in the intro, the Enroll band and the bar at the bottom of the page." part={ctas}>
        <CtaFields value={ctas.input} onChange={ctas.update} />
      </PartCard>

      <PartCard {...cardProps("syllabus")} step="c" title="Syllabus download" description="The “Complete UPSC Topic-Wise Syllabus” strip. Upload an image or a PDF; without a file the strip is hidden." summary={syllabus.input.file ? "File added" : "No file"} part={syllabus}>
        <FieldGrid>
          <Field label="Title" required>
            <TextInput value={syllabus.input.title} onChange={(title) => syllabus.update({ ...syllabus.input, title })} placeholder="Complete UPSC Topic-Wise Syllabus" />
          </Field>
          <Field label="Button text" required>
            <TextInput value={syllabus.input.buttonLabel} onChange={(buttonLabel) => syllabus.update({ ...syllabus.input, buttonLabel })} placeholder="DOWNLOAD HERE" />
          </Field>
        </FieldGrid>
        <FileField label="Syllabus file" hint="Image up to 1 MB or PDF up to 3 MB. It opens in a new tab." value={syllabus.input.file} fileName={syllabus.input.fileName} onChange={(file) => syllabus.update({ ...syllabus.input, ...file })} />
      </PartCard>

      <PartCard {...cardProps("faqs")} step="d" title="FAQs" description="Also added to the page for Google (FAQ rich results)." summary={`${faqs.input.length} FAQs`} part={faqs}>
        <FaqsEditor faqs={faqs.input} onChange={faqs.update} />
      </PartCard>

      <PartCard {...cardProps("overview")} step="e" title="Guide, “What is” & “What will you learn”" description="The guide heading and paragraph, the “What is …?” card and the learn cards, with their headings." part={overview}>
        <Field label="Guide heading" required>
          <TextInput value={overview.input.guide.heading} onChange={(heading) => overview.update({ ...overview.input, guide: { ...overview.input.guide, heading } })} />
        </Field>
        <Field label="Guide text" required>
          <TextArea value={overview.input.guide.text} onChange={(text) => overview.update({ ...overview.input, guide: { ...overview.input.guide, text } })} rows={4} />
        </Field>
        <Field label="“What is” card heading" required>
          <TextInput value={overview.input.headings.whatIs} onChange={(whatIs) => overview.update({ ...overview.input, headings: { ...overview.input.headings, whatIs } })} placeholder="What is The Beginners' Kit for UPSC CSE 2027/28?" />
        </Field>
        <SubHeading>“What is …?” points ({overview.input.whatIs.length})</SubHeading>
        <TextListEditor items={overview.input.whatIs} onChange={(whatIs) => overview.update({ ...overview.input, whatIs })} addLabel="Add point" placeholder="A strategy-based starter course for UPSC beginners." />
        <Field label="“What will you learn” heading" required>
          <TextInput value={overview.input.headings.learn} onChange={(learn) => overview.update({ ...overview.input, headings: { ...overview.input.headings, learn } })} placeholder="What will you learn from The Beginners' Kit…?" />
        </Field>
        <SubHeading>“What will you learn” cards ({overview.input.learn.length})</SubHeading>
        <ListEditor
          items={overview.input.learn}
          onChange={(learn) => overview.update({ ...overview.input, learn })}
          createItem={() => ({ title: "", icon: "BookOpen" })}
          addLabel="Add card"
          emptyText="No cards yet."
          itemLabel={({ title }, index) => title || `Card ${index + 1}`}
          renderItem={(card, updateCard) => (
            <FieldGrid>
              <Field label="Title" required>
                <TextInput value={card.title} onChange={(title) => updateCard({ ...card, title })} placeholder="Revision Strategy" />
              </Field>
              <Field label="Icon">
                <IconSelect value={card.icon} onChange={(icon) => updateCard({ ...card, icon })} />
              </Field>
            </FieldGrid>
          )}
        />
      </PartCard>

      <PartCard {...cardProps("fit")} step="e" title="Why join & who it's for" description="The two cards “Why should you join …?” and “Who is … best for?”: headings and points." part={fit}>
        <Field label="“Why should you join” card heading" required>
          <TextInput value={fit.input.headings.whyJoin} onChange={(whyJoin) => fit.update({ ...fit.input, headings: { ...fit.input.headings, whyJoin } })} placeholder="Why should you join The Beginners' Kit…?" />
        </Field>
        <SubHeading>Why should you join ({fit.input.whyJoin.length})</SubHeading>
        <TextListEditor items={fit.input.whyJoin} onChange={(whyJoin) => fit.update({ ...fit.input, whyJoin })} addLabel="Add point" placeholder="Gives you a realistic and practical study plan." />
        <Field label="“Who is it best for” card heading" required>
          <TextInput value={fit.input.headings.bestFor} onChange={(bestFor) => fit.update({ ...fit.input, headings: { ...fit.input.headings, bestFor } })} placeholder="Who is The Beginners' Kit… best for?" />
        </Field>
        <SubHeading>Who is it best for ({fit.input.bestFor.length})</SubHeading>
        <TextListEditor items={fit.input.bestFor} onChange={(bestFor) => fit.update({ ...fit.input, bestFor })} addLabel="Add point" placeholder="Beginners to UPSC." />
      </PartCard>

    </Box>
  );
}

/* ---------- batch layout (Foundation Batch 2027/29) ---------- */

/** Steps follow the page: a = hero, b = stages, c = plan comparison, d = FAQs. */
const BATCH_PARTS = ["intro", "plans", "ctas", "banner", "stages", "planButtons", "faqs"] as const;

const toPlanPrices = (plans: AdminCoursePlan[]) => plans.map(({ name, price }) => ({ name, price }));
const toPlanButtons = (plans: AdminCoursePlan[]) => plans.map(({ name, buyLabel, buyLink }) => ({ name, buyLabel, buyLink }));
const toTimelines = (stages: AdminCourseStage[]) => stages.map(({ title, from, to }) => ({ title, from, to }));
const NO_STAGES_TITLE = { text: "", highlight: "" };
const NO_PLANS_TITLE = { before: "", highlight: "", after: "", subtitle: "" };

function BatchPageEditor({ page, canEdit }: EditorProps) {
  const { _id: id, batch = { highlight: "", banner: { image: "", alt: "" }, plans: [], stages: [], stagesTitle: NO_STAGES_TITLE, plansTitle: NO_PLANS_TITLE } } = page;
  const { isOpen, toggle, toggleAll, isAllOpen } = useOpenParts([...BATCH_PARTS]);
  const { ctas, faqs } = useSharedParts(page);

  const intro = usePart(
    { title: page.title, highlight: batch.highlight, summary: page.summary, startDate: page.startDate },
    {
      validate: ({ title, highlight, summary, startDate }) => [
        ...textProblem(title, "Add the title."),
        ...(highlight && !title.includes(highlight) ? ["The red part must be words from the title."] : []),
        ...textProblem(summary, "Add the description."),
        ...textProblem(startDate, "Choose the start date."),
      ],
      submit: (input) => savePart(id, "intro", input),
      fromSaved: (saved) => ({ title: saved.title, highlight: saved.batch?.highlight || "", summary: saved.summary, startDate: saved.startDate }),
    },
  );

  const plans = usePart(toPlanPrices(batch.plans), {
    validate: (input) => input.flatMap(({ name }, index) => textProblem(name, `Plan ${index + 1}: add its name.`)),
    submit: (input) => savePart(id, "plans", { plans: input }),
    fromSaved: (saved) => toPlanPrices(saved.batch?.plans || []),
  });

  const banner = usePart(batch.banner, {
    validate: ({ image }) => textProblem(image, "Upload the banner image."),
    submit: (input) => savePart(id, "banner", input),
    fromSaved: (saved) => saved.batch?.banner || { image: "", alt: "" },
  });

  const stages = usePart(
    { stagesTitle: batch.stagesTitle || NO_STAGES_TITLE, timelines: toTimelines(batch.stages) },
    {
      validate: ({ stagesTitle, timelines }) => [
        ...textProblem(stagesTitle.highlight, "Add the red words of the heading."),
        ...timelines.flatMap(({ title, from, to }) => {
          if (!from || !to) return [`${title}: choose both months.`];

          return from > to ? [`${title}: the timeline must end after it starts.`] : [];
        }),
      ],
      submit: ({ stagesTitle, timelines }) => savePart(id, "stages", { stagesTitle, stages: timelines.map(({ from, to }) => ({ from, to })) }),
      fromSaved: (saved) => ({ stagesTitle: saved.batch?.stagesTitle || NO_STAGES_TITLE, timelines: toTimelines(saved.batch?.stages || []) }),
    },
  );

  const planButtons = usePart(
    { plansTitle: batch.plansTitle || NO_PLANS_TITLE, buttons: toPlanButtons(batch.plans) },
    {
      validate: ({ plansTitle, buttons }) => [
        ...textProblem(plansTitle.highlight, "Add the red words of the heading."),
        ...buttons.flatMap(({ name, buyLabel, buyLink }) => [...textProblem(buyLabel, `${name}: add the button text.`), ...linkProblem(buyLink, name)]),
      ],
      submit: ({ plansTitle, buttons }) => savePart(id, "planButtons", { plansTitle, plans: buttons.map(({ buyLabel, buyLink }) => ({ buyLabel, buyLink })) }),
      fromSaved: (saved) => ({ plansTitle: saved.batch?.plansTitle || NO_PLANS_TITLE, buttons: toPlanButtons(saved.batch?.plans || []) }),
    },
  );

  const updateTimeline = (index: number, change: Partial<AdminCourseStage>) =>
    stages.update({ ...stages.input, timelines: stages.input.timelines.map((item, itemIndex) => (itemIndex === index ? { ...item, ...change } : item)) });

  const updatePlanButton = (index: number, change: Partial<AdminCoursePlan>) =>
    planButtons.update({ ...planButtons.input, buttons: planButtons.input.buttons.map((item, itemIndex) => (itemIndex === index ? { ...item, ...change } : item)) });

  const updatePlansTitle = (change: Partial<typeof NO_PLANS_TITLE>) => planButtons.update({ ...planButtons.input, plansTitle: { ...planButtons.input.plansTitle, ...change } });

  const cardProps = (key: (typeof BATCH_PARTS)[number]) => ({ id: key, isOpen: isOpen(key), onToggle: () => toggle(key), canEdit });

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      <ExpandAllButton isAllOpen={isAllOpen} onClick={toggleAll} />

      <PartCard {...cardProps("intro")} step="a" title="Title, description & date" description="The hero heading (with its red part), the text under it and the start date." part={intro}>
        <Field label="Title" required>
          <TextInput value={intro.input.title} onChange={(title) => intro.update({ ...intro.input, title })} />
        </Field>
        <Field label="Red part of the title" hint="Words from the title shown in red, e.g. “UPSC 2027/29 –”. Leave empty for none.">
          <TextInput value={intro.input.highlight} onChange={(highlight) => intro.update({ ...intro.input, highlight })} />
        </Field>
        <Field label="Description" required>
          <TextArea value={intro.input.summary} onChange={(summary) => intro.update({ ...intro.input, summary })} rows={3} />
        </Field>
        <Box sx={{ maxWidth: { md: "50%" } }}>
          <Field label="Start date" required hint={START_DATE_HINT}>
            <TextInput type="date" value={intro.input.startDate} onChange={(startDate) => intro.update({ ...intro.input, startDate })} />
          </Field>
        </Box>
      </PartCard>

      <PartCard {...cardProps("plans")} step="a" title="Plans & prices" description="The plan buttons in the hero (Foundation, Foundation Plus) and their prices — also used in the plan comparison." part={plans}>
        {plans.input.map((plan, index) => (
          <FieldGrid key={batch.plans[index]?.key || index}>
            <Field label={`Plan ${index + 1} name`} required>
              <TextInput value={plan.name} onChange={(name) => plans.update(plans.input.map((item, itemIndex) => (itemIndex === index ? { ...item, name } : item)))} />
            </Field>
            <Field label="Price (₹, taxes included)" required>
              <NumberInput value={plan.price} onChange={(price) => plans.update(plans.input.map((item, itemIndex) => (itemIndex === index ? { ...item, price } : item)))} />
            </Field>
          </FieldGrid>
        ))}
      </PartCard>

      <PartCard {...cardProps("ctas")} step="a" title="Enroll & Course Details buttons" description="The two buttons next to the price in the hero." part={ctas}>
        <CtaFields value={ctas.input} onChange={ctas.update} />
      </PartCard>

      <PartCard {...cardProps("banner")} step="a" title="Hero banner" description="The short banner on the right of the hero." part={banner}>
        <ImageField label="Banner image" value={banner.input.image} onChange={(image) => banner.update({ ...banner.input, image })} aspectRatio="2.9 / 1" hint="Wide banner (about 2.9 : 1), under 1 MB." />
        <Field label="Image description" hint="For screen readers and Google.">
          <TextInput value={banner.input.alt} onChange={(alt) => banner.update({ ...banner.input, alt })} placeholder="UPSC Foundation Batch — Hindi & English medium" />
        </Field>
      </PartCard>

      <PartCard {...cardProps("stages")} step="b" title="4 Stages of Preparation" description="The heading and the active timeline (month range) of each stage." part={stages}>
        <FieldGrid>
          <Field label="Heading" hint="Before the red words, e.g. “4 Stages Of”.">
            <TextInput value={stages.input.stagesTitle.text} onChange={(text) => stages.update({ ...stages.input, stagesTitle: { ...stages.input.stagesTitle, text } })} placeholder="4 Stages Of" />
          </Field>
          <Field label="Red words" required>
            <TextInput value={stages.input.stagesTitle.highlight} onChange={(highlight) => stages.update({ ...stages.input, stagesTitle: { ...stages.input.stagesTitle, highlight } })} placeholder="Preparation" />
          </Field>
        </FieldGrid>
        {stages.input.timelines.map((stage, index) => (
          <Box key={stage.title} sx={{ display: "grid", gap: 1 }}>
            <SubHeading>{`Stage ${index + 1} · ${stage.title}`}</SubHeading>
            <FieldGrid>
              <Field label="From" required hint="Month and year">
                <TextInput type="month" value={stage.from} onChange={(from) => updateTimeline(index, { from })} />
              </Field>
              <Field label="To" required hint="Month and year">
                <TextInput type="month" value={stage.to} onChange={(to) => updateTimeline(index, { to })} />
              </Field>
            </FieldGrid>
          </Box>
        ))}
      </PartCard>

      <PartCard {...cardProps("planButtons")} step="c" title="Plan comparison" description="The “Choose the Plan That Fits Your Preparation” heading and the Buy Now button under each plan (prices come from Plans & prices)." part={planButtons}>
        <FieldGrid columns={3}>
          <Field label="Heading start">
            <TextInput value={planButtons.input.plansTitle.before} onChange={(before) => updatePlansTitle({ before })} placeholder="Choose the" />
          </Field>
          <Field label="Red words" required>
            <TextInput value={planButtons.input.plansTitle.highlight} onChange={(highlight) => updatePlansTitle({ highlight })} placeholder="Plan That Fits" />
          </Field>
          <Field label="Heading end">
            <TextInput value={planButtons.input.plansTitle.after} onChange={(after) => updatePlansTitle({ after })} placeholder="Your Preparation" />
          </Field>
        </FieldGrid>
        <Field label="Line under the heading">
          <TextInput value={planButtons.input.plansTitle.subtitle} onChange={(subtitle) => updatePlansTitle({ subtitle })} />
        </Field>
        {planButtons.input.buttons.map((plan, index) => (
          <Box key={batch.plans[index]?.key || index} sx={{ display: "grid", gap: 1 }}>
            <SubHeading>{plan.name}</SubHeading>
            <FieldGrid>
              <Field label="Button text" required>
                <TextInput value={plan.buyLabel} onChange={(buyLabel) => updatePlanButton(index, { buyLabel })} placeholder="Buy Now" />
              </Field>
              <Field label="Link" hint={`${LINK_HINT} (opens the sign-up popup)`}>
                <TextInput value={plan.buyLink} onChange={(buyLink) => updatePlanButton(index, { buyLink })} placeholder="https://store.viniias.com/…" />
              </Field>
            </FieldGrid>
          </Box>
        ))}
      </PartCard>

      <PartCard {...cardProps("faqs")} step="d" title="FAQs" description="Also added to the page for Google (FAQ rich results)." summary={`${faqs.input.length} FAQs`} part={faqs}>
        <FaqsEditor faqs={faqs.input} onChange={faqs.update} />
      </PartCard>
    </Box>
  );
}

/** Web → GS Foundation → one page: only the parts listed for its layout can be edited. */
export default function CoursePageEditor({ page }: { page: AdminCoursePage }) {
  const { canEdit } = useSectionAccess("gsFoundation");
  const Editor = page.layout === "batch" ? BatchPageEditor : GuidePageEditor;

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {!canEdit && <ViewOnlyNotice what="this page" />}
      <Editor page={page} canEdit={canEdit} />
    </Box>
  );
}
