function validationErrorMessages(objectFields, object) {
  return Object.entries(objectFields).reduce(
    (errors, [property, requirements]) => {
      errors[property] = [];

      if (requirements.required) {
        const errorMessage = validateRequiredMessage(object[property]);
        if (errorMessage) errors[property].push(errorMessage);
      }

      if (requirements.comparison && requirements.comparison.length >= 1) {
        const errorMessage = validateComparisonMessage(
          ...requirements.comparison
        );
        if (errorMessage) errors[property].push(errorMessage);
      }

      return errors;
    },
    {}
  );
}

function validForm(errors) {
  return Object.values(errors).every((message) => message.length === 0);
}

function validateRequiredMessage(property) {
  if (!property) return "is required";
}

function validateComparisonMessage(firstValue, secondValue) {
  if (!(firstValue === secondValue)) return "are not equal";
}

module.exports = {
  validationErrorMessages,
  validForm,
};
