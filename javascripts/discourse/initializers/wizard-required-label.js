import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("component:custom-wizard-field", {
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
});