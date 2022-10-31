const schemaProvider = [
  {
    sectionTitle: "Claims",
    questions: [
      {
        question: "How do we submit claims?",
        answers: [
          {
            type: "text",
            answer: "Fully completed signed claim form",
          },
        ],
      },
    ],
  },
];

const schemaEmployer = [
  {
    questions: [
      {
        question: "How do we submit claims?",
        answers: [
          {
            type: "text",
            answer: "Fully completed signed claim form",
          },
        ],
      },
    ],
  },
];

export const data = [
  {
    question: "How do we submit claims?",
    answers: [
      {
        type: "text",
        answer: "Fully completed signed claim form",
      },
      {
        type: "text",
        answer: "Itemized invoices",
      },
      {
        type: "<a>",
        answer: "Submit as per the instructions on",
        url: "/ServiceProviderUserManual.pdf",
      },
    ],
  },

  {
    question: "What is the procedure for discharging patients?",
    answers: [
      {
        type: "text",
        answer: "Attach fully filled and signed claim form",
      },
      {
        type: "text",
        answer: "Itemized invoices",
      },
      {
        type: "<a>",
        answer: "Submit as per the instructions on",
        url: "/ServiceProviderUserManual.pdf",
      },
    ],
  },

  {
    question: "How do I view the status of my submitted claims?",
    answers: [
      {
        type: "link",
        answer: "Submit as per the instructions on",
        url: "/claims",
      },
    ],
  },

  {
    question: "How do I view the status of my submitted claims?",
    answers: [
      {
        type: "text",
        answer:
          "You can submit a claim up to 90 days after the service was delivered to the patient.",
      },
    ],
  },

  // {
  //   question: "What is the admission scheduling procedure?",
  //   answers: [
  //     {
  //       type: "array",
  //       answer: [
  //         "Submit a request online 24 hours before the scheduled date.",
  //         "A letter of undertaking(LOU) will be forwarded to the hospital pre-authorizing the admission .",
  //         "The LOU will indicate the amount payable by EC and the ailment the member is being treated for.",
  //       ],
  //     },
  //   ],
  // },
];
