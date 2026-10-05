import { ExamGoalCategory } from "@/types";

/**
 * "Select Your Goal" data — categories & exams sourced from prepp.in
 * ("Choose your exam" section + each category's full listing page).
 * Order of the first six categories follows the design sketch:
 * UPSC → State PSC → SSC → Railways → Teaching → Nursing, then the rest.
 * Logos live in /public/icons/*.svg
 */
export const EXAM_CATEGORIES: ExamGoalCategory[] = [
  {
    "category": "UPSC",
    "subcategories": [
      {
        "name": "UPSC CSE",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "NDA",
        "logo": "/icons/nda-logo.svg"
      },
      {
        "name": "UPSC EPFO",
        "logo": "/icons/upsc-epfo-logo.svg"
      },
      {
        "name": "UPSC",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "IES",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "UPSC CMS",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "UPSC CAPF",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "UPSC Geo Scientist",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "UPSC IFoS",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "UPSC SO Steno",
        "logo": "/icons/upsc-logo.svg"
      },
      {
        "name": "IES ISS",
        "logo": "/icons/upsc-logo.svg"
      }
    ]
  },
  {
    "category": "State PSC",
    "subcategories": [
      {
        "name": "BPSC",
        "logo": "/icons/bpsc-logo.svg"
      },
      {
        "name": "UPPSC",
        "logo": "/icons/up-govt-logo.svg"
      },
      {
        "name": "JPSC",
        "logo": "/icons/jpsc-logo.svg"
      },
      {
        "name": "MPPSC",
        "logo": "/icons/mppsc-logo.svg"
      },
      {
        "name": "RAS (RPSC)",
        "logo": "/icons/rpsc-logo.svg"
      },
      {
        "name": "TNPSC",
        "logo": "/icons/tnpsc-logo.svg"
      },
      {
        "name": "Kerala PSC",
        "logo": "/icons/kerala-psc-logo.svg"
      },
      {
        "name": "KPSC",
        "logo": "/icons/kpsc-logo.svg"
      },
      {
        "name": "MPSC",
        "logo": "/icons/mpsc-logo.svg"
      },
      {
        "name": "OPSC",
        "logo": "/icons/opsc-logo.svg"
      },
      {
        "name": "TSPSC",
        "logo": "/icons/tspsc-logo.svg"
      },
      {
        "name": "CGPSC",
        "logo": "/icons/cgpsc-logo.svg"
      },
      {
        "name": "WBPSC",
        "logo": "/icons/wbpsc-logo.svg"
      },
      {
        "name": "GPSC",
        "logo": "/icons/gpsc-logo.svg"
      },
      {
        "name": "JKPSC",
        "logo": "/icons/jkpsc-logo.svg"
      },
      {
        "name": "HPPSC",
        "logo": "/icons/hppsc-logo.svg"
      },
      {
        "name": "APSC",
        "logo": "/icons/apsc-logo.svg"
      },
      {
        "name": "HPSC",
        "logo": "/icons/hpsc-logo.svg"
      },
      {
        "name": "PPSC",
        "logo": "/icons/ppsc-logo.svg"
      },
      {
        "name": "UKPSC",
        "logo": "/icons/ukpsc-logo.svg"
      },
      {
        "name": "NPSC",
        "logo": "/icons/npsc-logo.svg"
      },
      {
        "name": "RPSC Assistant Professor",
        "logo": "/icons/rpsc-logo.svg"
      },
      {
        "name": "KPSC Group C",
        "logo": "/icons/kpsc-logo.svg"
      },
      {
        "name": "UPPSC Staff Nurse",
        "logo": "/icons/up-govt-logo.svg"
      },
      {
        "name": "Goa PSC",
        "logo": "/icons/goa-psc-logo.svg"
      },
      {
        "name": "NHPC JE",
        "logo": "/icons/nhpc-je-logo.svg"
      },
      {
        "name": "UPPSC RO ARO",
        "logo": "/icons/up-govt-logo.svg"
      },
      {
        "name": "UPPSC GIC Lecturer",
        "logo": "/icons/uppsc-gic-lecturer-logo.svg"
      },
      {
        "name": "UKPSC JE",
        "logo": "/icons/ukpsc-logo.svg"
      },
      {
        "name": "TNPSC Combined Engineering Services",
        "logo": "/icons/tnpsc-logo.svg"
      },
      {
        "name": "APSC CCE",
        "logo": "/icons/apsc-logo.svg"
      },
      {
        "name": "OPSC OAS",
        "logo": "/icons/opsc-logo.svg"
      },
      {
        "name": "TNPSC VAO",
        "logo": "/icons/tnpsc-logo.svg"
      },
      {
        "name": "MPSC RTO",
        "logo": "/icons/mpsc-logo.svg"
      },
      {
        "name": "UPPSC BEO",
        "logo": "/icons/up-govt-logo.svg"
      },
      {
        "name": "OPSC PGT",
        "logo": "/icons/opsc-logo.svg"
      },
      {
        "name": "TNPSC Civil Judge",
        "logo": "/icons/tnpsc-logo.svg"
      },
      {
        "name": "TNPSC Group IV",
        "logo": "/icons/tnpsc-logo.svg"
      },
      {
        "name": "APPSC Polytechnic Lecturer",
        "logo": "/icons/appsc-polytechnic-lecturer-logo.svg"
      },
      {
        "name": "TNPSC Group II",
        "logo": "/icons/tnpsc-logo.svg"
      },
      {
        "name": "TSPSC Group IV",
        "logo": "/icons/tspsc-group-iv-logo.svg"
      },
      {
        "name": "KPSC Commercial Tax Officer",
        "logo": "/icons/kpsc-logo.svg"
      },
      {
        "name": "TNPSC Group III",
        "logo": "/icons/tnpsc-logo.svg"
      },
      {
        "name": "APPSC Group II",
        "logo": "/icons/appsc-group-ii-logo.svg"
      },
      {
        "name": "TNPSC Group I",
        "logo": "/icons/tamil-nadu-govt-logo.svg"
      },
      {
        "name": "State PSC",
        "logo": "/icons/state-psc-logo.svg"
      }
    ]
  },
  {
    "category": "SSC",
    "subcategories": [
      {
        "name": "SSC CGL",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "SSC CHSL",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "SSC",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "SSC MTS",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "SSC JE",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "SSC GD",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "BSSC",
        "logo": "/icons/bssc-logo.svg"
      },
      {
        "name": "JSSC",
        "logo": "/icons/jssc-logo.svg"
      },
      {
        "name": "UPSSSC",
        "logo": "/icons/upsssc-logo.svg"
      },
      {
        "name": "RSMSSB",
        "logo": "/icons/rsmssb-logo.svg"
      },
      {
        "name": "SSC CPO",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "UPSSSC PET",
        "logo": "/icons/up-govt-logo.svg"
      },
      {
        "name": "WBSSC",
        "logo": "/icons/wbssc-logo.svg"
      },
      {
        "name": "UKSSSC",
        "logo": "/icons/uksssc-logo.svg"
      },
      {
        "name": "SSC Stenographer",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "SSC Selection Post",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "Punjab Patwari",
        "logo": "/icons/punjab-patwari-logo.svg"
      },
      {
        "name": "HSSC Group D",
        "logo": "/icons/hssc-group-d-logo.svg"
      },
      {
        "name": "UPSSSC Lower PCS",
        "logo": "/icons/upsssc-logo.svg"
      },
      {
        "name": "RSMSSB Agriculture Supervisor",
        "logo": "/icons/rsmssb-logo.svg"
      },
      {
        "name": "SSC JHT",
        "logo": "/icons/ssc-logo.svg"
      },
      {
        "name": "MPPEB Vyapam",
        "logo": "/icons/mppeb-vyapam-logo.svg"
      },
      {
        "name": "RSMSSB LDC",
        "logo": "/icons/rsmssb-ldc-logo.svg"
      },
      {
        "name": "OSSSC Group C",
        "logo": "/icons/osssc-group-c-logo.svg"
      },
      {
        "name": "CG Vyapam Recruitment",
        "logo": "/icons/cg-vyapam-recruitment-logo.svg"
      },
      {
        "name": "RSMSSB Sanganak",
        "logo": "/icons/rsmssb-logo.svg"
      },
      {
        "name": "JSSC SI",
        "logo": "/icons/jssc-si-logo.svg"
      },
      {
        "name": "OSSC CGL",
        "logo": "/icons/odisha-logo.svg"
      }
    ]
  },
  {
    "category": "Railways",
    "subcategories": [
      {
        "name": "RRB NTPC",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB Recruitment",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB Group D",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "IRMS",
        "logo": "/icons/railway-logo.svg"
      },
      {
        "name": "RRB JE",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RPF Constable",
        "logo": "/icons/rpf-logo.svg"
      },
      {
        "name": "RPF SI",
        "logo": "/icons/rpf-logo.svg"
      },
      {
        "name": "RRB ALP",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB SSE",
        "logo": "/icons/railway-logo.svg"
      },
      {
        "name": "RRB Ministerial and Isolated Categories",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB Staff Nurse",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB ASM",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB Paramedical",
        "logo": "/icons/railway-logo.svg"
      },
      {
        "name": "Railways TC",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB Health and Malaria Inspector",
        "logo": "/icons/railways-logo.svg"
      },
      {
        "name": "RRB Technician",
        "logo": "/icons/railways-logo.svg"
      }
    ]
  },
  {
    "category": "Teaching",
    "subcategories": [
      {
        "name": "CBSE UGC NET",
        "logo": "/icons/cbse-ugc-net-logo.svg"
      },
      {
        "name": "CTET",
        "logo": "/icons/cbse-logo-emblem.svg"
      },
      {
        "name": "DSSSB",
        "logo": "/icons/dsssb-logo.svg"
      },
      {
        "name": "CSIR UGC NET",
        "logo": "/icons/csir-logo.svg"
      },
      {
        "name": "REET",
        "logo": "/icons/reet-logo.svg"
      },
      {
        "name": "UPTET",
        "logo": "/icons/up-govt-logo.svg"
      },
      {
        "name": "KSET",
        "logo": "/icons/kset-logo.svg"
      },
      {
        "name": "HTET",
        "logo": "/icons/htet-logo.svg"
      },
      {
        "name": "KTET",
        "logo": "/icons/ktet-logo.svg"
      },
      {
        "name": "TSTET",
        "logo": "/icons/tstet-logo.svg"
      },
      {
        "name": "NRA CET",
        "logo": "/icons/nra-cet-logo.svg"
      },
      {
        "name": "KVS Recruitment",
        "logo": "/icons/kvs-logo.svg"
      },
      {
        "name": "GSET",
        "logo": "/icons/gset-logo.svg"
      },
      {
        "name": "MAHA TET",
        "logo": "/icons/maha-tet-logo.svg"
      },
      {
        "name": "NVS Recruitment",
        "logo": "/icons/nvs-recruitment-logo.svg"
      },
      {
        "name": "APSET",
        "logo": "/icons/apset-logo.svg"
      },
      {
        "name": "TNTET",
        "logo": "/icons/tamil-nadu-govt-logo.svg"
      },
      {
        "name": "slet",
        "logo": "/icons/slet-logo.svg"
      },
      {
        "name": "WB SET",
        "logo": "/icons/wb-set-logo.svg"
      },
      {
        "name": "Super TET",
        "logo": "/icons/up-govt-logo.svg"
      },
      {
        "name": "UP TGT",
        "logo": "/icons/up-tgt-logo.svg"
      },
      {
        "name": "ASRB NET",
        "logo": "/icons/asrb-net-logo.svg"
      },
      {
        "name": "JKSET",
        "logo": "/icons/jkset-logo.svg"
      },
      {
        "name": "OTET",
        "logo": "/icons/otet-logo.svg"
      },
      {
        "name": "JTET",
        "logo": "/icons/jtet-logo.svg"
      },
      {
        "name": "EMRS Recruitment",
        "logo": "/icons/nra-cet-logo.svg"
      },
      {
        "name": "BTET",
        "logo": "/icons/btet-logo.svg"
      },
      {
        "name": "Bihar STET",
        "logo": "/icons/bihar-logo-2.svg"
      },
      {
        "name": "MH SET",
        "logo": "/icons/mh-set-logo.svg"
      },
      {
        "name": "DSSSB PRT",
        "logo": "/icons/dsssb-logo.svg"
      },
      {
        "name": "DSSSB PGT",
        "logo": "/icons/dsssb-logo.svg"
      },
      {
        "name": "MP SET",
        "logo": "/icons/mppsc-logo.svg"
      },
      {
        "name": "TN TRB Assistant Professor",
        "logo": "/icons/tn-trb-logo.svg"
      },
      {
        "name": "CG SET",
        "logo": "/icons/cg-set-logo.svg"
      },
      {
        "name": "KVS PRT",
        "logo": "/icons/kvs-logo.svg"
      },
      {
        "name": "Meghalaya TET",
        "logo": "/icons/nra-cet-logo.svg"
      },
      {
        "name": "Gujarat TET",
        "logo": "/icons/gtet-logo.svg"
      },
      {
        "name": "TN TRB Recruitment",
        "logo": "/icons/tn-trb-logo.svg"
      },
      {
        "name": "RSMSSB NTT Teacher",
        "logo": "/icons/rsmssb-ldc-logo.svg"
      },
      {
        "name": "KPSC Teacher",
        "logo": "/icons/karnataka-public-service-commission-logo.svg"
      },
      {
        "name": "NET and SET",
        "logo": "/icons/net-and-set-logo.svg"
      },
      {
        "name": "Teaching",
        "logo": "/icons/cbse-recruitment-logo.svg"
      },
      {
        "name": "Kar TET",
        "logo": "/icons/kar-tet-logo.svg"
      },
      {
        "name": "USET",
        "logo": "/icons/uset-logo.svg"
      },
      {
        "name": "Haryana SET",
        "logo": "/icons/haryana-set-logo.svg"
      },
      {
        "name": "TNSET",
        "logo": "/icons/tnset-logo.svg"
      },
      {
        "name": "Bihar SET",
        "logo": "/icons/bihar-logo-2.svg"
      },
      {
        "name": "CSIR NET Life Science",
        "logo": "/icons/csir-logo.svg"
      },
      {
        "name": "Haryana CET",
        "logo": "/icons/haryana-cet-logo.svg"
      },
      {
        "name": "BPSC TRE",
        "logo": "/icons/bpsc-tre-logo.svg"
      }
    ]
  },
  {
    "category": "Nursing",
    "subcategories": [
      {
        "name": "AIIMS Nursing Officer",
        "logo": "/icons/aiims-logo.svg"
      },
      {
        "name": "Nursing",
        "logo": "/icons/nursing-logo.svg"
      }
    ]
  },
  {
    "category": "Board",
    "subcategories": [
      {
        "name": "CBSE CLASS XII",
        "logo": "/icons/cbse-logo-emblem.svg"
      },
      {
        "name": "CBSE X",
        "logo": "/icons/cbse-logo-emblem.svg"
      },
      {
        "name": "ISC",
        "logo": "/icons/cisce-logo.svg"
      },
      {
        "name": "ICSE Class X Board",
        "logo": "/icons/cisce-logo.svg"
      },
      {
        "name": "Board",
        "logo": "/icons/cbse-logo.svg"
      }
    ]
  },
  {
    "category": "Study Abroad",
    "subcategories": [
      {
        "name": "IELTS",
        "logo": "/icons/ielts-logo.svg"
      },
      {
        "name": "TOEFL",
        "logo": "/icons/toefl-logo.svg"
      },
      {
        "name": "GMAT",
        "logo": "/icons/gmat-logo.svg"
      },
      {
        "name": "SAT",
        "logo": "/icons/sat-logo.svg"
      },
      {
        "name": "Duolingo",
        "logo": "/icons/duolingo-logo.svg"
      },
      {
        "name": "Study Abroad",
        "logo": "/icons/study-abroad-logo.svg"
      }
    ]
  },
  {
    "category": "Defence",
    "subcategories": [
      {
        "name": "CDS",
        "logo": "/icons/cds-logo.svg"
      },
      {
        "name": "NDA",
        "logo": "/icons/nda-logo.svg"
      },
      {
        "name": "AFCAT",
        "logo": "/icons/afcat-logo.svg"
      },
      {
        "name": "Indian Coast Guard",
        "logo": "/icons/indian-coast-guard-logo.svg"
      },
      {
        "name": "ACC",
        "logo": "/icons/defence-logo.svg"
      },
      {
        "name": "SSB Head Constable",
        "logo": "/icons/ssb-logo.svg"
      },
      {
        "name": "BSF Recruitment",
        "logo": "/icons/bsf-logo.svg"
      },
      {
        "name": "DRDO Recruitment",
        "logo": "/icons/drdo-logo.svg"
      },
      {
        "name": "ITBP Recruitment",
        "logo": "/icons/itbp-logo.svg"
      },
      {
        "name": "Defence",
        "logo": "/icons/defence-logo.svg"
      },
      {
        "name": "IB ACIO",
        "logo": "/icons/ib-logo.svg"
      },
      {
        "name": "INET",
        "logo": "/icons/indian-navy-logo.svg"
      },
      {
        "name": "Indian Navy MR",
        "logo": "/icons/indian-coast-guard-logo.svg"
      },
      {
        "name": "Territorial Army",
        "logo": "/icons/territorial-army-logo.svg"
      },
      {
        "name": "Indian Coast Guard Assistant Commandant",
        "logo": "/icons/indian-coast-guard-assistant-commandant-logo.svg"
      },
      {
        "name": "SSB Constable",
        "logo": "/icons/ssb-logo.svg"
      },
      {
        "name": "BSF Constable",
        "logo": "/icons/bsf-logo-2.svg"
      },
      {
        "name": "Indian Army GD",
        "logo": "/icons/indian-army-gd-logo.svg"
      },
      {
        "name": "Indian Navy SSR AA",
        "logo": "/icons/indian-navy-logo.svg"
      },
      {
        "name": "CRPF Constable",
        "logo": "/icons/crpf-constable-logo.svg"
      },
      {
        "name": "Indian Army Technical",
        "logo": "/icons/indian-army-technical-logo.svg"
      },
      {
        "name": "Air Force Group Y",
        "logo": "/icons/indian-air-force-logo.svg"
      },
      {
        "name": "WB Excise Constable",
        "logo": "/icons/west-bengal-police-logo.svg"
      },
      {
        "name": "Air Force Group X",
        "logo": "/icons/indian-air-force-logo.svg"
      },
      {
        "name": "Para Commando",
        "logo": "/icons/para-commando-logo.svg"
      }
    ]
  },
  {
    "category": "Banking",
    "subcategories": [
      {
        "name": "SBI PO",
        "logo": "/icons/sbi-logo.svg"
      },
      {
        "name": "IBPS PO",
        "logo": "/icons/ibps-logo.svg"
      },
      {
        "name": "RBI Grade B",
        "logo": "/icons/rbi-grade-b-logo.svg"
      },
      {
        "name": "IBPS RRB",
        "logo": "/icons/ibps-logo.svg"
      },
      {
        "name": "SBI Clerk",
        "logo": "/icons/sbi-logo.svg"
      },
      {
        "name": "IBPS Clerk",
        "logo": "/icons/ibps-logo.svg"
      },
      {
        "name": "Banking",
        "logo": "/icons/banking-exams-logo.svg"
      },
      {
        "name": "IBPS SO",
        "logo": "/icons/ibps-logo.svg"
      },
      {
        "name": "SBI SO",
        "logo": "/icons/sbi-logo.svg"
      },
      {
        "name": "NABARD Grade B",
        "logo": "/icons/nabard-logo.svg"
      },
      {
        "name": "NABARD Grade A",
        "logo": "/icons/nabard-logo.svg"
      },
      {
        "name": "SBI Apprentice",
        "logo": "/icons/sbi-logo.svg"
      },
      {
        "name": "NIACL AO",
        "logo": "/icons/niacl-ao-logo.svg"
      },
      {
        "name": "SBI CBO",
        "logo": "/icons/sbi-logo.svg"
      },
      {
        "name": "SEBI Grade A",
        "logo": "/icons/sebi-grade-a-logo.svg"
      },
      {
        "name": "IDBI Assistant Manager",
        "logo": "/icons/idbi-assistant-manager-logo.svg"
      },
      {
        "name": "IPPB Recruitment",
        "logo": "/icons/ippb-recruitment-logo.svg"
      },
      {
        "name": "Bank Of India",
        "logo": "/icons/bank-of-india-recruitment-logo.svg"
      },
      {
        "name": "RBI Assistant Recruitment",
        "logo": "/icons/rbi-assistant-logo.svg"
      },
      {
        "name": "Federal Bank PO",
        "logo": "/icons/federal-bank-po-logo.svg"
      },
      {
        "name": "IBPS RRB Clerk",
        "logo": "/icons/ibps-logo.svg"
      }
    ]
  },
  {
    "category": "Engineering",
    "subcategories": [
      {
        "name": "JEE Main",
        "logo": "/icons/nta-logo.svg"
      },
      {
        "name": "JEE Advanced",
        "logo": "/icons/jee-advance-logo.svg"
      },
      {
        "name": "Engineering",
        "logo": "/icons/engg-logo.svg"
      },
      {
        "name": "BITSAT",
        "logo": "/icons/bits-pilani-logo.svg"
      },
      {
        "name": "UCEED",
        "logo": "/icons/uceed-logo.svg"
      },
      {
        "name": "CEED",
        "logo": "/icons/ceed-logo.svg"
      },
      {
        "name": "KEAM",
        "logo": "/icons/keam-logo.svg"
      },
      {
        "name": "TS EAMCET",
        "logo": "/icons/ts-eamcet-logo.svg"
      },
      {
        "name": "KCET",
        "logo": "/icons/kcet-logo.svg"
      },
      {
        "name": "WBJEE",
        "logo": "/icons/wbjee-logo.svg"
      },
      {
        "name": "AP EAPCET",
        "logo": "/icons/ap-eapcet-logo.svg"
      },
      {
        "name": "MHT CET",
        "logo": "/icons/mht-cet-logo.svg"
      },
      {
        "name": "VITEEE",
        "logo": "/icons/viteee-logo.svg"
      },
      {
        "name": "JEECUP",
        "logo": "/icons/jeecup-logo.svg"
      },
      {
        "name": "SET",
        "logo": "/icons/set-logo.svg"
      },
      {
        "name": "OJEE",
        "logo": "/icons/ojee-logo.svg"
      },
      {
        "name": "BCECE",
        "logo": "/icons/bcece-logo.svg"
      },
      {
        "name": "AP PGECET",
        "logo": "/icons/andhra-university-logo.svg"
      },
      {
        "name": "COMEDK UGET",
        "logo": "/icons/comedk-uget-logo.svg"
      },
      {
        "name": "TS ECET",
        "logo": "/icons/tsche-logo.svg"
      },
      {
        "name": "AP POLYCET",
        "logo": "/icons/ap-polycet-logo.svg"
      },
      {
        "name": "DEEET",
        "logo": "/icons/deeet-logo.svg"
      },
      {
        "name": "OUAT",
        "logo": "/icons/ouat-logo.svg"
      },
      {
        "name": "TSICET",
        "logo": "/icons/tsicet-logo.svg"
      },
      {
        "name": "MET",
        "logo": "/icons/met-logo.svg"
      },
      {
        "name": "NEST",
        "logo": "/icons/nest-logo.svg"
      },
      {
        "name": "DCECE",
        "logo": "/icons/dcece-logo.svg"
      },
      {
        "name": "TG POLYCET",
        "logo": "/icons/ts-polycet-logo.svg"
      },
      {
        "name": "IIT JAM",
        "logo": "/icons/iit-jam-logo.svg"
      },
      {
        "name": "GUJCET",
        "logo": "/icons/gujcet-logo.svg"
      },
      {
        "name": "SRMJEEE",
        "logo": "/icons/srmjee-logo.svg"
      },
      {
        "name": "CEETA PG",
        "logo": "/icons/ceeta-pg-logo.svg"
      },
      {
        "name": "AP ECET",
        "logo": "/icons/ap-ect-logo.svg"
      },
      {
        "name": "TG EDCET",
        "logo": "/icons/tsche-logo.svg"
      },
      {
        "name": "TG PGECET",
        "logo": "/icons/ts-pgecet-logo.svg"
      },
      {
        "name": "NCHMCT JEE",
        "logo": "/icons/nchmct-logo.svg"
      }
    ]
  },
  {
    "category": "Medical",
    "subcategories": [
      {
        "name": "NEET",
        "logo": "/icons/nta-logo.svg"
      },
      {
        "name": "Medical",
        "logo": "/icons/engg-logo.svg"
      },
      {
        "name": "TS EAMCET",
        "logo": "/icons/ts-eamcet-logo.svg"
      },
      {
        "name": "KCET",
        "logo": "/icons/kcet-logo.svg"
      },
      {
        "name": "MHT CET",
        "logo": "/icons/mht-cet-logo.svg"
      },
      {
        "name": "SET",
        "logo": "/icons/set-logo.svg"
      },
      {
        "name": "BCECE",
        "logo": "/icons/bcece-logo.svg"
      },
      {
        "name": "INI CET",
        "logo": "/icons/ini-cet-logo.svg"
      },
      {
        "name": "NEET PG",
        "logo": "/icons/neet-pg-logo.svg"
      },
      {
        "name": "GPAT",
        "logo": "/icons/gpat-logo.svg"
      }
    ]
  },
  {
    "category": "Management",
    "subcategories": [
      {
        "name": "CAT",
        "logo": "/icons/iim-kozhikode-logo.svg"
      },
      {
        "name": "CMAT",
        "logo": "/icons/cmat-logo.svg"
      },
      {
        "name": "MAT",
        "logo": "/icons/mat-exam-logo.svg"
      },
      {
        "name": "SNAP",
        "logo": "/icons/snap-logo.svg"
      },
      {
        "name": "XAT",
        "logo": "/icons/xavier-aptitude-test-logo.svg"
      },
      {
        "name": "NMAT",
        "logo": "/icons/nmat-logo.svg"
      },
      {
        "name": "IPMAT",
        "logo": "/icons/ipmat-logo.svg"
      },
      {
        "name": "ATMA",
        "logo": "/icons/atma-logo.svg"
      },
      {
        "name": "MAHCET",
        "logo": "/icons/mht-cet-logo.svg"
      }
    ]
  },
  {
    "category": "Police",
    "subcategories": [
      {
        "name": "TNUSRB",
        "logo": "/icons/tamil-nadu-logo.svg"
      },
      {
        "name": "Delhi Police",
        "logo": "/icons/delhi-police-logo.svg"
      },
      {
        "name": "Rajasthan Police Constable",
        "logo": "/icons/rajasthan-logo.svg"
      },
      {
        "name": "Punjab Police Constable",
        "logo": "/icons/punjab-police-constable-logo.svg"
      },
      {
        "name": "Delhi Police Head Constable",
        "logo": "/icons/delhi-logo.svg"
      },
      {
        "name": "UP Police Constable",
        "logo": "/icons/up-police-constable-logo.svg"
      },
      {
        "name": "HP Police",
        "logo": "/icons/hp-police-logo.svg"
      },
      {
        "name": "West Bengal Police",
        "logo": "/icons/west-bengal-police-logo.svg"
      },
      {
        "name": "Assam Police",
        "logo": "/icons/assam-police-logo.svg"
      },
      {
        "name": "Bihar Police Constable",
        "logo": "/icons/bihar-logo.svg"
      },
      {
        "name": "MP Police Constable",
        "logo": "/icons/mp-police-logo.svg"
      },
      {
        "name": "UP Police",
        "logo": "/icons/up-police-logo.svg"
      },
      {
        "name": "Telangana Police",
        "logo": "/icons/telangana-police-logo.svg"
      },
      {
        "name": "Assam Police SI",
        "logo": "/icons/assam-police-logo.svg"
      },
      {
        "name": "Karnataka Police",
        "logo": "/icons/karnataka-state-police-logo.svg"
      },
      {
        "name": "Rajasthan Police",
        "logo": "/icons/rajasthan-logo.svg"
      },
      {
        "name": "Delhi Police SI",
        "logo": "/icons/delhi-logo.svg"
      },
      {
        "name": "Gujarat Police",
        "logo": "/icons/gujarat-logo.svg"
      },
      {
        "name": "Haryana Police SI",
        "logo": "/icons/police-logo.svg"
      },
      {
        "name": "Rajasthan Police SI",
        "logo": "/icons/rajasthan-police-si-logo.svg"
      },
      {
        "name": "Bihar Police",
        "logo": "/icons/bihar-logo.svg"
      },
      {
        "name": "Punjab Police SI",
        "logo": "/icons/punjab-logo.svg"
      },
      {
        "name": "Haryana Police",
        "logo": "/icons/haryana-logo.svg"
      },
      {
        "name": "Bihar Police SI",
        "logo": "/icons/bihar-police-si-logo.svg"
      },
      {
        "name": "Kerala Police",
        "logo": "/icons/kerala-police-logo.svg"
      },
      {
        "name": "WB Police SI",
        "logo": "/icons/west-bengal-police-logo.svg"
      },
      {
        "name": "Jharkhand Police",
        "logo": "/icons/jharkhand-police-logo.svg"
      },
      {
        "name": "Karnataka Police Constable",
        "logo": "/icons/karnataka-police-logo.svg"
      },
      {
        "name": "AP Police Constable",
        "logo": "/icons/ap-police-constable-logo.svg"
      },
      {
        "name": "MP Police SI",
        "logo": "/icons/mp-police-logo.svg"
      },
      {
        "name": "Maharashtra Police Constable",
        "logo": "/icons/maharashtra-police-constable-logo.svg"
      },
      {
        "name": "Andhra Pradesh Police",
        "logo": "/icons/ap-police-constable-logo.svg"
      },
      {
        "name": "Maharashtra Police SI",
        "logo": "/icons/maharashtra-police-si-logo.svg"
      },
      {
        "name": "Police",
        "logo": "/icons/delhi-police-mts-logo.svg"
      }
    ]
  },
  {
    "category": "Science",
    "subcategories": [
      {
        "name": "JEE Main",
        "logo": "/icons/nta-logo.svg"
      },
      {
        "name": "NEET",
        "logo": "/icons/nta-logo.svg"
      },
      {
        "name": "JEE Advanced",
        "logo": "/icons/jee-advance-logo.svg"
      },
      {
        "name": "CLAT",
        "logo": "/icons/clat-logo.svg"
      },
      {
        "name": "AILET",
        "logo": "/icons/ailet-logo.svg"
      },
      {
        "name": "CBSE X",
        "logo": "/icons/cbse-logo-emblem.svg"
      },
      {
        "name": "GRE",
        "logo": "/icons/gre-logo.svg"
      },
      {
        "name": "IISER",
        "logo": "/icons/iiser-logo.svg"
      }
    ]
  },
  {
    "category": "PSU Recruitment",
    "subcategories": [
      {
        "name": "India Post GDS",
        "logo": "/icons/india-post-gds-logo.svg"
      },
      {
        "name": "Post Office Recruitment",
        "logo": "/icons/india-post-logo.svg"
      },
      {
        "name": "KPTCL Recruitment",
        "logo": "/icons/kptcl-logo.svg"
      },
      {
        "name": "FSSAI Recruitment",
        "logo": "/icons/fssai-logo.svg"
      },
      {
        "name": "IOCL Recruitment",
        "logo": "/icons/iocl-logo.svg"
      },
      {
        "name": "BARC Recruitment",
        "logo": "/icons/barc-recruitment-logo.svg"
      },
      {
        "name": "FCI Recruitment",
        "logo": "/icons/fci-logo.svg"
      },
      {
        "name": "ICAR IARI",
        "logo": "/icons/icar-iari-logo.svg"
      },
      {
        "name": "ONGC Recruitment",
        "logo": "/icons/ongc-recruitment-logo.svg"
      },
      {
        "name": "PSPCL",
        "logo": "/icons/pspcl-logo.svg"
      },
      {
        "name": "BEL Recruitment",
        "logo": "/icons/bel-recruitment-logo.svg"
      },
      {
        "name": "Food Inspector",
        "logo": "/icons/fci-logo-2.svg"
      },
      {
        "name": "RTO Officer",
        "logo": "/icons/rto-officer-logo.svg"
      },
      {
        "name": "Anganwadi Supervisor",
        "logo": "/icons/rto-officer-logo.svg"
      },
      {
        "name": "AIIMS Recruitment",
        "logo": "/icons/aiims-logo.svg"
      },
      {
        "name": "HAL Recruitment",
        "logo": "/icons/hal-management-trainee-logo.svg"
      },
      {
        "name": "Postal Assistant",
        "logo": "/icons/india-post-logo.svg"
      },
      {
        "name": "DMRC",
        "logo": "/icons/dmrc-logo.svg"
      },
      {
        "name": "ICMR Recruitment",
        "logo": "/icons/icmr-logo.svg"
      },
      {
        "name": "NHPC JE",
        "logo": "/icons/nhpc-je-logo.svg"
      },
      {
        "name": "UPPSC GIC Lecturer",
        "logo": "/icons/uppsc-gic-lecturer-logo.svg"
      },
      {
        "name": "NIC Scientist B",
        "logo": "/icons/nic-scientist-b-logo.svg"
      },
      {
        "name": "BSPHCL",
        "logo": "/icons/bsphcl-logo.svg"
      },
      {
        "name": "Allahabad High Court RO",
        "logo": "/icons/allahabad-high-court-ro-logo.svg"
      },
      {
        "name": "CWC",
        "logo": "/icons/cwc-central-warehousing-corporation-logo.svg"
      },
      {
        "name": "IB Security Assistant",
        "logo": "/icons/ib-security-assistant-logo.svg"
      },
      {
        "name": "AAI JE ATC",
        "logo": "/icons/aai-je-atc-logo.svg"
      },
      {
        "name": "DMER Recruitment",
        "logo": "/icons/dmer-recruitment-logo.svg"
      },
      {
        "name": "APPSC Polytechnic Lecturer",
        "logo": "/icons/appsc-polytechnic-lecturer-logo.svg"
      },
      {
        "name": "PSU Recruitment",
        "logo": "/icons/psu-recruitment-logo.svg"
      },
      {
        "name": "GATE",
        "logo": "/icons/gate-logo.svg"
      },
      {
        "name": "CUET PG",
        "logo": "/icons/nta-logo-2.svg"
      },
      {
        "name": "CUET UG",
        "logo": "/icons/nta-logo-2.svg"
      }
    ]
  },
  {
    "category": "Law",
    "subcategories": [
      {
        "name": "CLAT",
        "logo": "/icons/clat-logo.svg"
      },
      {
        "name": "AILET",
        "logo": "/icons/ailet-logo.svg"
      },
      {
        "name": "AIBE",
        "logo": "/icons/aibe-logo.svg"
      },
      {
        "name": "TS LAWCET",
        "logo": "/icons/tsche-logo.svg"
      },
      {
        "name": "AP LAWCET",
        "logo": "/icons/ap-lawcet-logo.svg"
      }
    ]
  },
  {
    "category": "Arts",
    "subcategories": [
      {
        "name": "CLAT",
        "logo": "/icons/clat-logo.svg"
      },
      {
        "name": "AILET",
        "logo": "/icons/ailet-logo.svg"
      },
      {
        "name": "CBSE X",
        "logo": "/icons/cbse-logo-emblem.svg"
      },
      {
        "name": "NIFT",
        "logo": "/icons/nift-logo.svg"
      },
      {
        "name": "IIFT",
        "logo": "/icons/iift-logo.svg"
      },
      {
        "name": "IPU CET",
        "logo": "/icons/ipu-cet-logo.svg"
      }
    ]
  },
  {
    "category": "Insurance",
    "subcategories": [
      {
        "name": "ESIC Recruitment",
        "logo": "/icons/esic-logo.svg"
      },
      {
        "name": "LIC AAO",
        "logo": "/icons/lic-logo.svg"
      },
      {
        "name": "LIC ADO",
        "logo": "/icons/lic-logo.svg"
      },
      {
        "name": "OICL",
        "logo": "/icons/oicl-logo.svg"
      },
      {
        "name": "NICL",
        "logo": "/icons/nicl-recruitment-logo.svg"
      },
      {
        "name": "Insurance",
        "logo": "/icons/lic-aao-logo.svg"
      }
    ]
  },
  {
    "category": "Scholarship",
    "subcategories": [
      {
        "name": "NTSE",
        "logo": "/icons/ntse-logo.svg"
      },
      {
        "name": "Scholarship",
        "logo": "/icons/scholarship-logo.svg"
      }
    ]
  }
];
