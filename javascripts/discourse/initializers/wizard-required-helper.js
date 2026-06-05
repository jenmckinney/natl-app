import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  api.modifyClass("component:wizard-field", {
    pluginId: "discourse-custom-wizard",

    didInsertElement() {
      this._super(...arguments);
      
      // if dynamic field config object marks this as required, add a standard utility class
      if (this.field && this.field.required) {
        this.element.classList.add("is-required-field");
      }
    }
  });
});