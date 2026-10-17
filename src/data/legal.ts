import { LegalBlock, LegalDoc } from "@/types";

/* Content of the official VINI IAS policy documents (16 October 2026). Drafting notes from the source PDFs are not published. */

const p = (text: string): LegalBlock => ({ kind: "p", text });
const h = (text: string): LegalBlock => ({ kind: "h", text });
const list = (items: string[], ordered = false): LegalBlock => ({ kind: "list", items, ordered });
const note = (text: string): LegalBlock => ({ kind: "note", text });
const contact = (rows: { label: string; value: string; href?: string }[]): LegalBlock => ({ kind: "contact", rows });

const SUPPORT = { label: "Email", value: "support@groupvini.in", href: "mailto:support@groupvini.in" };
const SITE = { label: "Website", value: "viniias.com", href: "https://viniias.com" };

export const PRIVACY_POLICY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  label: "Privacy Policy",
  description: "How Vini Eduventure Pvt. Ltd. (VINI IAS) collects, uses, protects and shares your personal information on the VINI IAS website and VINI Learning App.",
  updated: "2026-10-16",
  highlights: [
    { title: "We never sell your data", text: "Personal information is not sold to third-party marketers." },
    { title: "Used to teach you better", text: "To deliver courses, track progress and personalise learning." },
    { title: "You stay in control", text: "Opt out of promotions, or ask to access, correct or delete your data." },
  ],
  intro: [
    p('This Platform is owned by Vini Eduventure Pvt. Ltd., operating under the name of VINI IAS. This Privacy Policy pertains to the services made available at https://viniias.com (the "VINI IAS Website") and its equivalent VINI Learning Mobile Application (the "VINI Learning App" or "VINI IAS App") available on Google Play, Windows Store or Apple Store. The VINI Learning App, VINI IAS App and VINI IAS Website are collectively referred to as the "Platform".'),
    p('For this Privacy Policy, "You", "Your", "Yourself" or "User" means any natural or legal person who browses the Platform or subscribes to services available on it by providing login credentials while registering using a computer, mobile phone, tablet and/or other devices. "We", "Us" and "Our" mean Vini Eduventure Pvt. Ltd.'),
    p("We would like to safeguard the information you provide to us. This Privacy Policy informs you about our practices regarding collection, use and disclosure of information provided through this Platform."),
    note("Please read this Privacy Policy before using the Platform or submitting information. Use of the Platform constitutes your consent to this Privacy Policy. Whenever you submit information through the Platform, you consent to its collection, use and disclosure in accordance with this Policy."),
  ],
  sections: [
    { id: "what-is-personal-information", title: "What Is Personal Information and Why Do We Collect It?", blocks: [
      p('"Personal Information" means information that may be used to identify an individual, including a first and last name, home or other physical address, email address or other contact information.'),
      p("We collect personal information to identify you, provide appropriate feedback on your performance in tests and examinations, deliver educational services and feedback, provide convenient access to our services, offerings and products, and personalise your educational experience."),
    ] },
    { id: "information-we-collect", title: "What Personal Information Do We Collect and How Do We Use It?", blocks: [
      p("We may collect the following information from or about you:"),
      h("2.1 Information You Share"),
      p("You may share your name, email address, phone number and other personal information to access certain Platform features. We may also request information when you participate in contests, promotional activities or offers sponsored by us or our partners."),
      p("For paid features, payment-related information may be collected and processed by our payment service providers, including payment account and transaction details necessary to process payments. When you use paid products or services, we may track courses, lessons, tests and other educational content accessed and store relevant information on our servers to track learning progress and pending activities."),
      h("2.2 Cookies and Other Tracking Technologies"),
      p("Some web pages use cookies and other tracking technologies. A cookie is a small text file that may collect information about your activity on the Platform. Most browsers allow you to receive cookie notifications or block cookies. Blocking or deleting cookies may require you to re-enter login credentials and may affect certain features."),
      p("Tracking technologies may record internet domain and host names, IP addresses, browser software and operating system types, clickstream patterns, and access dates and times. These technologies help improve the website and user experience. We may analyse non-personal information for statistics and trends."),
      h("2.3 Log Information"),
      p("When you access our website, our servers may automatically record information sent by your browser, including web requests, IP address, browser type and language, date and time of requests, and cookies that may identify your browser."),
      h("2.4 User Communications"),
      p("When you email or otherwise communicate with us, we may retain those communications to process enquiries, respond to requests, resolve issues and improve services."),
      h("2.5 Links"),
      p("We may use link formats that help track whether links have been followed, improving our content and user experience. External links may take you to websites outside our domain. We are not responsible for their privacy practices and encourage you to review their privacy policies. This Policy applies only to information collected through our Platform."),
      h("2.6 Alerts and Notifications"),
      p("We may contact you by email, phone call, SMS, WhatsApp or other channels about Platform updates, new features, improvements, educational services, course updates, offers and announcements. Where required by law, we will obtain necessary consent for promotional communications and provide appropriate opt-out options."),
      h("2.7 Public Forums and User-Generated Content"),
      p("Information, comments, messages, files, photographs or other content shared in discussion forums or publicly accessible areas may be visible to other users or the public. Such sharing is at your discretion and risk. Please exercise caution when sharing personal information publicly."),
      h("2.8 Payment Information and Data Security"),
      p("Payment information may be transmitted securely to authorised payment providers or banks for processing. If a payment issue arises, relevant order and transaction information may be reviewed with you and the provider to resolve it. We do not intentionally disclose payment card details except as necessary for authorised processing, legal compliance or other purposes permitted by law. We do not sell personal information to third-party marketers."),
      h("2.9 How Do We Protect Your Data?"),
      p("We use administrative, physical and technical safeguards designed to protect personal information. We may use hosting infrastructure and service providers with appropriate security practices. No computer system or internet transmission can be guaranteed completely secure."),
    ] },
    { id: "how-we-use-information", title: "What Do We Do With the Information We Gather?", blocks: [
      p("We use information to understand your needs, provide services and improve your Platform experience, including for:"),
      list([
        "Internal Record Keeping: Maintaining records of registrations, subscriptions, payments, courses, assessments and other Platform activities.",
        "Improvement: Improving courses, educational resources, assessments, learning tools, website, apps and customer support.",
        "Promotional Communications: Sending information about courses, products, services, offers and educational programmes, subject to applicable consent and preferences.",
        "Market Research: Requesting feedback, surveys and research through email, phone, WhatsApp or other channels where permitted by law.",
        "Personalisation: Customising course recommendations, learning resources and the educational experience.",
        "Customer Support: Responding to enquiries, complaints and technical support requests.",
        "Legal Compliance: Complying with applicable laws, regulations, legal processes and lawful requests.",
        "Security: Identifying and preventing fraud, unauthorised access, misuse and other security issues.",
      ], true),
    ] },
    { id: "data-retention", title: "For How Long Do We Retain User Data?", blocks: [
      p("We retain user data while an account is active and for a reasonable period thereafter, subject to legal, regulatory, operational and business requirements. We may retain certain information for at least three years after account closure where necessary for record-keeping, dispute resolution, compliance or other legitimate purposes. Retention periods may vary by data type and purpose. Where information is no longer required, we will take reasonable steps to delete, anonymise or securely dispose of it, subject to applicable law."),
    ] },
    { id: "security", title: "Security", blocks: [
      p("We take reasonable steps to help protect your information using physical, electronic and managerial safeguards. However, internet transmission cannot be guaranteed 100% secure, and information is transmitted at your own risk. After receiving your information, we use reasonable measures to protect it within our systems. You are responsible for keeping your login credentials confidential and notifying us of suspected unauthorised access."),
    ] },
    { id: "children", title: "Children", blocks: [
      p("Our Platform may offer educational services for different age groups. We do not knowingly collect children's personal information in violation of applicable law. Where parental or guardian consent is required, we will take appropriate steps to obtain it. We do not knowingly contact children under 13 about special offers or marketing without required parental permission. Parents or guardians may contact us to request review, correction or deletion of a child's information, subject to applicable law."),
    ] },
    { id: "links-to-other-platforms", title: "Links to Other Platforms", blocks: [
      p("Our Platform may link to external websites or platforms. We do not control them and are not responsible for their privacy, security or data protection practices. Please review the privacy policy of each external website or platform you visit."),
    ] },
    { id: "third-party-services", title: "Third-Party Services", blocks: [
      p("Third parties may provide services such as payment processing, hosting, application infrastructure, analytics, customer support, communications and maintenance. We may share relevant information with these providers where necessary to deliver our services. We take reasonable steps to require providers to protect personal information and use it only for authorised purposes, subject to law and contractual arrangements."),
      p("We do not sell personal information collected through our Platform. Transfers to third parties for their independent purposes will be made only with appropriate consent or another lawful basis, except where permitted or required by law. We may share aggregated or anonymised information, such as course subscription counts, that is not intended to identify individuals."),
    ] },
    { id: "controlling-your-information", title: "Controlling Your Personal Information", blocks: [
      p("You may exercise available choices regarding your information:"),
      list([
        "Marketing Preferences: Use available form options to indicate that you do not want your information used for direct marketing.",
        "Withdrawal of Consent: Withdraw consent for promotional communications by contacting us.",
        "Email Unsubscribe: Use the unsubscribe option included in promotional emails, where available.",
        "Personal Information Requests: Subject to applicable law and verification, request access to, correction of or deletion of your information.",
        "Communication Preferences: Request that promotional communications stop through particular channels, subject to legal requirements and essential service messages.",
      ], true),
      p("To exercise applicable rights or update preferences, contact us using the details on https://viniias.com. We may retain information where required by law or necessary for legitimate purposes such as resolving disputes, maintaining records or preventing fraud."),
    ] },
    { id: "copyright", title: "Copyright", blocks: [
      p("Information displayed, transmitted or made available through the Platform, including the VINI IAS Website at https://viniias.com and the VINI Learning App / VINI IAS App, is protected by copyright and other intellectual property laws. Unless authorised by us or permitted by law, you may not modify, publish, distribute, reproduce, repost, perform, display or commercially exploit Platform content. This includes educational videos, lectures, notes, study materials, test series, assessments, articles, graphics, photographs, logos, trademarks and other digital content. Unauthorised use may result in legal action under applicable law."),
    ] },
    { id: "contact-us", title: "Contacting Us", blocks: [
      p("If you have questions, concerns, complaints or requests regarding this Privacy Policy or our handling of personal information, contact us through the Contact Us section of our website."),
      contact([{ label: "Company", value: "Vini Eduventure Pvt. Ltd." }, SITE, SUPPORT]),
      p("You may email the address above for privacy-related enquiries or requests."),
    ] },
    { id: "changes", title: "Changes to This Policy", blocks: [
      p("We may update this Policy to reflect changes in services, business practices, technology or applicable law. Changes will be published on our Platform and take effect on the date specified or, if none is specified, upon publication. Please review this page periodically, particularly before providing personal information."),
    ] },
    { id: "your-consent", title: "Your Consent to This Policy", blocks: [
      p("By accessing or using our Platform, you acknowledge that you have read this Policy. Where consent is required by law, we will seek consent for relevant collection, use or disclosure of personal information. This Policy describes our practices for personal information collected through the Platform and supersedes previous versions concerning the same subject. It should be read with our Terms and Conditions and other relevant policies. Applicable legal requirements prevail in the event of a conflict. We may revise this Policy by publishing an updated version on our website."),
    ] },
  ],
};

export const REFUND_POLICY: LegalDoc = {
  slug: "refund-policy",
  title: "Refund & Cancellation Policy",
  label: "Refund & Cancellation",
  description: "Cancellation windows, refund eligibility and timelines for VINI IAS online courses, classroom programmes, books and study materials.",
  updated: "2026-10-16",
  highlights: [
    { title: "Cancel within 12 hours", text: "If the order hasn't been processed or dispatched yet." },
    { title: "Report issues within 48 hours", text: "For wrong, damaged or defective books and study material." },
    { title: "Refunds in 7–10 business days", text: "Initiated after approval, to your original payment method." },
  ],
  intro: [],
  sections: [
    { id: "introduction", title: "Introduction", blocks: [
      p("VINI IAS, operated by Vini Eduventure Private Limited (hereinafter referred to as “VINI IAS”, “we”, “our”, or “us”), strives to provide quality educational services, online courses, classroom programmes, test series, books, and digital learning resources to students preparing for various competitive examinations."),
      p("This Refund & Cancellation Policy governs purchases made through the VINI IAS website, mobile application, and other authorized sales channels. Students are requested to read this policy carefully before purchasing any course, subscription, study material, or educational service."),
    ] },
    { id: "cancellation", title: "Cancellation Policy", blocks: [
      p("Customers may request cancellation of an order within 12 hours of placing the order, provided the order has not been processed, packed, dispatched, or made available for delivery. Cancellation requests may not be accepted once the order has been processed or dispatched."),
      p("Special promotional offers, discounted courses, limited-period sales, examination-specific offers, and bundled packages may be subject to specific cancellation conditions disclosed at the time of purchase. Cancellation requests must be submitted to support@groupvini.in with the relevant order or enrolment details."),
    ] },
    { id: "online-courses", title: "Refund Policy for Online Courses", blocks: [
      p("Fees paid for online courses, recorded lectures, live classes, digital subscriptions, online test series, e-books, PDF notes, and other digital educational products are generally non-refundable once course access has been activated or digital content has been made available."),
      p("This policy applies to online courses offered through the VINI IAS website and mobile application, including UPSC, BPSC, State PCS, CLAT, Judiciary, CUET, and other competitive examination programmes."),
      p("Refunds will generally not be provided where a student changes their mind after purchase, does not attend classes or use course resources, changes examination plans, or is dissatisfied solely because the course does not meet personal expectations. Duplicate payments, verified technical payment errors, and other cases requiring a refund under applicable law will be reviewed appropriately."),
    ] },
    { id: "classroom-courses", title: "Refund Policy for Classroom and Offline Courses", blocks: [
      p("Refund requests for classroom programmes, offline coaching, and other in-person educational services will be considered according to the specific course or admission terms communicated at the time of enrolment."),
      p("Where the following refund schedule has been expressly disclosed and agreed to for a particular programme, it may apply:"),
      list([
        "Cancellation within 7 days of course commencement: 20% of the applicable course fee may be deducted, and the remaining eligible amount may be refunded.",
        "Cancellation within 30 days of admission: Up to 50% of the eligible course fee may be refunded, subject to the applicable admission terms.",
        "Cancellation after 30 days of admission: No refund will ordinarily be provided, except where required by applicable law or specifically approved in writing by VINI IAS.",
      ]),
      p("The above schedule is not automatically applicable to every course. The refund terms specifically communicated for the relevant programme will govern the request, subject to applicable law. Registration fees, admission charges, study material charges, taxes, or other amounts may be treated separately where clearly disclosed at the time of admission and lawful. Students must submit requests to support@groupvini.in."),
    ] },
    { id: "books-and-materials", title: "Refund Policy for Books and Physical Study Materials", blocks: [
      p("For physical books, printed notes, magazines, and other study materials purchased through VINI IAS, cancellation may be requested within 12 hours of placing the order, provided the order has not been processed or dispatched."),
      p("Returns or refunds may be considered if the wrong product was delivered, the product arrived damaged, it contains a significant printing or manufacturing defect, or an order was not delivered despite successful payment, subject to verification."),
      note("Customers must notify VINI IAS within 48 hours of receiving the product and provide the order ID, a description of the issue, and clear photographs where applicable."),
      p("Contact support@groupvini.in before returning any product. Returns must follow the instructions provided by customer support. Products damaged after delivery due to misuse or mishandling may not qualify for a refund or replacement, subject to applicable law."),
    ] },
    { id: "duplicate-payments", title: "Duplicate or Failed Payments", blocks: [
      p("If a customer is charged more than once for the same order, or the payment amount is debited without successful course enrolment or order confirmation, the customer should contact VINI IAS for verification."),
      p("Please provide the registered name and mobile number, registered email address, order or enrolment ID if available, payment transaction reference number, payment date and amount, and relevant payment confirmation. After verification with the payment gateway or financial institution, confirmed duplicate or erroneous payments will be refunded or reversed through the appropriate channel. Processing time may depend on the payment provider."),
    ] },
    { id: "promotional-offers", title: "Promotional Offers and Discounted Courses", blocks: [
      p("Courses and products purchased under special offers, scholarships, discounts, festive sales, limited-period campaigns, or bundled packages may be subject to specific refund and cancellation conditions. Any special conditions will be communicated at the time of purchase and will apply to the relevant transaction, subject to applicable law. A promotional discount does not independently create a right to a refund."),
    ] },
    { id: "request-procedure", title: "Refund Request Procedure", blocks: [
      p("To request a cancellation or refund, email support@groupvini.in with the subject line “Refund or Cancellation Request”. Include the following information:"),
      list([
        "Full name of the student or purchaser.",
        "Registered mobile number and email address.",
        "Course name, product name, order ID, or enrolment ID.",
        "Payment date, amount, and transaction reference.",
        "Reason for the request and supporting documents, where applicable.",
      ]),
      p("Our team may request additional information to verify the transaction and assess the request. Submitting a refund request does not automatically mean that the refund has been approved."),
    ] },
    { id: "processing-timeline", title: "Refund Processing Timeline", blocks: [
      p("Where a refund is approved, VINI IAS will generally initiate it within 7–10 business days after approval, unless a different timeline is communicated. The actual time taken for the amount to appear in the customer’s account depends on the bank, payment gateway, card issuer, UPI provider, or other financial institution."),
      p("Customers should contact their bank or payment provider if an approved refund has been initiated but has not appeared within the expected timeframe."),
    ] },
    { id: "access-after-refund", title: "Course Access After Refund", blocks: [
      p("If a refund is approved for an online course, digital subscription, or other digital educational product, access to the relevant course or content may be suspended or withdrawn after the refund is processed. Any misuse of course access, fraudulent transaction, or violation of platform rules will be reviewed in accordance with VINI IAS policies and applicable law."),
    ] },
    { id: "changes", title: "Changes to This Policy", blocks: [
      p("VINI IAS may update or modify this Refund & Cancellation Policy from time to time. Any revised policy will be published on the official website with an updated revision date. Changes will not override rights or obligations that cannot lawfully be altered under applicable law. Customers are encouraged to review this page before making a purchase."),
    ] },
    { id: "contact-us", title: "Contact Us", blocks: [
      contact([{ label: "Brand", value: "VINI IAS" }, { label: "Operated by", value: "Vini Eduventure Private Limited" }, SITE, SUPPORT]),
      p("Please include your registered mobile number and order or enrolment ID when contacting customer support."),
    ] },
    { id: "applicable-law", title: "Applicable Law", blocks: [
      p("This policy will be interpreted in accordance with the applicable laws of India. Nothing in this policy is intended to exclude or restrict any consumer right or legal remedy that cannot lawfully be excluded or restricted."),
    ] },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDoc = {
  slug: "terms-and-conditions",
  title: "Terms and Conditions",
  label: "Terms & Conditions",
  description: "The terms that govern your use of the VINI IAS website, mobile app and educational services, operated by Vini Eduventure Private Limited.",
  updated: "2026-10-16",
  highlights: [
    { title: "One account, one learner", text: "Course access is personal — please don't share your login." },
    { title: "Content is protected", text: "Lectures, notes and tests can't be copied or redistributed." },
    { title: "No result guarantees", text: "We support your preparation; selection depends on many factors." },
  ],
  intro: [],
  sections: [
    { id: "introduction", title: "Introduction", blocks: [
      p("Vini Eduventure Private Limited, operating under the brand name VINI IAS (hereinafter referred to as “VINI IAS”, “Company”, “We”, “Us”, or “Our”), provides educational services, online learning resources, competitive examination preparation courses, digital study materials, and related educational solutions."),
      p("These Terms and Conditions (“Terms”) govern your access to and use of the VINI IAS website at https://www.viniias.com, our mobile application, online learning platform, and other digital services operated by the Company. The website, mobile application, and associated services are collectively referred to as the “Platform”."),
      p("VINI IAS offers educational resources for examinations and learning programmes, including UPSC, BPSC and other State Public Service Commission examinations, government recruitment examinations, school-level and foundation courses, CLAT, Law, Judiciary, CUET, teaching recruitment examinations, defence and scholarship examinations, test series, mentorship, and AI-assisted learning services."),
      note("By accessing our Platform, creating an account, purchasing a course, or using our services, you acknowledge that you have read and understood these Terms and agree to comply with them. If you do not agree, please discontinue using the Platform."),
    ] },
    { id: "acceptance", title: "Acceptance of Terms", blocks: [
      p("By accessing or using the Platform, you agree to comply with these Terms and applicable laws; provide accurate information during registration and purchase; maintain the confidentiality of your account credentials; use the Platform for lawful educational and personal purposes; respect intellectual property rights; and follow conditions applicable to individual courses, subscriptions, and digital products."),
      p("These Terms constitute an electronic record and may be legally binding in accordance with applicable Indian law. Certain services may be subject to additional terms, eligibility requirements, subscription conditions, or specific policies, which should be read together with these Terms."),
    ] },
    { id: "eligibility", title: "Eligibility and Age Requirements", blocks: [
      p("You may use the Platform if you are legally capable of entering into a binding contract under applicable Indian law. If you are under 18 years of age, you may use the Platform with the involvement, supervision, and consent of your parent or legal guardian, as required by applicable law."),
      p("Parents or legal guardians are responsible for ensuring that minors use the Platform appropriately. Users purchasing examination preparation courses are responsible for checking eligibility criteria prescribed by the relevant examination authority. VINI IAS does not guarantee that a user meets the age, qualification, nationality, or other requirements for a particular examination."),
    ] },
    { id: "accounts", title: "Registration and User Accounts", blocks: [
      p("Certain features may require registration. You may be asked to provide your full name, mobile number, email address, educational information, and other information reasonably necessary to provide services. You agree to provide truthful, accurate, and current information."),
      p("You are responsible for maintaining the confidentiality of your login credentials and for activities carried out through your account, subject to applicable law. Notify VINI IAS promptly if you suspect unauthorised access."),
      p("We may restrict, suspend, or terminate accounts where there is reasonable evidence of fraud, impersonation, unauthorised sharing, payment abuse, security risks, or material violations of these Terms. Where reasonably practicable, we will provide notice and an opportunity to resolve the issue, except where immediate action is necessary for security, legal compliance, or protection against ongoing misuse."),
    ] },
    { id: "services", title: "Services Provided by VINI IAS", blocks: [
      p("Services may include live online classes, recorded lectures, downloadable notes and study materials, digital books, mock examinations and test series, practice questions and previous-year questions, current affairs updates, educational articles, mentorship, doubt-solving, answer-writing practice and evaluation, webinars, offline programmes where offered, AI-assisted educational tools including VINI AI, and other educational services introduced from time to time."),
      p("Features, duration, validity, pricing, and availability may differ between courses. The specific course description, purchase page, or applicable written enrolment terms will ordinarily determine the features included in your selected course. We may introduce new features or modify existing features while respecting applicable contractual and statutory obligations."),
    ] },
    { id: "enrolment", title: "Course Enrolment and Subscription", blocks: [
      p("Some courses and services require payment before access is granted. Review the course name and description, duration and validity, language of instruction, included materials, live and recorded class availability, test series and mentorship inclusions, fees, taxes, and applicable cancellation or refund conditions before purchase."),
      p("Enrolment will generally be confirmed after successful payment and completion of applicable registration requirements. Course validity is determined by the period stated on the course page, enrolment confirmation, or applicable written agreement. Access may expire at the end of the stated period unless an extension or renewal is expressly provided. Purchasing one course does not automatically entitle you to access other courses, subscriptions, or premium features."),
    ] },
    { id: "fees-payments", title: "Fees, Payments, and Taxes", blocks: [
      p("Applicable fees will be displayed on the Platform or communicated through an authorised VINI IAS representative. Payments may be processed through authorised payment gateways or other approved methods. You agree to pay the applicable amount. Taxes and statutory charges will be handled in accordance with applicable law."),
      p("VINI IAS is not responsible for delays caused by banks, payment gateways, telecommunications providers, or third-party processors, although we will reasonably assist with payment-related issues. If an amount is deducted but the transaction is unsuccessful, contact support with the transaction reference and relevant payment details. Duplicate payments, failed transactions, and payment discrepancies will be examined and resolved under the applicable process and law."),
      p("Users must not use fraudulent payment methods, unauthorised payment instruments, or another person's payment information without proper authorisation."),
    ] },
    { id: "cancellation-refund", title: "Cancellation and Refund Policy", blocks: [
      p("Cancellations and refund requests will be handled in accordance with the separate Cancellation and Refund Policy published by VINI IAS, terms disclosed at purchase, and applicable law. Review the relevant refund conditions before purchasing."),
      p("Eligibility may depend on the product, time elapsed since purchase, extent of service usage, and specific product terms, subject to consumer protection requirements. Approved refunds will ordinarily be processed through the original payment method or another appropriate method permitted by law. The time taken to appear in your account may depend on your bank or payment provider."),
      p("Nothing in this clause excludes any refund, cancellation, or other right that cannot lawfully be excluded. For assistance, contact support@groupvini.in."),
    ] },
    { id: "educational-disclaimer", title: "Course Content and Educational Disclaimer", blocks: [
      p("VINI IAS endeavours to provide educational content that is useful, relevant, and appropriate for examination preparation. Content may be updated, corrected, revised, or supplemented as examination patterns, syllabi, laws, policies, and official notifications change. Students should independently verify important examination-related information through the relevant official authority."),
      p("Unless expressly stated otherwise, VINI IAS does not represent that every course or resource will cover every possible question, topic, or development relevant to an examination. Courses, mock tests, study materials, mentorship, and practice resources support learning and preparation."),
      note("VINI IAS does not guarantee selection, qualification, a particular examination score, a government job, or any specific academic or professional outcome. Results depend on factors including individual preparation, performance, eligibility, examination conditions, and decisions made by relevant authorities. Past results or testimonials are not guarantees of future results."),
    ] },
    { id: "classes-lectures", title: "Live Classes and Recorded Lectures", blocks: [
      p("Live classes, recorded lectures, and educational sessions will be made available according to the applicable course schedule and features. Timings may occasionally change due to faculty availability, technical difficulties, operational requirements, or other reasonable circumstances. Where practicable, we will communicate material schedule changes through appropriate channels."),
      p("Recording availability, viewing limits, and access duration may vary by programme. Students must not record, reproduce, distribute, or publicly broadcast classes or lectures without prior written authorisation from VINI IAS or the relevant rights holder. VINI IAS may provide alternative arrangements when a class is cancelled or materially disrupted, in accordance with applicable course terms."),
    ] },
    { id: "fair-usage", title: "Fair Usage and Account-Sharing Policy", blocks: [
      p("Course access is intended for the individual student enrolled in the relevant programme unless the product expressly permits multiple users. You must not share login credentials with unauthorised individuals; sell, rent, transfer, or commercially distribute your account; allow others to use your paid subscription without permission; circumvent authorised device restrictions or security measures; use automated methods to access restricted content; or obtain paid content without completing the required payment."),
      p("VINI IAS may use reasonable technical and administrative measures to detect unauthorised access. Where a suspected violation is identified, we may investigate, request clarification, temporarily restrict access where reasonably necessary, or take proportionate action, subject to applicable law and relevant notice, review, or grievance requirements."),
    ] },
    { id: "intellectual-property", title: "Intellectual Property Rights", blocks: [
      p("Unless otherwise indicated, the Platform and its original content are owned by or licensed to Vini Eduventure Private Limited or the relevant rights holders. Intellectual property may include website design and software, logos and trademarks, video lectures and audio recordings, study notes, digital books, test series, question banks, articles, graphics, illustrations, infographics, course structures, and AI-assisted learning features, subject to applicable rights."),
      p("Subject to compliance with these Terms and payment of applicable fees, VINI IAS grants you limited, personal, non-exclusive, non-transferable, and revocable permission to access and use purchased educational services for their intended purpose."),
      p("You must not copy, reproduce, publish, sell, distribute, commercially exploit, modify, or create derivative works from protected content without required authorisation, except to the extent permitted by applicable law. Nothing in these Terms restricts rights that cannot lawfully be restricted."),
    ] },
    { id: "prohibited-use", title: "Permitted and Prohibited Use", blocks: [
      p("You must use the Platform responsibly and lawfully. You must not:"),
      list([
        "Use it for fraudulent, unlawful, or misleading activities.",
        "Upload malware or harmful files.",
        "Attempt unauthorised access to systems or accounts.",
        "Interfere with operation, availability, or security.",
        "Scrape or extract protected content through unauthorised automated methods.",
        "Upload content that infringes intellectual property or privacy rights.",
        "Harass, threaten, abuse, or impersonate users, employees, or faculty.",
        "Misuse forums or doubt-solving facilities.",
        "Bypass payment requirements or access restrictions.",
        "Violate applicable law.",
      ], true),
      p("We may take appropriate action, including removing prohibited content, restricting features, suspending accounts, or referring matters to authorities where required."),
    ] },
    { id: "study-materials", title: "Study Materials and Downloadable Content", blocks: [
      p("Study materials may be supplied in physical or digital formats depending on the course or product. Download availability depends on the relevant course terms and technical functionality. Downloaded content remains subject to applicable intellectual property restrictions; downloading does not grant copyright ownership or permission for commercial distribution."),
      p("Physical books, printed notes, and other deliverables may be subject to separate shipping, delivery, replacement, and return conditions disclosed at purchase."),
    ] },
    { id: "vini-ai", title: "VINI AI and AI-Assisted Services", blocks: [
      p("VINI IAS may provide AI-assisted educational tools, including VINI AI, for learning, practice, answer evaluation, summarisation, doubt-solving, and related educational activities. AI-generated responses may contain inaccurate, incomplete, outdated, or misleading information. Users should independently verify important information, particularly examination notifications, legal provisions, current affairs, factual claims, and official requirements."),
      p("AI-assisted evaluations, recommendations, summaries, and scores may differ from assessments by human evaluators or official examination authorities. Unless expressly stated otherwise, AI assessments are practice aids and are not official examination results or guarantees of performance."),
      p("Users must not use AI tools to generate unlawful content, infringe third-party rights, compromise security, or misuse personal information. Availability, functionality, and usage limits may vary by subscription or programme. Processing of personal information is governed by the applicable Privacy Policy and law."),
    ] },
    { id: "user-content", title: "User-Submitted Content and Feedback", blocks: [
      p("Some features may allow users to submit questions, answers, comments, feedback, assignments, reviews, or other content. You remain responsible for your submissions and must have the necessary rights and permissions. You must not submit unlawful, defamatory, fraudulent, threatening, discriminatory, infringing, or otherwise prohibited content."),
      p("By submitting content, you grant VINI IAS permission to use, reproduce, store, and process it as reasonably necessary to provide the relevant service, operate the Platform, respond to your request, and improve the service, subject to the Privacy Policy and applicable law. Additional use of identifiable content for promotional or public purposes will be subject to applicable legal requirements and any required consent. We may remove or restrict content that violates these Terms or law."),
    ] },
    { id: "privacy", title: "Privacy and Personal Information", blocks: [
      p("Personal information collected through the Platform will be handled in accordance with our Privacy Policy and applicable data protection laws. Information may be processed for account creation and authentication, course enrolment and service delivery, payment verification, support and grievance resolution, security and fraud prevention, service improvement, technical maintenance, communications regarding purchased services, and other lawful purposes described in the Privacy Policy."),
      p("Where required, consent will be obtained for relevant processing activities. Please review our Privacy Policy to understand how personal information is collected, used, stored, disclosed, and protected."),
    ] },
    { id: "communications", title: "Communication and Notifications", blocks: [
      p("By registering, purchasing a course, or contacting VINI IAS, you may receive service-related communications by email, SMS, telephone, in-app notifications, or other channels. These may include registration confirmations, receipts, course access instructions, class schedules, educational updates, account security notices, support responses, and service announcements."),
      p("Promotional communications will be handled in accordance with applicable law and your preferences. You may opt out where an opt-out mechanism is provided. Essential transactional, security, or service-related communications may still be sent where legally permitted or required."),
    ] },
    { id: "third-party", title: "Third-Party Services and External Links", blocks: [
      p("The Platform may contain links to third-party websites, applications, payment gateways, video hosting services, or other resources governed by their own terms and privacy policies. VINI IAS does not control all third-party services and is not responsible for their independent content, availability, policies, or practices. An external link does not necessarily constitute endorsement. Nothing in this section excludes liability that cannot lawfully be excluded."),
    ] },
    { id: "availability", title: "Technical Availability and Service Interruptions", blocks: [
      p("We make reasonable efforts to maintain Platform availability. Access may be interrupted by scheduled maintenance, software updates, connectivity issues, server or hosting failures, third-party disruptions, cybersecurity incidents, or circumstances beyond our reasonable control. Where practicable, we will take reasonable steps to restore services and may temporarily suspend features for maintenance, security, legal compliance, or technical reasons."),
      p("Where an interruption materially affects a paid service, we will address the issue in accordance with the applicable course terms and law."),
    ] },
    { id: "warranties", title: "Disclaimer of Warranties", blocks: [
      p("To the extent permitted by law, the Platform and informational resources are provided subject to the terms applicable to the relevant service. We take reasonable steps to maintain content quality and security but do not warrant that every part of the Platform will be continuously available, completely error-free, or compatible with every device or software configuration. Users are responsible for maintaining suitable devices, software, and internet connectivity. Nothing in these Terms excludes any warranty, consumer right, or legal protection that cannot lawfully be excluded."),
    ] },
    { id: "liability", title: "Limitation of Liability", blocks: [
      p("To the extent permitted by law, VINI IAS will not be responsible for indirect or consequential losses arising from use of the Platform where such exclusion is legally permissible. We will not be responsible for circumstances beyond our reasonable control, subject to our obligations under applicable law. Nothing in these Terms limits or excludes liability for fraud, wilful misconduct, or any other matter for which liability cannot lawfully be limited or excluded. Nothing limits statutory consumer rights or remedies available under applicable Indian law."),
    ] },
    { id: "indemnification", title: "Indemnification", blocks: [
      p("To the extent permitted by law, you may be responsible for losses, liabilities, or reasonable costs arising directly from your unlawful use of the Platform, infringement of third-party rights, or material violation of these Terms. This provision does not apply to the extent a loss arises from the Company's own breach of law, negligence, misconduct, or other conduct for which the Company is legally responsible. Any indemnification claim will be assessed in accordance with applicable law."),
    ] },
    { id: "termination", title: "Suspension and Termination", blocks: [
      p("You may stop using the Platform at any time. VINI IAS may suspend or terminate access where reasonably necessary because of material violations of these Terms, fraudulent or unauthorised transactions, unauthorised account sharing or content distribution, attempts to compromise security, legal or regulatory requirements, or other legitimate grounds consistent with applicable law."),
      p("Where reasonably practicable, we will provide notice and an opportunity to respond. Termination does not automatically create a right to a refund; entitlement will be determined by the applicable refund policy, circumstances of termination, and law. Termination does not extinguish rights or obligations already accrued or intended to survive termination."),
    ] },
    { id: "changes", title: "Changes to These Terms", blocks: [
      p("VINI IAS may update these Terms to reflect changes in services, business practices, technology, or law. The updated version will be published on the Platform with a revised “Last Updated” date. Where required by law or where a change materially affects existing users, we will provide appropriate notice or obtain consent, as applicable."),
      p("Continued use after an update becomes effective will be subject to the updated Terms to the extent permitted by law. If you do not agree with revised Terms, discontinue use of the affected services, subject to rights and obligations arising under an existing purchase or applicable law."),
    ] },
    { id: "grievance", title: "Grievance Redressal and Customer Support", blocks: [
      p("VINI IAS endeavours to address genuine student concerns and service-related complaints within a reasonable period. For course access, payments, technical issues, study materials, or other service-related matters, contact:"),
      contact([{ label: "Company", value: "Vini Eduventure Private Limited" }, { label: "Brand", value: "VINI IAS" }, SITE, SUPPORT]),
      p("Please include your registered mobile number or email address, relevant course details, transaction reference where applicable, and a clear description of your concern. We will review complaints and respond in accordance with applicable legal requirements and our grievance procedures."),
    ] },
    { id: "governing-law", title: "Governing Law and Jurisdiction", blocks: [
      p("These Terms are governed by the laws of India. Subject to applicable law, disputes arising from these Terms shall be submitted to courts of competent jurisdiction. Nothing in this clause restricts a consumer from approaching a consumer commission, regulatory authority, or other forum where such access is available under applicable law."),
    ] },
    { id: "severability", title: "Severability", blocks: [
      p("If any provision of these Terms is held invalid, unlawful, or unenforceable by a competent authority, the remaining provisions will continue to apply to the extent permitted by law. The invalid provision will be interpreted or modified only to the extent legally permissible to give effect to its intended purpose."),
    ] },
    { id: "waiver", title: "Waiver", blocks: [
      p("A failure or delay by VINI IAS in exercising a right under these Terms does not automatically constitute a waiver of that right. Any waiver will apply only to the extent expressly provided or recognised under applicable law."),
    ] },
    { id: "entire-agreement", title: "Entire Agreement", blocks: [
      p("These Terms, together with the applicable Privacy Policy, Cancellation and Refund Policy, course descriptions, subscription conditions, and other applicable legal notices, govern your use of the Platform and the services you purchase. If a specific course agreement or mandatory legal requirement conflicts with these Terms, the conflict will be resolved in accordance with the applicable agreement and law."),
    ] },
    { id: "contact-us", title: "Contact Us", blocks: [
      p("For questions regarding these Terms and Conditions, please contact:"),
      contact([{ label: "Brand", value: "VINI IAS — a brand operated by Vini Eduventure Private Limited" }, SITE, SUPPORT]),
      p("We appreciate your trust in VINI IAS and look forward to supporting your educational journey."),
    ] },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [TERMS_AND_CONDITIONS, PRIVACY_POLICY, REFUND_POLICY];
