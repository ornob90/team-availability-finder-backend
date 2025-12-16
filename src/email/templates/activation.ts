export function activationEmailTemplate(params: {
  activationLink: string;
}) {
  const { activationLink } = params;

  return {
    subject: "Activate your account",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Welcome 👋</h2>
        <p>Please activate your account by clicking the link below:</p>
        <p>
          <a href="${activationLink}">
            Activate Account
          </a>
        </p>
        <p>This link expires in 24 hours.</p>
      </div>
    `,
    text: `Activate your account: ${activationLink}`,
  };
}
