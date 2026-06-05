import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.addPostRenderCallback((element) => {
    const observer = new MutationObserver(() => {
      const fields = element.querySelectorAll(".wizard-field");
      
      fields.forEach((fieldEl) => {
        if (fieldEl.classList.contains("is-required-field") || fieldEl.classList.contains("is-optional-field")) {
          return;
        }

        const emberKey = Object.keys(fieldEl).find(key => key.startsWith("__ember_") || key.startsWith("__glimmer_"));
        const componentInstance = emberKey ? fieldEl[emberKey]?.component : null;

        const fieldData = componentInstance?.field || componentInstance?.args?.field;

        if (fieldData?.required) {
          fieldEl.classList.add("is-required-field");
        } else {
          fieldEl.classList.add("is-optional-field");
        }
      });
    });

    const targetNode = document.querySelector(".custom-wizard") || document.body;
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  });
});