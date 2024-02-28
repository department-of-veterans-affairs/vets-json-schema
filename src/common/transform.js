function replacer(key, value) {
  if (typeof value === 'object') {
    const fields = Object.keys(value);
    if (fields.length === 0 || fields.every(field => value[field] === undefined)) {
      return undefined;
    }
  }

  return value;
}
function filterViewFields(data) {
  return Object.keys(data).reduce((newData, nextProp) => {
    const field = data[nextProp];

    if (Array.isArray(field)) {
      newData[nextProp] = field.map(item => filterViewFields(item));
    } else if (typeof field === 'object') {
      if (nextProp.startsWith('view:')) {
        Object.assign(newData, filterViewFields(field));
      } else {
        newData[nextProp] = filterViewFields(field);
      }
    } else if (!nextProp.startsWith('view:')) {
      newData[nextProp] = field;
    }

    return newData;
  }, {});
}

function transformForSubmit(formConfig, form) {
  const withoutViewFields = filterViewFields(form.data);

  return JSON.stringify(withoutViewFields, replacer) || '{}';
}

const transform = form => {
  const formData = transformForSubmit({}, form);
  return JSON.parse(formData);
};

export default transform;
