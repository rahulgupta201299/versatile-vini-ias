export interface SubCategory {
  name: string;
  logo: string | null;
}

export interface ExamGoalCategory {
  category: string;
  subcategories: SubCategory[];
}

export const EXAM_CATEGORIES: ExamGoalCategory[] = [
  {
    "category": "Board",
    "subcategories": [
      {
        "name": "CBSE CLASS XII",
        "logo": "/icons/cbse-class-12.png"
      },
      {
        "name": "CBSE X",
        "logo": "/icons/cbse-class-10.png"
      },
      {
        "name": "ISC",
        "logo": "/icons/cisce-logo.png"
      },
      {
        "name": "ICSE Class X Board",
        "logo": "/icons/cisce-logo.png"
      },
      {
        "name": "Board",
        "logo": "/icons/cbse-logo.png"
      }
    ]
  },
  {
    "category": "Study Abroad",
    "subcategories": [
      {
        "name": "IELTS",
        "logo": "/icons/ielts-logo.png"
      },
      {
        "name": "TOEFL",
        "logo": "/icons/toefl-logo.png"
      },
      {
        "name": "GMAT",
        "logo": "/icons/gmat-logo.jpg"
      },
      {
        "name": "SAT",
        "logo": "/icons/sat-logo.jpg"
      },
      {
        "name": "Duolingo",
        "logo": "/icons/duolingo-logo.png"
      },
      {
        "name": "Study Abroad",
        "logo": "/icons/study-abroad.png"
      }
    ]
  },
  {
    "category": "UPSC",
    "subcategories": [
      {
        "name": "IAS Exam",
        "logo": "/icons/upsc-logo.png"
      },
      {
        "name": "UPSC",
        "logo": "/icons/upsc-logo.png"
      },
      {
        "name": "IES",
        "logo": "/icons/upsc-logo.png"
      },
      {
        "name": "UPSC CMS",
        "logo": "/icons/upsc-logo.png"
      },
      {
        "name": "UPSC EPFO",
        "logo": "/icons/upsc-epfo-logo.png"
      },
      {
        "name": "UPSC CAPF",
        "logo": "/icons/upsc-logo.png"
      },
      {
        "name": "UPSC Geo Scientist",
        "logo": "/icons/upsc-logo.png"
      },
      {
        "name": "UPSC IFoS",
        "logo": "/icons/upsc-logo.png"
      }
    ]
  },
  {
    "category": "SSC",
    "subcategories": [
      {
        "name": "SSC CGL",
        "logo": "/icons/ssc-logo.png"
      },
      {
        "name": "SSC CHSL",
        "logo": "/icons/ssc-logo.png"
      },
      {
        "name": "SSC",
        "logo": "/icons/ssc-logo.png"
      },
      {
        "name": "SSC MTS",
        "logo": "/icons/ssc-logo.png"
      },
      {
        "name": "SSC JE",
        "logo": "/icons/ssc-logo.png"
      },
      {
        "name": "SSC GD",
        "logo": "/icons/ssc-logo.png"
      },
      {
        "name": "BSSC",
        "logo": "/icons/ssc-logo-bssc.png"
      },
      {
        "name": "JSSC",
        "logo": "/icons/jssc.png"
      }
    ]
  },
  {
    "category": "State PSC",
    "subcategories": [
      {
        "name": "BPSC",
        "logo": "/icons/state-psc-logo-bpsc.png"
      },
      {
        "name": "TNPSC",
        "logo": "/icons/state-psc-logo-tnpsc.jpg"
      },
      {
        "name": "Kerala PSC",
        "logo": "/icons/state-psc-logo-kerala-psc.jpg"
      },
      {
        "name": "KPSC",
        "logo": "/icons/state-psc-logo-kpsc.jpg"
      },
      {
        "name": "UPPSC",
        "logo": "/icons/state-psc-logo-uppsc.png"
      },
      {
        "name": "MPSC",
        "logo": "/icons/state-psc-logo-mpsc.jpg"
      },
      {
        "name": "RPSC",
        "logo": "/icons/state-psc-logo-rpsc.jpg"
      },
      {
        "name": "OPSC",
        "logo": "/icons/state-psc-logo-opsc.jpg"
      }
    ]
  },
  {
    "category": "Teaching",
    "subcategories": [
      {
        "name": "CBSE UGC NET",
        "logo": "/icons/teaching-logo-s-cbse-ugc-net.png"
      },
      {
        "name": "CTET",
        "logo": "/icons/cbse.png"
      },
      {
        "name": "DSSSB",
        "logo": "/icons/teaching-logo-s-dsssb.png"
      },
      {
        "name": "CSIR UGC NET",
        "logo": "/icons/council-of-scientific-and-industrial-research-logo.png"
      },
      {
        "name": "REET",
        "logo": "/icons/2020-10-20.png"
      },
      {
        "name": "UPTET",
        "logo": "/icons/uptet.png"
      },
      {
        "name": "KSET",
        "logo": "/icons/teaching-logo-s-kset.png"
      },
      {
        "name": "HTET",
        "logo": "/icons/teaching-logo-s-htet.jpg"
      }
    ]
  },
  {
    "category": "Railways",
    "subcategories": [
      {
        "name": "RRB NTPC",
        "logo": "/icons/railways-png.png"
      },
      {
        "name": "RRB Recruitment",
        "logo": "/icons/railways-png.png"
      },
      {
        "name": "RRB Group D",
        "logo": "/icons/railways-png.png"
      },
      {
        "name": "IRMS",
        "logo": "/icons/railway-png.png"
      },
      {
        "name": "RRB JE",
        "logo": "/icons/railways-png.png"
      },
      {
        "name": "RPF Constable",
        "logo": "/icons/rpf-constable.png"
      },
      {
        "name": "RPF SI",
        "logo": "/icons/rpf-si.png"
      },
      {
        "name": "RRB ALP",
        "logo": "/icons/railways-png.png"
      }
    ]
  },
  {
    "category": "Defence",
    "subcategories": [
      {
        "name": "CDS",
        "logo": "/icons/cds-logo-png.png"
      },
      {
        "name": "NDA",
        "logo": "/icons/nda-admit-card-2016-download-nda-1-2016-admit-card-nda-exam-2016-call-letter-released-1.jpg"
      },
      {
        "name": "AFCAT",
        "logo": "/icons/defence-logo-s-afcat.jpg"
      },
      {
        "name": "Indian Coast Guard",
        "logo": "/icons/mr-png.png"
      },
      {
        "name": "ACC",
        "logo": "/icons/acc-png.png"
      },
      {
        "name": "SSB Head Constable",
        "logo": "/icons/ssb-png.png"
      },
      {
        "name": "BSF Recruitment",
        "logo": "/icons/bsf.png"
      },
      {
        "name": "DRDO Recruitment",
        "logo": "/icons/drdo-png.png"
      }
    ]
  },
  {
    "category": "Banking",
    "subcategories": [
      {
        "name": "SBI PO",
        "logo": "/icons/banking-logo-s-sbi-clerk.png"
      },
      {
        "name": "IBPS PO",
        "logo": "/icons/banking-logo-s-ibps-po.png"
      },
      {
        "name": "RBI Grade B",
        "logo": "/icons/rbi-logo-391323ee0e-seeklogo-com.png"
      },
      {
        "name": "IBPS RRB",
        "logo": "/icons/banking-logo-s-ibps-rrb.png"
      },
      {
        "name": "SBI Clerk",
        "logo": "/icons/banking-logo-s-sbi-clerk.png"
      },
      {
        "name": "IBPS Clerk",
        "logo": "/icons/banking-logo-s-ibps-clerk.png"
      },
      {
        "name": "Banking",
        "logo": "/icons/banking-logo-s-banking-exams.png"
      },
      {
        "name": "IBPS SO",
        "logo": "/icons/banking-logo-s-ibps-so.png"
      }
    ]
  },
  {
    "category": "Engineering",
    "subcategories": [
      {
        "name": "JEE Main",
        "logo": "/icons/nta-logo.png"
      },
      {
        "name": "JEE Advanced",
        "logo": "/icons/jee-advance.png"
      },
      {
        "name": "Engineering",
        "logo": "/icons/engg-logo.png"
      },
      {
        "name": "BITSAT",
        "logo": "/icons/bits-pilani-logo.jpg"
      },
      {
        "name": "UCEED",
        "logo": "/icons/iit-bombay.jpg"
      },
      {
        "name": "CEED",
        "logo": "/icons/ceed-2024-logo-3.png"
      },
      {
        "name": "KEAM",
        "logo": "/icons/keam-logo.jpg"
      },
      {
        "name": "TS EAMCET",
        "logo": "/icons/ts-eamcet-logo.jpg"
      }
    ]
  },
  {
    "category": "Medical",
    "subcategories": [
      {
        "name": "NEET",
        "logo": "/icons/nta-logo.png"
      },
      {
        "name": "Medical",
        "logo": "/icons/engg-logo.png"
      },
      {
        "name": "TS EAMCET",
        "logo": "/icons/ts-eamcet-logo.jpg"
      },
      {
        "name": "KCET",
        "logo": "/icons/kcet-logo.jpg"
      },
      {
        "name": "MHT CET",
        "logo": "/icons/mht-cet-logo.png"
      },
      {
        "name": "SET",
        "logo": "/icons/set-logo.png"
      },
      {
        "name": "BCECE",
        "logo": "/icons/bcece-logo.png"
      },
      {
        "name": "INI CET",
        "logo": "/icons/ini-cet-7500166-logo.jpeg"
      }
    ]
  },
  {
    "category": "Management",
    "subcategories": [
      {
        "name": "CAT",
        "logo": "/icons/iim-kozhikode-logo-svg.jpg"
      },
      {
        "name": "CMAT",
        "logo": "/icons/cmat-logo.png"
      },
      {
        "name": "MAT",
        "logo": "/icons/mat-exam-logo.png"
      },
      {
        "name": "Management",
        "logo": null
      },
      {
        "name": "SNAP",
        "logo": "/icons/snap-logo.webp"
      },
      {
        "name": "XAT",
        "logo": "/icons/xavier-aptitude-test-logo.jpg"
      },
      {
        "name": "NMAT",
        "logo": "/icons/nmat.png"
      },
      {
        "name": "IPMAT",
        "logo": "/icons/ipmat.png"
      }
    ]
  },
  {
    "category": "Police",
    "subcategories": [
      {
        "name": "TNUSRB",
        "logo": "/icons/tamil-nadu-png.png"
      },
      {
        "name": "Delhi Police",
        "logo": "/icons/defence-logo-s-delhi-police.jpg"
      },
      {
        "name": "Rajasthan Police Constable",
        "logo": "/icons/rajasthan-png.png"
      },
      {
        "name": "Punjab Police Constable",
        "logo": "/icons/defence-logo-s-punjab-police-constable.png"
      },
      {
        "name": "Delhi Police Head Constable",
        "logo": "/icons/delhi-png.png"
      },
      {
        "name": "UP Police Constable",
        "logo": "/icons/defence-logo-s-up-police-constable.png"
      },
      {
        "name": "HP Police",
        "logo": "/icons/hp-police.png"
      },
      {
        "name": "West Bengal Police",
        "logo": "/icons/defence-logo-s-west-bangal-police.png"
      }
    ]
  },
  {
    "category": "Science",
    "subcategories": [
      {
        "name": "JEE Main",
        "logo": "/icons/nta-logo.png"
      },
      {
        "name": "NEET",
        "logo": "/icons/nta-logo.png"
      },
      {
        "name": "JEE Advanced",
        "logo": "/icons/jee-advance.png"
      },
      {
        "name": "CLAT",
        "logo": "/icons/clat-logo.png"
      },
      {
        "name": "AILET",
        "logo": "/icons/ailet-logo.png"
      },
      {
        "name": "Science",
        "logo": null
      },
      {
        "name": "CBSE X",
        "logo": "/icons/cbse-class-10.png"
      },
      {
        "name": "GRE",
        "logo": "/icons/gre-logo.jpg"
      }
    ]
  },
  {
    "category": "PSU Recruitment",
    "subcategories": [
      {
        "name": "India Post GDS",
        "logo": "/icons/india-post-gds.png"
      },
      {
        "name": "Post Office Recruitment",
        "logo": "/icons/psu-recruitment-logo-post-office-recruitment.png"
      },
      {
        "name": "KPTCL Recruitment",
        "logo": "/icons/kptcl-png.png"
      },
      {
        "name": "FSSAI Recruitment",
        "logo": "/icons/fssai-logo.png"
      },
      {
        "name": "IOCL Recruitment",
        "logo": "/icons/iocl-png.png"
      },
      {
        "name": "BARC Recruitment",
        "logo": "/icons/barc-recruitment-2020-1.png"
      },
      {
        "name": "FCI Recruitment",
        "logo": "/icons/fci-logo.png"
      },
      {
        "name": "ICAR IARI",
        "logo": "/icons/psu-recruitment-logo-icar-iari.png"
      }
    ]
  },
  {
    "category": "Law",
    "subcategories": [
      {
        "name": "CLAT",
        "logo": "/icons/clat-logo.png"
      },
      {
        "name": "AILET",
        "logo": "/icons/ailet-logo.png"
      },
      {
        "name": "Law",
        "logo": null
      },
      {
        "name": "AIBE",
        "logo": "/icons/aibe-logo.png"
      },
      {
        "name": "TS LAWCET",
        "logo": "/icons/ts-lawcet.png"
      },
      {
        "name": "AP LAWCET",
        "logo": "/icons/ap-lawcet-logo.png"
      }
    ]
  },
  {
    "category": "Arts",
    "subcategories": [
      {
        "name": "CLAT",
        "logo": "/icons/clat-logo.png"
      },
      {
        "name": "AILET",
        "logo": "/icons/ailet-logo.png"
      },
      {
        "name": "Arts",
        "logo": null
      },
      {
        "name": "CBSE X",
        "logo": "/icons/cbse-class-10.png"
      },
      {
        "name": "NIFT",
        "logo": "/icons/nift-logo.png"
      },
      {
        "name": "IIFT",
        "logo": "/icons/iift.png"
      },
      {
        "name": "IPU CET",
        "logo": "/icons/ipu-cet.png"
      }
    ]
  },
  {
    "category": "Insurance",
    "subcategories": [
      {
        "name": "ESIC Recruitment",
        "logo": "/icons/esic.png"
      },
      {
        "name": "LIC AAO",
        "logo": "/icons/banking-logo-s-lic-aao.png"
      },
      {
        "name": "LIC ADO",
        "logo": "/icons/banking-logo-s-lic-ado.png"
      },
      {
        "name": "OICL",
        "logo": "/icons/oicl-png.png"
      },
      {
        "name": "NICL",
        "logo": "/icons/banking-logo-s-nicl-recruitment.png"
      },
      {
        "name": "Insurance",
        "logo": "/icons/banking-logo-s-lic-aao.jpg"
      }
    ]
  },
  {
    "category": "Scholarship",
    "subcategories": [
      {
        "name": "NTSE",
        "logo": "/icons/ntse.png"
      },
      {
        "name": "Scholarship",
        "logo": "/icons/image-2022-09-07t144056-911.png"
      }
    ]
  },
  {
    "category": "Nursing",
    "subcategories": [
      {
        "name": "AIIMS Nursing Officer",
        "logo": "/icons/aiims-nursing-officer.png"
      },
      {
        "name": "Nursing",
        "logo": "/icons/image-2022-09-07t160155-490.png"
      }
    ]
  }
];
