/*
 * Small progressive-enhancement layer for controls retained in the editable
 * source HTML. It performs no fetch, analytics, storage, or form submission.
 */
(() => {
  function downloadEnquiryDraft(form) {
    const fields = new FormData(form);
    const lines = [
      "NEPS enquiry draft",
      "==================",
      `Name: ${fields.get("name") ?? ""}`,
      `Email: ${fields.get("email") ?? ""}`,
      `Organisation: ${fields.get("organisation") || "Not provided"}`,
      `Enquiry category: ${fields.get("category") ?? ""}`,
      "",
      "Message:",
      String(fields.get("message") ?? ""),
      "",
      "Prepared locally by the NEPS website. This draft was not sent or stored online.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const download = document.createElement("a");
    download.href = url;
    download.download = "neps-enquiry-draft.txt";
    download.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);

    const status = form.querySelector('[role="status"]');
    if (status) {
      status.textContent =
        "Your enquiry draft was downloaded. This website did not send or store your message.";
    }
  }

  function applyTeamFilters(panel) {
    const selected = Array.from(panel.querySelectorAll("select"), (select) =>
      select.value.toLocaleLowerCase(),
    );
    document.querySelectorAll(".team-card").forEach((card) => {
      const text = (card.textContent || "").toLocaleLowerCase();
      const visible = selected.every((value) => value === "all" || text.includes(value));
      card.style.display = visible ? "" : "none";
    });
  }

  document.addEventListener("change", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLSelectElement)) return;
    const panel = field.closest(".filters");
    if (panel) applyTeamFilters(panel);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const draftButton = target.closest(".contact-form button[data-prepare-draft]");
    if (draftButton instanceof HTMLButtonElement) {
      const form = draftButton.closest("form.contact-form");
      if (form && form.reportValidity()) downloadEnquiryDraft(form);
      return;
    }
    const button = target.closest(".filters button");
    if (!(button instanceof HTMLButtonElement)) return;
    event.preventDefault();
    const panel = button.closest(".filters");
    if (!panel) return;
    panel.querySelectorAll("select").forEach((select) => {
      select.value = "All";
    });
    applyTeamFilters(panel);
  });
})();
