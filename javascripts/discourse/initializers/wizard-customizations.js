import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "wizard-required-fields-customization",

  initialize() {
    withPluginApi("0.8.31", (api) => {
      // target the custom wizard field component
      api.modifyClass("component:wizard-field", {
        pluginId: "discourse-custom-wizard",

        // extend the component when it renders
        didInsertElement() {
          this._super(...arguments);
          
          // Find the wrapper container highlighted in your screenshots
          const bodyLengthContainer = this.element.querySelector(".body-length");
          
          if (bodyLengthContainer && this.field?.required) {
            // check if message is already there
            if (!bodyLengthContainer.querySelector(".field-required-message")) {
              const reqMessage = document.createElement("span");
              reqMessage.classList.add("field-required-message");
              reqMessage.innerText = "This field is required";
              
              // prepend to sit on the left side
              bodyLengthContainer.prepend(reqMessage);
            }
          }
        }
      });
    });
  },
};