// Concise human-reviewed facts from the Slack trailer channels. These are
// evidence for the migration review, not automatic database write rules.
module.exports = {
  reviewedAt: "2026-08-19T18:30:00-07:00",
  channelScope:
    "Trailer channels 1-59 were read; 49 and 50 were discovered separately. AIS19 has no reviewed trailer channel or Monday board.",
  byTrailerNumber: {
    1: {
      status: "confirmed_site",
      siteLabel: "Carson Tahoe / Minden Medical Center",
      clientSearchTerms: ["Carson Tahoe", "Minden Medical"],
      evidence: "Recent technical activity explicitly says the trailer is in Minden.",
    },
    5: {
      status: "movement_chain_review",
      siteLabel: "JCF",
      clientSearchTerms: ["JCF"],
      evidence:
        "Moved Elko to warehouse in July, then channel renamed to JCF; verify arrival before applying.",
    },
    10: {
      status: "conflict",
      siteLabel: "Glenn Medical or Banner North Colorado Medical Center",
      clientSearchTerms: ["Glenn Medical", "Banner North Colorado"],
      evidence:
        "Channel name says Glenn Medical, while the latest reviewed site-info message says Banner North Colorado Medical Center.",
    },
    11: {
      status: "confirmed_site",
      siteLabel: "SimonMed Park Blvd",
      clientSearchTerms: ["SimonMed Park Blvd", "Park Blvd"],
      evidence:
        "July site information identifies SimonMed Park Blvd in Pinellas Park, Florida.",
    },
    15: {
      status: "confirmed_site",
      siteLabel: "Gallup Indian Medical Center",
      clientSearchTerms: ["Gallup Indian Medical", "Gallup"],
      evidence: "July onsite service confirms the system at Gallup Indian Medical Center.",
    },
    16: {
      status: "conflict",
      siteLabel: "Madera or Banner Estrella",
      clientSearchTerms: ["Madera", "Banner Estrella"],
      evidence:
        "The Madera channel has active June/July onsite work; a second newer channel is named Banner Estrella but has no substantive messages.",
    },
    22: {
      status: "confirmed_site",
      siteLabel: "Atrium Health Floyd Medical Center",
      clientSearchTerms: ["Atrium Health Floyd"],
      evidence:
        "Slack gives the new August address: 304 Turner McCall Blvd NE, Rome, GA 30165.",
    },
    34: {
      status: "confirmed_site_newer_than_monday",
      siteLabel: "SimonMed Imaging, Eureka",
      clientSearchTerms: ["SimonMed Imaging Eureka", "Reno Diagnostic Centers"],
      evidence:
        "Slack says pickup from Lake Forest on Aug 4 and contains active onsite work at SimonMed Eureka through Aug 13.",
    },
    44: {
      status: "movement_chain_review",
      siteLabel: "Banner Fort Collins",
      clientSearchTerms: ["Banner Fort Collins"],
      evidence:
        "At Lathrop for maintenance July 24; delivery was stated as Aug 14 with service at Banner Fort Collins from Sep 1. Confirm physical arrival/current stay.",
    },
    47: {
      status: "confirmed_site",
      siteLabel: "Carondelet St. Joseph's Hospital",
      clientSearchTerms: ["Carondelet"],
      evidence:
        "Slack site information gives 350 N Wilmot Rd, Tucson, AZ 85711.",
    },
    49: {
      status: "confirmed_yard",
      siteLabel: "Lake Forest",
      clientSearchTerms: ["Lake Forest"],
      evidence: "Channel remains active for Lake Forest trailer work in August.",
    },
    50: {
      status: "confirmed_yard",
      siteLabel: "Lake Forest Ice Rink lot",
      clientSearchTerms: ["Lake Forest"],
      evidence: "Slack channel and Monday both place the trailer at the Lake Forest area.",
    },
    56: {
      status: "confirmed_yard",
      siteLabel: "Lake Forest",
      clientSearchTerms: ["Lake Forest"],
      evidence: "Slack says the trailer was dropped at Lake Forest on July 29.",
    },
  },
};
