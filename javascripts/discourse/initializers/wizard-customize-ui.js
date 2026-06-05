import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("component:custom-wizard-field", {
    pluginId: "discourse-custom-wizard",

    didRender() {
      this._super(...arguments);

      const isRequired = this.get("field.required");
      
      if (this.element) {
        if (isRequired) {
          this.element.setAttribute("data-field-mandatory", "true");
        } else {
          this.element.removeAttribute("data-field-mandatory");
        }
      }
    }
  });
});