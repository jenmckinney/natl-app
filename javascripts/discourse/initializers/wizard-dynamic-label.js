import { withPluginApi } from "discourse/lib/plugin-api";

function initializeWizardFields(api) {
  api.modifyClass("component:wizard-field", {
    pluginId: "discourse-custom-wizard",

    didRender() {
      this._super(...arguments);

      const isRequired = this.get("field.required");
      const bodyLength = this.element?.querySelector(".body-length");

      if (bodyLength) {
        if (isRequired) {
          bodyLength.setAttribute("data-field-mandatory", "true");
        } else {
          bodyLength.removeAttribute("data-field-mandatory");
        }
      }
    }
  });
}

export default {
  name: "wizard-dynamic-required-labels",

  initialize() {
    withPluginApi("0.8.31", (api) => {
      initializeWizardFields(api);
    });
  }
};