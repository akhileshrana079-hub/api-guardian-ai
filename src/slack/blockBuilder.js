function buildHomeCard() {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🤖 API Guardian AI",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "*Your AI SRE Assistant*\n\nChoose an action below.",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "📊 Health",
          },
          value: "health",
          action_id: "health_btn",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "📝 Summary",
          },
          value: "summary",
          action_id: "summary_btn",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "🚨 Incidents",
          },
          value: "incident",
          action_id: "incident_btn",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "⚡ Optimize",
          },
          value: "optimize",
          action_id: "optimize_btn",
        },
      ],
    },
  ];
}

module.exports = {
  buildHomeCard,
};